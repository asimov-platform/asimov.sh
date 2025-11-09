<script lang="ts" generics="T extends PlatformRepository">
	import Package from 'phosphor-svelte/lib/Package';
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
	import Star from 'phosphor-svelte/lib/Star';
	import { formatStars, getLanguageColor } from '../../lib/utils';
	import type { PlatformRepository } from '../../lib/types';

	interface Props {
		module: T;
		index?: number;
	}

	let { module, index = 0 }: Props = $props();
</script>

<a
	href={module.url}
	target="_blank"
	rel="noopener noreferrer"
	class="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-orange-200 hover:shadow-lg"
	data-animate="slide-up"
	style="animation-delay: {index * 0.1}s;"
>
	<div class="mb-4 flex items-start justify-between">
		<div class="flex items-center gap-3">
			<div class="rounded-lg bg-orange-100 p-2 transition-colors group-hover:bg-orange-200">
				<Package size={24} class="text-orange-600" />
			</div>
			<div>
				<h3 class="font-semibold text-gray-900 transition-colors group-hover:text-orange-600">
					{module.name}
				</h3>
				<span class="rounded-full px-2 py-1 text-sm {getLanguageColor(module.language)}">
					{module.language}
				</span>
			</div>
		</div>
		<div class="flex items-center gap-1 text-gray-500">
			<Star size={16} />
			<span class="text-sm font-medium">{formatStars(module.stars)}</span>
		</div>
	</div>

	<p class="mb-4 leading-relaxed text-gray-600">{module.description}</p>

	{#if module.topics.length > 0}
		<div class="mb-4 flex flex-wrap gap-2">
			{#each module.topics.slice(0, 3) as topic (topic)}
				<span class="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
					{topic}
				</span>
			{/each}
		</div>
	{/if}

	<span
		class="inline-flex items-center gap-2 font-medium text-orange-600 transition-colors group-hover:gap-3 hover:text-orange-700"
	>
		View on GitHub
		<ArrowRight size={16} class="transition-transform group-hover:translate-x-1" />
	</span>
</a>
