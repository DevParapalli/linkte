<script>
	import AdminLink from '$lib/AdminLink.svelte';
</script>

<section class="text-gray-400 bg-gray-900 body-font">
	<div class="container px-5 py-24 mx-auto">
		<div class="text-center mb-20">
			<h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-white mb-4">Admin Forms</h1>
			<p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
				<!--Add Text Here if needed-->
			</p>
		</div>
		<div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
			<AdminLink title="Index Page Current Status" href="/admin/update_current_status" />
		</div>
	</div>
</section>
