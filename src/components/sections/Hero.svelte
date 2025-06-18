<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '../common/Button.svelte';
	import { protocolUrl } from '../../lib/config';

	let heroSection: HTMLElement;
	let isInView = false;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isInView = true;
					}
				});
			},
			{ threshold: 0.1 }
		);

		if (heroSection) {
			observer.observe(heroSection);
		}

		return () => {
			if (heroSection) observer.unobserve(heroSection);
		};
	});
</script>

<section
	id="hero"
	class="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-orange-50"
	bind:this={heroSection}
>
	<div class="grid-overlay absolute inset-0"></div>

	<div class="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl"></div>
	<div class="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl"></div>

	<div class="relative z-10 container mx-auto px-4 pt-20">
		<div class="mx-auto max-w-6xl text-center">
			<div
				class="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-1 shadow-sm backdrop-blur-sm {isInView
					? 'animate-fade-in'
					: ''}"
				style="animation-delay: 0.1s"
			>
				<div class="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
				<span class="text-sm text-gray-600">Platform • Now Available</span>
			</div>

			<h1
				class="mb-8 text-6xl font-bold md:text-8xl lg:text-9xl {isInView ? 'animate-fade-in' : ''}"
				style="animation-delay: 0.2s"
			>
				<span class="text-gray-900">Trusted</span><br />
				<span class="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
					Knowledge
				</span>
			</h1>

			<p
				class="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-gray-600 md:text-2xl {isInView
					? 'animate-fade-in'
					: ''}"
				style="animation-delay: 0.4s"
			>
				Build applications with verified, trustworthy data. Our platform provides powerful tools to
				interact with, scrape, and process knowledge from the ASIMOV Protocol ecosystem.
			</p>

			<div
				class="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row {isInView
					? 'animate-fade-in'
					: ''}"
				style="animation-delay: 0.6s"
			>
				<Button size="lg" class="glow-orange" href="#learn-code-explore">Start Building</Button>
				<Button
					variant="outline"
					size="lg"
					href={protocolUrl}
					target="_blank"
					rel="noopener noreferrer"
				>
					Explore Protocol
				</Button>
			</div>

			<div
				class="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3 {isInView
					? 'animate-fade-in'
					: ''}"
				style="animation-delay: 0.8s"
			>
				<div class="border-l-2 border-orange-500 pl-6">
					<div class="mb-2 text-3xl font-bold text-gray-900">99.9%</div>
					<div class="text-gray-600">Uptime SLA</div>
				</div>
				<div class="border-l-2 border-orange-500 pl-6">
					<div class="mb-2 text-3xl font-bold text-gray-900">1M+</div>
					<div class="text-gray-600">Verified Sources</div>
				</div>
				<div class="border-l-2 border-orange-500 pl-6">
					<div class="mb-2 text-3xl font-bold text-gray-900">24/7</div>
					<div class="text-gray-600">Global Access</div>
				</div>
			</div>
		</div>
	</div>

	<div
		class="absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t from-white to-transparent"
	></div>
</section>
