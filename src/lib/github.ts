import { load as yamlLoad } from 'js-yaml';
import { ZUPLO_API_URL } from './config';

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

interface ApiMetricsResponse {
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
			repositories: []
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
						language: topRepo.language || 'Unknown'
					}
				: undefined
		};
	} catch (err) {
		console.error('Failed to fetch GitHub stats:', err);
		return { stars: 0, followers: 0 };
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
	const data = await fetchWithFallback<ApiMetricsResponse>('metrics/asimov-modules', {
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

export async function fetchTopModules(): Promise<Module[]> {
	try {
		return await fetchTopModulesQuery();
	} catch {
		return fallbackModules;
	}
}

export function formatStars(count: number): string {
	if (count >= 1000) {
		return `${(count / 1000).toFixed(1)}k`;
	}
	return count.toString();
}

export function getLanguageColor(language: string): string {
	const colors: { [key: string]: string } = {
		Python: 'bg-blue-100 text-blue-800',
		TypeScript: 'bg-indigo-100 text-indigo-800',
		JavaScript: 'bg-yellow-100 text-yellow-800',
		Go: 'bg-cyan-100 text-cyan-800',
		Rust: 'bg-orange-100 text-orange-800',
		Ruby: 'bg-red-100 text-red-800',
		PowerShell: 'bg-purple-100 text-purple-800',
		Nix: 'bg-green-100 text-green-800',
		Svelte: 'bg-pink-100 text-pink-800',
		Unknown: 'bg-gray-100 text-gray-800'
	};
	return colors[language] || 'bg-gray-100 text-gray-800';
}
