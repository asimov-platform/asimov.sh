import { load as yamlLoad } from 'js-yaml';

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

const SKIP_REPOS = [
	'.github',
	'asimov-template-module',
	'asimov-modules.rb',
	'asimov-modules.py',
	'asimov-goodreads-module'
];

export const fallbackModules: Module[] = [
	{
		name: 'langchain-asimov',
		description: 'LangChain integration for ASIMOV platform with enhanced AI capabilities',
		stars: 1200,
		url: 'https://github.com/asimov-modules/langchain-asimov',
		language: 'Python',
		topics: ['langchain', 'ai', 'integration']
	},
	{
		name: 'asimov-core',
		description: 'Core infrastructure tools for building AI applications',
		stars: 856,
		url: 'https://github.com/asimov-modules/asimov-core',
		language: 'Python',
		topics: ['core', 'infrastructure', 'ai']
	},
	{
		name: 'asimov-deploy',
		description: 'Deployment and scaling utilities for AI models',
		stars: 642,
		url: 'https://github.com/asimov-modules/asimov-deploy',
		language: 'TypeScript',
		topics: ['deployment', 'scaling', 'devops']
	}
];

async function fetchManifest(
	repoName: string,
	headers: HeadersInit
): Promise<AsimovManifest | null> {
	try {
		const manifestResponse = await fetch(
			`https://api.github.com/repos/asimov-modules/${repoName}/contents/.asimov/module.yaml`,
			{ headers }
		);

		if (!manifestResponse.ok) {
			return null;
		}

		const manifestData = await manifestResponse.json();

		let manifestContent: string;
		try {
			manifestContent = atob(manifestData.content);
		} catch (decodeErr) {
			console.warn(`Failed to decode base64 for ${repoName}:`, decodeErr);
			return null;
		}

		try {
			const manifest = yamlLoad(manifestContent) as AsimovManifest;
			return manifest;
		} catch (yamlErr) {
			console.warn(`Failed to parse YAML for ${repoName}:`, yamlErr);
			return null;
		}
	} catch (err) {
		console.warn(`Failed to fetch module.yaml for ${repoName}:`, err);
		return null;
	}
}

export async function fetchTopModules(): Promise<Module[]> {
	try {
		const headers: HeadersInit = {
			Accept: 'application/vnd.github.v3+json',
			'User-Agent': 'asimov-platform-website'
		};

		if (import.meta.env.VITE_GIT_SECRET) {
			headers['Authorization'] = `token ${import.meta.env.VITE_GIT_SECRET}`;
		}

		const response = await fetch('https://api.github.com/orgs/asimov-modules/repos?per_page=100', {
			headers
		});

		if (!response.ok) {
			throw new Error(`GitHub API error: ${response.status}`);
		}

		const repos: GitHubRepo[] = await response.json();

		const filteredAndSortedRepos = repos
			.filter((repo) => !SKIP_REPOS.includes(repo.name.toLowerCase()))
			.sort((a, b) => b.stargazers_count - a.stargazers_count)
			.slice(0, 3);

		const modules = await Promise.all(
			filteredAndSortedRepos.map(async (repo) => {
				const manifest = await fetchManifest(repo.name, headers);

				return {
					name: manifest?.label || manifest?.name || repo.name,
					description: manifest?.summary || repo.description || 'No description available',
					stars: repo.stargazers_count,
					url: repo.html_url,
					language: repo.language || 'Unknown',
					topics: repo.topics || []
				};
			})
		);

		return modules;
	} catch (err) {
		console.error('Failed to fetch GitHub repositories:', err);
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
		Unknown: 'bg-gray-100 text-gray-800'
	};
	return colors[language] || 'bg-gray-100 text-gray-800';
}
