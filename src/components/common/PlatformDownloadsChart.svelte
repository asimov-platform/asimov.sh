<script lang="ts">
	import { Chart } from 'svelte-echarts';
	import { init, use } from 'echarts/core';

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

	export let data: Record<string, Array<{ date: string; count: number }>> | undefined = undefined;

	const seriesColors = {
		crates: '#ff6b35',
		rubygems: '#cc342d',
		npm: '#cb3837',
		pypi: '#3776ab',
		github: '#24292e'
	} as const;

	$: hasTimelineData = data && Object.keys(data).length > 0;
	$: options = hasTimelineData ? getTimelineChartOptions(data || {}) : getNoDataOptions();

	function getTimelineChartOptions(
		groupedData: Record<string, Array<{ date: string; count: number }>>
	) {
		const allDates = [
			...new Set(
				Object.values(groupedData)
					.flat()
					.map((item) => item.date)
			)
		].sort();

		const xAxisData = allDates.map((date) =>
			new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
		);

		const series = Object.entries(groupedData).map(([platform, platformData]) => {
			const data = allDates.map((date) => {
				const found = platformData.find((item) => item.date === date);
				return found ? found.count : 0;
			});

			return {
				name: platform.charAt(0).toUpperCase() + platform.slice(1),
				type: 'line' as const,
				smooth: true,
				itemStyle: {
					color: seriesColors[platform as keyof typeof seriesColors] || '#666'
				},
				areaStyle: { opacity: 0.3 },
				data
			};
		});

		return {
			title: {
				text: 'Daily Downloads by Platform',
				left: 'center',
				textStyle: { fontSize: 16 }
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top: '25%',
				containLabel: true
			},
			legend: {
				data: Object.keys(groupedData).map((p) => p.charAt(0).toUpperCase() + p.slice(1)),
				top: '10%',
				type: 'scroll' as const,
				orient: 'horizontal' as const,
				pageButtonItemGap: 5,
				pageButtonGap: 30,
				pageTextStyle: {
					color: '#666'
				}
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
			series
		};
	}

	function getNoDataOptions() {
		return {
			title: {
				text: 'No data available',
				left: 'center',
				textStyle: { fontSize: 16, color: '#666' }
			}
		};
	}
</script>

<div class="h-96 w-full">
	<Chart {init} {options} />
</div>
