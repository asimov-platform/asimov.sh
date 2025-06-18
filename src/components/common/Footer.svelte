<script>
	import XLogo from 'phosphor-svelte/lib/XLogo';
	import GithubLogo from 'phosphor-svelte/lib/GithubLogo';
	import Logo from './Logo.svelte';
	import { twitterUrl, githubUrl, footerLinks } from '../../lib/config';

	const year = new Date().getFullYear();
	const socialLinks = [
		{
			name: 'X (Twitter)',
			href: twitterUrl,
			icon: XLogo
		},
		{
			name: 'GitHub',
			href: githubUrl,
			icon: GithubLogo
		}
	];
</script>

<footer class="border-t border-gray-200 bg-white">
	<div class="container mx-auto px-4 py-12">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
			<div class="lg:col-span-2">
				<a href="#hero" class="mb-4 flex items-center gap-2">
					<Logo class="w-50 text-gray-900" />
				</a>
				<p class="mb-6 max-w-md leading-relaxed text-gray-600">
					Trusted knowledge infrastructure for AI applications. Build with verified data sources and
					powerful module ecosystem.
				</p>
				<div class="flex space-x-4">
					{#each socialLinks as link (link.name)}
						<a
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							class="text-gray-400 transition-colors hover:text-orange-600"
							aria-label={link.name}
						>
							<svelte:component this={link.icon} size={20} weight="fill" />
						</a>
					{/each}
				</div>
			</div>

			{#each footerLinks as section (section.title)}
				<div>
					<h3 class="mb-4 text-sm font-semibold tracking-wider text-gray-900 uppercase">
						{section.title}
					</h3>
					<ul class="space-y-3">
						{#each section.links as link (link.text)}
							<li>
								<a
									href={link.href}
									target={link.target || undefined}
									rel={link.target ? 'noopener noreferrer' : undefined}
									class="text-gray-600 transition-colors hover:text-orange-600"
								>
									{link.text}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<div
			class="mt-12 flex flex-col items-center justify-between border-t border-gray-200 pt-8 md:flex-row"
		>
			<p class="text-sm text-gray-500">
				© {year} ASIMOV Platform. All rights reserved.
			</p>
		</div>
	</div>
</footer>
