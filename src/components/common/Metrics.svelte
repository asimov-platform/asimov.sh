<script lang="ts">
	const isInView = false; // This will be set to true when the section comes into view
</script>

<div
	class="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3 {isInView
		? 'animate-fade-in'
		: ''}"
	style="animation-delay: 0.8s"
>
	<div class="border-l-2 border-orange-500 pl-6">
		<div class="mb-2 text-3xl font-bold text-gray-900">99.9%</div>
		<div class="text-gray-600">Uptime SLA</div>
	</div>
	<div class="border-l-2 border-orange-500 pl-6">
		<div class="mb-2 text-3xl font-bold text-gray-900">1M+</div>
		<div class="text-gray-600">Verified Sources</div>
	</div>
	<div class="border-l-2 border-orange-500 pl-6">
		<div class="mb-2 text-3xl font-bold text-gray-900">24/7</div>
		<div class="text-gray-600">Global Access</div>
	</div>
</div>
