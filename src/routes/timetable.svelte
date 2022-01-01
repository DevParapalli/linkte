<script lang="ts">
	import TimeTableItem from '$lib/TimeTableItem.svelte';
	import TimeTableList from '$lib/TimeTableList.svelte';
	import timetable from '../timetable.json';
	import { onMount } from 'svelte';
	let current_time = new Date();
	onMount(() => {
		let time_update = () => {
			current_time = new Date();
		};
		let interval = setInterval(time_update, 1000);
		return () => {
			clearInterval(interval);
		};
	});
	let current_timetable = timetable.days[current_time.getDay()];
</script>

<section class="text-gray-400 bg-gray-900 body-font">
	<div class="container px-5 pt-14 pb-auto mx-auto">
		<div class="flex flex-col text-center w-full mb-20">
			<h2 class="text-xs text-green-400 tracking-widest font-medium title-font mb-1 header-time">
				{current_time.toLocaleDateString('en-IN', { weekday: 'long' }) +
				', ' +
				current_time.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) +
				' | ' +
				current_time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
			</h2>
			<h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">{timetable.title}</h1>
			<p class="lg:w-2/3 mx-auto leading-relaxed text-base">
				{@html timetable.description}
			</p>
		</div>
		<div class="lg:w-2/3 w-full mx-auto overflow-auto">
			{#if current_timetable.display}
				<table class="table-auto w-full text-left whitespace-no-wrap">
					<thead>
						<tr>
							<th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 rounded-tl rounded-bl">Subject</th>
							<th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Start Time</th>
							<th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">End Time</th>
							<th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Instructor</th>
						</tr>
					</thead>
					<tbody>
						{#each current_timetable.subjects as item}
							<TimeTableItem data={item} time={current_time} />
						{/each}
					</tbody>
				</table>
			{:else}
				<h1 class="text-2xl text-center font-medium title-font text-white">There are no classes scheduled today. Enjoy! :)</h1>
			{/if}
		</div>
	</div>
</section>

<section class="text-gray-400 bg-gray-900 body-font">
	<div class="container px-5 py-24 mx-auto">
		<div class="flex flex-wrap justify-between md:text-left text-center -mb-10 -mx-4">
			{#each timetable.days as day}
				{#if day.display}
					<TimeTableList data={day} />
				{:else}
					<!-- Blank for non display ones -->
				{/if}
			{/each}
		</div>
	</div>
</section>
