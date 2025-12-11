/**
    * @param { number[] } start
    * @param { number[] } end
    * @returns { string }
*/

function knightMoves(start, end) {
    const positions = [
        [2, 1],
        [2, -1],
        [1, 2],
        [1, -2],
        [-2, 1],
        [-2, -1],
        [-1, 2],
        [-1, -2]
    ];

    const board = {
        rows: 8,
        cols: 8,
    }

    const isInsideBoard = (x, y) => {
        return x >= 0 && x < board.rows && y >= 0 && y < board.cols;
    }

    const isCurrentAtEnd = (pos1, pos2) => {
        return pos1[0] === pos2[0] && pos1[1] === pos2[1]
    }

    const seen = new Set();
    const parent = new Map();
    const queue = [start];

    seen.add(`${start[0]}, ${start[1]}`);

    while (queue.length > 0) {
        const current = queue.shift();
        const [cx, cy] = current;

        if (isCurrentAtEnd(current, end)) {
            const path = [];
            let key = `${end[0]}, ${end[1]}`;

            while (key) {
                const [x, y] = key.split(", ").map(Number);
                path.push([x, y]);
                key = parent.get(key);
            }

            const message = `You made it in ${path.length} moves! Here's your path: ${JSON.stringify(path.reverse())}`;

            return message;
        }

        positions.forEach(([offX, offY]) => {
            const newX = cx + offX;
            const newY = cy + offY;

            if (isInsideBoard(newX, newY)) {
                const cordString = `${newX}, ${newY}`
                if (!seen.has(cordString)) {
                    seen.add(cordString);
                    queue.push([newX, newY]);
                    parent.set(cordString, `${cx}, ${cy}`);
                }
            }

        })
    }

}

console.log(knightMoves([0, 0], [3, 3]));
