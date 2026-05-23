<script>
    import { screen } from '$lib/shared.svelte';
</script>



<section class="game-board__container {screen.value !== 'play' ? 'hide' : ''}">
    <div class="game-board">
        <button class="cell" id="1">0</button>
        <button class="cell" id="2">1</button>
        <button class="cell" id="3">2</button>
        <button class="cell" id="4">3</button>
        <button class="cell" id="5">4</button>
        <button class="cell" id="6">5</button>
        <button class="cell" id="7">6</button>
        <button class="cell" id="8">7</button>
        <button class="cell" id="9">8</button>
    </div>
</section>


<style>

    .game-board__container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .game-board {
        display: grid;
        grid-template-columns: repeat(3, var(--s-1200));
        grid-template-rows: repeat(3, var(--s-1200));
        gap: var(--s-100);
    }


    button {
        width: var(--s-1200);
        height: var(--s-1200);
        background-color: var(--slate-800);
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: var(--s-500);
        cursor: pointer;
    }

    .hide {
        display: none;
    }
</style>