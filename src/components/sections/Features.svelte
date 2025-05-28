<script lang="ts">
  import Lightning from 'phosphor-svelte/lib/Lightning';
  import Robot from 'phosphor-svelte/lib/Robot';
  import Shield from 'phosphor-svelte/lib/Shield';
  import Database from 'phosphor-svelte/lib/Database';
  import ChartLine from 'phosphor-svelte/lib/ChartLine';
  import Code from 'phosphor-svelte/lib/Code';
  import { onMount } from 'svelte';

  const features = [
    {
      title: 'Seamless Integration',
      description: 'Connect with your existing tools and workflows without disruption.',
      icon: Lightning
    },
    {
      title: 'Intelligent Automation',
      description: 'Automate repetitive tasks and complex workflows with AI-powered tools.',
      icon: Robot
    },
    {
      title: 'Enterprise-Grade Security',
      description: 'Built with security and compliance at its core for peace of mind.',
      icon: Shield
    },
    {
      title: 'Scalable Infrastructure',
      description: 'Grow from prototype to production with infrastructure that scales with you.',
      icon: Database
    },
    {
      title: 'Real-time Analytics',
      description: 'Gain insights with comprehensive analytics and monitoring tools.',
      icon: ChartLine
    },
    {
      title: 'Developer-First Experience',
      description: 'Designed with developers in mind for an intuitive and productive experience.',
      icon: Code
    }
  ];

  let featuresSection: HTMLElement | null = null;

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

    if (featuresSection) {
      observer.observe(featuresSection);
    }

    return () => {
      if (featuresSection) observer.unobserve(featuresSection);
    };
  });
</script>

<section id="features" class="py-20 bg-slate-900 relative" bind:this={featuresSection}>
  <div class="stars-bg opacity-20"></div>
  <div class="stars-twinkle"></div>

  <div class="container mx-auto px-4 relative z-10">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-slate-50 mb-4" data-animate="fade">
        Powerful Features for AI Development
      </h2>
      <p class="text-slate-300 text-lg" data-animate="fade">
        ASIMOV provides everything you need to build, deploy, and scale your AI applications.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each features as feature, i (feature.title)}
        <div
          class="bg-slate-950 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-800 hover:border-indigo-600 group"
          data-animate="slide-up"
        >
          <div class="w-12 h-12 bg-indigo-600/10 rounded-lg flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
            <svelte:component this={feature.icon} size={32} />
          </div>
          <h3 class="text-xl font-semibold text-slate-50 mb-2">{feature.title}</h3>
          <p class="text-slate-300">{feature.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
