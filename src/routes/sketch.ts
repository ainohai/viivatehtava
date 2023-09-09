import type { Line } from "./types";

type coordinate = {
    x: number,
    y: number,
}

const createRandomLine = (linetype: Line, p5, canvasWidth: number, canvasHeight: number):[coordinate, coordinate] => {

    const height = p5.random(linetype.minHeight, linetype.maxHeight)

    //Only for vertical and horizontal lines so far. Angle system would be nicer. 
    if (linetype.id === "vertical") {
        //So that the line fits the canvas, it's starting point should be at max canvasHeight - height. 
        const y0 = p5.random(0, canvasHeight - height);
        const y1 = y0 + height;
        const x = Math.random() * canvasWidth;
        return [{x: x, y: y0}, {x: x, y:y1}]

    } else if (linetype.id === "horizontal") {

        const x0 = p5.random(0, canvasWidth - height);
        const x1 = x0 + height;
        const y = Math.random() * canvasHeight;
        
        return [{x: x0, y: y}, {x: x1, y:y}]

    }

    return [{x: 0, y: 0}, {x: canvasWidth, y:canvasHeight}]

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

export function createSketch(lines: Line[], canvasWidth: number, canvasHeight: number, backgroundColors: string[])  {
		
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

        if (linesDrawn === 0 && lineIndex === 0) {
            const colorIndex = Math.floor(p5.random(0, backgroundColors.length))
            const c = p5.color(backgroundColors[colorIndex])
            p5.fill(c)
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
            linesDrawn = 0;
        }

        if (!!lineIndex && lineIndex >= lines.length) {
            p5.noLoop()
        }

    
    };
};
}
