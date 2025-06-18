<script lang="ts">
	export let variant: 'primary' | 'secondary' | 'outline' | 'text' = 'primary';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let href: string | null = null;
	export let rel: string | null = null;
	export let target: string | null = null;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled = false;
	export let fullWidth = false;
	export let onClick: (() => void) | null = null;

	const variantClasses = {
		primary:
			'bg-orange-600 text-white hover:bg-orange-700 border border-orange-600 hover:border-orange-700 shadow-lg',
		secondary:
			'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200 hover:border-gray-300',
		outline:
			'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400',
		text: 'bg-transparent text-gray-600 hover:text-orange-600'
	};

	const sizeClasses = {
		sm: 'text-sm px-4 py-2',
		md: 'text-base px-6 py-3',
		lg: 'text-lg px-8 py-4'
	};

	const baseClasses =
		'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

	const classes = `
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
    `;
</script>

{#if href}
	<a {href} {target} {rel} {...$$restProps} class={classes} role="button" aria-disabled={disabled}>
		<slot />
	</a>
{:else}
	<button {type} {disabled} {...$$restProps} class={classes} on:click={onClick}>
		<slot />
	</button>
{/if}
