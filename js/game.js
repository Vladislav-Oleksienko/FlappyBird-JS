const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();


bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// sound
const scoreAudio = new Audio();

scoreAudio.src = "audio/score.mp3";

const gap = 140;

// onclick
document.addEventListener("click", () => {
    yPos -= 55;
});

// block
let pipe = [];
pipe[0] = {
    x : cvs.width,
    y : 0
}

let score = 0;
// position
let xPos = 40;
let yPos = 150;
const grav = 2;

const draw = function() {
    ctx.drawImage(bg, 0, 0);

    for(let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        pipe[i].x--;


        if(score < 15) {
            if(pipe[i].x == 200) {
                pipe.push({
                    x : cvs.width,
                    y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
                });
            } 
        } else if(score >= 15) {
            if(pipe[i].x == 300) {
                pipe.push({
                    x : cvs.width,
                    y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
                });
            } 
        }

        if(xPos + bird.width >= pipe[i].x 
        && xPos <= pipe[i].x + pipeUp.width
        && (yPos <= pipe[i].y + pipeUp.height 
        || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) {
            location.reload();
        }
        
        if(yPos == 405) {
            location.reload();
        }

        if(pipe[i].x === 5) {
            score += 3;
            scoreAudio.play();
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);

    ctx.drawImage(bird, xPos, yPos);
    yPos += grav;

    ctx.fillStyle = "white";
    ctx.outline = "1px solid black"
    ctx.font = "50px Titillium Web";
    ctx.fillText(score, 230, 100);

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;

