<script lang="ts">
import { dev } from "$app/env";
import { goto } from "$app/navigation";


    // https://wa.me/<number> is the link, use full international standard number
    function get_formatted_number(input_number: string) {
        if (input_number.startsWith("+")) {
            // Person has inputted the number in the format +91XXXXXXXXXX
            input_number = input_number.replace("+", "00");
        }
        if (input_number.length === 10) {
            // Person has inputted the number in the format XXXXXXXXXX
            input_number = "0091" + input_number;
        }
        return input_number;
    }

    let number_input;

    function on_submit(event) { 
        dev ? console.log(event): null;
        goto(`https://wa.me/${get_formatted_number(number_input)}`);
    }
</script>

<section class="text-gray-400 bg-gray-900 body-font">
    <div class="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
      <!-- <img class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600"> -->
      <div class="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">WhatsApp Tool</h1>
        <p class="mb-8 leading-relaxed">Send a message without saving as a contact</p>
        <div class="flex w-full justify-center items-end">
          <div class="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
            <label for="hero-field" class="leading-7 text-sm text-gray-400">Enter phone number (Intl or 10-digit formats)</label>
            <input type="text" bind:value="{number_input}" pattern="\d+" id="hero-field" name="hero-field" class="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-green-900 focus:bg-transparent focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
          </div>
          <button on:click="{on_submit}" class="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">Submit</button>
        </div>
        <p class="text-sm mt-2 text-gray-500 mb-8 w-full">00918793150182 or 8793150182 works similarly</p>
      </div>
    </div>
  </section>