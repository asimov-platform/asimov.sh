import { ZUPLO_API_URL } from './config';

export async function fetchDailyDownloadsStats(
	days: number = 30
): Promise<Record<string, Array<{ date: string; count: number }>>> {
	try {
		const isDev = import.meta.env.DEV;
		const apiUrl = isDev ? `/api/metrics/downloads` : `${ZUPLO_API_URL}/metrics/downloads`;

		const response = await fetch(`${apiUrl}?days=${days}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch downloads data: ${response.status}`);
		}

		const timeline: Record<string, Array<{ date: string; count: number }>> = await response.json();

		return timeline;
	} catch (error) {
		console.error('Error fetching daily downloads stats:', error);
		return {};
	}
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

// Function to get the total daily downloads accross all platforms
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
