<script>
	export let time = new Date();
	export let data = {
		subject: 'Subject',
		start_time: 'HH:MM',
		end_time: 'HH:MM',
		instructor: 'DaBaby'
	};
	// Start Time
	let start = new Date();
	let a = data.start_time.split(':');
	start.setHours(Number(a[0]));
	start.setMinutes(Number(a[1]));

	// End Time
	let end = new Date();
	let b = data.end_time.split(':');
	end.setHours(Number(b[0]));
	end.setMinutes(Number(b[1]));

	$: active = time > start && time < end;
</script>

<tr class={active ? 'bg-gray-600 text-white border-none' : ''}>
	<td class="border-t-2 border-b-2 border-gray-800 px-4 py-3 text-lg ">{data.subject}</td>
	<td class="border-t-2 border-b-2 border-gray-800 px-4 py-3">{data.start_time}</td>
	<td class="border-t-2 border-b-2 border-gray-800 px-4 py-3">{data.end_time}</td>
	<td class="border-t-2 border-b-2 border-gray-800 px-4 py-3">{data.instructor}</td>
</tr>
