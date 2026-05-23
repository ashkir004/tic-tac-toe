<script>
    import logo from '$lib/assets/logo.svg';
	import GameBoard from '$lib/components/GameBoard.svelte';
    import Menu from '$lib/components/Menu.svelte';
    import { screen } from '$lib/shared.svelte';
</script>


<main>
    <header>
        <img src={logo} alt="XO logo" class="logo" />
        <div class="controls__container {screen.value === 'menu' ? 'hide' : ''}">
            <button class="btn btn-turn text-preset-4">                        
                <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill-rule="evenodd"/></svg>
                Turn</button>
            <button class="btn btn-reset" aria-label="reset">
                <svg xmlns="http://www.w3.org/2000/svg"><path d="M19.524 0h-1.88a.476.476 0 0 0-.476.499l.159 3.284A9.81 9.81 0 0 0 9.835.317C4.415.317-.004 4.743 0 10.167.004 15.597 4.406 20 9.835 20a9.796 9.796 0 0 0 6.59-2.536.476.476 0 0 0 .019-.692l-1.348-1.349a.476.476 0 0 0-.65-.022 6.976 6.976 0 0 1-9.85-.63 6.987 6.987 0 0 1 .63-9.857 6.976 6.976 0 0 1 10.403 1.348l-4.027-.193a.476.476 0 0 0-.498.476v1.881c0 .263.213.476.476.476h7.944A.476.476 0 0 0 20 8.426V.476A.476.476 0 0 0 19.524 0Z"/></svg>
            </button>
        </div>
    </header>

    <Menu />

    <GameBoard />

</main>

<style>
    .hide {
        display: none;
    }
</style>