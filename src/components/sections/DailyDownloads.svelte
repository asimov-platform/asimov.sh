<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { fetchDailyDownloadsStats } from '../../lib/downloads';
	import PlatformDownloadsChart from '../common/PlatformDownloadsChart.svelte';

	const dailyDownloadsQuery = createQuery({
		queryKey: ['daily-download-stats'],
		queryFn: () => fetchDailyDownloadsStats(),
		staleTime: 30 * 60 * 1000,
		gcTime: 60 * 60 * 1000,
		retry: 2
	});

	$: hasTimelineData =
		$dailyDownloadsQuery.data && Object.keys($dailyDownloadsQuery.data).length > 0;
</script>

<section id="daily-downloads" class="py-20">
	<div class="container mx-auto px-4">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Platform Downloads</h2>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				{hasTimelineData
					? 'Track download trends across package managers over time'
					: 'Total downloads across all package managers'}
			</p>
		</div>

		<div class="mx-auto max-w-6xl">
			<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				{#if $dailyDownloadsQuery.isLoading}
					<div class="flex h-96 items-center justify-center">
						<div class="text-center">
							<div
								class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-orange-600"
							></div>
							<p class="text-gray-600">Loading download statistics...</p>
						</div>
					</div>
				{:else}
					<PlatformDownloadsChart data={$dailyDownloadsQuery.data} />
				{/if}
			</div>
		</div>
	</div>
</section>
