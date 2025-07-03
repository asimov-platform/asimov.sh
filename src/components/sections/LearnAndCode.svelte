<script lang="ts">
	import { onMount } from 'svelte';
	import Book from 'phosphor-svelte/lib/Book';
	import Code from 'phosphor-svelte/lib/Code';
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
	import Terminal from 'phosphor-svelte/lib/Terminal';
	import Download from 'phosphor-svelte/lib/Download';

	let learnSection: HTMLElement;

	const sections = [
		{
			title: 'Learn',
			description: 'Get started with ASIMOV CLI and understand the module ecosystem',
			icon: Book,
			codeExample: `$ cargo install asimov-module-cli
$ asimov init my-project
$ cd my-project
$ asimov module list`,
			features: [
				'Install CLI with Cargo',
				'Initialize projects quickly',
				'Browse available modules',
				'Comprehensive documentation'
			],
			link: 'https://github.com/asimov-platform/asimov-cli',
			linkText: 'Get Started'
		},
		{
			title: 'Code',
			description: 'Install and integrate modules into your applications seamlessly',
			icon: Code,
			codeExample: `$ asimov module install brightdata
$ asimov module install langchain-asimov

from asimov_modules import brightdata
data = brightdata.scrape("https://example.com")`,
			features: [
				'50+ verified modules',
				'Simple installation',
				'Easy integration',
				'Built-in trust verification'
			],
			link: 'https://github.com/asimov-modules',
			linkText: 'Browse Modules'
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
							}, 100 * i);
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
</script>

<section id="learn-code" class="relative bg-white py-24" bind:this={learnSection}>
	<div class="container mx-auto px-4">
		<div class="mx-auto mb-20 max-w-3xl text-center">
			<div
				class="mb-6 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600"
			>
				<Terminal size={14} />
				Developer Experience
			</div>
			<h2
				class="mb-6 text-5xl font-bold tracking-tight text-gray-900 md:text-6xl"
				data-animate="fade"
			>
				Learn & Code
			</h2>
			<p class="text-xl leading-relaxed text-gray-600" data-animate="fade">
				From CLI installation to production applications.<br />
				Everything you need to build with trusted knowledge.
			</p>
		</div>

		<div class="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
			{#each sections as section, index (section.title)}
				<div class="space-y-8" data-animate="slide-up" style="animation-delay: {index * 0.1}s;">
					<div class="space-y-4">
						<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
							<svelte:component this={section.icon} size={24} class="text-gray-700" />
						</div>
						<div>
							<h3 class="mb-3 text-3xl font-bold text-gray-900">{section.title}</h3>
							<p class="text-lg leading-relaxed text-gray-600">{section.description}</p>
						</div>
					</div>

					<div class="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
						<div class="border-b border-gray-200 bg-white px-6 py-4">
							<div class="flex items-center gap-2">
								<div class="h-3 w-3 rounded-full bg-red-400"></div>
								<div class="h-3 w-3 rounded-full bg-yellow-400"></div>
								<div class="h-3 w-3 rounded-full bg-green-400"></div>
								<span class="ml-2 font-mono text-sm text-gray-500">Terminal</span>
							</div>
						</div>
						<div class="p-6">
							<pre class="overflow-x-auto font-mono text-sm leading-relaxed text-gray-800"><code
									>{section.codeExample}</code
								></pre>
						</div>
					</div>

					<div class="space-y-3">
						{#each section.features as feature (feature)}
							<div class="flex items-center gap-3">
								<div class="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
								<span class="text-gray-600">{feature}</span>
							</div>
						{/each}
					</div>

					<div>
						<a
							href={section.link}
							target="_blank"
							rel="noopener noreferrer"
							class="group inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 font-medium text-gray-900 transition-all hover:border-gray-300 hover:bg-gray-50"
						>
							{section.linkText}
							<ArrowRight size={16} class="transition-transform group-hover:translate-x-0.5" />
						</a>
					</div>
				</div>
			{/each}
		</div>

		<div class="mx-auto mt-24 max-w-4xl text-center" data-animate="fade">
			<div class="rounded-2xl border border-gray-200 bg-gray-50 p-12">
				<h3 class="mb-4 text-3xl font-bold text-gray-900">Ready to get started?</h3>
				<p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
					Join developers building the future with verified knowledge and AI-powered modules.
				</p>
				<div class="flex flex-col justify-center gap-4 sm:flex-row">
					<a
						href="https://github.com/asimov-platform/asimov-cli"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
					>
						<Download size={18} />
						Install CLI
					</a>
					<a
						href="https://github.com/asimov-modules"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 font-medium text-gray-900 transition-colors hover:border-gray-300 hover:bg-gray-50"
					>
						<Code size={18} />
						View Modules
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
