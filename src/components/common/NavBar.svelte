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
    { text: 'About', href: '#about' },
  ];
</script>

<header class="{isScrolled ? 'bg-slate-900/90 shadow-md backdrop-blur-md' : 'bg-transparent'} fixed top-0 left-0 right-0 z-50 transition-all duration-300">
  <div class="container mx-auto px-4 py-3 flex items-center justify-between">
    <!-- Logo -->
    <a href="#top" class="flex items-center gap-2">
      <img src={asimovPlatformLogo} alt="ASIMOV Logo" class="w-20 flex items-center justify-center text-white font-bold" />
    </a>

    <!-- Desktop Navigation -->
    <nav class="hidden md:flex items-center space-x-6">
      {#each navItems as item}
        <a href={item.href} class="text-slate-300 hover:text-indigo-600 transition-colors">{item.text}</a>
      {/each}
    </nav>

    <!-- CTA Buttons -->
    <div class="hidden md:flex items-center gap-3">
      <Button variant="outline" size="sm">Documentation</Button>
      <Button variant="primary" size="sm">Get Started</Button>
    </div>

    <!-- Mobile Menu Button -->
    <button class="md:hidden text-slate-50 focus:outline-none" onclick={toggleMenu}>
      {#if isOpen}
        <X size={24} weight="bold" />
      {:else}
        <List size={24} weight="bold" />
      {/if}
    </button>
  </div>

  <!-- Mobile Navigation -->
  {#if isOpen}
    <div class="md:hidden bg-slate-900 border-t border-slate-800">
      <div class="container mx-auto px-4 py-3">
        <nav class="flex flex-col space-y-3">
          {#each navItems as item}
            <a href={item.href} class="py-2 text-slate-300 hover:text-indigo-600 transition-colors">{item.text}</a>
          {/each}
          <div class="flex flex-col gap-2 pt-3 border-t border-slate-800">
            <Button variant="outline" fullWidth>Documentation</Button>
            <Button variant="primary" fullWidth>Get Started</Button>
          </div>
        </nav>
      </div>
    </div>
  {/if}
</header>
