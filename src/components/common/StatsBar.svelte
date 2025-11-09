<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import Star from 'phosphor-svelte/lib/Star';
	import Users from 'phosphor-svelte/lib/Users';
	import Download from 'phosphor-svelte/lib/Download';
	import { fetchGitHubStats } from '../../lib/github';
	import { fetchTotalDailyDownloads } from '../../lib/downloads';
	import { formatDownloads, formatStars } from '../../lib/utils';
	import { githubUrl } from '../../lib/config';
	import MetricBadge from './MetricBadge.svelte';
	import MetricsSkeleton from './MetricSkeleton.svelte';

	interface Props {
		variant?: 'desktop' | 'mobile';
	}

	let { variant = 'desktop' }: Props = $props();

	const githubStatsQuery = createQuery({
		queryKey: ['github-stats'],
		queryFn: fetchGitHubStats,
		staleTime: 10 * 60 * 1000,
		gcTime: 20 * 60 * 1000,
		retry: 2
	});

	const downloadsQuery = createQuery({
		queryKey: ['total-daily-download-stats'],
		queryFn: fetchTotalDailyDownloads,
		staleTime: 30 * 60 * 1000,
		gcTime: 60 * 60 * 1000,
		retry: 2
	});

	const githubData = $derived($githubStatsQuery.data);
	const totalDownloads = $derived($downloadsQuery.data ?? 0);

	const containerClass =
		variant === 'desktop' ? 'flex items-center gap-3' : 'flex items-center gap-2';

	const loadingClass = variant === 'desktop' ? 'px-3 py-1.5' : 'px-2 py-1';
</script>

<div class={containerClass}>
	{#if githubData}
		<MetricBadge
			value={formatStars(githubData.stars)}
			href="#top-repositories"
			title="View top star-rated repositories"
			{variant}
		>
			{#snippet icon()}
				<Star size={variant === 'desktop' ? 14 : 10} />
			{/snippet}
		</MetricBadge>
	{:else if $githubStatsQuery.isLoading}
		<MetricsSkeleton wrapperClassName={loadingClass} />
	{/if}

	{#if githubData}
		<MetricBadge
			value={formatStars(githubData.followers)}
			href={githubUrl}
			title="View GitHub profile"
			{variant}
			external
		>
			{#snippet icon()}
				<Users size={variant === 'desktop' ? 14 : 10} />
			{/snippet}
		</MetricBadge>
	{:else if $githubStatsQuery.isLoading}
		<MetricsSkeleton wrapperClassName={loadingClass} />
	{/if}

	{#if $downloadsQuery.data}
		<MetricBadge
			value={formatDownloads(totalDownloads)}
			href="#daily-downloads"
			title="Total daily downloads across all platforms"
			{variant}
		>
			{#snippet icon()}
				<Download size={variant === 'desktop' ? 14 : 10} />
			{/snippet}
		</MetricBadge>
	{:else if $downloadsQuery.isLoading}
		<MetricsSkeleton wrapperClassName={loadingClass} />
	{/if}
</div>
