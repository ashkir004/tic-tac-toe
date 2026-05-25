<script lang="ts">
    import { screen, setScreen } from '$lib/shared.svelte';
    import { checkWin, checkDraw } from '$lib/tic-tac-toe';

    let { updateScore, resetScore, turn, setTurn, reset, setReset, player1 } = $props();
    let resetGame = $derived(reset);

    let gameState: { [key: string]: { index: number; value: string } } = $state({
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

    let winner: { value: string | null } = $state({ value: null });
    function setWinner(value: string | null) {
        winner.value = value;
    }

    function resetBoard() {
        for (const cellId in gameState) {
            gameState[cellId].value = '';
            const cellButton = document.getElementById(cellId) as HTMLButtonElement;
            if (cellButton) {
                cellButton.innerHTML = '';
            }

        }
        setWinner(null);
    }

    $effect(() => {

        if (resetGame) {
            resetBoard();
            setReset(false);
            return;
        }

        if (winner.value !== null) return;

        const currentWinner = checkWin(Object.values(gameState).map(cell => cell.value));
        if (currentWinner) {
            setWinner(currentWinner);
            updateScore(currentWinner);
            return;
        }

        const isDraw = checkDraw(Object.values(gameState).map(cell => cell.value));
        if (isDraw) {
            setWinner('draw');
            updateScore('draw');
            return;
        }

    });


    function handleClick(event: MouseEvent) {
        const target = event.target as HTMLButtonElement;
        const cellId = target.id;

        if (gameState[cellId]?.value !== '') {
            return;
        }

        if (turn === 'X') {
            target.innerHTML = `<svg class="mark-x" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fill-rule="evenodd"/></svg>`;
        } else if (turn === 'O') {
            target.innerHTML = `<svg class="mark-o" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32C0,14.327,14.327,0,32,0Zm0,18.963c-7.2,0-13.037,5.837-13.037,13.037c0,7.2,5.837,13.037,13.037,13.037c7.2,0,13.037-5.837,13.037-13.037C45.037,24.8,39.2,18.963,32,18.963Z" fill="#F2B137"/></svg>`;
        }
        
        gameState = { ...gameState, [cellId]: { ...gameState[cellId], value: turn } };
        setTurn(turn === 'X' ? 'O' : 'X');
    }

</script>

<section class="game-board__container {screen.value !== 'play' ? 'hide' : ''}">
    <div class="game-board">
        {#each Object.entries(gameState) as [cellId, cellData] (cellId)}
            <button class="cell {winner.value ? 'winner-' + winner.value : ''}" id={cellId} data-cell={cellData.index} data-winner={cellData.value === winner.value} aria-label={cellId} onclick={handleClick}></button>
        {/each}
    </div>

    <div class="overlay {winner.value === null ? 'hide' : ''}">

        <h1 class="overaly__title text-preset-5-bold">
            { winner.value === player1.mark ? 'You Won!' : winner.value === 'draw' ? '' : 'Oh No, You Lost...' }
        </h1>

        <div class="overlay__content"> 
            {#if winner.value === 'X'}
                <p class="overlay__message text-preset-2 {winner.value === 'X' ? 'winner-' + winner.value : ''}">
                    <svg class="mark-x" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fill-rule="evenodd"/></svg>
                    takes the round</p>
                {:else if winner.value === 'O'}
                <p class="overlay__message text-preset-2 {winner.value === 'O' ? 'winner-' + winner.value : ''}">
                    <svg class="mark-o" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32C0,14.327,14.327,0,32,0Zm0,18.963c-7.2,0-13.037,5.837-13.037,13.037c0,7.2,5.837,13.037,13.037,13.037c7.2,0,13.037-5.837,13.037-13.037C45.037,24.8,39.2,18.963,32,18.963Z" fill="#F2B137"/></svg>
                    takes the round</p>
                {:else if winner.value === 'draw'}
                    <p class="overlay__message text-preset-2">Round Tied</p>
                {/if}
            <div class="overlay__controls">
                <button
                    onclick={() => {
                        resetScore();
                        resetBoard();
                        setScreen('menu');
                    }}
                    class="quit text-preset-4">Quit</button>
                <button 
                    onclick={() => {
                        resetBoard();
                        setTurn('X');
                        setScreen('play');
                    }}
                    class="next-round text-preset-4">Next Round</button>
            </div>
        </div>
    </div>
</section>

<style>

    .game-board__container {
        width: 100%;
        display: grid;
        place-items: center;
    }

    .game-board {
        display: grid;
        grid-template-columns: repeat(3, var(--s-1200));
        grid-template-rows: repeat(3, var(--s-1200));
        gap: var(--s-250);
        grid-column: 1 / -1;
        grid-row: 1 / -1;
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

    .winner-X[data-winner=true] {
        background-color: var(--teal-400);
    }

    .winner-O[data-winner=true] {
        background-color: var(--amber-400);
    }

    .overlay {
        background-color: var(--slate-800);
        grid-column: 1 / -1;
        grid-row: 1 / -1;
        justify-self: stretch;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--s-200);
        text-transform: uppercase;
        padding: var(--s-400) 0;
        z-index: 10;
    }

    .overlay__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--s-300);
        color: var(--teal-400);
    }

    .overlay__message {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: var(--s-100);
    }

    .overlay__message.winner-X {
        color: var(--teal-400);
    }

    .overlay__message.winner-O {
        color: var(--amber-400);
    }

    .overlay__message .mark-x, .overlay__message .mark-o {
        width: var(--s-375);
        height: var(--s-375);
    }

    .overlay__controls {
        display: flex;
        flex-direction: row;
        gap: var(--s-200);
    }

    .overlay__controls button {
        border: none;
        padding: var(--s-200) var(--s-200);
        text-transform: uppercase;
        cursor: pointer;
    }

    .overlay__controls .quit {
        background-color: var(--slate-300);
        color: var(--slate-900);
        border-radius: var(--radius-10);
        box-shadow: 0px 5px 0px 0px color-mix(in srgb, var(--slate-300) 50%, var(--neutral-950) 50%);
    }

    .overlay__controls .next-round {
        background-color: var(--amber-400);
        color: var(--slate-900);
        border-radius: var(--radius-10);
        box-shadow: 0px 5px 0px 0px color-mix(in srgb, var(--amber-400) 50%, var(--neutral-950) 50%);
    }

    .hide {
        display: none;
    }

    @media (min-width: 48rem) {
        .cell {
            width: var(--s-1300);
            height: var(--s-1300);
        }
    }
</style>