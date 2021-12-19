<script lang="ts">
    import {page} from '$app/stores'
    import { goto } from '$app/navigation';
    const file_location = $page.query.get('file_location')
    if (file_location === null){
        goto('/')
    }
    
</script>