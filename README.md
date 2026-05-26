
- New Game Menu
    - Header
        - Logo
    - Player Mark
        - Mark Options (X or O)
    - Game Mode
        - New Game vs Cpu
        - New Game vs player


- Game (Solo) / Multiplayer
    - Header
        - Logo
        - TurnIndicator
        - Reset 
    - Game Board
    - Scoreboard
        - Player Score or X (p1)
        - Ties
        - CPU Score or O ( p2)

- Game (Solo) Player Win / Loss / Tied / Restart
    - Modal Container
        - Win or Loss Message
            - "you won/lost" or "player 1/2 wins"
            - X or O takes the Round
            - Quit
            - Next Round
        - Tied
            - "Round tied"
            - Quit
            - Next Round
        - Restart
            - No, Cancel
            - Yes, Restart


## Architecture
- Use **universal reactivity** to share screen global state in order to conditionally render the different screen states of the game.

## For showing up