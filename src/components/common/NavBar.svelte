<script lang="ts">
	import Button from './Button.svelte';
	import { onMount } from 'svelte';
	import List from 'phosphor-svelte/lib/List';
	import X from 'phosphor-svelte/lib/X';
	import asimovPlatformLogo from '../../assets/asimov-platform-logo.svg';

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
		{ text: 'Features', href: '#features' },
		{ text: 'About', href: '#about' }
	];
</script>

<header
	class="{isScrolled
		? 'bg-slate-900/90 shadow-md backdrop-blur-md'
		: 'bg-transparent'} fixed top-0 right-0 left-0 z-50 transition-all duration-300"
>
	<div class="container mx-auto flex items-center justify-between px-4 py-3">
		<a href="#top" class="flex items-center gap-2">
			<img
				src={asimovPlatformLogo}
				alt="ASIMOV Logo"
				class="flex w-20 items-center justify-center font-bold text-white"
			/>
		</a>

		<nav class="hidden items-center space-x-6 md:flex">
			{#each navItems as item (item.text)}
				<a href={item.href} class="text-slate-300 transition-colors hover:text-indigo-600"
					>{item.text}</a
				>
			{/each}
		</nav>

		<div class="hidden items-center gap-3 md:flex">
			<Button variant="outline" size="sm">Documentation</Button>
			<Button variant="primary" size="sm">Get Started</Button>
		</div>

		<button class="text-slate-50 focus:outline-none md:hidden" onclick={toggleMenu}>
			{#if isOpen}
				<X size={24} weight="bold" />
			{:else}
				<List size={24} weight="bold" />
			{/if}
		</button>
	</div>

	{#if isOpen}
		<div class="border-t border-slate-800 bg-slate-900 md:hidden">
			<div class="container mx-auto px-4 py-3">
				<nav class="flex flex-col space-y-3">
					{#each navItems as item (item.text)}
						<a href={item.href} class="py-2 text-slate-300 transition-colors hover:text-indigo-600"
							>{item.text}</a
						>
					{/each}
					<div class="flex flex-col gap-2 border-t border-slate-800 pt-3">
						<Button variant="outline" fullWidth>Documentation</Button>
						<Button variant="primary" fullWidth>Get Started</Button>
					</div>
				</nav>
			</div>
		</div>
	{/if}
</header>
