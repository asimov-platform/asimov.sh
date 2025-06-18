<script lang="ts">
	import NavBar from './components/common/NavBar.svelte';
	import Footer from './components/common/Footer.svelte';
	import Hero from './components/sections/Hero.svelte';
	import NotJustAnAPI from './components/sections/NotJustAnAPI.svelte';
	import ModulesSection from './components/sections/ModulesSection.svelte';
	import LearnAndCode from './components/sections/LearnAndCode.svelte';
	import WhyAsimov from './components/sections/WhyAsimov.svelte';
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

<div class="min-h-screen bg-white text-gray-900">
	<NavBar />

	<main>
		<Hero />
		<NotJustAnAPI />
		<ModulesSection />
		<LearnAndCode />
		<WhyAsimov />
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
		background-color: white;
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
