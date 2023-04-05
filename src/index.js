import * as TEST from './scripts/testFetch.js';
import Photo from './scripts/photo.js';
import * as d3 from 'd3';
import { async } from 'regenerator-runtime';

const photos = {};
// TEST.cleveland()

// TEST.harvard() 

// TEST.chicago() // slow ?..

function createPhotos() {
    
}
const display = document.querySelector('#img-container')

const imgNum = 24;

let width = window.innerWidth * 0.67;

console.log(window.innerWidth);

// console.log(width)
// console.log(display, "get attribute")
const height = 350;

const createCanvas = d3.select('div#img-container')
    .append('canvas')
    .attr('width', width)
    .attr('height', 350)
    .attr('id', 'canvas');




addEventListener("resize", (e) => {
    // console.log(window.innerWidth, "assigning innerwidth");
    width = window.innerWidth * 0.67;
    createCanvas
        .attr('width', width);

    // svg
    //     .attr('width', width);

    // svg.selectAll('rect')
    //     .attr('x', d => d * (width / imgNum))
    //     .attr('width', width / imgNum - 4);

    // createCanvas
    //     .selectAll("img")
    //     .attr('x', d => d * (width / imgNum))
    //     .attr('width', width / imgNum - 4);

    render();

})



const render = () => {
    const ctx = createCanvas.node().getContext('2d')
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)


    for (let i = 0; i < imgNum; i++){
        let imgTest = new Image()
        imgTest.onload = () => {
            ctx.drawImage(imgTest, 
                300 + i * 10, 100, width / imgNum - 3, height,
                i * (width / imgNum), 0, width / imgNum - 4, height)
        }
        imgTest.src = "https://openaccess-cdn.clevelandart.org/1922.1133/1922.1133_web.jpg"
        // console.log(imgTest)
    }
}

render()


// const svg = d3.select('div#img-container')
//     .append('svg')
//     .attr('width', width)
//     .attr('height', height);

// svg
//     .on('mouseover', (e) => {
//         console.log(e)
//         e.target.classed("hidden", false);
//     })
//     .on('mouseout', (e) => {
//         e.classed("hidden", true)
//     });
// const imageListener = document.querySelectorAll("image")
// const imageListener = d3.selectAll("image")
// console.log(imageListener, "images")

function mousePos(canvas, e) {
    let bRect = canvas.getBoundingClientRect();
    // console.log(e)
    // console.log(bRect, "brect")
    let xCord = e.clientX - bRect.x;
    console.log(xCord, "xcord")
    return xCord
}

function redraw(focus) {
    const ctx = createCanvas.node().getContext('2d')
    ctx.clearRect(0 ,0, ctx.canvas.width, ctx.canvas.height)

    let x = 0;

    for (let j = 0; j < imgNum; j++) {
        let imgTest = new Image()

        

        if (j === focus) {
            imgTest.onload = () => {
                ctx.drawImage(imgTest,
                    300 + j * 10, 100, (width * 0.3) - 3, height,
                    x, 0, (width * 0.3) - 4, height);
                x += (width * 0.3);
                // console.log(j, "j")
                // console.log(x, "x")
                // console.log((width * 0.3), "img width")
            }
            imgTest.src = "https://openaccess-cdn.clevelandart.org/1922.1133/1922.1133_web.jpg"
        } else if (j === focus - 1 || j === focus + 1) {
            imgTest.onload = () => {
                ctx.drawImage(imgTest,
                    300 + j * 10, 100, (width * 0.1) - 3, height,
                    x, 0, (width * 0.1) - 4, height);
                x += (width * 0.1);
                // console.log(j, "j")
                // console.log(x, "x")
                // console.log((width * 0.1), "img width")
            }
            imgTest.src = "https://openaccess-cdn.clevelandart.org/1922.1133/1922.1133_web.jpg"
        } else if (j === focus - 2 || j === focus + 2) {
            imgTest.onload = () => {
                ctx.drawImage(imgTest,
                    300 + j * 10, 100, (width * 0.07) - 3, height,
                    x, 0, (width * 0.07) - 4, height)
                x += (width * 0.07);
                // console.log(j, "j")
                // console.log(x, "x")
                // console.log((width * 0.07), "img width")
            }
            imgTest.src = "https://openaccess-cdn.clevelandart.org/1922.1133/1922.1133_web.jpg"
        } else {
            imgTest.onload = () => {
                ctx.drawImage(imgTest,
                    300 + j * 10, 100, (width * 0.0189) - 3, height,
                    x, 0, (width * 0.0189) - 4, height);
                x += (width * 0.0189);
                // console.log(j, "j")
                // console.log(x, "x")
                // console.log((width * 0.0189), "img width")
            }
            imgTest.src = "https://openaccess-cdn.clevelandart.org/1922.1133/1922.1133_web.jpg"
        }
    }
}

display.addEventListener("click", (e) => {
    // console.log(e.target, "target");
    let x = mousePos(createCanvas.node(), e)
    let zone = width / imgNum
    let focus;
    for (let i = 0; i < imgNum; i++) {
        if (x > (i * zone) && i < ((i + 1) * zone)) {
            focus = i;
        }
    }
    console.log(focus)

    redraw(focus)

})

display.addEventListener("mouseout", (e) => {
    render()
})

// svg
//     .selectAll("img")
//     .data(d3.range(imgNum))
//     .join('img')
//     .attr('href', "https://openaccess-cdn.clevelandart.org/1922.1133/1922.1133_web.jpg")
//     .attr('x', d => d * (width / imgNum))
//     .attr('width', width / imgNum - 4)
//     // .attr("class", "hidden")
//     .attr('height', height);

// const mask = svg.append('mask')
//     .attr("id", "clipping-mask");

// mask.append('rect')
//     .attr("height", height)
//     .attr("width", 30)
//     .attr("x", "25%")
//     .attr("fill", "white");

// const image = svg.append('image') 
//     .attr('href', "https://openaccess-cdn.clevelandart.org/1922.1133/1922.1133_web.jpg")
//     .attr('height', height)
//     .attr('mask', "url(#clipping-mask");

// const image2 = svg.append('image')
//     .attr('href', "https://openaccess-cdn.clevelandart.org/1928.8/1928.8_web.jpg")
//     .attr('height', height)
//     .attr('mask', "url(#clipping-mask");






