<script>
	export let title = 'Authentic Cliche Forage';
	export let href = 'https://www.authenticclicheforage.com/';
</script>

<a sveltekit:prefetch {href} class="p-2 sm:w-1/2 w-full">
	<div class="bg-gray-800 rounded flex p-4 h-full items-center">
		<svg
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="3"
			class="text-green-400 w-6 h-6 flex-shrink-0 mr-4"
			viewBox="0 0 24 24">
			<path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
			<path d="M22 4L12 14.01l-3-3" />
		</svg>
		<span class="title-font font-medium text-white">{title}</span>
	</div>
</a>
