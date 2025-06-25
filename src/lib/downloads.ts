import { ZUPLO_API_URL } from './config';
import type { DownloadData, DownloadsStats } from './types';

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
	} catch (error) {
		console.error('Error fetching downloads stats:', error);
		return getMockDataStats();
	}
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
