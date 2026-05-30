<script lang="ts">
	import favicon from '$lib/assets/favicon-32x32.png';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
	:global([data-cellvalue='true'] > svg.mark-x > path) {
		fill: var(--slate-900);
	}
</style>
