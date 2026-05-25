<script lang="ts">
    import { screen } from '$lib/shared.svelte';

    let { score } = $props();

</script>


<section class="scoreboard {screen.value !== 'play' ? 'hide' : ''}">
    <div class="player-score p1 text-preset-6">X(P1)<p class="text-preset-3">{score.player1}</p></div>
    <div class="tie-score text-preset-6">Ties<p class="text-preset-3">{score.draw}</p></div>
    <div class="player-score p2 text-preset-6">O(P2)<p class="text-preset-3">{score.player2}</p></div>
</section>

<style>
    .scoreboard {
        display: flex;
        flex-direction: row;
        gap: var(--s-250);
        justify-content: center;
        align-items: center;
    }

    .player-score, .tie-score {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--s-50);
        text-transform: uppercase;
        padding: var(--s-200) var(--s-400);
        border-radius: var(--radius-10);
        color: var(--slate-900);
    }

    .player-score.p1 {
        background-color: var(--teal-400);
    }

    .tie-score {
        background-color: var(--slate-300);
    }

    .player-score.p2 {
        background-color: var(--amber-400);
    }

    .hide {
        display: none;
    }
</style>