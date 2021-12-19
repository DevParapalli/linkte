<script lang="ts">
    import type {Link} from '$lib/types';
    import {default_link} from '$lib/types';
    export let link_data: Link = default_link;

</script>

<a href="{link_data.href}" target="_blank" title="{link_data.description}">
    <span class="items-center bg-gray-800 h-4 inline-flex justify-center mr-2 rounded-full text-green-400 w-4">
        <svg aria-hidden=true class="h-3 w-3"height=1em preserveAspectRatio="xMidYMid meet"role=img viewBox="0 0 24 24"width=1em
            xmlns=http://www.w3.org/2000/svg
            xmlns:xlink=http://www.w3.org/1999/xlink>
            <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7a5 5 0 0 0-5 5a5 5 0 0 0 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8v2m9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1c0 1.71-1.39 3.1-3.1 3.1h-4V17h4a5 5 0 0 0 5-5a5 5 0 0 0-5-5z"fill=currentColor />
        </svg>
    </span>{link_data.title}
</a>