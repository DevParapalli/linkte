<script context="module" lang="ts">
    export async function load({page, fetch, session, stuff}) {
        const url = page.query.get('file')
        const response = await fetch(url)

        if (response.ok) {
            return {
                props: {
                    links_data: await response.json()
                }
            }
        }
        return {
            status: response.status, 
            error: new Error(`Could not load ${url}`)
        };
    }
</script>

<script>
    import LinkSection from "$lib/LinkSection.svelte";
    export let links_data;
</script>

<svelte:head>
	<title>{links_data.title}</title>
</svelte:head>

<section class="bg-gray-900 body-font text-gray-400">
	<div class="mx-auto container pb-10 pt-10 px-5">
		<div class="text-center mb-20">
			<h1 class="text-center font-medium mb-4 sm:text-3xl text-2xl text-white title-font">{links_data.title}</h1>
			<p class="mx-auto leading-relaxed lg:w-3/4 text-base xl:w-2/4">{links_data.subtitle}</p>
		</div>
		<div class="flex flex-wrap m-4">
			{#each links_data.sections as section}
				 <LinkSection link_section_data={section} />
			{/each}
		</div>
		
	</div>
</section>