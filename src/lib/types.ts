export interface SupabaseDownloadRecord {
	date: string;
	count: number;
}

export interface GithubRepository {
	name: string;
	description: string;
	stargazerCount: number;
	url: string;
	createdAt: string;
	updatedAt: string;
	primaryLanguage: {
		name: string;
	};
}

export interface ModuleRepository extends GithubRepository {
	object: {
		text: string;
	};
}

export interface GraphQLPagination {
	endCursor: string;
	hasNextPage: boolean;
}
