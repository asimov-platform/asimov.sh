import { ZUPLO_API_URL } from './config';
import type { DownloadData } from './types';

export async function fetchDailyDownloadsStats(): Promise<
	Record<string, Array<{ date: string; count: number }>>
> {
	try {
		const isDev = import.meta.env.DEV;
		const apiUrl = isDev ? `/api/downloads` : `${ZUPLO_API_URL}/downloads`;

		const response = await fetch(apiUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch downloads data: ${response.status}`);
		}

		const allData: DownloadData[] = await response.json();

		if (allData.length === 0) {
			console.log('No downloads data available, returning empty object');
			return {};
		}

		const last30DaysData = filterLast30Days(allData);

		return processDailyDownloadsByPlatform(last30DaysData);
	} catch (error) {
		console.error('Error fetching daily downloads stats:', error);
		return {};
	}
}

function filterLast30Days(data: DownloadData[]): DownloadData[] {
	const today = new Date();
	const thirtyDaysAgo = new Date(today);
	thirtyDaysAgo.setDate(today.getDate() - 29);

	return data.filter((item) => {
		const itemDate = new Date(item.collected_at);
		return itemDate >= thirtyDaysAgo && itemDate <= today;
	});
}

function processDailyDownloadsByPlatform(
	data: DownloadData[]
): Record<string, Array<{ date: string; count: number }>> {
	const platforms = [...new Set(data.map((item) => item.source))];
	const result: Record<string, Array<{ date: string; count: number }>> = {};

	platforms.forEach((platform) => {
		result[platform] = [];
	});

	const groupedByPlatformAndDate = data.reduce(
		(acc, item) => {
			const platform = item.source;
			const date = item.collected_at;
			const key = `${item.source}-${date}`;

			if (!acc[key]) {
				acc[key] = {
					platform,
					date,
					dailyDownloads: 0
				};
			}

			acc[key].dailyDownloads += item.daily_downloads;
			return acc;
		},
		{} as Record<string, { platform: string; date: string; dailyDownloads: number }>
	);

	Object.values(groupedByPlatformAndDate).forEach((item) => {
		result[item.platform].push({
			date: item.date,
			count: item.dailyDownloads
		});
	});

	Object.keys(result).forEach((platform) => {
		result[platform].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
	});

	return result;
}

export function formatDownloads(downloads: number): string {
	if (downloads >= 1000000) {
		return (downloads / 1000000).toFixed(1) + 'M';
	}
	if (downloads >= 1000) {
		return (downloads / 1000).toFixed(1) + 'K';
	}
	return downloads.toLocaleString();
}

export function getTotalDownloadsFromTimeline(
	timelineData: Record<string, Array<{ date: string; count: number }>>
): number {
	let total = 0;

	Object.values(timelineData).forEach((platformData) => {
		if (platformData.length > 0) {
			const sortedData = platformData.sort(
				(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
			);
			total += sortedData[0].count;
		}
	});

	return total;
}
