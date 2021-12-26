<script lang="ts">
	import SucessAlert from '$lib/AdminSucessAlert.svelte';
	import { goto } from '$app/navigation';
	import { variables } from '$lib/variables';

	let SucessShown = false;
	let transaction_id = '';
	// Handle Form
	async function handle_form_submit(event) {
		const form_data = new FormData(event.target);
		const data = {
			title: '',
			subtitle: '',
			message: ''
		};

		for (let field of form_data) {
			const [key, value] = field;
			data[key] = value;
		}
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
		setTimeout(() => {
			goto('/admin');
		}, 2000);
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
							type="text"
							id="subtitle"
							name="subtitle"
							class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-green-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
					</div>
				</div>
				<div class="p-2 w-full">
					<div class="relative">
						<label for="message" class="leading-7 text-sm text-gray-400">Message</label>
						<textarea
							id="message"
							name="message"
							class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-green-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />
					</div>
				</div>
				<div class="p-2 w-full">
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
