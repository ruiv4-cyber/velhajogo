import os

board = [" "] * 9

def print_board():
    os.system("cls" if os.name == "nt" else "clear")
    print("\n   JOGO DA VELHA\n")
    print("    1 | 2 | 3 ")
    print("   ---------")
    print("    4 | 5 | 6 ")
    print("   ---------")
    print("    7 | 8 | 9 \n")
    print("    " + board[0] + " | " + board[1] + " | " + board[2])
    print("   ---------")
    print("    " + board[3] + " | " + board[4] + " | " + board[5])
    print("   ---------")
    print("    " + board[6] + " | " + board[7] + " | " + board[8] + "\n")

def check_winner(player):
    win_patterns = [(0,1,2), (3,4,5), (6,7,8), (0,3,6), (1,4,7), (2,5,8), (0,4,8), (2,4,6)]
    return any(board[a] == board[b] == board[c] == player for a, b, c in win_patterns)


def game():
    global board
    current_player = "X"
    
    for turn in range(9):
        print_board()
        while True:
            try:
                move = int(input(f"Jogador {current_player}, escolha uma posição (1-9): ")) - 1
                if board[move] == " ":
                    board[move] = current_player
                    break
                else:
                    print("Posição ocupada! Escolha outra.")
            except (IndexError, ValueError):
                print("Entrada inválida! Digite um número entre 1 e 9.")

        if check_winner(current_player):
            print_board()
            print(f"Parabéns! O jogador {current_player} venceu!\n")
            return
        
        current_player = "O" if current_player == "X" else "X"

    print_board()
    print("Empate! O jogo terminou sem vencedor.\n")

game()