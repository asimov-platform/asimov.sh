<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { queryClient } from './lib/queryClient';
	import NavBar from './components/common/NavBar.svelte';
	import Footer from './components/common/Footer.svelte';
	import Hero from './components/sections/Hero.svelte';
	import NotJustAnAPI from './components/sections/NotJustAnAPI.svelte';
	import ModulesSection from './components/sections/ModulesSection.svelte';
	import LearnAndCode from './components/sections/LearnAndCode.svelte';
	import WhyAsimov from './components/sections/WhyAsimov.svelte';
	import { onMount } from 'svelte';
	import AsimovSpecifications from './components/sections/AsimovSpecifications.svelte';

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

<QueryClientProvider client={queryClient}>
	<div class="min-h-screen bg-white text-gray-900">
		<NavBar />

		<main>
			<Hero />
			<NotJustAnAPI />
			<ModulesSection />
			<LearnAndCode />
			<WhyAsimov />
			<AsimovSpecifications />
		</main>

		<Footer />
	</div>
</QueryClientProvider>
