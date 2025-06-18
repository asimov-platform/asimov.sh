<script>
	import XLogo from 'phosphor-svelte/lib/XLogo';
	import GithubLogo from 'phosphor-svelte/lib/GithubLogo';
	import Logo from './Logo.svelte';
	import { twitterUrl, githubUrl } from '../../lib/config';

	const year = new Date().getFullYear();

	const footerLinks = [
		{
			title: 'Product',
			links: [{ text: 'Modules', href: '#modules', target: undefined }]
		}
	];

	const socialLinks = [
		{
			name: 'X (formally Twitter)',
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

<footer class="border-t border-slate-800 bg-slate-900">
	<div class="container mx-auto px-4 py-12">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
			<div class="lg:col-span-2">
				<a href="#top" class="mb-4 flex items-center gap-2">
					<Logo class="w-50 text-white" />
				</a>
				<p class="mb-6 max-w-md text-slate-300">
					Build, deploy, and scale AI applications with unprecedented speed and flexibility on our
					state-of-the-art infrastructure platform.
				</p>
				<div class="flex space-x-4">
					{#each socialLinks as link (link.name)}
						<a
							href={link.href}
							class="text-slate-300 transition-colors hover:text-indigo-600"
							aria-label={link.name}
						>
							<svelte:component this={link.icon} size={20} weight="fill" />
						</a>
					{/each}
				</div>
			</div>

			{#each footerLinks as section (section.title)}
				<div>
					<h3 class="mb-4 text-sm font-semibold tracking-wider text-slate-50 uppercase">
						{section.title}
					</h3>
					<ul class="space-y-3">
						{#each section.links as link (link.text)}
							<li>
								<a
									href={link.href}
									target={link.target || undefined}
									rel={link.target ? 'noopener noreferrer' : undefined}
									class="text-slate-300 transition-colors hover:text-indigo-600">{link.text}</a
								>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<div
			class="mt-12 flex flex-col items-center justify-between border-t border-slate-800 pt-8 md:flex-row"
		>
			<p class="text-sm text-slate-300">© {year} ASIMOV Platform. All rights reserved.</p>
		</div>
	</div>
</footer>
