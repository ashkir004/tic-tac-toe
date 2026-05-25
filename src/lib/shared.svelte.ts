
export const screen = $state({
    value: 'menu',
});

export function setScreen(newScreen: string) {
    screen.value = newScreen;
    // resetGame();
}

// export const reset = $state({ value: false });

// export function resetGame() {
//     reset.value = true;
//     // setTurn('X');
//     // setWinner(null);
//     setTimeout(() => {
//         reset.value = false;
//     }, 0);
// }

export const rounds = $state({ value: 1 });

export function nextRound() {
    rounds.value += 1;
    setScreen('play');
}