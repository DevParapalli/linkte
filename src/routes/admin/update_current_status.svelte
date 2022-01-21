<script lang="ts">
	import SucessAlert from '$lib/AdminSucessAlert.svelte';
	import { variables } from '$lib/variables';
	import Editor from '@tinymce/tinymce-svelte';
	import { onMount } from 'svelte';

	let SucessShown = false;
	let transaction_id = '';
	// Handle Form
	let data = {
		title: '',
		subtitle: '',
		message: '',
		visible: 'off'
	};
	// populate using previous data
	onMount(async () => {
		let response = await fetch(`https://dweet.io:443/get/latest/dweet/for/${variables.DWEET_KEY}`);
		let _data = await response.json();
		data = _data.with[0].content;
	});
	async function handle_form_submit(event) {
		const form_data = new FormData(event.target);

		for (let field of form_data) {
			const [key, value] = field;
			data[key] = value;
		}
		// Checking for Checkbox
		for (let field of form_data) {
			const [key, _] = field;
			if (key == 'visible') {
				data['visible'] = 'on';
			} else {
				data['visible'] = 'off';
			}
		}

		console.log(data);
		if (data.title == '' || data.subtitle == '' || data.message == '') {
			return alert('Please fill out all fields');
		}
		const response = await fetch(`https://dweet.io:443/dweet/for/${variables.DWEET_KEY}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		const res_json = await response.json();
		transaction_id = res_json.with.transaction;

		SucessShown = true;
		//console.log(data)
		//setTimeout(() => {
		//	goto('/admin');
		//}, 2000);
	}
</script>

<section class="text-gray-400 bg-gray-900 body-font relative">
	<div class="container px-5 py-24 mx-auto">
		<div class="flex flex-col text-center w-full mb-12">
			<h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Update Current Status</h1>
			<p class="lg:w-2/3 mx-auto leading-relaxed text-base">
				Update the text as follows:- <br />
				1. Title: Should be Title-case, Very Short (less than 50 chars) <br />
				2. Author: Should be Title-case, Enter Your Name <br />
				3. Message: Enter the message formatted properly, use html tags {'<br />'} if you need to break the line <br />
			</p>
		</div>
		<div class="lg:w-1/2 md:w-2/3 mx-auto">
			<form class="flex flex-wrap -m-2" on:submit|preventDefault={handle_form_submit}>
				<div class="p-2 w-1/2">
					<div class="relative">
						<label for="title" class="leading-7 text-sm text-gray-400">Title</label>
						<input
							bind:value={data.title}
							type="text"
							id="title"
							name="title"
							class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-green-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
					</div>
				</div>
				<div class="p-2 w-1/2">
					<div class="relative">
						<label for="email" class="leading-7 text-sm text-gray-400">Author</label>
						<input
							bind:value={data.subtitle}
							type="text"
							id="subtitle"
							name="subtitle"
							class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-green-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
					</div>
				</div>
				<div class="p-2 w-full">
					<div class="relative">
						<label for="message" class="leading-7 text-sm text-gray-400">Message</label>
						<div class="">
							<Editor
								conf={{
									skin: 'oxide-dark',
									content_css: 'dark',
									menubar: false,
									toolbar: 'undo redo | bold italic | link image',
									plugins: 'autolink lists link image print preview',
									// Link Plugin conf
									default_link_target: '_blank',
									//link_assume_external_targets: 'https',
									link_default_protocol: 'https',
									default_link_class: 'text-green-500 hover:underline hover:text-green-400 px-2 mx-2',
									link_class_list: [{ title: 'None', value: 'text-green-500 hover:underline hover:text-green-400 px-2 mx-2' }]
								}}
								bind:value={data.message}
								apiKey={variables.TINYMCE_KEY} />
						</div>
						<textarea id="message" name="message" class="hidden invisible" bind:value={data.message} />
					</div>
				</div>
				<div class="p-2 w-full align-middle">
					<label for="visible" class="text-white pr-2">
						<input type="checkbox" class="form-checkbox rounded h-4 w-4 -translate-y-[0.125rem] text-green-600 bg-green-600" name="visible" id="visible" />
						Visible ?
					</label>

					<button class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-xl">Submit</button>
				</div>
			</form>
		</div>
	</div>
</section>

{#if SucessShown}
	<SucessAlert data={{ 'trans-id': transaction_id }} />
{:else}
	<!-- else content here -->
{/if}
