import { load as yamlLoad } from 'js-yaml';
import { ZUPLO_API_URL } from './config';
import type {
	AsimovManifest,
	ApiMetricsResponse,
	ModuleMetricsResponse,
	GitHubStats,
	Module,
	GithubRepository,
	GraphQLPagination
} from './types';

export const fallbackModules: Module[] = [
	{
		name: 'Apify',
		description: 'Data import powered by the Apify web automation platform.',
		stars: 9,
		url: 'https://github.com/asimov-modules/asimov-apify-module',
		language: 'Rust',
		topics: ['asimov-module']
	},
	{
		name: 'Bright Data',
		description: 'Data import powered by the Bright Data web data platform.',
		stars: 7,
		url: 'https://github.com/asimov-modules/asimov-brightdata-module',
		language: 'Rust',
		topics: ['asimov-module']
	},
	{
		name: 'SerpApi',
		description: 'Data import powered by the SerpApi search data platform.',
		stars: 7,
		url: 'https://github.com/asimov-modules/asimov-serpapi-module',
		language: 'Rust',
		topics: ['asimov-module']
	}
];

async function fetchWithFallback<T>(endpoint: string, fallbackData: T): Promise<T> {
	try {
		const isDev = import.meta.env.DEV;
		const apiUrl = isDev ? `/api/${endpoint}` : `${ZUPLO_API_URL}/${endpoint}`;

		const response = await fetch(apiUrl);
		if (!response.ok) {
			throw new Error(`API error: ${response.status}`);
		}
		return await response.json();
	} catch (err) {
		console.error(`Failed to fetch from ${endpoint}:`, err);
		return fallbackData;
	}
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
	try {
		const data = await fetchWithFallback<ApiMetricsResponse>('metrics/asimov-platform', {
			fetchedAt: '',
			orgFollowers: 0,
			totalStars: 0,
			repositories: [],
			pinnedRepositories: []
		});

		const topRepo = data.repositories.sort((a, b) => b.stars - a.stars)[0];

		return {
			stars: data.totalStars,
			followers: data.orgFollowers,
			topRepo: topRepo
				? {
						name: topRepo.name,
						description: topRepo.description || 'No description available',
						stars: topRepo.stars,
						url: topRepo.url,
						language: topRepo.language || 'Unknown',
						topics: topRepo.topics || []
					}
				: undefined,
			repositories: data.repositories,
			pinnedRepositories: data.pinnedRepositories
		};
	} catch (err) {
		console.error('Failed to fetch GitHub stats:', err);
		return { stars: 0, followers: 0, topRepo: undefined, repositories: [] };
	}
}

function parseManifest(manifestYAML?: string): AsimovManifest | null {
	if (!manifestYAML) return null;

	try {
		return yamlLoad(manifestYAML) as AsimovManifest;
	} catch (err) {
		console.warn('Failed to parse manifest YAML:', err);
		return null;
	}
}

export async function fetchTopModulesQuery(): Promise<Module[]> {
	const data = await fetchWithFallback<ModuleMetricsResponse>('metrics/asimov-modules', {
		fetchedAt: '',
		orgFollowers: 0,
		totalStars: 0,
		repositories: []
	});

	const modules = data.repositories
		.sort((a, b) => b.stars - a.stars)
		.slice(0, 3)
		.map((module) => {
			const manifest = parseManifest(module.manifestYAML);

			return {
				name: manifest?.label || manifest?.name || module.name,
				description: manifest?.summary || module.description || 'No description available',
				stars: module.stars,
				url: module.url,
				language: module.language || 'Unknown',
				topics: module.topics || []
			};
		});

	return modules;
}

export const fetchOrgFollowers = async (): Promise<number> => {
	try {
		const data = await fetchWithFallback('metrics/github/organisation?org=asimov-platform', {
			followers: 0
		} as { followers: number });
		return data.followers;
	} catch (error) {
		console.error('Error fetching organisation followers:', error);
		return 0;
	}
};

export const fetchTotalRepositoryStars = async (): Promise<number> => {
	try {
		const data = await fetchWithFallback(
			'metrics/github/repositories?org=asimov-platform&limit=50',
			{
				repositories: [],
				meta: { endCursor: '', hasNextPage: false }
			} as { repositories: GithubRepository[]; meta: GraphQLPagination }
		);
		const totalStars = data.repositories.reduce(
			(total, repository) => total + parseInt(repository.stargazerCount, 10),
			0
		);
		return totalStars;
	} catch (error) {
		console.error('Error fetching stars:', error);
		return 0;
	}
};

export const fetchPinnedRepositories = async (): Promise<GithubRepository[]> => {
	try {
		const data = await fetchWithFallback('metrics/github/pinned-repositories?org=asimov-platform', {
			repositories: []
		} as { repositories: GithubRepository[] });
		return data.repositories
			.sort((a, b) => parseInt(b.stargazerCount, 10) - parseInt(a.stargazerCount, 10))
			.slice(0, 4);
	} catch (error) {
		console.error('Error fetching pinned repositories:', error);
		return [];
	}
};
