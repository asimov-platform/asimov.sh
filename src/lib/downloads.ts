import { ZUPLO_API_URL } from './config';
import type { SupabaseDownloadRecord } from './types';

export async function fetchDailyDownloadsStats(
	days: number = 30
): Promise<Record<string, Array<SupabaseDownloadRecord>>> {
	try {
		const isDev = import.meta.env.DEV;
		const apiUrl = isDev ? `/api/metrics/downloads` : `${ZUPLO_API_URL}/metrics/downloads`;

		const response = await fetch(`${apiUrl}?days=${days}`);

		if (!response.ok) {
			throw new Error(`Failed to fetch downloads data: ${response.status}`);
		}

		const timeline: Record<string, Array<SupabaseDownloadRecord>> = await response.json();
		return timeline;
	} catch (error) {
		console.error('Error fetching daily downloads stats:', error);
		return {};
	}
}

export const fetchTotalDailyDownloads = async (): Promise<number> => {
	try {
		const isDev = import.meta.env.DEV;
		const apiUrl = isDev ? `/api/metrics/downloads` : `${ZUPLO_API_URL}/metrics/downloads`;

		const response = await fetch(`${apiUrl}?days=0`);

		if (!response.ok) {
			throw new Error(`Failed to fetch downloads data: ${response.status}`);
		}

		const data: Record<string, Array<SupabaseDownloadRecord>> = await response.json();
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
