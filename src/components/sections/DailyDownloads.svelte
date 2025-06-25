<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { Chart } from 'svelte-echarts';
	import { init, use } from 'echarts/core';
	import { fetchDailyDownloadsStats, fetchDownloadsStats } from '../../lib/downloads';
	import type { DailyDownloadData, DownloadsStats } from '../../lib/types';

	import { LineChart, BarChart } from 'echarts/charts';
	import {
		TitleComponent,
		TooltipComponent,
		GridComponent,
		DatasetComponent,
		TransformComponent,
		LegendComponent
	} from 'echarts/components';
	import { LabelLayout, UniversalTransition } from 'echarts/features';
	import { CanvasRenderer } from 'echarts/renderers';

	use([
		LineChart,
		BarChart,
		TitleComponent,
		TooltipComponent,
		GridComponent,
		DatasetComponent,
		TransformComponent,
		LegendComponent,
		LabelLayout,
		UniversalTransition,
		CanvasRenderer
	]);

	const dailyDownloadsQuery = createQuery({
		queryKey: ['daily-downloads'],
		queryFn: fetchDailyDownloadsStats,
		staleTime: 30 * 60 * 1000,
		gcTime: 60 * 60 * 1000,
		retry: 2
	});

	const downloadsStatsQuery = createQuery({
		queryKey: ['downloads-stats'],
		queryFn: fetchDownloadsStats,
		staleTime: 30 * 60 * 1000,
		gcTime: 60 * 60 * 1000,
		retry: 2
	});

	const seriesColors = {
		crates: '#ff6b35',
		rubygems: '#cc342d',
		npm: '#cb3837',
		pypi: '#3776ab'
	} as const;

	interface GroupedDownloadData {
		date: Date;
		crates: number;
		rubygems: number;
		npm: number;
		pypi: number;
	}

	$: hasTimelineData = $dailyDownloadsQuery.data && $dailyDownloadsQuery.data.length > 0;
	$: options = hasTimelineData
		? getTimelineChartOptions($dailyDownloadsQuery.data || [])
		: getBarChartOptions($downloadsStatsQuery.data);

	function getTimelineChartOptions(data: DailyDownloadData[]) {
		const groupedByDate = data.reduce(
			(acc, item) => {
				if (!acc[item.date]) {
					acc[item.date] = {
						date: new Date(item.date),
						crates: 0,
						rubygems: 0,
						npm: 0,
						pypi: 0
					};
				}
				acc[item.date][item.source as keyof Omit<GroupedDownloadData, 'date'>] = item.downloads;
				return acc;
			},
			{} as Record<string, GroupedDownloadData>
		);

		const sortedData = Object.values(groupedByDate).sort(
			(a, b) => a.date.getTime() - b.date.getTime()
		);

		const xAxisData = sortedData.map((d) =>
			d.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
		);

		return {
			title: {
				text: 'Downloads by Platform Over Time',
				left: 'center',
				textStyle: { fontSize: 16 }
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top: '15%',
				containLabel: true
			},
			legend: {
				data: ['Crates', 'RubyGems', 'NPM', 'PyPI'],
				top: '8%'
			},
			tooltip: {
				trigger: 'axis' as const,
				backgroundColor: 'rgba(255, 255, 255, 0.95)',
				borderColor: '#e5e7eb',
				borderWidth: 1,
				textStyle: { color: '#374151' }
			},
			xAxis: {
				type: 'category' as const,
				boundaryGap: false,
				data: xAxisData
			},
			yAxis: {
				type: 'value' as const,
				name: 'Downloads'
			},
			series: [
				{
					name: 'Crates',
					type: 'line' as const,
					smooth: true,
					itemStyle: { color: seriesColors.crates },
					areaStyle: { opacity: 0.3 },
					data: sortedData.map((d) => d.crates)
				},
				{
					name: 'RubyGems',
					type: 'line' as const,
					smooth: true,
					itemStyle: { color: seriesColors.rubygems },
					areaStyle: { opacity: 0.3 },
					data: sortedData.map((d) => d.rubygems)
				},
				{
					name: 'NPM',
					type: 'line' as const,
					smooth: true,
					itemStyle: { color: seriesColors.npm },
					areaStyle: { opacity: 0.3 },
					data: sortedData.map((d) => d.npm)
				},
				{
					name: 'PyPI',
					type: 'line' as const,
					smooth: true,
					itemStyle: { color: seriesColors.pypi },
					areaStyle: { opacity: 0.3 },
					data: sortedData.map((d) => d.pypi)
				}
			]
		};
	}

	function getBarChartOptions(statsData: DownloadsStats | undefined) {
		if (!statsData || !statsData.bySource) {
			return { title: { text: 'No data available' } };
		}

		const platforms = Object.keys(statsData.bySource);
		const downloads = Object.values(statsData.bySource);
		const colors = platforms.map(
			(platform) => seriesColors[platform as keyof typeof seriesColors] || '#666'
		);

		return {
			title: {
				text: 'Total Downloads by Platform',
				left: 'center',
				textStyle: { fontSize: 16 }
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top: '15%',
				containLabel: true
			},
			tooltip: {
				trigger: 'item' as const,
				backgroundColor: 'rgba(255, 255, 255, 0.95)',
				borderColor: '#e5e7eb',
				borderWidth: 1,
				textStyle: { color: '#374151' },
				formatter: '{b}: {c} downloads'
			},
			xAxis: {
				type: 'category' as const,
				data: platforms.map((p) => p.charAt(0).toUpperCase() + p.slice(1))
			},
			yAxis: {
				type: 'value' as const,
				name: 'Total Downloads'
			},
			series: [
				{
					type: 'bar' as const,
					data: downloads.map((value, index) => ({
						value,
						itemStyle: { color: colors[index] }
					})),
					barWidth: '60%'
				}
			]
		};
	}
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
				{#if $dailyDownloadsQuery.isLoading || $downloadsStatsQuery.isLoading}
					<div class="flex h-96 items-center justify-center">
						<div class="text-center">
							<div
								class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-orange-600"
							></div>
							<p class="text-gray-600">Loading download statistics...</p>
						</div>
					</div>
				{:else}
					<div class="chart-container">
						<Chart {init} {options} />
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.chart-container {
		width: 100%;
		height: 400px;
	}
</style>
