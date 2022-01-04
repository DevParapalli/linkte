<script lang="ts">
	import TimeTableItem from '$lib/TimeTableItem.svelte';
	import TimeTableList from '$lib/TimeTableList.svelte';
	import timetable from '../timetable.json';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
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
	// TODO: Refactor this to reduce the number of reactive stores
	$: param_index = parseInt($page.url.searchParams.get('day'))
	$: timetable_index = param_index || param_index === 0 ? param_index : current_time.getDay()
	$: current_timetable = timetable.days[timetable_index];
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
			<div class="flex flex-wrap flex-row w-full justify-between items-center mb-8">
				{#if timetable_index !== 0}
					<a href="/timetable?day={timetable_index - 1}" class="flex items-center justify-center text-white rounded-full h-8 w-8 bg-gray-800" >
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
					</a>
				{:else}
					<span>
					</span>
				{/if}

				<span class="text-bold text-base text-white " >
					{current_timetable.day}
				</span>
				{#if timetable_index !== 6}
					<a href="/timetable?day={timetable_index + 1}" class="flex items-center justify-center text-white rounded-full h-8 w-8 bg-gray-800">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
					</a>
				{:else}
					<span />
				{/if}
			</div>
			{#if current_timetable.display}
				<table class="table-auto w-full text-left whitespace-no-wrap">
					<thead>
						<tr>
							<th class="px-4 py-3 title-font tracking-wider font-extrabold text-white text-sm  bg-gray-800 rounded-tl rounded-bl"
								>Subjects</th>
							<th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Start Time</th>
							<th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">End Time</th>
							<th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Instructor</th>
						</tr>
					</thead>
					<tbody>
						{#each current_timetable.subjects as item, i}
							<TimeTableItem data={item} time={current_time} />
						{/each}
					</tbody>
				</table>
			{:else}
				<h1 class="text-2xl text-center font-medium title-font text-white">There are no classes scheduled for {current_timetable.day}. Enjoy! :)</h1>
			{/if}
		</div>
	</div>
</section>

<section class="text-gray-400 bg-gray-900 body-font">
	<div class="container px-5 py-24 mx-auto">
		<div class="flex flex-wrap justify-between md:text-left text-center -mb-10 -mx-4">
			{#each timetable.days as day, i}
				{#if day.display}
					<TimeTableList data={day} index={i} />
				{:else}
					<!-- Blank for non display ones -->
				{/if}
			{/each}
		</div>
	</div>
</section>
