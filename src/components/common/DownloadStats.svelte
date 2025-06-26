<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import Download from 'phosphor-svelte/lib/Download';
	import {
		fetchDailyDownloadsStats,
		getTotalDownloadsFromTimeline,
		formatDownloads
	} from '../../lib/downloads';

	interface Props {
		variant?: 'desktop' | 'mobile';
	}

	let { variant = 'desktop' }: Props = $props();

	const downloadsQuery = createQuery({
		queryKey: ['daily-download-stats'],
		queryFn: fetchDailyDownloadsStats,
		staleTime: 30 * 60 * 1000,
		gcTime: 60 * 60 * 1000,
		retry: 2
	});

	const totalDownloads = $derived(
		$downloadsQuery.data ? getTotalDownloadsFromTimeline($downloadsQuery.data) : 0
	);

	const badgeClass =
		variant === 'desktop'
			? 'flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white/80 px-3 py-1.5 text-sm'
			: 'flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm';

	const loadingClass =
		variant === 'desktop'
			? 'animate-pulse rounded-lg bg-gray-200 px-3 py-1.5'
			: 'animate-pulse rounded-lg bg-gray-200 px-3 py-1.5';
</script>

{#if $downloadsQuery.data}
	<div class={badgeClass} title="Total daily downloads across all platforms">
		<Download size={14} class="text-gray-500" />
		<span class="font-medium text-gray-700">
			{formatDownloads(totalDownloads)}
		</span>
	</div>
{:else if $downloadsQuery.isLoading}
	<div class={loadingClass}>
		<div class="h-4 w-8 rounded bg-gray-300"></div>
	</div>
{/if}
