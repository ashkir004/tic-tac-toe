<script lang="ts">
	let {
		reset,
		setReset,
		restartGame,
		winner,
		player1,
		resetScore,
		setTurn,
		setScreen,
		resetBoard
	} = $props();

	let restart = $derived(reset);
	let wonBy = $derived(winner);
</script>

<div class="overlay {restart || wonBy !== null ? 'show' : 'hide'} ">
	{#if wonBy && wonBy !== 'draw'}
		<h1 class="overaly__title text-preset-5-bold">
			{winner === player1.mark ? 'You Won!' : 'Oh No, You Lost...'}
		</h1>
	{/if}

	{#if restart}
		<div class="overlay__content">
			<p class="overlay__message text-preset-2">Restart Game</p>
			<div class="overlay__controls">
				<button
					class="quit text-preset-4"
					onclick={() => {
						restart = false;
						setReset(false);
					}}>No, Cancel</button
				>
				<button
					class="next-round text-preset-4"
					onclick={() => {
						restart = false;
						setTurn('X');
						setReset(false);
						restartGame();
					}}>Yes, Restart</button
				>
			</div>
		</div>
	{/if}

	{#if wonBy}
		<div class="overlay__content">
			{#if wonBy === 'X'}
				<p class="overlay__message text-preset-2 {wonBy === 'X' ? 'winner-' + wonBy : ''}">
					<svg class="mark-x" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"
						><path
							d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
							fill="#31C3BD"
							fill-rule="evenodd"
						/></svg
					>
					takes the round
				</p>
			{:else if wonBy === 'O'}
				<p class="overlay__message text-preset-2 {wonBy === 'O' ? 'winner-' + wonBy : ''}">
					<svg class="mark-o" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"
						><path
							d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32C0,14.327,14.327,0,32,0Zm0,18.963c-7.2,0-13.037,5.837-13.037,13.037c0,7.2,5.837,13.037,13.037,13.037c7.2,0,13.037-5.837,13.037-13.037C45.037,24.8,39.2,18.963,32,18.963Z"
							fill="#F2B137"
						/></svg
					>
					takes the round
				</p>
			{:else if wonBy === 'draw'}
				<p class="overlay__message text-preset-2">Round Tied</p>
			{/if}
			<div class="overlay__controls">
				<button
					onclick={() => {
						resetScore();
						resetBoard();
						setScreen('menu');
					}}
					class="quit text-preset-4">Quit</button
				>
				<button
					onclick={() => {
						resetBoard();
						setTurn('X');
						setScreen('play');
					}}
					class="next-round text-preset-4">Next Round</button
				>
			</div>
		</div>
	{/if}
</div>

<style>
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

	.overlay__message svg.mark-x {
		color: var(--teal-400);
	}

	.overlay__message svg.mark-o {
		color: var(--amber-400);
	}

	.overlay__message .mark-x,
	.overlay__message .mark-o {
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

	.show {
		display: flex;
	}
</style>
