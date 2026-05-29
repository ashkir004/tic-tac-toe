<script>
    
    import { screen, setScreen } from '$lib/shared.svelte';
    let { setPlayer1Mark, player1, setCPU, setTurn } = $props();
</script>


<section class="new-game {screen.value === 'menu' ? '' : 'hide'}">
    <div class="new-game__container">
        <div class="mark-selection">
            <h1 class="new-game__title text-preset-4">Pick player 1's Mark</h1>
            <div class="new-game__options">
                <button
                    onclick={() => setPlayer1Mark('X')}
                    class="new-game__option new-game__option-x {player1.mark === 'X' ? 'active' : ''}" aria-label="option X">
                    <svg viewBox="0 0 64 64" class="option-x" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill-rule="evenodd"/></svg>
                </button>
                <button
                    onclick={() => setPlayer1Mark('O')}
                    class="new-game__option new-game__option-o {player1.mark === 'O' ? 'active' : ''}" aria-label="option O">
                    <svg viewBox="0 0 64 64" class="option-o" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"/></svg>
                </button>
            </div>
            <p class="new-game__starter text-preset-5-bold">Remember: X goes first</p>
        </div>
    </div>
    <section class="new-game__controls">
        <button 
            onclick={() => { 
                setCPU(true);
                setScreen('play');
            }}   
            class="btn new-game__control vs-cpu text-preset-4">New Game (vs CPU)</button>
        <button 
            onclick={() => { 
                setCPU(false);
                setTurn('X');
                setScreen('play');
            }}   
            class="btn new-game__control vs-player text-preset-4">New Game (vs Player)</button>
    </section>
</section>

<style>

.new-game {
    display: flex;
    flex-direction: column;
    gap: var(--s-400);
}

.new-game__container {
    border-radius: var(--radius-16);
    padding: var(--s-300);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--s-200);
    background-color: var(--slate-800);
    box-shadow: 0 8px 0 0 color-mix(in srgb, var(--neutral-950) 20%, var(--slate-900) 80%);
}

.mark-selection {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--s-300);
}

.new-game__options {
    display: flex;
    flex-direction: row;
    background-color: var(--slate-900);
    padding: var(--s-100);
    border-radius: var(--radius-10);
    align-self: stretch;
}

.new-game__option {
    width: var(--s-1200); 
    height: var(--s-500);
    cursor: pointer;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--radius-10);
    flex-grow: 1;
    background-color: var(--slate-900);
}

.new-game__option .option-x, .new-game__option .option-o {
    width: var(--s-300);
    height: var(--s-300);
    fill: var(--slate-300);
    background-color: var(--slate-900);
}

.new-game__option:hover {
    background-color: var(--slate-800);
}

.new-game__option:hover .option-x, .new-game__option:hover .option-o {
    fill: var(--slate-300);
    background-color: var(--slate-800);
}

.new-game__option.active {
    background-color: var(--slate-300);
}

.new-game__option.active .option-x, .new-game__option.active .option-o {
    fill: var(--slate-900);
    background-color: var(--slate-300);
}



.new-game__controls {
    display: flex;
    flex-direction: column;
    gap: var(--s-200);
    width: 100%;
}

.new-game__control {
    text-transform: uppercase;
    color: var(--slate-900);
    background-color: var(--amber-400);
    padding: var(--s-250) 0;
    border-radius: var(--radius-16);
    border: none;
    box-shadow: 0px 8px 0px 0px color-mix(in srgb, var(--neutral-950) 20%, var(--amber-400) 80%);
}

.new-game__control.vs-player {
    background-color: var(--teal-400);
    box-shadow: 0px 8px 0px 0px color-mix(in srgb, var(--neutral-950) 20%, var(--teal-400) 80%);
}



.hide {
    display: none;
}


</style>