<script lang="ts">
	import { onMount } from 'svelte';
	import Book from 'phosphor-svelte/lib/Book';
	import Code from 'phosphor-svelte/lib/Code';
	import Compass from 'phosphor-svelte/lib/Compass';
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight';

	let learnSection: HTMLElement;

	const sections = [
		{
			title: 'Learn',
			description: 'Master AI development with our comprehensive guides and tutorials',
			icon: Book,
			color: 'blue',
			items: ['Getting Started Guide', 'Best Practices', 'Advanced Tutorials', 'Video Courses']
		},
		{
			title: 'Code',
			description: 'Dive into practical examples and ready-to-use code snippets',
			icon: Code,
			color: 'green',
			items: ['Code Examples', 'Sample Projects', 'API References', 'SDK Documentation']
		},
		{
			title: 'Explore',
			description: "Discover what's possible with our platform and community projects",
			icon: Compass,
			color: 'purple',
			items: ['Use Cases', 'Community Projects', 'Success Stories', 'Innovation Hub']
		}
	];

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

		if (learnSection) {
			observer.observe(learnSection);
		}

		return () => {
			if (learnSection) observer.unobserve(learnSection);
		};
	});

	function getColorClasses(color: string) {
		const colors = {
			blue: 'bg-blue-100 text-blue-600 border-blue-200 hover:bg-blue-50',
			green: 'bg-green-100 text-green-600 border-green-200 hover:bg-green-50',
			purple: 'bg-purple-100 text-purple-600 border-purple-200 hover:bg-purple-50'
		};
		return colors[color as keyof typeof colors] || colors.blue;
	}
</script>

<section id="learn-code-explore" class="bg-white py-20" bind:this={learnSection}>
	<div class="container mx-auto px-4">
		<div class="mx-auto mb-16 max-w-3xl text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900 md:text-5xl" data-animate="fade">
				Learn. Code. Explore.
			</h2>
			<p class="text-xl text-gray-600" data-animate="fade">
				Everything you need to succeed with ASIMOV, from beginner tutorials to advanced use cases.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			{#each sections as section (section.title)}
				<div
					class="group rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg {getColorClasses(
						section.color
					)}"
					data-animate="slide-up"
				>
					<div
						class="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm"
					>
						<svelte:component this={section.icon} size={24} class="text-{section.color}-600" />
					</div>

					<h3 class="mb-3 text-2xl font-bold text-gray-900">{section.title}</h3>
					<p class="mb-6 text-gray-600">{section.description}</p>

					<ul class="mb-6 space-y-2">
						{#each section.items as item (item)}
							<li class="flex items-center gap-2 text-gray-700">
								<div class="h-1.5 w-1.5 rounded-full bg-{section.color}-600"></div>
								{item}
							</li>
						{/each}
					</ul>

					<a
						href="#top"
						class="inline-flex items-center gap-2 font-medium text-{section.color}-600 transition-colors hover:text-{section.color}-700"
					>
						Get started
						<ArrowRight size={16} />
					</a>
				</div>
			{/each}
		</div>
	</div>
</section>
