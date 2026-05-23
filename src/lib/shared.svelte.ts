
export const screen = $state({
    value: 'menu',
});

export function setScreen(newScreen: string) {
    screen.value = newScreen;
}

export const player1Mark = $state({
    value: 'O',
});

export function setPlayer1Mark(newMark: string) {
    player1Mark.value = newMark;
}