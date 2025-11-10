import { fetchWithFallback } from './utils';

import type { GithubRepository, ModuleRepository, GraphQLPagination } from './types';

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
			(total, repository) => total + repository.stargazerCount,
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
		return data.repositories.sort((a, b) => b.stargazerCount - a.stargazerCount).slice(0, 4);
	} catch (error) {
		console.error('Error fetching pinned repositories:', error);
		return [];
	}
};

export const fetchModules = async (): Promise<ModuleRepository[]> => {
	try {
		const data = await fetchWithFallback(
			'metrics/github/repositories?org=asimov-modules&limit=30',
			{
				repositories: [],
				meta: { endCursor: '', hasNextPage: false }
			} as { repositories: ModuleRepository[]; meta: GraphQLPagination }
		);
		return data.repositories.sort((a, b) => b.stargazerCount - a.stargazerCount).slice(0, 3);
	} catch (error) {
		console.error('Error fetching modules:', error);
		return [];
	}
};
