<script lang="ts">
	import { onMount } from 'svelte';
	import List from 'phosphor-svelte/lib/List';
	import X from 'phosphor-svelte/lib/X';
	import Logo from './Logo.svelte';
	import StatsBar from './StatsBar.svelte';

	let isOpen = $state(false);
	let isScrolled = $state(false);

	function toggleMenu() {
		isOpen = !isOpen;
	}

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
	class="{isScrolled || isOpen
		? 'bg-white/95 shadow-sm backdrop-blur-md'
		: 'bg-transparent'} fixed top-0 right-0 left-0 z-50 transition-all duration-300"
>
	<div class="container mx-auto flex h-20 items-center justify-between px-4">
		<a href="#top" class="flex items-center gap-2">
			<Logo class="w-30 text-gray-900 md:w-50" />
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
			<StatsBar variant="desktop" />
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
							onclick={() => (isOpen = false)}
						>
							{item.text}
						</a>
					{/each}
					<StatsBar variant="mobile" />
				</nav>
			</div>
		</div>
	{/if}
</header>
