<script lang="ts">
	export let data = {
		name: 'NAME',
		category: 'CATEGORY',
		description: 'DESCRIPTION',
		url: 'https://example.com',
		prereq: ['pre-req-1', 'pre-req-2']
	};
	function de_slug(slug: string): string {
		let words = slug.split('-');
		return words
			.map(function (word) {
				return word.toUpperCase(); //word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
			})
			.join(' ');
	}
	function slug(text) {
		return text
			.toLowerCase()
			.replace(/[^\w ]+/g, '')
			.replace(/ +/g, '-');
	}
</script>

<div id={slug(data.name)} class="py-8 border-t-2 border-gray-800 flex flex-wrap md:flex-nowrap">
	<div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
		<span class="font-semibold title-font text-white">{data.category.toUpperCase()}</span>
		<span class="mt-1 text-gray-500 text-sm">
			{#each data.prereq as prereq, i}
				{#if i == 0}
					Prerequisites:
				{/if}
				{#if i > 0}
					{', '}
				{/if}
				<a sveltekit:prefetch href="#{prereq}" class="text-gray-500 hover:text-green-400">{de_slug(prereq)}</a>
			{:else}
				<span>No prerequsites needed.</span>
			{/each}
		</span>
	</div>
	<div class="md:flex-grow">
		<h2 class="text-2xl font-medium text-white title-font mb-2">{data.name}</h2>
		<p class="leading-relaxed">
			{data.description}
		</p>
		<a sveltekit:prefetch href={data.url} class="text-green-400 inline-flex items-center mt-4"
			>Get Started Here
			<svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
				<path d="M5 12h14" />
				<path d="M12 5l7 7-7 7" />
			</svg>
		</a>
	</div>
</div>
