
export const screen = $state({
    value: 'menu',
});

export function setScreen(newScreen: string) {
    screen.value = newScreen;
}