<script lang="ts">
	import { onMount } from 'svelte';
	import Package from 'phosphor-svelte/lib/Package';
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
	import ModuleCard from '../common/ModuleCard.svelte';
	import ModuleCardSkeleton from '../common/ModuleCardSkeleton.svelte';
	import { fetchTopModules, type Module } from '../../lib/github';
	import { modulesUrl } from '../../lib/config';

	let actorsSection: HTMLElement;
	let modules: Module[] = [];
	let loading = true;

	const skeletonItems = [0, 1, 2];

	onMount(() => {
		(async () => {
			modules = await fetchTopModules();
			loading = false;
		})();

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

		if (actorsSection) {
			observer.observe(actorsSection);
		}

		return () => {
			if (actorsSection) observer.unobserve(actorsSection);
		};
	});
</script>

<section
	id="modules"
	class="relative border-t border-gray-200 bg-white py-20"
	bind:this={actorsSection}
>
	<div class="grid-overlay"></div>

	<div class="relative z-10 container mx-auto px-4">
		<div class="mx-auto mb-16 max-w-3xl text-center">
			<div
				class="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1"
			>
				<Package size={16} class="text-orange-600" />
				<span class="text-sm text-orange-600">Open Source Modules</span>
			</div>

			<h2 class="mb-4 text-4xl font-bold text-gray-900 md:text-5xl" data-animate="fade">
				ASIMOV Modules
			</h2>
			<p class="text-xl text-gray-600" data-animate="fade">
				Discover our growing ecosystem of trusted knowledge tools and libraries. Each module is
				designed to solve specific challenges in data processing and AI development.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#if loading}
				{#each skeletonItems as item (item)}
					<ModuleCardSkeleton />
				{/each}
			{:else}
				{#each modules as module, i (module.name)}
					<ModuleCard {module} index={i} />
				{/each}
			{/if}
		</div>

		<div class="mt-12 text-center" data-animate="fade">
			<p class="mb-4 text-gray-600">Modules automatically fetched from our GitHub organization</p>
			<a
				href={modulesUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-white transition-colors hover:bg-gray-800"
			>
				View all modules on GitHub
				<ArrowRight size={16} />
			</a>
		</div>
	</div>
</section>
