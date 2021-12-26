<script lang="ts">
	import IndexAlert from '$lib/IndexAlert.svelte';
	import LinkSection from '$lib/LinkSection.svelte';
	import { variables } from '$lib/variables';
	import type { Links } from '$lib/types';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import links from '../links.json';

	let alert_ready = false;
	let links_data: Links = links;
	let data = {
		title: 'SOME TITLE',
		subtitle: 'SOME SUBTITLE',
		message: 'SOME MESSAGE'
	};
	onMount(async () => {
		let response = await fetch(`https://dweet.io:443/get/latest/dweet/for/${variables.DWEET_KEY}`);
		let _data = await response.json();
		console.log(_data);
		data = _data.with[0].content || {};
		alert_ready = true;
	});
</script>

<svelte:head>
	<title>DevParapalli's Collection of Links</title>
</svelte:head>

<section class="bg-gray-900 body-font text-gray-400">
	<div class="mx-auto container pb-10 pt-10 px-5">
		<div class="text-center mb-20">
			<h1 class="rainbow-text text-center font-medium mb-4 sm:text-3xl text-2xl text-green-50 title-font">{links_data.title}</h1>
			<p class="mx-auto leading-relaxed lg:w-3/4 text-base xl:w-2/4">{links_data.subtitle}</p>
		</div>
		<!--CURRENT ALERT ?-->
		{#if alert_ready}
			<div transition:fly={{ duration: 500 }}>
				<IndexAlert {data} />
			</div>
		{/if}
		<div class="flex flex-wrap m-4">
			{#each links_data.sections as section}
				<LinkSection link_section_data={section} />
			{/each}
		</div>
		<!-- Insert Button Here -->
	</div>
</section>

<style>
	.rainbow-text {
		background-image: repeating-linear-gradient(45deg, violet, indigo, blue, green, yellow, orange, red, violet);
		text-align: center;
		background-size: 800% 800%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: rainbow 32s ease infinite;
	}

	@keyframes rainbow {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 25%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>
