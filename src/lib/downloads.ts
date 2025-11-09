import { fetchWithFallback } from './utils';

import type { SupabaseDownloadRecord } from './types';

export async function fetchDailyDownloadsStats(
	days: number = 30
): Promise<Record<string, Array<SupabaseDownloadRecord>>> {
	try {
		const data = await fetchWithFallback(
			`metrics/downloads?days=${days}`,
			{} as Record<string, Array<SupabaseDownloadRecord>>
		);
		return data;
	} catch (error) {
		console.error('Error fetching daily downloads stats:', error);
		return {};
	}
}

export const fetchTotalDailyDownloads = async (): Promise<number> => {
	try {
		const data = await fetchWithFallback(
			'metrics/downloads?days=0',
			{} as Record<string, Array<SupabaseDownloadRecord>>
		);

		const totalDownloads = Object.values(data).reduce((total, platformData) => {
			if (platformData.length > 0) {
				return total + platformData[0].count;
			}
			return total;
		}, 0);
		return totalDownloads;
	} catch (error) {
		console.error('Error fetching daily downloads stats:', error);
		return 0;
	}
};
