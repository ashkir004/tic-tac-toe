
export const screen = $state({
    value: 'menu',
});

export function setScreen(newScreen: string) {
    screen.value = newScreen;
    resetGame();
}

export const player1Mark = $state({
    value: 'O',
});

export function setPlayer1Mark(newMark: string) {
    player1Mark.value = newMark;
}

export const turn = $state({ value: 'X'});
export const reset = $state({ value: false });

export function setTurn(value: string) {
    turn.value = value;
}

export function resetGame() {
    reset.value = true;
    setTurn('X');
    setWinner(null);
    setTimeout(() => {
        reset.value = false;
    }, 0);
}

export const winner: { value: string | null } = $state({ value: null });

export function setWinner(value: string | null) {
    winner.value = value;
}