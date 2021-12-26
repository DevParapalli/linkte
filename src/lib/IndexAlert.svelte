<script>
	export let data = {
		title: 'This is a dark alert',
		message:
			'More info about this info dark goes here. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.',
		subtitle: 'This is a alert subtitle'
	};
</script>

<div id="index-alert" class="p-4 mb-4 bg-gray-100 rounded-lg dark:bg-gray-800" role="alert">
	<div class="flex items-center">
		<svg class="mr-2 w-5 h-5 text-gray-800 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
			><path
				fill-rule="evenodd"
				d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
				clip-rule="evenodd" /></svg>
		<h3 class="text-xl font-medium text-gray-700 dark:text-gray-300">{data.title}</h3>
	</div>
	<div class="mt-2 mb-1 text-base text-gray-700 dark:text-gray-300">
		{data.message}
	</div>
	<div class="flex text-xs">
		— {data.subtitle}
		<!-- ADD BUTTONS WITH STYLES IF NEEDED-->
	</div>
</div>
