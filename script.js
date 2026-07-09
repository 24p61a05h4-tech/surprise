const messageEl = document.getElementById("message");
const progressBar = document.getElementById("progress-bar");
const hint = document.getElementById("hint");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

const scenes = [
    "🚨 Et suthunnavvvv...",
    "🤔 neek idhe ekkuva...",
    "😂 dayyumm kodipillawwwwwww!😂",
    "🎂 Eyuuuuuuuu birthday antaga...",
    "🎉 HAPPY BIRTHDAY BROOOOOOO!!!"
];

let i = 0;
let typing = false;

document.body.addEventListener("click", nextScene);

function nextScene(){
    if(typing) return;

    if(i < scenes.length){
        typeText(scenes[i]);


        if(i === scenes.length - 1){
            startFinal();
        }

        i++;
    }
}

/* typing */
function typeText(text){
    typing = true;
    messageEl.innerHTML = "";

    let j = 0;
    const interval = setInterval(() => {
        messageEl.innerHTML += text[j];
        j++;
        if(j >= text.length){
            clearInterval(interval);
            typing = false;
        }
    }, 35);
}

/* FINAL CONFETTI */
function startFinal(){
    hint.innerText = "🎉 birthday mode maxed out";

    let p = 0;

    const loader = setInterval(() => {
        p += 2;
        progressBar.style.width = p + "%";

        if(p >= 100){
            clearInterval(loader);
            triggerConfetti();

            messageEl.style.transform = "scale(1.3)";
            messageEl.style.textShadow = "0 0 40px pink";

            setTimeout(showSurpriseButton, 3000);
        }
    }, 30);
}

/* BUTTON AFTER ORIGINAL EXPERIENCE */
function showSurpriseButton(){
    const btn = document.createElement("button");

    btn.innerText = "🎁 See Surprise";
    btn.style.position = "fixed";
    btn.style.bottom = "120px";
    btn.style.left = "50%";
    btn.style.transform = "translateX(-50%)";
    btn.style.padding = "15px 25px";
    btn.style.fontSize = "20px";
    btn.style.border = "none";
    btn.style.borderRadius = "12px";
    btn.style.cursor = "pointer";
    btn.style.zIndex = "1000";
    btn.style.fontFamily = "'Dancing Script', cursive";

    document.body.appendChild(btn);

    btn.addEventListener("click", () => {
        document.getElementById("gallery-screen").classList.remove("hidden");
        btn.remove();
    });
}

/* confetti */
function triggerConfetti(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({length:200}, () => ({
        x: Math.random()*canvas.width,
        y: Math.random()*-canvas.height,
        r: Math.random()*6+2,
        d: Math.random()*5+2,
        drift: (Math.random()-0.5)*3
    }));

    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);

        pieces.forEach(p => {
            ctx.beginPath();
            ctx.fillStyle = `hsl(${Math.random()*360},100%,60%)`;
            ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
            ctx.fill();

            p.y += p.d;
            p.x += p.drift;

            if(p.y > canvas.height){
                p.y = -10;
                p.x = Math.random()*canvas.width;
            }
        });

        requestAnimationFrame(draw);
    }

    draw();
}