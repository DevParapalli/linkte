<script lang="ts">
	import { dev } from '$app/env';
	import { goto } from '$app/navigation';

	let selected: string;
	let video_location: string;
	let raw_location: string;
	let is_dragging: boolean;
	$: is_yt = selected ? selected.includes('youtube') : false;

	function handle_button_click(event: Event) {
		event.preventDefault();
		if (raw_location) {
			if (selected.includes('youtube')) {
				goto('/video/youtube?src=' + video_location);
			} else {
				goto('/video/native?src=' + video_location);
			}
		} else {
			alert('Please check your inputs...');
		}
	}
	function handle_input_change(event: Event) {
		// TS Method 1 of Typecasting
		let raw_video = (<HTMLInputElement>event.target).value;
		let rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/gm;
		if (raw_video.length == 11) {
			// Case for when someone directly inputs video id
			video_location = raw_video;
			return;
		} else {
			let res = rx.exec(raw_video);
			if (dev) {
				console.log(res);
			}
			video_location = res[1];
		}
	}

	function handle_file_change(event: Event) {
		// TS Method 2 of Typecasting
		let file_list = (event.target as HTMLInputElement).files;
		let file = file_list[0];
		let URL = window.URL || window.webkitURL;
		video_location = URL.createObjectURL(file);
		if (dev) {
			console.log(video_location);
		}
	}

	function handle_file_drop(event: Event) {
		// Prevent the browser opening the file in a new tab.
		event.preventDefault();
		if (dev) {
			console.log(event);
		}
	}
	function handle_drag_over(event: Event) {
		event.preventDefault();
		if (dev) {
			console.log(event);
		}
	}
	function handle_drag_end(event: Event) {
		event.preventDefault();
		if (dev) {
			console.log(event);
		}
	}
</script>

<section on:drop={handle_file_drop} on:dragover={handle_drag_over} on:dragend={handle_drag_end} class="text-gray-400 bg-gray-900 body-font relative h-screen w-screen">
	<div class="container px-5 py-24 mx-auto">
		<div class="flex flex-col text-center w-full mb-12">
			<h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Video ?</h1>
			<p class="lg:w-2/3 mx-auto leading-relaxed text-base font-mono bg-gray-900 px-2 py-1 rounded-lg">
				{is_dragging ? 'Try dropping the video now.' : 'You can even drag and drop a video on this page.'}
			</p>
		</div>
		<div class="lg:w-1/2 md:w-2/3 mx-auto">
			<div class="flex flex-wrap -m-2">
				<div class="p-2 w-1/2">
					<div class="relative">
						<label for="name" class="leading-7 text-sm text-gray-400">Type of Video</label>
						<select
							bind:value={selected}
							name="video-type"
							id="type"
							class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 hover:border-green-500 hover:bg-gray-900 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-green-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
							<option value="youtube">YouTube</option>
							<option default value="local">Local Video</option>
						</select>
					</div>
				</div>
				<div class="p-2 w-1/2">
					{#if is_yt}
						<div class="relative">
							<label for="src" class="leading-7 text-sm text-gray-400">Video URL / ID</label>
							<input
								bind:value={raw_location}
								on:change={handle_input_change}
								type="text"
								id="src"
								name="src"
								class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-green-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
						</div>
					{:else}
						<div class="relative">
							<span class="leading-7 text-sm text-gray-400">Choose Video</span>
							<label
								for="src"
								class="form-control bg-gray-800  rounded border border-gray-700 text-base outline-none w-full py-1 px-3 leading-8 transition-colors duration-200 ease-in-out hover:bg-gray-900 hover:border-green-500">
								{raw_location ? raw_location.split('\\').pop().split('/').pop() : 'Select a File'}
								<input bind:value={raw_location} type="file" id="src" name="src" required on:change={handle_file_change} class="hidden" />
								<!--form-control w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-green-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out-->
							</label>
							<span class="text-sm text-gray-400">Supported: mp4, webm, webv</span>
						</div>
					{/if}
				</div>
				<div class="p-2 w-full">
					<div class="relative">
						<!--TODO: Figure something for this.-->
						<label for="message" class=" hidden leading-7 text-sm text-gray-400">Message</label>
						<textarea
							id="message"
							name="message"
							class="hidden w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-green-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />
					</div>
				</div>
				<div class="p-2 w-full">
					<button on:click={handle_button_click} class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
						>Submit</button>
				</div>
			</div>
		</div>
	</div>
</section>

<!--
    <video></video>
    <br/>
    <form>
    <input type="file" name="file" id="fileItem" onchange="onChange()" >
    <input type="submit" value="Play">
    </form>

    var URL = window.URL || window.webkitURL;
    var video = document.getElementsByTagName('video')[0];
    function onChange() {
        var fileItem = document.getElementById('fileItem');
        var files = fileItem.files;
        var file = files[0];
        var urlBlob = URL.createObjectURL(file);
        video.src = url;
        video.load();
        video.onloadeddata = function() {
            video.play();
        }
    }


for (i = 0; i < urls.length; ++i) {
    r = urls[i].match(rx);
    console.log(r[1]);
}


-->
