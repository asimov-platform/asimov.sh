<script lang="ts">
	import { onMount } from 'svelte';
	import ShieldCheck from 'phosphor-svelte/lib/ShieldCheck';
	import Database from 'phosphor-svelte/lib/Database';
	import Users from 'phosphor-svelte/lib/Users';
	import Lightning from 'phosphor-svelte/lib/Lightning';
	import Cpu from 'phosphor-svelte/lib/Cpu';
	import Heart from 'phosphor-svelte/lib/Heart';
	import { protocolUrl } from '../../lib/config';

	let whySection: HTMLElement;

	const reasons = [
		{
			icon: ShieldCheck,
			title: 'Verified Knowledge',
			description:
				'Access only protocol-verified, trustworthy data sources with built-in provenance tracking.'
		},
		{
			icon: Database,
			title: 'Trust Scoring',
			description:
				'Advanced trust metrics ensure data quality and reliability across all knowledge sources.'
		},
		{
			icon: Users,
			title: 'Developer First',
			description:
				'Intuitive APIs designed for seamless integration with existing workflows and tools.'
		},
		{
			icon: Lightning,
			title: 'Real-time Access',
			description:
				'Lightning-fast access to trusted knowledge with real-time updates and synchronization.'
		},
		{
			icon: Cpu,
			title: 'Protocol Native',
			description: 'Built specifically for ASIMOV Protocol with deep integration and optimization.'
		},
		{
			icon: Heart,
			title: 'Open Source',
			description:
				'Community-driven development with full transparency and extensibility at its core.'
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

		if (whySection) {
			observer.observe(whySection);
		}

		return () => {
			if (whySection) observer.unobserve(whySection);
		};
	});
</script>

<section id="why-asimov" class="bg-gray-900 py-20" bind:this={whySection}>
	<div class="container mx-auto px-4">
		<div class="mx-auto mb-16 max-w-3xl text-center">
			<h2 class="mb-4 text-4xl font-bold text-white md:text-5xl" data-animate="fade">
				Why Choose ASIMOV Platform?
			</h2>
			<p class="text-xl text-gray-300" data-animate="fade">
				Built for developers who need reliable access to trusted knowledge. We provide the tools to
				interact with verified data from the ASIMOV Protocol ecosystem.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each reasons as reason (reason.title)}
				<div
					class="group hover:bg-gray-750 rounded-lg border border-gray-800 bg-gray-800 p-6 transition-all hover:border-orange-600"
					data-animate="slide-up"
				>
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-600/10 text-orange-600"
					>
						<svelte:component this={reason.icon} size={24} />
					</div>
					<h3 class="mb-3 text-xl font-semibold text-white">{reason.title}</h3>
					<p class="text-gray-300">{reason.description}</p>
				</div>
			{/each}
		</div>

		<div class="mt-16 text-center" data-animate="fade">
			<p class="mb-6 text-xl text-gray-300">
				Join developers building applications with trusted knowledge
			</p>
			<div class="flex flex-col justify-center gap-4 sm:flex-row">
				<a
					href="#learn-code-explore"
					class="rounded-lg bg-orange-600 px-8 py-3 font-medium text-white transition-colors hover:bg-orange-700"
				>
					Start building with trusted data
				</a>
				<a
					href={protocolUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-lg border border-gray-600 px-8 py-3 font-medium text-gray-300 transition-colors hover:bg-gray-800"
				>
					Explore the protocol
				</a>
			</div>
		</div>
	</div>
</section>
