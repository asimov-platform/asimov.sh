<script lang="ts">
	import Lightning from 'phosphor-svelte/lib/Lightning';
	import Robot from 'phosphor-svelte/lib/Robot';
	import Shield from 'phosphor-svelte/lib/Shield';
	import Database from 'phosphor-svelte/lib/Database';
	import ChartLine from 'phosphor-svelte/lib/ChartLine';
	import Code from 'phosphor-svelte/lib/Code';
	import { onMount } from 'svelte';

	const features = [
		{
			title: 'Seamless Integration',
			description: 'Connect with your existing tools and workflows without disruption.',
			icon: Lightning
		},
		{
			title: 'Intelligent Automation',
			description: 'Automate repetitive tasks and complex workflows with AI-powered tools.',
			icon: Robot
		},
		{
			title: 'Enterprise-Grade Security',
			description: 'Built with security and compliance at its core for peace of mind.',
			icon: Shield
		},
		{
			title: 'Scalable Infrastructure',
			description: 'Grow from prototype to production with infrastructure that scales with you.',
			icon: Database
		},
		{
			title: 'Real-time Analytics',
			description: 'Gain insights with comprehensive analytics and monitoring tools.',
			icon: ChartLine
		},
		{
			title: 'Developer-First Experience',
			description: 'Designed with developers in mind for an intuitive and productive experience.',
			icon: Code
		}
	];

	let featuresSection: HTMLElement | null = null;

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

		if (featuresSection) {
			observer.observe(featuresSection);
		}

		return () => {
			if (featuresSection) observer.unobserve(featuresSection);
		};
	});
</script>

<section id="features" class="relative bg-slate-900 py-20" bind:this={featuresSection}>
	<div class="stars-bg opacity-20"></div>
	<div class="stars-twinkle"></div>

	<div class="relative z-10 container mx-auto px-4">
		<div class="mx-auto mb-16 max-w-3xl text-center">
			<h2 class="mb-4 text-3xl font-bold text-slate-50 md:text-4xl" data-animate="fade">
				Powerful Features for AI Development
			</h2>
			<p class="text-lg text-slate-300" data-animate="fade">
				ASIMOV provides everything you need to build, deploy, and scale your AI applications.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each features as feature (feature.title)}
				<div
					class="group rounded-xl border border-slate-800 bg-slate-950 p-6 shadow-lg transition-all duration-300 hover:border-indigo-600 hover:shadow-xl"
					data-animate="slide-up"
				>
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-600 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white"
					>
						<svelte:component this={feature.icon} size={32} />
					</div>
					<h3 class="mb-2 text-xl font-semibold text-slate-50">{feature.title}</h3>
					<p class="text-slate-300">{feature.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
