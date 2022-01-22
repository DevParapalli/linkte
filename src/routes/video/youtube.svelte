<script>
	import { page } from '$app/stores';

	import { Plyr } from 'svelte-plyr';
	let video_id = $page.url.searchParams.get('src') || 'dQw4w9WgXcQ';
</script>

<div class="bg-gray-900 w-[100vw] h-[100vh]">
	<!--flex-grow ml-4 mt-2 mb-2-->
	<div class="fixed top-1/2 left-1/2 w-[85vw] bg-gray-900 -translate-x-1/2 -translate-y-1/2">
		<Plyr>
			<div data-plyr-embed-id={video_id} data-plyr-provider="youtube" />
		</Plyr>
	</div>
</div>
