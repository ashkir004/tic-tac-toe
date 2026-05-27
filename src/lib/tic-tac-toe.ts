
export function checkWin(board: string[]): { mark: string | null, cells: number[] } {
    
    const winConditions = [
        [0, 1, 2], // Row 1
        [3, 4, 5], // Row 2
        [6, 7, 8], // Row 3
        [0, 3, 6], // Column 1
        [1, 4, 7], // Column 2
        [2, 5, 8], // Column 3
        [0, 4, 8], // Diagonal from top-left to bottom-right
        [2, 4, 6]  // Diagonal from top-right to bottom-left
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            // return board[a];
            return { mark: board[a], cells: condition};
        }
    }

    return { mark: null, cells: [] }; // No winner
}

export function checkDraw(board: string[]): boolean {
    return board.every(cell => cell !== '');
}