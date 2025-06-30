<script lang="ts">
	let { wrapperClassName = '' } = $props();
</script>

<div class="animate-pulse rounded-lg bg-gray-200 {wrapperClassName}">
	<div class="h-4 w-8 rounded bg-gray-300"></div>
</div>
