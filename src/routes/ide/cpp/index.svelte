<script lang="ts">
	import { onMount } from 'svelte';
	import type { editor as monaco_editor } from 'monaco-editor';
    

	import JSCPP from 'JSCPP';
import { provide_completion_items } from '$lib/languages/cpp';

    let _monaco: typeof import('monaco-editor');

	let editor: monaco_editor.IStandaloneCodeEditor; // This is the monaco editor instance
	let monacoEl: HTMLDivElement; // This is the reference to the editor HTMLElement

	onMount(() => {
		import('monaco-editor').then((monaco) => {
            _monaco = monaco;
			if (monacoEl && !editor) {
				editor = monaco.editor.create(monacoEl, {
					value: '#include <iostream>\n//I couldn\'t impliment all headers/libs.\n\nusing namespace std;\nint main() { \n\tint a;\n\tcin >> a; //Supports CIN using the Input field below\n\tcout << "Number Entered : " << a << endl; \n\t// Look in the browser console to see more details.\n\treturn 0;\n}',
					language: 'c',
					theme: 'vs-dark',
					automaticLayout: true,
					scrollBeyondLastLine: false,
					fontSize: 14,
					lineNumbers: 'on',
					minimap: {
						enabled: false
					}
				});
			}
			// Register the C and C++ Languages
			// monaco.languages.register({ id: 'cpp' });
			monaco.languages.registerCompletionItemProvider('c', {
			    provideCompletionItems: provide_completion_items
			})
            monaco.languages.registerCompletionItemProvider('cpp', {
			    provideCompletionItems: provide_completion_items
			})
		});
	});

	let cin = '5';
	let cout = 'Press the RUN CODE button.';

	const JSCPPConfig: JSCPP.JSCPPConfig = {
		stdio: {
			write: (s: string) => {
				cout += s;
			}
		},
		unsigned_overflow: 'error'
	};
	function handle_keydown(e: KeyboardEvent) {
		if (e.ctrlKey && e.key == 's') {
			e.preventDefault();
			e.stopPropagation();
			save_as();
		}
	}

	function save_as() {
		const blob = new Blob([editor.getValue()], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'test.cpp';
		a.click();
		URL.revokeObjectURL(url);
	}

    function find_line_column_from_error(input: string) {
    const parsing_error_regex = /line (?<line>[0-9]+) \(column (?<column>[0-9]+)\):/i;
    const cpp_error_regex = /(?<line>[0-9]+):(?<column>[0-9]+)/i;
    if (parsing_error_regex.test(input)) {
        const r_match = input.match(parsing_error_regex);
        const _line = parseInt(r_match.groups.line);
        const _column = parseInt(r_match.groups.column);
        return { line: _line, column: _column };
    }
    else if (cpp_error_regex.test(input)) {
        const r_match = input.match(cpp_error_regex)
        const _line = parseInt(r_match.groups.line);
        const _column = parseInt(r_match.groups.column);
        return { line: _line, column: _column };
    }
    else {
        return { line: NaN, column: NaN };
    }
}

	let decorations = [];
	function run_code() {
		// Clear Output
		cout = '';
        decorations = editor.deltaDecorations(decorations, []);
		// Get the actual code from within the Monaco Editor
		const code = editor.getValue();
		console.info(`code:\n${code}`);
		console.info(`cin:\n${cin}`);
		// Start a timer to get the time it takes to run the code
		const t1 = performance.now();
		// Run the code
		let exitcode = -1;
		try {
			exitcode = JSCPP.run(code, cin, JSCPPConfig);
		} catch (e) {
            const {line, column} = find_line_column_from_error(e.message)
            decorations = editor.deltaDecorations(decorations, [
                {
                    range: new _monaco.Range(line, column, line, column),
                    options: {
                        // isWholeLine: true,
                        className: 'error-line'
                    }
                }
            ]);
			cout += e.message;
		}
		// Stop the timer
		const t2 = performance.now();
		// Display the output
		console.info(`exitcode: ${exitcode}`);
		console.info(`cout:\n${cout}`);
		console.info(`time: ${(t2 - t1) / 1000}s`);
		// Add a program terminated in xx seconds
		cout = cout + `\n[Done] exited with code=${exitcode} in ${((t2 - t1) / 1000).toFixed(3)}s\n`;
	}
</script>

<svelte:window on:keydown={handle_keydown} />

<div class="container">
	<div class="editor" bind:this={monacoEl} />
	<div class="container form-control w-full">
		<label for="cin" class="label">
			<span class="label-text">Input</span>
		</label>
		<input bind:value={cin} id="cin" type="text" placeholder="Type here" class="input input-bordered w-full" />
		<div class="container text-center w-full">
			<div class="btn-group mt-4">
				<button on:click={run_code} class="btn flex-1">Run Code</button>
				<button class="btn flex-1 btn-disabled">Debug Code</button>
			</div>
		</div>
	</div>
	<div class="container w-full mt-8">
		<label for="cout" class="label">
			<span class="label-text">Output</span>
		</label>
		<textarea readonly bind:value={cout} class="input w-full h-64" name="stdout" id="cout" />
	</div>
</div>

<style>
	.editor {
		height: 50vh;
		@apply mt-4 mb-8;
	}
</style>
