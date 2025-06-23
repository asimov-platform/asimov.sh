<script lang="ts">
	import { onMount } from 'svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import List from 'phosphor-svelte/lib/List';
	import X from 'phosphor-svelte/lib/X';
	import Star from 'phosphor-svelte/lib/Star';
	import Users from 'phosphor-svelte/lib/Users';
	import Logo from './Logo.svelte';
	import { fetchGitHubStats, formatStars } from '../../lib/github';

	let isOpen = $state(false);
	let isScrolled = $state(false);

	function toggleMenu() {
		isOpen = !isOpen;
	}

	const githubStatsQuery = createQuery({
		queryKey: ['github-stats'],
		queryFn: fetchGitHubStats,
		staleTime: 10 * 60 * 1000, // 10 minutes
		gcTime: 20 * 60 * 1000, // 20 minutes
		retry: 1
	});

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 10;
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	const navItems = [
		{ text: 'Modules', href: '#modules' },
		{ text: 'Platform', href: '#why-asimov' },
		{ text: 'Docs', href: '#specifications' }
	];
</script>

<header
	class="{isScrolled
		? 'border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-md'
		: 'bg-transparent'} fixed top-0 right-0 left-0 z-50 transition-all duration-300"
>
	<div class="container mx-auto flex h-20 items-center justify-between px-4">
		<a href="#top" class="flex items-center gap-2">
			<Logo class="w-50 text-gray-900" />
		</a>

		<nav class="hidden items-center space-x-8 md:flex">
			{#each navItems as item (item.text)}
				<a
					href={item.href}
					class="group relative text-gray-600 transition-colors hover:text-orange-600"
				>
					{item.text}
					<div
						class="absolute -bottom-1 left-0 h-px w-0 bg-orange-500 transition-all group-hover:w-full"
					></div>
				</a>
			{/each}
		</nav>

		<div class="hidden items-center gap-4 md:flex">
			{#if $githubStatsQuery.data}
				<div class="flex items-center gap-3">
					<a
						href="https://github.com/asimov-platform/asimov.rs"
						target="_blank"
						rel="noopener noreferrer"
						class="group flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white/80 px-3 py-1.5 text-sm transition-all hover:border-orange-200 hover:bg-orange-50"
					>
						<Star size={14} class="text-gray-500 group-hover:text-orange-600" />
						<span class="font-medium text-gray-700 group-hover:text-orange-700">
							{formatStars($githubStatsQuery.data.stars)}
						</span>
					</a>
					<a
						href="https://github.com/asimov-platform"
						target="_blank"
						rel="noopener noreferrer"
						class="group flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white/80 px-3 py-1.5 text-sm transition-all hover:border-orange-200 hover:bg-orange-50"
					>
						<Users size={14} class="text-gray-500 group-hover:text-orange-600" />
						<span class="font-medium text-gray-700 group-hover:text-orange-700">
							{formatStars($githubStatsQuery.data.followers)}
						</span>
					</a>
				</div>
			{:else if $githubStatsQuery.isLoading}
				<div class="flex items-center gap-3">
					<div class="animate-pulse rounded-lg bg-gray-200 px-3 py-1.5">
						<div class="h-4 w-8 rounded bg-gray-300"></div>
					</div>
					<div class="animate-pulse rounded-lg bg-gray-200 px-3 py-1.5">
						<div class="h-4 w-8 rounded bg-gray-300"></div>
					</div>
				</div>
			{/if}
		</div>

		<button
			class="text-gray-600 hover:text-gray-900 focus:outline-none md:hidden"
			onclick={toggleMenu}
		>
			{#if isOpen}
				<X size={24} weight="bold" />
			{:else}
				<List size={24} weight="bold" />
			{/if}
		</button>
	</div>

	{#if isOpen}
		<div class="border-t border-gray-200 bg-white/95 backdrop-blur-md md:hidden">
			<div class="container mx-auto px-4 py-6">
				<nav class="flex flex-col space-y-4">
					{#each navItems as item (item.text)}
						<a
							href={item.href}
							class="border-b border-gray-200 py-2 text-gray-600 transition-colors last:border-b-0 hover:text-orange-600"
						>
							{item.text}
						</a>
					{/each}

					{#if $githubStatsQuery.data}
						<div class="flex items-center justify-center gap-4 py-2">
							<a
								href="https://github.com/asimov-platform/asimov.rs"
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm"
							>
								<Star size={14} class="text-gray-500" />
								<span class="font-medium text-gray-700">
									{formatStars($githubStatsQuery.data.stars)}
								</span>
							</a>
							<a
								href="https://github.com/asimov-platform"
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm"
							>
								<Users size={14} class="text-gray-500" />
								<span class="font-medium text-gray-700">
									{formatStars($githubStatsQuery.data.followers)}
								</span>
							</a>
						</div>
					{/if}
				</nav>
			</div>
		</div>
	{/if}
</header>
