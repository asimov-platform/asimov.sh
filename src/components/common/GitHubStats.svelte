<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import Star from 'phosphor-svelte/lib/Star';
	import Users from 'phosphor-svelte/lib/Users';
	import { fetchGitHubStats, formatStars } from '../../lib/github';
	import { githubUrl } from '../../lib/config';
	import type { Module, GitHubStats } from '../../lib/types';

	interface Props {
		variant?: 'desktop' | 'mobile';
	}

	let { variant = 'desktop' }: Props = $props();

	const githubStatsQuery = createQuery({
		queryKey: ['github-stats'],
		queryFn: fetchGitHubStats,
		staleTime: 10 * 60 * 1000,
		gcTime: 20 * 60 * 1000,
		retry: 1
	});

	const data = $derived($githubStatsQuery.data as GitHubStats | undefined);
	const topRepos = $derived(
		data?.repositories?.sort((a, b) => b.stars - a.stars).slice(0, 4) || []
	);

	let showDropdown = $state(false);
	let dropdownTimeout: NodeJS.Timeout | null = null;

	function handleMouseEnter() {
		if (dropdownTimeout) {
			clearTimeout(dropdownTimeout);
		}
		showDropdown = true;
	}

	function handleMouseLeave() {
		dropdownTimeout = setTimeout(() => {
			showDropdown = false;
		}, 150);
	}

	function toggleDropdown() {
		showDropdown = !showDropdown;
	}

	const containerClass =
		variant === 'desktop' ? 'flex items-center gap-3' : 'flex items-center gap-2';

	const linkClass =
		variant === 'desktop'
			? 'group flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white/80 px-3 py-1.5 text-sm transition-all hover:border-orange-200 hover:bg-orange-50'
			: 'flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs';

	const starButtonClass =
		variant === 'desktop'
			? 'group relative flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white/80 px-3 py-1.5 text-sm transition-all hover:border-orange-200 hover:bg-orange-50 cursor-pointer'
			: 'relative flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs cursor-pointer';

	const iconClass =
		variant === 'desktop' ? 'text-gray-500 group-hover:text-orange-600' : 'text-gray-500';

	const textClass =
		variant === 'desktop'
			? 'font-medium text-gray-700 group-hover:text-orange-700'
			: 'font-medium text-gray-700';

	const loadingContainerClass =
		variant === 'desktop'
			? 'flex items-center gap-3'
			: 'flex items-center justify-center gap-4 py-2';
</script>

{#if data}
	<div class={containerClass}>
		{#if $githubStatsQuery.data.repositories}
			{@const asimovRsRepo = $githubStatsQuery.data.repositories.find(
				(repo: Module) => repo.name === 'asimov.rs'
			)}
			{#if asimovRsRepo}
				<a
					href={asimovRsRepo.url}
					target="_blank"
					rel="noopener noreferrer"
					class={linkClass}
					title={asimovRsRepo.name}
				>
					<Star size={14} class={iconClass} />
					<span class={textClass}>
						{formatStars(asimovRsRepo.stars)}
					</span>
				</a>
			{:else}
				<a
					href="https://github.com/asimov-platform/asimov.rs"
					target="_blank"
					rel="noopener noreferrer"
					class={linkClass}
				>
					<Star size={14} class={iconClass} />
					<span class={textClass}>
						{formatStars($githubStatsQuery.data.stars)}
					</span>
				</a>
			{/if}
		{:else}
			<a
				href="https://github.com/asimov-platform/asimov.rs"
				target="_blank"
				rel="noopener noreferrer"
				class={linkClass}
			>
				<Star size={14} class={iconClass} />
				<span class={textClass}>
					{formatStars(data.stars)}
				</span>
			</a>
		{/if}
		<a href={githubUrl} target="_blank" rel="noopener noreferrer" class={linkClass}>
			<Users size={variant === 'desktop' ? 14 : 10} class={iconClass} />
			<span class={textClass}>
				{formatStars(data.followers)}
			</span>
		</a>
	</div>
{:else if $githubStatsQuery.isLoading}
	<div class={loadingContainerClass}>
		<div class="animate-pulse rounded-lg bg-gray-200 px-3 py-1.5">
			<div class="h-4 w-8 rounded bg-gray-300"></div>
		</div>
		<div class="animate-pulse rounded-lg bg-gray-200 px-3 py-1.5">
			<div class="h-4 w-8 rounded bg-gray-300"></div>
		</div>
	</div>
{/if}
