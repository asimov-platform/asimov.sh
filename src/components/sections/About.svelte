<script lang="ts">
	import Button from '../common/Button.svelte';
	import Users from 'phosphor-svelte/lib/Users';
	import RocketLaunch from 'phosphor-svelte/lib/RocketLaunch';
	import Gauge from 'phosphor-svelte/lib/Gauge';
	import Headset from 'phosphor-svelte/lib/Headset';
	import { onMount } from 'svelte';

	const stats = [
		{ value: '200+', label: 'Enterprise Customers', icon: Users },
		{ value: '1M+', label: 'AI Models Deployed', icon: RocketLaunch },
		{ value: '99.9%', label: 'System Uptime', icon: Gauge },
		{ value: '24/7', label: 'Expert Support', icon: Headset }
	];

	let aboutSection: HTMLElement | null = null;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const elements = entry.target.querySelectorAll('[data-animate]');
						elements.forEach((el, i) => {
							setTimeout(() => {
								el.classList.add('in-view');
							}, 150 * i);
						});
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 }
		);

		if (aboutSection) {
			observer.observe(aboutSection);
		}

		return () => {
			if (aboutSection) observer.unobserve(aboutSection);
		};
	});
</script>

<section id="about" class="relative bg-slate-950 py-20" bind:this={aboutSection}>
	<div class="stars-bg opacity-5"></div>

	<div class="relative container mx-auto px-4">
		<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
			<div class="relative" data-animate="fade">
				<div
					class="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-4 opacity-20 md:p-6"
				>
					<div class="overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-xl">
						<div class="flex aspect-video items-center justify-center bg-slate-900">
							<div class="group grid w-full max-w-md grid-cols-3 gap-4 p-8">
								<div
									class="relative aspect-square overflow-hidden rounded-lg border border-indigo-400/50 bg-indigo-600/40 shadow-md transition-all duration-300 hover:scale-105 hover:bg-indigo-500/60 hover:shadow-indigo-500/30"
								>
									<div
										class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]"
									></div>
								</div>

								<div
									class="animate-pulse-slow relative aspect-square overflow-hidden rounded-lg border border-indigo-400/50 bg-indigo-600/50 shadow-md transition-all duration-300 hover:scale-105 hover:bg-indigo-500/70 hover:shadow-indigo-500/30"
								>
									<div
										class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]"
									></div>
								</div>

								<div
									class="relative aspect-square overflow-hidden rounded-lg border border-indigo-400/50 bg-indigo-600/60 shadow-md transition-all duration-300 hover:scale-105 hover:bg-indigo-500/80 hover:shadow-indigo-500/30"
								>
									<div
										class="absolute -right-4 -bottom-4 h-8 w-8 rounded-full bg-indigo-400/40 blur-sm"
									></div>
								</div>

								<div
									class="relative aspect-square overflow-hidden rounded-lg border border-purple-400/50 bg-purple-600/40 shadow-md transition-all duration-300 hover:scale-105 hover:bg-purple-500/60 hover:shadow-purple-500/30"
								>
									<div
										class="absolute -top-2 -left-2 h-6 w-6 rounded-full bg-purple-400/40 blur-sm"
									></div>
								</div>

								<div
									class="animate-float relative aspect-square overflow-hidden rounded-lg border border-purple-400/50 bg-purple-600/50 shadow-md transition-all duration-300 hover:scale-105 hover:bg-purple-500/70 hover:shadow-purple-500/30"
								>
									<div
										class="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(255,255,255,0.2)_60%,transparent_80%)]"
									></div>
								</div>

								<div
									class="relative aspect-square overflow-hidden rounded-lg border border-purple-400/50 bg-purple-600/60 shadow-md transition-all duration-300 hover:scale-105 hover:bg-purple-500/80 hover:shadow-purple-500/30"
								>
									<div
										class="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.2),transparent_50%)]"
									></div>
								</div>

								<div
									class="relative aspect-square overflow-hidden rounded-lg border border-indigo-400/60 bg-indigo-600/70 shadow-md transition-all duration-300 hover:scale-105 hover:bg-indigo-500/90 hover:shadow-indigo-500/30"
								>
									<div
										class="animate-shimmer h-full w-full bg-[linear-gradient(45deg,transparent,rgba(255,255,255,0.1)_40%,transparent_60%)]"
									></div>
								</div>

								<div
									class="relative aspect-square overflow-hidden rounded-lg border border-purple-400/60 bg-purple-600/70 shadow-md transition-all duration-300 hover:scale-105 hover:bg-purple-500/90 hover:shadow-purple-500/30"
								>
									<div
										class="animate-shimmer-delayed h-full w-full bg-[linear-gradient(45deg,transparent,rgba(255,255,255,0.1)_40%,transparent_60%)]"
									></div>
								</div>

								<div
									class="animate-pulse-slow relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/50"
								>
									<div
										class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.3),transparent_70%)]"
									></div>

									<div
										class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiPjwvcmVjdD4KPC9zdmc+')] opacity-10"
									></div>

									<div
										class="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/10 opacity-75 transition-opacity duration-500 group-hover:opacity-100"
									></div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div
					class="absolute -top-6 -left-6 h-12 w-12 rounded-full bg-purple-600 opacity-30 blur-xl"
				></div>
				<div
					class="absolute -right-6 -bottom-6 h-20 w-20 rounded-full bg-indigo-600 opacity-25 blur-xl"
				></div>

				<div
					class="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600 opacity-5 blur-3xl"
				></div>
			</div>

			<div>
				<div
					class="mb-6 inline-block rounded-full bg-indigo-600 px-3 py-1 text-sm font-medium text-white"
					data-animate="fade"
				>
					About ASIMOV
				</div>
				<h2 class="mb-6 text-3xl font-bold text-slate-50 md:text-4xl" data-animate="fade">
					Revolutionizing AI Infrastructure for the Future
				</h2>
				<p class="mb-6 text-slate-300" data-animate="fade">
					ASIMOV Platform is built on the foundation of cutting-edge research and development in
					artificial intelligence. Our mission is to make advanced AI technology accessible,
					scalable, and easy to implement for organizations of all sizes.
				</p>
				<p class="mb-8 text-slate-300" data-animate="fade">
					Named after science fiction writer Isaac Asimov, our platform embodies the visionary
					spirit of exploring new technological frontiers while maintaining a strong ethical
					foundation. We're committed to responsible AI development that benefits humanity.
				</p>

				<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
					{#each stats as stat (stat.label)}
						<div class="flex items-center" data-animate="slide-up">
							<div class="mr-3 h-8 w-8 text-indigo-600">
								<svelte:component this={stat.icon} size={32} weight="duotone" />
							</div>
							<div>
								<div class="mb-1 text-2xl font-bold text-indigo-600">{stat.value}</div>
								<div class="text-slate-300">{stat.label}</div>
							</div>
						</div>
					{/each}
				</div>

				<div data-animate="fade">
					<Button>Learn More</Button>
				</div>
			</div>
		</div>
	</div>
</section>
