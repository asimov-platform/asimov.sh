<script lang="ts">
	import { onMount } from 'svelte';
	import Book from 'phosphor-svelte/lib/Book';
	import Code from 'phosphor-svelte/lib/Code';
	import Compass from 'phosphor-svelte/lib/Compass';
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
	import Terminal from 'phosphor-svelte/lib/Terminal';
	import Download from 'phosphor-svelte/lib/Download';
	import Rocket from 'phosphor-svelte/lib/Rocket';

	let learnSection: HTMLElement;

	const sections = [
		{
			title: 'Learn',
			description: 'Get started with ASIMOV CLI and understand the module ecosystem',
			icon: Book,
			color: 'blue',
			codeExample: `# Install ASIMOV CLI
cargo install asimov-module-cli

# Initialize your first project
asimov init my-project
cd my-project`,
			items: [
				'Install ASIMOV CLI with Cargo',
				'Initialize new projects',
				'Understand module architecture',
				'Read module documentation'
			],
			link: 'https://github.com/asimov-platform/asimov-module-cli'
		},
		{
			title: 'Code',
			description: 'Install and integrate modules into your applications seamlessly',
			icon: Code,
			color: 'green',
			codeExample: `# Install modules
asimov install brightdata
asimov install langchain-asimov

# Use in your code
from asimov_modules import brightdata
data = brightdata.scrape("https://example.com")`,
			items: [
				'Browse available modules',
				'Install with simple commands',
				'Integrate with existing code',
				'Access trusted data sources'
			],
			link: 'https://github.com/asimov-modules'
		},
		{
			title: 'Explore',
			description: 'Discover what you can build with verified knowledge and AI integration',
			icon: Compass,
			color: 'purple',
			codeExample: `# Real-world applications
- Web scraping with trust scores
- AI training on verified data
- Knowledge graph construction
- Automated fact-checking`,
			items: [
				'Web scraping with verification',
				'AI model training pipelines',
				'Knowledge extraction systems',
				'Automated research tools'
			],
			link: 'https://github.com/asimov-platform'
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
			blue: 'border-blue-200 hover:border-blue-300',
			green: 'border-green-200 hover:border-green-300',
			purple: 'border-purple-200 hover:border-purple-300'
		};
		return colors[color as keyof typeof colors] || colors.blue;
	}

	function getIconBgColor(color: string) {
		const colors = {
			blue: 'bg-blue-100 text-blue-600',
			green: 'bg-green-100 text-green-600',
			purple: 'bg-purple-100 text-purple-600'
		};
		return colors[color as keyof typeof colors] || colors.blue;
	}

	function getBulletColor(color: string) {
		const colors = {
			blue: 'bg-blue-600',
			green: 'bg-green-600',
			purple: 'bg-purple-600'
		};
		return colors[color as keyof typeof colors] || colors.blue;
	}

	function getLinkColor(color: string) {
		const colors = {
			blue: 'text-blue-600 hover:text-blue-700',
			green: 'text-green-600 hover:text-green-700',
			purple: 'text-purple-600 hover:text-purple-700'
		};
		return colors[color as keyof typeof colors] || colors.blue;
	}
</script>

<section id="learn-code-explore" class="relative bg-gray-50 py-20" bind:this={learnSection}>
	<div class="grid-overlay"></div>

	<div class="relative z-10 container mx-auto px-4">
		<div class="mx-auto mb-16 max-w-3xl text-center">
			<div
				class="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1"
			>
				<Terminal size={16} class="text-orange-600" />
				<span class="text-sm text-orange-600">Developer Experience</span>
			</div>

			<h2 class="mb-4 text-4xl font-bold text-gray-900 md:text-5xl" data-animate="fade">
				Learn. Code. Explore.
			</h2>
			<p class="text-xl text-gray-600" data-animate="fade">
				Everything you need to build with trusted knowledge, from CLI installation to production
				applications.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
			{#each sections as section, index (section.title)}
				<div
					class="group rounded-xl border bg-white p-8 shadow-sm transition-all hover:shadow-lg {getColorClasses(
						section.color
					)}"
					data-animate="slide-up"
					style="animation-delay: {index * 0.1}s;"
				>
					<div
						class="mb-6 flex h-12 w-12 items-center justify-center rounded-lg {getIconBgColor(
							section.color
						)}"
					>
						<svelte:component this={section.icon} size={24} />
					</div>

					<h3 class="mb-3 text-2xl font-bold text-gray-900">{section.title}</h3>
					<p class="mb-6 text-gray-600">{section.description}</p>

					<!-- Code Example -->
					<div class="mb-6 rounded-lg bg-gray-900 p-4">
						<pre class="overflow-x-auto text-sm text-gray-300"><code>{section.codeExample}</code
							></pre>
					</div>

					<!-- Feature List -->
					<ul class="mb-6 space-y-3">
						{#each section.items as item (item)}
							<li class="flex items-start gap-3 text-gray-700">
								<div class="mt-2 h-1.5 w-1.5 rounded-full {getBulletColor(section.color)}"></div>
								<span class="leading-relaxed">{item}</span>
							</li>
						{/each}
					</ul>

					<a
						href={section.link}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 font-medium transition-colors {getLinkColor(
							section.color
						)} group-hover:gap-3"
					>
						{#if section.title === 'Learn'}
							<Download size={16} />
							Install CLI
						{:else if section.title === 'Code'}
							<Code size={16} />
							Browse Modules
						{:else}
							<Rocket size={16} />
							View Platform
						{/if}
						<ArrowRight size={16} class="transition-transform group-hover:translate-x-1" />
					</a>
				</div>
			{/each}
		</div>

		<!-- Quick Start CTA -->
		<div class="mt-16 text-center" data-animate="fade">
			<div class="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
				<h3 class="mb-4 text-2xl font-bold text-gray-900">Ready to get started?</h3>
				<p class="mb-6 text-gray-600">
					Install the ASIMOV CLI and start building with trusted knowledge in minutes.
				</p>
				<div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
					<a
						href="https://github.com/asimov-platform/asimov-module-cli"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-700"
					>
						<Download size={16} />
						Install ASIMOV CLI
					</a>
					<a
						href="https://github.com/asimov-modules"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
					>
						<Code size={16} />
						Browse Modules
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
