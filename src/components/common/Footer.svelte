<script>
  import TwitterLogo from 'phosphor-svelte/lib/TwitterLogo';
  import GithubLogo from 'phosphor-svelte/lib/GithubLogo';
  import LinkedinLogo from 'phosphor-svelte/lib/LinkedinLogo';
  import asimovPlatformLogo from '../../assets/asimov-platform-logo.svg';

  const year = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { text: 'Features', href: '#features' },
        { text: 'Use Cases', href: '#cases' },
        { text: 'Roadmap', href: '#roadmap' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { text: 'Documentation', href: '#docs' },
        { text: 'API Reference', href: '#api' },
        { text: 'Blog', href: '#blog' },
        { text: 'Tutorials', href: '#tutorials' }
      ]
    },
    {
      title: 'Company',
      links: [
        { text: 'About Us', href: 'https://www.asimovprotocol.org/about', target: '_blank' },
        { text: 'Team', href: '#team' },
        { text: 'Contact', href: '#contact' },
        { text: 'Positron', href: '#positron' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { text: 'Privacy Policy', href: '#privacy' },
        { text: 'Terms of Service', href: '#terms' },
        { text: 'Cookie Policy', href: '#cookies' }
      ]
    }
  ];

  const socialLinks = [
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: TwitterLogo
    },
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: GithubLogo
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: LinkedinLogo
    }
  ];
</script>

<footer class="bg-slate-900 border-t border-slate-800">
  <div class="container mx-auto px-4 py-12">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
      <div class="lg:col-span-2">
        <a href="#top" class="flex items-center gap-2 mb-4">
          <img src={asimovPlatformLogo} alt="ASIMOV Logo" class="w-20 flex items-center justify-center text-white font-bold" />
        </a>
        <p class="text-slate-300 mb-6 max-w-md">
          Build, deploy, and scale AI applications with unprecedented speed and flexibility on our state-of-the-art infrastructure platform.
        </p>
        <div class="flex space-x-4">
          {#each socialLinks as link}
            <a href={link.href} class="text-slate-300 hover:text-indigo-600 transition-colors" aria-label={link.name}>
              <svelte:component this={link.icon} size={20} weight="fill" />
            </a>
          {/each}
        </div>
      </div>

      <!-- Links -->
      {#each footerLinks as section}
        <div>
          <h3 class="text-sm font-semibold text-slate-50 uppercase tracking-wider mb-4">{section.title}</h3>
          <ul class="space-y-3">
            {#each section.links as link}
              <li>
                <a href={link.href} target={link.target} class="text-slate-300 hover:text-indigo-600 transition-colors">{link.text}</a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>

    <div class="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
      <p class="text-slate-300 text-sm">© {year} ASIMOV Platform. All rights reserved.</p>
      <div class="mt-4 md:mt-0">
        <p class="text-slate-300 text-sm">
          Designed with <span class="text-red-500">♥</span> for developers
        </p>
      </div>
    </div>
  </div>
</footer>
