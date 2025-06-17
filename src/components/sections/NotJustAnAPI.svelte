<script lang="ts">
	import { onMount } from 'svelte';
	import Copy from 'phosphor-svelte/lib/Copy';
	import Check from 'phosphor-svelte/lib/Check';

	let copied = false;
	let notJustSection: HTMLElement;

	const codeExample = `# loading X (Twitter) Profiles
from langchain_asimov import AsimovLoader

profiles = AsimovLoader(
    module="brightdata",
    url="https://x.com/LangChainAI"
)

for profile in profiles.lazy_load():
    print(profile)`;

	function copyCode() {
		navigator.clipboard.writeText(codeExample);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	}

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

		if (notJustSection) {
			observer.observe(notJustSection);
		}

		return () => {
			if (notJustSection) observer.unobserve(notJustSection);
		};
	});
</script>

<section
	id="not-just-api"
	class="relative border-t border-gray-200 bg-gray-50 py-32"
	bind:this={notJustSection}
>
	<div class="grid-overlay"></div>

	<div class="relative z-10 container mx-auto px-4">
		<div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
			<div>
				<div
					class="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1"
				>
					<div class="h-2 w-2 animate-pulse rounded-full bg-orange-500"></div>
					<span class="text-sm text-orange-600">Not just data access</span>
				</div>

				<h2 class="mb-6 text-5xl font-bold text-gray-900 md:text-6xl" data-animate="fade">
					Trusted knowledge<br />
					<span
						class="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"
					>
						at scale
					</span>
				</h2>

				<p class="mb-8 text-xl leading-relaxed text-gray-600" data-animate="fade">
					ASIMOV Platform provides powerful tools to interact with verified, trustworthy data from
					the ASIMOV Protocol ecosystem. Scrape, process, and integrate trusted knowledge into your
					applications with confidence.
				</p>

				<div class="mb-8 space-y-6" data-animate="slide-up">
					<div class="group flex items-start gap-4">
						<div
							class="pulse-scale mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-orange-200 bg-orange-50 transition-colors group-hover:bg-orange-100"
							style="animation-delay: 0s;"
						>
							<div class="h-2 w-2 rounded-full bg-orange-500"></div>
						</div>
						<div>
							<h3 class="mb-1 font-semibold text-gray-900">Verified Sources</h3>
							<p class="text-gray-600">Access only trusted, protocol-verified knowledge sources</p>
						</div>
					</div>
					<div class="group flex items-start gap-4">
						<div
							class="pulse-scale mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-orange-200 bg-orange-50 transition-colors group-hover:bg-orange-100"
							style="animation-delay: 0.5s;"
						>
							<div class="h-2 w-2 rounded-full bg-orange-500"></div>
						</div>
						<div>
							<h3 class="mb-1 font-semibold text-gray-900">Trust Scoring</h3>
							<p class="text-gray-600">
								Built-in trust metrics ensure data quality and reliability
							</p>
						</div>
					</div>
					<div class="group flex items-start gap-4">
						<div
							class="pulse-scale mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-orange-200 bg-orange-50 transition-colors group-hover:bg-orange-100"
							style="animation-delay: 1s;"
						>
							<div class="h-2 w-2 rounded-full bg-orange-500"></div>
						</div>
						<div>
							<h3 class="mb-1 font-semibold text-gray-900">Protocol Integration</h3>
							<p class="text-gray-600">Seamless integration with ASIMOV Protocol infrastructure</p>
						</div>
					</div>
				</div>

				<div
					class="inline-flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-100 px-4 py-3"
					data-animate="fade"
				>
					<span class="text-gray-500">$</span>
					<code class="font-mono text-orange-600">pip install -U langchain-asimov</code>
				</div>
			</div>

			<div class="relative" data-animate="slide-up">
				<div class="code-block shadow-elegant">
					<div class="code-header flex items-center justify-between px-6 py-4">
						<div class="flex gap-2">
							<div class="h-3 w-3 rounded-full bg-red-500"></div>
							<div class="h-3 w-3 rounded-full bg-yellow-500"></div>
							<div class="h-3 w-3 rounded-full bg-green-500"></div>
						</div>
						<button
							class="flex items-center gap-2 rounded border border-gray-200 bg-white px-3 py-1 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
							onclick={copyCode}
						>
							{#if copied}
								<Check size={16} />
								Copied!
							{:else}
								<Copy size={16} />
								Copy
							{/if}
						</button>
					</div>
					<div class="p-6">
						<pre class="overflow-x-auto text-sm text-gray-800"><code>{codeExample}</code></pre>
					</div>
				</div>

				<div
					class="absolute -top-4 -right-4 h-8 w-8 rounded border border-orange-200 bg-orange-50"
				></div>
				<div
					class="absolute -bottom-4 -left-4 h-6 w-6 rounded border border-blue-200 bg-blue-50"
				></div>
			</div>
		</div>
	</div>
</section>

<style>
	.pulse-scale {
		animation: pulseScale 2s ease-in-out infinite;
	}

	@keyframes pulseScale {
		0%,
		100% {
			transform: scale(0.8);
		}
		50% {
			transform: scale(1);
		}
	}
</style>
