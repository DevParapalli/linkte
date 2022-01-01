<script>
	import GuideItem from '$lib/GuideItem.svelte';
	import guides from '../../guides.json';
</script>

<section class="text-gray-400 bg-gray-900 body-font overflow-hidden">
	<div class="container px-5 py-24 mx-auto">
		<div class="flex flex-col text-center w-full mb-20">
			<h2 class="text-xs text-green-400 tracking-widest font-medium title-font mb-1">{guides.subtitle}</h2>
			<h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">{guides.title}</h1>
			<p class="lg:w-2/3 mx-auto leading-relaxed text-base">
				{guides.description}
			</p>
		</div>
		<div class="-my-8 divide-y-2 divide-gray-800">
			{#each guides.guides as guide}
				<GuideItem data={guide} />
			{/each}
		</div>
	</div>
</section>
