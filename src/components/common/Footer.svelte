<script>
	import TwitterLogo from 'phosphor-svelte/lib/TwitterLogo';
	import GithubLogo from 'phosphor-svelte/lib/GithubLogo';
	import LinkedinLogo from 'phosphor-svelte/lib/LinkedinLogo';
	import asimovPlatformLogo from '../../assets/asimov-platform-logo.svg';

	const year = new Date().getFullYear();

	const footerLinks = [
		{
			title: 'Product',
			links: [
				{ text: 'Features', href: '#features' },
				{ text: 'Use Cases', href: '#cases' },
				{ text: 'Roadmap', href: '#roadmap' }
			]
		},
		{
			title: 'Resources',
			links: [
				{ text: 'Documentation', href: '#docs' },
				{ text: 'API Reference', href: '#api' },
				{ text: 'Blog', href: '#blog' },
				{ text: 'Tutorials', href: '#tutorials' }
			]
		},
		{
			title: 'Company',
			links: [
				{ text: 'About Us', href: 'https://www.asimovprotocol.org/about', target: '_blank' },
				{ text: 'Team', href: '#team' },
				{ text: 'Contact', href: '#contact' },
				{ text: 'Positron', href: '#positron' }
			]
		},
		{
			title: 'Legal',
			links: [
				{ text: 'Privacy Policy', href: '#privacy' },
				{ text: 'Terms of Service', href: '#terms' },
				{ text: 'Cookie Policy', href: '#cookies' }
			]
		}
	];

	const socialLinks = [
		{
			name: 'Twitter',
			href: 'https://twitter.com',
			icon: TwitterLogo
		},
		{
			name: 'GitHub',
			href: 'https://github.com',
			icon: GithubLogo
		},
		{
			name: 'LinkedIn',
			href: 'https://linkedin.com',
			icon: LinkedinLogo
		}
	];
</script>

<footer class="border-t border-slate-800 bg-slate-900">
	<div class="container mx-auto px-4 py-12">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
			<div class="lg:col-span-2">
				<a href="#top" class="mb-4 flex items-center gap-2">
					<img
						src={asimovPlatformLogo}
						alt="ASIMOV Logo"
						class="flex w-20 items-center justify-center font-bold text-white"
					/>
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

			<!-- Links -->
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
									target={link.target}
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
			<div class="mt-4 md:mt-0">
				<p class="text-sm text-slate-300">
					Designed with <span class="text-red-500">♥</span> for developers
				</p>
			</div>
		</div>
	</div>
</footer>
