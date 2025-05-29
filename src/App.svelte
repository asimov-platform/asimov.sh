<script lang="ts">
	import NavBar from './components/common/NavBar.svelte';
	import Footer from './components/common/Footer.svelte';
	import Hero from './components/sections/Hero.svelte';
	import Features from './components/sections/Features.svelte';
	import About from './components/sections/About.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('in-view');
					}
				});
			},
			{ threshold: 0.1 }
		);

		document.querySelectorAll('[data-animate]').forEach((el) => {
			observer.observe(el);
		});

		return () => {
			document.querySelectorAll('[data-animate]').forEach((el) => {
				observer.unobserve(el);
			});
		};
	});
</script>

<div class="min-h-screen bg-slate-950">
	<NavBar />

	<main>
		<Hero />
		<Features />
		<About />
	</main>

	<Footer />
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: var(--color-slate-950);
		overflow-x: hidden;
		font-family: 'Inter', sans-serif;
	}

	:global(#app) {
		width: 100%;
		max-width: 100%;
		min-height: 100vh;
		padding: 0;
		margin: 0;
		text-align: left;
		display: flex;
		flex-direction: column;
	}
</style>
