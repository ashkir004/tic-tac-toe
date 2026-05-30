<script lang="ts">
	import { screen } from '$lib/shared.svelte';

	let { score, player1, player2 } = $props();

	function getPlayerLabel(player: { mark: string; cpu: boolean }) {
		let a, b;

		if (!player1.cpu && !player2.cpu) {
			a = player1.mark === 'X' ? 'P1' : 'P2';
			b = player2.mark === 'X' ? 'P1' : 'P2';
			return player.mark === 'X' ? a : b;
		}

		if (player1.mark === 'X') {
			if (player1.cpu) {
				a = 'CPU';
				b = 'You';
			} else {
				a = 'You';
				b = 'CPU';
			}
		} else {
			if (player2.cpu) {
				a = 'You';
				b = 'CPU';
			} else {
				a = 'CPU';
				b = 'You';
			}
		}

		return player.mark === 'X' ? a : b;
	}
</script>

<section class="scoreboard {screen.value !== 'play' ? 'hide' : ''}">
	<div class="player-score p1 text-preset-6">
		X({getPlayerLabel(player1)})
		<p class="text-preset-3">{player1.mark === 'X' ? score.player1 : score.player2}</p>
	</div>
	<div class="tie-score text-preset-6">
		Ties
		<p class="text-preset-3">{score.draw}</p>
	</div>
	<div class="player-score p2 text-preset-6">
		O({getPlayerLabel(player2)})
		<p class="text-preset-3">{player2.mark === 'X' ? score.player1 : score.player2}</p>
	</div>
</section>

<style>
	.scoreboard {
		display: flex;
		flex-direction: row;
		gap: var(--s-250);
		justify-content: center;
		align-items: center;
	}

	.player-score,
	.tie-score {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--s-50);
		text-transform: uppercase;
		padding: var(--s-200);
		border-radius: var(--radius-10);
		color: var(--slate-900);
		width: var(--s-1200);
		height: var(--s-800);
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
