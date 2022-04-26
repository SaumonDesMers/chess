const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

const TileSize = 100

canvas.width = TileSize * 8
canvas.height = TileSize * 8

class Piece {
    constructor({}) {
        this.id
        this.color
        this.type
        this.position
    }
}

class Tile {
    constructor({ name }) {
        this.name = name
        this.col = name.charCodeAt(0) - 97
        this.row = name.charAt(1) - 1
        this.color = (this.col % 2 !== this.row % 2) ? "white" : "black"

        this.position = {
            x: this.col * TileSize,
            y: (7 - this.row) * TileSize
        }
        this.reversePosition = {
            x: (7 - this.col) * TileSize,
            y: this.row * TileSize
        }

        this.piece
    }

    draw(orientation) {
        c.fillStyle = this.color
        if (orientation === "white")
            c.fillRect(this.position.x, this.position.y, TileSize, TileSize)
        else if (orientation === "black")
            c.fillRect(this.reversePosition.x, this.reversePosition.y, TileSize, TileSize)
    }
}

class Board {
    constructor() {
        this.tiles = []

        let col = ["a", "b", "c", "d", "e", "f", "g", "h"]
        let row = ["1", "2", "3", "4", "5", "6", "7", "8"]
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.tiles.push(new Tile({ name: col[i] + row[j] }))
            }
        }
    }

    draw(orientation) {
        for (let i = 0; i < this.tiles.length; i++)
            this.tiles[i].draw(orientation)
    }
}

let board = new Board()

board.draw("white")