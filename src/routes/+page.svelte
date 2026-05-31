<script lang="ts">
	import logo from '$lib/assets/logo.svg';
	import GameBoard from '$lib/components/GameBoard.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import ScoreBoard from '$lib/components/ScoreBoard.svelte';
	import { getSavedState } from '$lib/tic-tac-toe';

	import { screen } from '$lib/shared.svelte';

	import { winner } from '$lib/shared.svelte';

	let reset = $state(false);
	let turn = $state('X');
	let player1 = $state(getSavedState('player1') || { mark: 'O', cpu: false });
	let player2 = $state(getSavedState('player2') || { mark: 'X', cpu: false });
	let score = $state(getSavedState('score') || { player1: 0, player2: 0, draw: 0 });

	function setReset(value: boolean) {
		reset = value;
	}

	function setTurn(value: string) {
		turn = value;
	}

	function setCPU(value: boolean, player: 'player1' | 'player2' = 'player2') {
		if (player === 'player1') {
			player1 = { ...player1, cpu: value };
		} else {
			player2 = { ...player2, cpu: value };
		}
	}

	function setPlayer1Mark(mark: string) {
		player1 = { mark: mark, cpu: player1.cpu };
		player2 = { mark: mark === 'X' ? 'O' : 'X', cpu: player2.cpu };
	}

	function updateScore(winner: string | null) {
		if (winner === 'draw') {
			score = { ...score, draw: score.draw + 1 };
		} else if (winner === player1.mark) {
			score = { ...score, player1: score.player1 + 1 };
		} else if (winner === player2.mark) {
			score = { ...score, player2: score.player2 + 1 };
		} else {
			console.error('Invalid winner value:', winner);
			return score;
		}
	}

	function resetScore() {
		score = { player1: 0, player2: 0, draw: 0 };
		setTurn('X');
	}

	$effect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(
				'gameState',
				JSON.stringify({
					player1: { ...player1 },
					player2: { ...player2 },
					score: { ...score },
					screen: { value: screen.value }
				})
			);
			// console.log('Saved state in localStorage:', localStorage.getItem('gameState'));
		}
	});
</script>

<div class="app">
	<main>
		<header>
			<img src={logo} alt="XO logo" class="logo {screen.value === 'menu' ? 'show' : 'hide'}" />
			<div class="controls__container {screen.value === 'menu' ? 'hide' : ''}">
				<img src={logo} alt="XO logo" class="logo" />
				<p class="turn-label text-preset-5-bold text-preset-4-md">
					{#if turn === 'X'}
						<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"
							><path
								d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
								fill-rule="evenodd"
							/></svg
						>
					{:else}
						<svg viewBox="0 0 64 64" class="option-o" xmlns="http://www.w3.org/2000/svg"
							><path
								d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
							/></svg
						>
					{/if}
					Turn
				</p>

				<button
					class="btn btn-reset"
					aria-label="reset"
					onclick={() => {
						if (winner.value === null) {
							setReset(true);
						} else {
							setReset(false);
						}
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg"
						><path
							d="M19.524 0h-1.88a.476.476 0 0 0-.476.499l.159 3.284A9.81 9.81 0 0 0 9.835.317C4.415.317-.004 4.743 0 10.167.004 15.597 4.406 20 9.835 20a9.796 9.796 0 0 0 6.59-2.536.476.476 0 0 0 .019-.692l-1.348-1.349a.476.476 0 0 0-.65-.022 6.976 6.976 0 0 1-9.85-.63 6.987 6.987 0 0 1 .63-9.857 6.976 6.976 0 0 1 10.403 1.348l-4.027-.193a.476.476 0 0 0-.498.476v1.881c0 .263.213.476.476.476h7.944A.476.476 0 0 0 20 8.426V.476A.476.476 0 0 0 19.524 0Z"
						/></svg
					>
				</button>
			</div>
		</header>
		<h1 class="sr-only">Tic Tac Toe Game</h1>

		<Menu {player1} {setCPU} {setTurn} {setPlayer1Mark} />

		<GameBoard {player1} {player2} {updateScore} {resetScore} {turn} {setTurn} {reset} {setReset} />

		<ScoreBoard {player1} {player2} {score} />
	</main>
</div>

<style>
	.hide {
		display: none;
	}

	.show {
		display: block;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
