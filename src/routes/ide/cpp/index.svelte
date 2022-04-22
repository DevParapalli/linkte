<script>
	// import * as monaco from ';
	import { onMount } from 'svelte';
// import { element } from 'svelte/internal';

	let editor;
	let monacoEl;
    let code;
	onMount(() => {
        import("monaco-editor").then((monaco) => {
            if (monacoEl && !editor) {
            editor = monaco.editor.create(monacoEl, {
                value: '#include <iostream>',
                language: 'c',
                theme: 'vs-dark',
                automaticLayout: true,
                fontSize: 14,
                lineNumbers: 'on',
                minimap: {
                    enabled: false
                }
            });
		}
        })
	});

function onRunClick(event) {
    let value = editor.getValue();
    console.log(value);
}

</script>

<button on:click="{onRunClick}">RUN</button>
<div class="editor" bind:this={monacoEl}>
</div>

<style>
    .editor {
        height: 50vh;
        @apply m-4
    }
</style>