<script lang="ts">
	import LinkItem from '$lib/LinkItem.svelte';
	import type { LinkSection } from '$lib/types';
	import { default_link_section } from '$lib/types';
	export let link_section_data: LinkSection = default_link_section;
</script>

<div class="lg:w-1/4 p-4 sm:w-1/2 w-full">
	<h2
		title={link_section_data.description}
		class="w-full bg-gray-800 p-2 rounded sm:bg-gray-900 sm:text-left text-center font-medium mb-4 text-sm text-white title-font tracking-widest">
		{@html link_section_data.title}
	</h2>
	<nav class="items-center -mb-1 flex flex-col sm:items-start text-left space-y-2">
		{#each link_section_data.links as link, i}
			<LinkItem link_data={link} />
		{/each}
	</nav>
</div>
