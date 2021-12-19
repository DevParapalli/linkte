<script lang="ts">
    import LinkItem from "$lib/LinkItem.svelte";
    import type { LinkSection } from "$lib/types";
    import { default_link_section } from "$lib/types";
    export let link_section_data: LinkSection = default_link_section;
</script>

<div class="lg:w-1/4 p-4 sm:w-1/2 w-full">
	<h2 title="{link_section_data.description}" class="sm:text-left text-center font-medium mb-4 text-sm text-white title-font tracking-widest">{link_section_data.title}</h2>
	<nav class="items-center -mb-1 flex flex-col sm:items-start sm:text-left space-y-2 text-center">
        {#each link_section_data.links as link,i}
            <LinkItem link_data={link}/>
        {/each}
	</nav>
</div>