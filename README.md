# Tic-Tac-Toe Game

## Brief

Your challenge is to build out this Tic Tac Toe game and get it looking as close to the design as possible.

You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

Your users should be able to:

- View the optimal layout for the game depending on their device's screen size
- See hover states for all interactive elements on the page
- Play the game either solo vs the computer or multiplayer against another person
- **Bonus 1**: Save the game state in the browser so that it’s preserved if the player refreshes their browser
- **Bonus 2**: Instead of having the computer randomly make their moves, try making it clever so it’s proactive in blocking your moves and trying to win

## Solution

A responsive tic-tac-toe game built with SvelteKit. Play against another person locally or challenge a CPU opponent, track scores across rounds, and enjoy a polished UI with smooth state handling, win detection, and browser persistence for game settings and scores.

### Features

- Play vs CPU or vs another player
- Smart CPU that can win or block moves
- Score tracking for both players and draws
- Restart, next round, and quit flows
- Responsive layout for mobile and desktop
- Local browser persistence for game setup and scores

### Tech Stack

- SvelteKit
- Svelte 5 runes
- TypeScript
- Vite

### Project Notes

- Game logic is separated from UI components.
- Shared state is used for the active screen and winner state.
- Player choices and score are saved in the browser.

### Links

- Live Site: [tic-tac-toe](https://tic-tac-toe-ashkir004.netlify.app/)
- Repository; [github](https://github.com/ashkir004/tic-tac-toe)
