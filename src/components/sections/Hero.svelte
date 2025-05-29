<script lang="ts">
	import Button from '../common/Button.svelte';
	import { Play, Cpu } from 'phosphor-svelte';
	import { onMount } from 'svelte';

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
	class="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28"
	bind:this={heroSection}
>
	<div class="absolute inset-0 bg-slate-950"></div>

	<div class="stars-bg"></div>
	<div class="stars-twinkle"></div>

	<div
		class="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-slate-950 to-slate-900"
	></div>

	<div class="absolute top-1/2 left-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 transform">
		<div
			class="h-[var(--circleSize)] w-[var(--circleSize)] rounded-full bg-indigo-600 opacity-10 blur-3xl"
		></div>
	</div>

	<div class="relative z-10 container mx-auto px-4">
		<div class="mx-auto max-w-4xl text-center">
			<div
				class="mb-6 inline-block rounded-full bg-indigo-600 px-3 py-1 text-sm font-medium text-white {isInView
					? 'animate-fade-in'
					: 'opacity-0'}"
				style="animation-delay: 0.2s"
			>
				Introducing ASIMOV Platform
			</div>

			<h1
				class="mb-6 text-4xl leading-tight font-bold text-slate-50 md:text-5xl lg:text-6xl {isInView
					? 'animate-fade-in'
					: ''}"
				style="animation-delay: 0.4s"
			>
				The Next Generation <span class="text-indigo-600">AI Infrastructure</span> Platform
			</h1>

			<p
				class="mx-auto mb-8 max-w-2xl text-lg text-slate-300 md:text-xl {isInView
					? 'animate-fade-in'
					: ''}"
				style="animation-delay: 0.6s"
			>
				Build, deploy, and scale AI applications with unprecedented speed and flexibility. ASIMOV
				provides the infrastructure for tomorrow's AI innovations.
			</p>

			<div
				class="flex flex-col justify-center gap-4 sm:flex-row {isInView ? 'animate-fade-in' : ''}"
				style="animation-delay: 0.8s"
			>
				<Button size="lg">Get Started Free</Button>
				<Button variant="outline" size="lg">
					<Play size={20} weight="fill" class="mr-2" />
					Watch Demo
				</Button>
			</div>

			<div class="relative mt-10 {isInView ? 'animate-slide-up' : ''}" style="animation-delay: 1s">
				<div
					class="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-xl"
				>
					<div class="absolute inset-0 -m-4 bg-indigo-600 opacity-5 blur-xl"></div>

					<div class="relative p-1">
						<div class="flex h-[400px] w-full items-center justify-center rounded-lg bg-slate-900">
							<div class="text-center">
								<div
									class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
								>
									<Cpu size={32} weight="fill" class="text-white" />
								</div>
								<p class="text-slate-300">ASIMOV Platform Interface</p>
							</div>
						</div>
					</div>
				</div>

				<div
					class="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-purple-600 opacity-20 blur-xl"
				></div>
				<div
					class="absolute -bottom-6 -left-6 h-16 w-16 rounded-full bg-indigo-600 opacity-20 blur-xl"
				></div>
			</div>
		</div>
	</div>
</section>
