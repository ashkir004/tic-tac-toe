
// export const screen = $state({
//     value: 'menu',
// });

import { getSavedState } from "./tic-tac-toe";

export const screen = $state(getSavedState('screen') || { value: 'menu' });

export function setScreen(newScreen: string) {
    screen.value = newScreen;
}

export const winner: { value: string | null; cells: number[] } = $state({ value: null, cells: [] });

export function setWinner(value: string | null, cells: number[] = []) {
    winner.value = value;
    winner.cells = cells;
}