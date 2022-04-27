// import { FEN } from "notation"

const FEN = {
    k: { color: "black", type: "king" },
    q: { color: "black", type: "queen" },
    b: { color: "black", type: "bishop" },
    n: { color: "black", type: "knight" },
    r: { color: "black", type: "rook" },
    p: { color: "black", type: "pawn" },
    K: { color: "white", type: "king" },
    Q: { color: "white", type: "queen" },
    B: { color: "white", type: "bishop" },
    N: { color: "white", type: "knight" },
    R: { color: "white", type: "rook" },
    P: { color: "white", type: "pawn" }
}

const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

const TileSize = 125

canvas.width = TileSize * 8
canvas.height = TileSize * 8

class Piece {
    constructor({ color, type, position }) {
        this.id
        this.color = color
        this.type = type

        this.image = new Image(TileSize, TileSize)
        this.image.onload = () => {
            this.draw(position)
        }
        this.image.src = "./assets/" + this.color + "_" + this.type + ".png"
    }

    draw(position) {
        this.position = position
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class Tile {
    constructor({ name }) {
        this.name = name
        this.col = name.charCodeAt(0) - 97
        this.row = name.charAt(1) - 1
        this.color = (this.col % 2 !== this.row % 2) ? "#FCCC74" : "#573A2E"

        this.position = {
            x: (7 - this.row) * TileSize,
            y: this.col * TileSize
        }
        this.reversePosition = {
            x: this.row * TileSize,
            y: (7 - this.col) * TileSize
        }

        this.piece
    }

    draw(orientation) {
        let pos = orientation === "white" ? this.position : this.reversePosition
        c.fillStyle = this.color
        c.fillRect(pos.x, pos.y, TileSize, TileSize)
        if (this.piece)
            this.piece.draw(pos)
    }
}

class Board {
    constructor() {
        this.tiles = []

        let col = ["a", "b", "c", "d", "e", "f", "g", "h"]
        let row = ["8", "7", "6", "5", "4", "3", "2", "1"]
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.tiles.push(new Tile({ name: col[i] + row[j] }))
            }
        }
    }

    draw(orientation) {
        for (let i = 0; i < 64; i++)
            this.tiles[i].draw(orientation)
    }

    getTile(name) {
        for (let i = 0; i < 64; i++) {
            if (this.tiles.name === name)
                return this.tiles[i]
        }
    }

    read_FEN(fen) {
        const pieces = "kqbnrpKQBNRP"
        const nb = "123456789"
        for (let i = 0, j = 0; i < fen.length; i++) {
            const c = fen.charAt(i)
            if (pieces.includes(c))
                this.tiles[j].piece = new Piece({
                    color: FEN[c].color,
                    type: FEN[c].type,
                    position: {
                        x: j % 8 * TileSize,
                        y: Math.floor(j / 8) * TileSize
                    }
                })
            else if (nb.includes(c))
                j += parseInt(c, 10) - 1
            if (c !== "/")
                j++
        }
    }
}

let board = new Board()

board.read_FEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")

board.draw("white")

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case 'w':
            board.draw("white")
            break;
        case 'b':
            board.draw("black")
            break;
    }
})

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case 'w':
            board.draw("white")
            break;
        case 'b':
            board.draw("black")
            break;
    }
})