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
	manifestYAML?: string;
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
	topRepo?: PlatformRepository;
	repositories: PlatformRepository[];
	pinnedRepositories?: PlatformRepository[];
}

export interface PlatformRepository {
	name: string;
	description: string | null;
	stars: number;
	url: string;
	language: string;
	topics: string[];
}

export interface ApiMetricsResponse {
	fetchedAt: string;
	orgFollowers: number;
	totalStars: number;
	repositories: PlatformRepository[];
	pinnedRepositories: PlatformRepository[];
}

export interface ModuleMetricsResponse {
	fetchedAt: string;
	orgFollowers: number;
	totalStars: number;
	repositories: Module[];
}

export interface SupabaseDownloadRecord {
	date: string;
	count: number;
}

export interface GithubRepository {
	name: string;
	description: string;
	stargazerCount: string;
	url: string;
}

export interface GraphQLPagination {
	endCursor: string;
	hasNextPage: boolean;
}
