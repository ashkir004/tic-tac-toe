<script lang="ts">
    import { screen, setScreen } from '$lib/shared.svelte';
    import { checkWin, checkDraw, cpuMove } from '$lib/tic-tac-toe';
	import Overlay from '$lib/components/Overlay.svelte';
	import { trapFocusBoard } from '$lib/attachments.svelte';

    let { updateScore, resetScore, turn, setTurn, reset, setReset, player1, player2 } = $props();

    type Mark = 'X' | 'O';
    type CellValue = '' | Mark;

    let gameState: { [key: string]: { index: number; value: CellValue } } = $state({
        'cell-1': { index: 0, value: '' },
        'cell-2': { index: 1, value: '' },
        'cell-3': { index: 2, value: '' },
        'cell-4': { index: 3, value: '' },
        'cell-5': { index: 4, value: '' },
        'cell-6': { index: 5, value: '' },
        'cell-7': { index: 6, value: '' },
        'cell-8': { index: 7, value: '' },
        'cell-9': { index: 8, value: '' }
    })

    let winner: { value: string | null; cells: number[] } = $state({ value: null, cells: [] });
    let cpuTimeout: ReturnType<typeof setTimeout> | null = null;

    function setWinner(value: string | null, cells: number[] = []) {
        winner.value = value;
        winner.cells = cells;
    }

    function clearCpuTimeout() {
        if (cpuTimeout) {
            clearTimeout(cpuTimeout);
            cpuTimeout = null;
        }
    }

    function setCell(cellIndex: number, value: Mark) {
        if (winner.value !== null || turn !== value) {
            return false;
        }

        const cellId = `cell-${cellIndex + 1}`;
        const cell = gameState[cellId];

        if (!cell || cell.value !== '') {
            return false;
        }

        gameState = { ...gameState, [cellId]: { ...cell, value } };
        setTurn(value === 'X' ? 'O' : 'X');
        return true;
    }

    function restartGame() {
        resetBoard();
    }

    function resetBoard() {
        clearCpuTimeout();

        for (const cellId in gameState) {
            gameState[cellId].value = '';
        }

        setWinner(null);
    }

    $effect(() => {
        if (screen.value !== 'play') {
            resetBoard();
        }
    });

    $effect(() => {
        const boardValues = Object.values(gameState).map(cell => cell.value);

        if (winner.value !== null) {
            clearCpuTimeout();
            return;
        }

        const { mark, cells } = checkWin(boardValues);
        if (mark) {
            clearCpuTimeout();
            setWinner(mark, cells);
            updateScore(mark);
            return;
        }

        if (checkDraw(boardValues)) {
            clearCpuTimeout();
            setWinner('draw', []);
            updateScore('draw');
            return;
        }

        if (turn === player2.mark && player2.cpu && cpuTimeout === null) {
            const move = cpuMove(boardValues, player2.mark, player1.mark);
            if (move !== null) {
                cpuTimeout = setTimeout(() => {
                    cpuTimeout = null;
                    setCell(move, player2.mark as Mark);
                }, 500);
            }
        }

    });

    function handleClick(cellIndex: number) {
        setCell(cellIndex, turn as Mark);
    }


</script>

<section class="game-board__container {screen.value !== 'play' ? 'hide' : ''}" use:trapFocusBoard>
    
    <Overlay 
        winner={winner.value}
        reset={reset} 
        setReset={setReset} 
        restartGame={restartGame} 
        player1={player1}
        resetBoard={resetBoard}
        resetScore={resetScore}
        setTurn={setTurn}
        setScreen={setScreen}
    /> 
    
    <div class="game-board">
        {#each Object.entries(gameState) as [cellId, cellData] (cellId)}
            <button class="cell {turn === 'X' ? 'X-turn' : 'O-turn'} {winner.cells.includes(cellData.index) ? 'winner-' + cellData.value : ''}" 
                    id={cellId}
                    data-cell={cellData.index}
                    data-selected={cellData.value !== ''}
                    data-winner={cellData.value === winner.value}
                    aria-label={cellId}
                    onclick={() => handleClick(cellData.index)}>
                
                {#if cellData.value === 'X'}
                    <svg class="mark-x" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fill-rule="evenodd"/></svg>
                {:else if cellData.value === 'O'}
                    <svg class="mark-o" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32C0,14.327,14.327,0,32,0Zm0,18.963c-7.2,0-13.037,5.837-13.037,13.037c0,7.2,5.837,13.037,13.037,13.037c7.2,0,13.037-5.837,13.037-13.037C45.037,24.8,39.2,18.963,32,18.963Z" fill="#F2B137"/></svg>
                {/if}

               
            </button>
        {/each}
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

    .winner-X {
        background-color: var(--teal-400);
    }

    .winner-O {
        background-color: var(--amber-400);
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