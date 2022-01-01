<script>
	export let data = {
		day: 'Monday',
		display: true,
		subjects: [
			{
				subject: 'Math',
				start_time: '08:30',
				end_time: '10:30',
				instructor: 'DaBaby'
			},
			{
				subject: 'Math',
				start_time: '10:30',
				end_time: '12:30',
				instructor: 'DaBaby2'
			}
		]
	};
</script>

<div class="lg:w-1/6 md:w-1/2 w-full px-4">
	<h2 class="title-font font-medium text-white tracking-widest text-sm mb-3">{data.day}</h2>
	<div class="list-none mb-10 ">
		{#each data.subjects as subject}
			<li>
				<span class="text-gray-400">{@html subject.subject}</span>
			</li>
		{/each}
	</div>
</div>

<!--
        <li>
            <span class="text-gray-400">First Link</span>
        </li>
        <li>
            <span class="text-gray-400">Second Link</span>
        </li>
        <li>
            <span class="text-gray-400">Third Link</span>
        </li>
        <li>
            <span class="text-gray-400">Fourth Link</span>
        </li>
-->
