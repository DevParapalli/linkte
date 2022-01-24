<script>
	import { Plyr } from 'svelte-plyr';
	import { page } from '$app/stores';
	$: source = $page.url.searchParams.get('src') ? $page.url.searchParams.get('src') : 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4';
</script>

<!--max-w-[85vw] flex align-middle justify-evenly h-full-->
<div class="bg-gray-900 w-[100vw] h-[100vh]">
	<!--flex-grow ml-4 mt-2 mb-2-->
	<div class="fixed top-1/2 left-1/2 lg:w-[80vw] w-[85vw] bg-gray-900 -translate-x-1/2 -translate-y-1/2">
		<Plyr>
			<video crossorigin="anonymous" playsinline id="player">
				<source src={source} />
			</video>
		</Plyr>
	</div>
</div>
