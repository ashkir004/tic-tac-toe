export function checkWin(board: string[]): { mark: string | null; cells: number[] } {
	const winConditions = [
		[0, 1, 2], // Row 1
		[3, 4, 5], // Row 2
		[6, 7, 8], // Row 3
		[0, 3, 6], // Column 1
		[1, 4, 7], // Column 2
		[2, 5, 8], // Column 3
		[0, 4, 8], // Diagonal from top-left to bottom-right
		[2, 4, 6] // Diagonal from top-right to bottom-left
	];

	for (const condition of winConditions) {
		const [a, b, c] = condition;
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			return { mark: board[a], cells: condition };
		}
	}

	return { mark: null, cells: [] }; // No winner
}

export function checkDraw(board: string[]): boolean {
	return board.every((cell) => cell !== '');
}

// update the cpuMove function to make a winning move if available, otherwise block the opponent's winning move, and if neither is available, make a random move
export function cpuMove(board: string[], cpuMark: string, playerMark: string): number {
	// Check for winning move
	for (let i = 0; i < board.length; i++) {
		if (board[i] === '') {
			board[i] = cpuMark; // Temporarily make the move
			if (checkWin(board).mark === cpuMark) {
				return i; // Winning move found
			}
			board[i] = ''; // Undo the move
		}
	}

	// Check for blocking move
	for (let i = 0; i < board.length; i++) {
		if (board[i] === '') {
			board[i] = playerMark; // Temporarily make the opponent's move
			if (checkWin(board).mark === playerMark) {
				board[i] = ''; // Undo the move
				return i; // Blocking move found
			}
			board[i] = ''; // Undo the move
		}
	}

	// No winning or blocking move found, make a random move
	const emptyCells = board
		.map((cell, index) => (cell === '' ? index : null))
		.filter((index) => index !== null) as number[];

	if (emptyCells.length === 0) {
		return -1; // No moves left
	}

	const randomIndex = Math.floor(Math.random() * emptyCells.length);
	return emptyCells[randomIndex];
}

export function getSavedState(whichState: 'score' | 'player1' | 'player2' | 'screen' = 'screen') {
	if (typeof window !== 'undefined') {
		const saved = localStorage.getItem('gameState');
		if (saved) {
			try {
				const gameState = JSON.parse(saved);
				return gameState[whichState] ?? null;
			} catch (e) {
				console.error('Error parsing saved game state:', e);
				return null;
			}
		}
	}
	return null;
}
