<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'outline' | 'text' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let href: string | null = null;
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let disabled = false;
  export let fullWidth = false;
  export let onClick: (() => void) | null = null;

  const variantClasses = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
    outline: 'bg-transparent border-2 border-indigo-600 text-indigo-100 hover:bg-indigo-600/10 focus:ring-indigo-500',
    text: 'bg-transparent text-indigo-600 hover:text-white focus:ring-indigo-500 shadow-none'
  };

  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3'
  };

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
  `;
</script>

{#if href}
  <a {href} class={classes} role="button" aria-disabled={disabled}>
    <slot />
  </a>
{:else}
  <button
    {type}
    {disabled}
    class={classes}
    on:click={onClick}
  >
    <slot />
  </button>
{/if}
