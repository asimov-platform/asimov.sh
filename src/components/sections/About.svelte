<script lang="ts">
  import Button from '../common/Button.svelte';
  import Users from 'phosphor-svelte/lib/Users';
  import RocketLaunch from 'phosphor-svelte/lib/RocketLaunch';
  import Gauge from 'phosphor-svelte/lib/Gauge';
  import Headset from 'phosphor-svelte/lib/Headset';
  import { onMount } from 'svelte';

  const stats = [
    { value: '200+', label: 'Enterprise Customers', icon: Users },
    { value: '1M+', label: 'AI Models Deployed', icon: RocketLaunch },
    { value: '99.9%', label: 'System Uptime', icon: Gauge },
    { value: '24/7', label: 'Expert Support', icon: Headset }
  ];

  let aboutSection: HTMLElement | null = null;

  onMount(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll('[data-animate]');
          elements.forEach((el, i) => {
            setTimeout(() => {
              el.classList.add('in-view');
            }, 150 * i);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => {
      if (aboutSection) observer.unobserve(aboutSection);
    };
  });
</script>

<section id="about" class="py-20 bg-slate-950 relative" bind:this={aboutSection}>
  <div class="stars-bg opacity-5"></div>

  <div class="container mx-auto px-4 relative">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div class="relative" data-animate="fade">
        <div class="bg-gradient-to-br from-indigo-600 to-purple-600 opacity-20 rounded-2xl p-4 md:p-6">
          <div class="bg-slate-900 rounded-xl shadow-xl overflow-hidden border border-slate-700">
            <div class="bg-slate-900 aspect-video flex items-center justify-center">
              <div class="grid grid-cols-3 gap-4 p-8 w-full max-w-md group">

                <div class="bg-indigo-600/40 border border-indigo-400/50 aspect-square rounded-lg hover:bg-indigo-500/60 transition-all duration-300 shadow-md hover:shadow-indigo-500/30 hover:scale-105 relative overflow-hidden">
                  <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]"></div>
                </div>

                <div class="bg-indigo-600/50 border border-indigo-400/50 aspect-square rounded-lg hover:bg-indigo-500/70 transition-all duration-300 shadow-md hover:shadow-indigo-500/30 hover:scale-105 relative overflow-hidden animate-pulse-slow">
                  <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]"></div>
                </div>

                <div class="bg-indigo-600/60 border border-indigo-400/50 aspect-square rounded-lg hover:bg-indigo-500/80 transition-all duration-300 shadow-md hover:shadow-indigo-500/30 hover:scale-105 relative overflow-hidden">
                  <div class="absolute -right-4 -bottom-4 w-8 h-8 bg-indigo-400/40 rounded-full blur-sm"></div>
                </div>

                <div class="bg-purple-600/40 border border-purple-400/50 aspect-square rounded-lg hover:bg-purple-500/60 transition-all duration-300 shadow-md hover:shadow-purple-500/30 hover:scale-105 relative overflow-hidden">
                  <div class="absolute -left-2 -top-2 w-6 h-6 bg-purple-400/40 rounded-full blur-sm"></div>
                </div>

                <div class="bg-purple-600/50 border border-purple-400/50 aspect-square rounded-lg hover:bg-purple-500/70 transition-all duration-300 shadow-md hover:shadow-purple-500/30 hover:scale-105 relative overflow-hidden animate-float">
                  <div class="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(255,255,255,0.2)_60%,transparent_80%)]"></div>
                </div>

                <div class="bg-purple-600/60 border border-purple-400/50 aspect-square rounded-lg hover:bg-purple-500/80 transition-all duration-300 shadow-md hover:shadow-purple-500/30 hover:scale-105 relative overflow-hidden">
                  <div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.2),transparent_50%)]"></div>
                </div>

                <div class="bg-indigo-600/70 border border-indigo-400/60 aspect-square rounded-lg hover:bg-indigo-500/90 transition-all duration-300 shadow-md hover:shadow-indigo-500/30 hover:scale-105 relative overflow-hidden">
                  <div class="h-full w-full bg-[linear-gradient(45deg,transparent,rgba(255,255,255,0.1)_40%,transparent_60%)] animate-shimmer"></div>
                </div>

                <div class="bg-purple-600/70 border border-purple-400/60 aspect-square rounded-lg hover:bg-purple-500/90 transition-all duration-300 shadow-md hover:shadow-purple-500/30 hover:scale-105 relative overflow-hidden">
                  <div class="h-full w-full bg-[linear-gradient(45deg,transparent,rgba(255,255,255,0.1)_40%,transparent_60%)] animate-shimmer-delayed"></div>
                </div>

                <div class="bg-gradient-to-br from-indigo-500 to-purple-600 aspect-square rounded-lg shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 relative overflow-hidden animate-pulse-slow">

                  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.3),transparent_70%)]"></div>

                  <div class="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiPjwvcmVjdD4KPC9zdmc+')]"></div>

                  <div class="absolute inset-0 opacity-75 bg-gradient-to-br from-transparent via-transparent to-white/10 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="absolute -top-6 -left-6 w-12 h-12 bg-purple-600 opacity-30 rounded-full blur-xl"></div>
        <div class="absolute -bottom-6 -right-6 w-20 h-20 bg-indigo-600 opacity-25 rounded-full blur-xl"></div>

        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-indigo-600 opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div>
        <div class="inline-block px-3 py-1 bg-indigo-600 rounded-full text-white font-medium text-sm mb-6" data-animate="fade">
          About ASIMOV
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-50 mb-6" data-animate="fade">
          Revolutionizing AI Infrastructure for the Future
        </h2>
        <p class="text-slate-300 mb-6" data-animate="fade">
          ASIMOV Platform is built on the foundation of cutting-edge research and development in artificial intelligence. Our mission is to make advanced AI technology accessible, scalable, and easy to implement for organizations of all sizes.
        </p>
        <p class="text-slate-300 mb-8" data-animate="fade">
          Named after science fiction writer Isaac Asimov, our platform embodies the visionary spirit of exploring new technological frontiers while maintaining a strong ethical foundation. We're committed to responsible AI development that benefits humanity.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {#each stats as stat, i (stat.label)}
            <div class="flex items-center" data-animate="slide-up">
              <div class="w-8 h-8 mr-3 text-indigo-600">
                <svelte:component this={stat.icon} size={32} weight="duotone" />
              </div>
              <div>
                <div class="text-2xl font-bold text-indigo-600 mb-1">{stat.value}</div>
                <div class="text-slate-300">{stat.label}</div>
              </div>
            </div>
          {/each}
        </div>

        <div data-animate="fade">
          <Button>Learn More</Button>
        </div>
      </div>
    </div>
  </div>
</section>
