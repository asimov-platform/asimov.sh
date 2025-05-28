<script lang="ts">
  import Button from '../common/Button.svelte';
  import { Play, Cpu } from 'phosphor-svelte';
  import { onMount } from 'svelte';

  let heroSection: HTMLElement;
  let isInView = false;

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isInView = true;
        }
      });
    }, { threshold: 0.1 });

    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      if (heroSection) observer.unobserve(heroSection);
    };
  });
</script>

<section
  id="hero"
  class="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden"
  bind:this={heroSection}
>
  <div class="absolute inset-0 bg-slate-950"></div>

  <div class="stars-bg"></div>
  <div class="stars-twinkle"></div>

  <div class="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950 to-slate-900 pointer-events-none z-[1]"></div>

  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[2]">
    <div class="w-[var(--circleSize)] h-[var(--circleSize)] rounded-full bg-indigo-600 opacity-10 blur-3xl"></div>
  </div>

  <div class="container mx-auto px-4 relative z-10">
    <div class="max-w-4xl mx-auto text-center">
      <div
        class="inline-block px-3 py-1 bg-indigo-600 rounded-full text-white font-medium text-sm mb-6 {isInView ? 'animate-fade-in' : 'opacity-0'}"
        style="animation-delay: 0.2s"
      >
        Introducing ASIMOV Platform
      </div>

      <h1
        class="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-50 mb-6 leading-tight {isInView ? 'animate-fade-in' : ''}"
        style="animation-delay: 0.4s"
      >
        The Next Generation <span class="text-indigo-600">AI Infrastructure</span> Platform
      </h1>

      <p
        class="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto {isInView ? 'animate-fade-in' : ''}"
        style="animation-delay: 0.6s"
      >
        Build, deploy, and scale AI applications with unprecedented speed and flexibility.
        ASIMOV provides the infrastructure for tomorrow's AI innovations.
      </p>

      <div
        class="flex flex-col sm:flex-row gap-4 justify-center {isInView ? 'animate-fade-in' : ''}"
        style="animation-delay: 0.8s"
      >
        <Button size="lg">Get Started Free</Button>
        <Button variant="outline" size="lg">
          <Play size={20} weight="fill" class="mr-2" />
          Watch Demo
        </Button>
      </div>

      <div
        class="mt-10 relative {isInView ? 'animate-slide-up' : ''}"
        style="animation-delay: 1s"
      >
        <!-- Hero image/screenshot with glow -->
        <div class="bg-slate-900 rounded-xl shadow-xl overflow-hidden border border-slate-800 relative">
          <!-- Glow effect behind card -->
          <div class="absolute inset-0 bg-indigo-600 opacity-5 blur-xl -m-4"></div>

          <div class="p-1 relative">
            <!-- Placeholder for actual screenshot -->
            <div class="bg-slate-900 w-full h-[400px] rounded-lg flex items-center justify-center">
              <div class="text-center">
                <div class="w-16 h-16 bg-indigo-600 rounded-full mx-auto flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                  <Cpu size={32} weight="fill" class="text-white" />
                </div>
                <p class="text-slate-300">ASIMOV Platform Interface</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Decorative elements -->
        <div class="absolute -top-6 -right-6 w-20 h-20 bg-purple-600 opacity-20 rounded-full blur-xl"></div>
        <div class="absolute -bottom-6 -left-6 w-16 h-16 bg-indigo-600 opacity-20 rounded-full blur-xl"></div>
      </div>
    </div>
  </div>
</section>
