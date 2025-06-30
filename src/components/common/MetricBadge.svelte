<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		value: string;
		href?: string;
		title?: string;
		variant?: 'desktop' | 'mobile';
		external?: boolean;
		icon: Snippet;
	}

	let { value, href, title, variant = 'desktop', external = false, icon }: Props = $props();

	const badgeClass =
		variant === 'desktop'
			? 'group flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white/80 px-3 py-1.5 text-sm transition-all hover:border-orange-200 hover:bg-orange-50'
			: 'flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs';

	const iconClass =
		variant === 'desktop' ? 'text-gray-500 group-hover:text-orange-600' : 'text-gray-500';

	const textClass =
		variant === 'desktop'
			? 'font-medium text-gray-700 group-hover:text-orange-700'
			: 'font-medium text-gray-700';
</script>

{#if href}
	<a
		{href}
		class={badgeClass}
		{title}
		target={external ? '_blank' : undefined}
		rel={external ? 'noopener noreferrer' : undefined}
	>
		<div class={iconClass}>
			{@render icon()}
		</div>
		<span class={textClass}>
			{value}
		</span>
	</a>
{:else}
	<div class={badgeClass} {title}>
		<div class={iconClass}>
			{@render icon()}
		</div>
		<span class={textClass}>
			{value}
		</span>
	</div>
{/if}
