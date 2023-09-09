import type { Line } from "./types";

type coordinate = {
    x: number,
    y: number,
}

const createRandomLine = (linetype: Line, p5, canvasWidth: number, canvasHeight: number):[coordinate, coordinate] => {

    const height = p5.random(linetype.minHeight, linetype.maxHeight)

    //Only for vertical lines so far. 
    //So that the line fits the canvas, it's starting point should be at max canvasHeight - height. 
    const y0 = p5.random(0, canvasHeight - height);
    const y1 = y0 + height;
    const x = Math.random() * canvasWidth;

    return [{x: x, y: y0}, {x: x, y:y1}]

}

const drawLine = (line: [coordinate, coordinate], p5, linetype: Line) => {

    p5.push()
    p5.strokeCap(p5.SQUARE)
    p5.strokeWeight(p5.random(linetype.minWidth, linetype.maxWidth))

    const colorIndex = Math.floor(p5.random(0, linetype.colors.length))
    const c = p5.color(linetype.colors[colorIndex])
    p5.stroke(c);
    p5.line(line[0].x, line[0].y, line[1].x, line[1].y)
    p5.pop()
}

export function createSketch(lines: Line[], canvasWidth: number, canvasHeight: number)  {
		
    let linesDrawn = 0;
    let lineIndex = 0;
    let myLines = [];

    console.log("create")

    return (p5) => {

    p5.setup = () => {
        console.log("setup")
        p5.createCanvas(canvasWidth, canvasHeight);
    };

    p5.draw = () => {

        if (linesDrawn === 0) {
            p5.rect(0, 0, canvasWidth, canvasHeight)
        }
        if (linesDrawn < lines[lineIndex].wantedLines) {
            const line = createRandomLine(lines[lineIndex], p5, canvasWidth, canvasHeight)
            drawLine(line, p5, lines[lineIndex]) 
            myLines.push(line);
            linesDrawn++;
        }
        else {
            lineIndex++;
            myLines = [];
        }

        if (!!lineIndex && lineIndex >= lines.length -1) {
            p5.noLoop()
        }

    
    };
};
}
