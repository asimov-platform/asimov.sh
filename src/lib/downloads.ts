import { ZUPLO_API_URL } from './config';
import type { DownloadData, DownloadsStats, DailyDownloadData } from './types';

export async function fetchDownloadsStats(): Promise<DownloadsStats> {
	try {
		const isDev = import.meta.env.DEV;
		const apiUrl = isDev ? '/api/downloads' : `${ZUPLO_API_URL}/downloads`;

		const response = await fetch(apiUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch downloads: ${response.status}`);
		}

		const data: DownloadData[] = await response.json();

		const latestDate = getLatestDate(data);
		const latestData = data.filter((item) => item.collected_at === latestDate);

		const totalDownloads = latestData.reduce((sum, item) => sum + item.downloads, 0);
		const uniqueModules = new Set(latestData.map((item) => item.name));
		const totalModules = uniqueModules.size;

		const bySource = latestData.reduce(
			(acc, item) => {
				acc[item.source] = (acc[item.source] || 0) + item.downloads;
				return acc;
			},
			{} as Record<string, number>
		);

		return {
			totalDownloads,
			totalModules,
			bySource
		};
	} catch (error) {
		console.error('Error fetching downloads stats:', error);
		return getMockDataStats();
	}
}

export async function fetchDailyDownloadsStats(): Promise<DailyDownloadData[]> {
	try {
		const isDev = import.meta.env.DEV;

		const dates = getLast30Days();
		const allData: DownloadData[] = [];

		// Fetch data for each date
		const fetchPromises = dates.map((date) => {
			const apiUrl = isDev
				? `/api/downloads?collected_at=eq.${date}`
				: `${ZUPLO_API_URL}/downloads?collected_at=eq.${date}`;

			return fetch(apiUrl, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then((response) => {
					if (response.ok) {
						return response.json();
					} else {
						throw new Error(`Failed to fetch data for ${date}: ${response.status}`);
					}
				})
				.catch((dateError) => {
					console.warn(`Failed to fetch data for ${date}:`, dateError);
					return [];
				});
		});

		const results = await Promise.allSettled(fetchPromises);
		results.forEach((result) => {
			if (result.status === 'fulfilled') {
				allData.push(...result.value);
			}
		});

		if (allData.length === 0) {
			console.log('No daily data available, returning empty array');
			return [];
		}

		return processDownloadsByPlatform(allData);
	} catch (error) {
		console.error('Error fetching daily downloads stats:', error);
		return [];
	}
}

function getLast30Days(): string[] {
	const dates: string[] = [];
	const today = new Date();

	for (let i = 29; i >= 0; i--) {
		const date = new Date(today);
		date.setDate(today.getDate() - i);
		dates.push(date.toISOString().split('T')[0]);
	}

	return dates;
}

function getLatestDate(data: DownloadData[]): string {
	if (data.length === 0) return new Date().toISOString().split('T')[0];

	const dates = data.map((item) => item.collected_at);
	return dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];
}

function processDownloadsByPlatform(data: DownloadData[]): DailyDownloadData[] {
	const groupedByPlatformAndDate = data.reduce(
		(acc, item) => {
			const dateKey = item.collected_at;
			const platform = item.source;
			const key = `${platform}-${dateKey}`;

			if (!acc[key]) {
				acc[key] = {
					source: platform,
					date: dateKey,
					downloads: 0
				};
			}

			acc[key].downloads += item.downloads;

			return acc;
		},
		{} as Record<string, DailyDownloadData>
	);

	const result = Object.values(groupedByPlatformAndDate).sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
	);
	return result;
}

function getMockDataStats(): DownloadsStats {
	const data = getMockData();
	const totalDownloads = data.reduce((sum, item) => sum + item.downloads, 0);
	const uniqueModules = new Set(data.map((item) => item.name));
	const totalModules = uniqueModules.size;
	const bySource = data.reduce(
		(acc, item) => {
			acc[item.source] = (acc[item.source] || 0) + item.downloads;
			return acc;
		},
		{} as Record<string, number>
	);

	return {
		totalDownloads,
		totalModules,
		bySource
	};
}

function getMockData(): DownloadData[] {
	return [
		{
			id: 1,
			source: 'crates',
			owner: 'asimov-modules',
			name: 'asimov-apify-module',
			downloads: 80,
			daily_downloads: 0,
			collected_at: '2025-06-24'
		},
		{
			id: 2,
			source: 'crates',
			owner: 'asimov-modules',
			name: 'asimov-apple-module',
			downloads: 70,
			daily_downloads: 0,
			collected_at: '2025-06-24'
		},
		{
			id: 3,
			source: 'crates',
			owner: 'asimov-modules',
			name: 'asimov-brightdata-module',
			downloads: 60,
			daily_downloads: 0,
			collected_at: '2025-06-24'
		},
		{
			id: 4,
			source: 'crates',
			owner: 'asimov-modules',
			name: 'asimov-clock-module',
			downloads: 50,
			daily_downloads: 0,
			collected_at: '2025-06-24'
		},
		{
			id: 5,
			source: 'crates',
			owner: 'asimov-modules',
			name: 'asimov-file-module',
			downloads: 40,
			daily_downloads: 0,
			collected_at: '2025-06-24'
		},
		{
			id: 50,
			source: 'crates',
			owner: 'asimov-platform',
			name: 'asimov-sdk',
			downloads: 30,
			daily_downloads: 0,
			collected_at: '2025-06-24'
		},
		{
			id: 52,
			source: 'crates',
			owner: 'asimov-platform',
			name: 'asimov-sys',
			downloads: 20,
			daily_downloads: 0,
			collected_at: '2025-06-24'
		},
		{
			id: 158,
			source: 'rubygems',
			owner: 'asimov-platform',
			name: 'asimov.rb',
			downloads: 10,
			daily_downloads: 0,
			collected_at: '2025-06-24'
		}
	];
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
