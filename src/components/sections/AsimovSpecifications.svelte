<script lang="ts">
	import { onMount } from 'svelte';
	import ExternalLink from 'phosphor-svelte/lib/ArrowSquareOut';
	import FileText from 'phosphor-svelte/lib/FileText';
	import specImage from '../../assets/modules-specs.png';
	import { modulesSpecsUrl, modulesSpecsGithubUrl } from '../../lib/config';

	let specificationsSection: HTMLElement;

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

		if (specificationsSection) {
			observer.observe(specificationsSection);
		}

		return () => {
			if (specificationsSection) observer.unobserve(specificationsSection);
		};
	});
</script>

<section
	id="specifications"
	class="relative border-t border-gray-200 bg-white py-32"
	bind:this={specificationsSection}
>
	<div class="grid-overlay"></div>

	<div class="relative z-10 container mx-auto px-4">
		<div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
			<div class="relative" data-animate="slide-up">
				<div class="shadow-elegant overflow-hidden rounded-lg border border-gray-200 bg-white">
					<img src={specImage} alt="ASIMOV Module Manifest Specification" class="h-auto w-full" />
				</div>

				<div
					class="absolute -top-4 -left-4 h-8 w-8 rounded border border-blue-200 bg-blue-50"
				></div>
				<div
					class="absolute -right-4 -bottom-4 h-6 w-6 rounded border border-purple-200 bg-purple-50"
				></div>
			</div>

			<div>
				<div
					class="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1"
				>
					<FileText size={16} class="text-orange-600" />
					<span class="text-sm text-orange-600">Living Standard</span>
				</div>

				<h2 class="mb-6 text-5xl font-bold text-gray-900 md:text-6xl" data-animate="fade">
					Open specifications<br />
					<span
						class="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"
					>
						for trust
					</span>
				</h2>

				<p class="mb-8 text-xl leading-relaxed text-gray-600" data-animate="fade">
					The ASIMOV Module Manifest Specification defines how modules declare their capabilities,
					dependencies, and trust requirements.
				</p>

				<div class="flex flex-col gap-4 sm:flex-row" data-animate="fade">
					<a
						href={modulesSpecsUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
					>
						<ExternalLink size={16} />
						View full specification
					</a>
					<a
						href={modulesSpecsGithubUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-100"
					>
						Contribute on GitHub
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
