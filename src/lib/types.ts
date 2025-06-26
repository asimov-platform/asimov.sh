export interface GitHubRepo {
	name: string;
	description: string;
	stargazers_count: number;
	html_url: string;
	language: string;
	topics: string[];
}

export interface Module {
	name: string;
	description: string;
	stars: number;
	url: string;
	language: string;
	topics: string[];
}

export interface AsimovManifest {
	name?: string;
	label?: string;
	summary?: string;
	links?: string[];
	provides?: Record<string, unknown>;
	handles?: Record<string, unknown>;
}

export interface RateLimitInfo {
	remaining: number;
	limit: number;
	resetTime: string;
	percentage: number;
}

export interface DownloadData {
	id: number;
	source: string;
	owner: string;
	name: string;
	downloads: number;
	daily_downloads: number;
	collected_at: string;
}

export interface DownloadsStats {
	totalDownloads: number;
	totalModules: number;
	bySource: Record<string, number>;
}

export interface GitHubStats {
	stars: number;
	followers: number;
	topRepo?: {
		name: string;
		description: string;
		stars: number;
		url: string;
		language: string;
	};
}

export interface ApiMetricsResponse {
	fetchedAt: string;
	orgFollowers: number;
	totalStars: number;
	repositories: {
		name: string;
		description: string | null;
		stars: number;
		starsPretty: string;
		url: string;
		language: string;
		topics: string[];
		manifestYAML?: string;
	}[];
}
