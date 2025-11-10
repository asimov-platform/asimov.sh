<script lang="ts">
	import { onMount } from 'svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import Star from 'phosphor-svelte/lib/Star';
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
	import { fetchPinnedRepositories } from '../../lib/github';
	import { githubUrl } from '../../lib/config';
	import ModuleCard from '../common/ModuleCard.svelte';
	import ModuleCardSkeleton from '../common/ModuleCardSkeleton.svelte';
	import type { GithubRepository } from '../../lib/types';

	let repositoriesSection: HTMLElement;

	const asimovPlatformPinnedReposQuery = createQuery({
		queryKey: ['github-pinned-repositories'],
		queryFn: fetchPinnedRepositories,
		staleTime: 10 * 60 * 1000,
		gcTime: 20 * 60 * 1000,
		retry: 2
	});

	const data = $derived(($asimovPlatformPinnedReposQuery.data as GithubRepository[]) ?? []);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const elements = entry.target.querySelectorAll('[data-animate]');
						elements.forEach((el, i) => {
							setTimeout(() => {
								el.classList.add('in-view');
							}, 150 * i);
						});
					}
				});
			},
			{ threshold: 0.1 }
		);

		if (repositoriesSection) {
			observer.observe(repositoriesSection);
		}

		return () => {
			if (repositoriesSection) observer.unobserve(repositoriesSection);
		};
	});
</script>

<section
	id="top-repositories"
	class="relative border-t border-gray-200 bg-gray-50 py-20"
	bind:this={repositoriesSection}
>
	<div class="grid-overlay"></div>

	<div class="relative z-10 container mx-auto px-4">
		<div class="mx-auto mb-16 max-w-3xl text-center">
			<div
				class="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1"
			>
				<Star size={16} class="text-orange-600" />
				<span class="text-sm text-orange-600">Community Favorites</span>
			</div>

			<h2 class="mb-4 text-4xl font-bold text-gray-900 md:text-5xl" data-animate="fade">
				Top Rated Repositories
			</h2>
			<p class="text-xl text-gray-600" data-animate="fade">
				Discover our most popular open-source projects, trusted by developers worldwide.
			</p>
		</div>

		{#if $asimovPlatformPinnedReposQuery.isLoading}
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
				{#each { length: 6 } as _, i ('star-rated-repo-' + i)}
					<ModuleCardSkeleton />
				{/each}
			</div>
		{:else if data.length > 0}
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each data as repo, i (repo.name)}
					<ModuleCard module={repo} index={i} />
				{/each}
			</div>
		{:else}
			<div class="text-center text-gray-600">
				<p class="mb-4">Unable to load repositories</p>
				<p class="text-sm">Please try again later</p>
			</div>
		{/if}

		<div class="mt-12 text-center" data-animate="fade">
			<a
				href={githubUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-white transition-colors hover:bg-gray-800"
			>
				View all repositories on GitHub
				<ArrowRight size={16} />
			</a>
		</div>
	</div>
</section>
