<script lang="ts">
    import { screen } from '$lib/shared.svelte';

    let { turn, setTurn, reset } = $props();

    let resetGame = $derived(reset);

    $effect(() => {
        if (resetGame) {
            for (const cellId in gameState) {
                gameState[cellId].value = '';
                const cellButton = document.getElementById(cellId) as HTMLButtonElement;
                if (cellButton) {
                    cellButton.innerHTML = '';
                }
            }
        }
    });

    const gameState: { [key: string]: { index: number; value: string } } = $state({
        'cell-1': { index: 1, value: '' },
        'cell-2': { index: 2, value: '' },
        'cell-3': { index: 3, value: '' },
        'cell-4': { index: 4, value: '' },
        'cell-5': { index: 5, value: '' },
        'cell-6': { index: 6, value: '' },
        'cell-7': { index: 7, value: '' },
        'cell-8': { index: 8, value: '' },
        'cell-9': { index: 9, value: '' }
    })

    function handleClick(event: MouseEvent) {
        const target = event.target as HTMLButtonElement;
        const cellId = target.id;

        if (gameState[cellId]?.value !== '') {
            return;
        }

        if (turn === 'X') {
            target.innerHTML = '<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fill-rule="evenodd"/></svg>';
        } else if (turn === 'O') {
            target.innerHTML = '<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/></svg>';
        }
        

        gameState[cellId].value = turn;
        setTurn(turn === 'X' ? 'O' : 'X');
    }

</script>


{#key resetGame}
<section class="game-board__container {screen.value !== 'play' ? 'hide' : ''}">
    <div class="game-board">
        {#each Object.entries(gameState) as [cellId, cellData] (cellId)}
            <button class="cell" id={cellId} data-cell={cellData.index} aria-label={cellId} onclick={handleClick}></button>
        {/each}
    </div>
</section>
{/key}

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
        gap: var(--s-250);
    }


    .cell {
        width: var(--s-1200);
        height: var(--s-1200);
        background-color: var(--slate-800);
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: var(--s-500);
        cursor: pointer;
        box-shadow: 0 7px 0px 0 color-mix(in srgb, var(--neutral-950) 50%, var(--slate-800) 50%);
        border-radius: var(--radius-10);
    }

    .hide {
        display: none;
    }
</style>