const lanes = document.querySelectorAll(".lane");
const feverFill = document.getElementById("feverFill");
const judgeEl = document.getElementById("judge");

let notes = [];
let fever = 0;
let feverActive = false;
let feverStartTime = 0;

const FEVER_OUT = 1200;
const FEVER_HOLD = 10000;
const FEVER_IN = 1200;

const targetX = [-140,-50,50,140];

// =====================
function lerp(a,b,t){
return a+(b-a)*t;
}

// =====================
// SHOW / HIDE GAME
function toggleRhythmGame(ativo){
document.getElementById("rhythmGame").style.display = ativo ? "flex" : "none";
}

// =====================
// GERAR NOTAS
function gerarNotas(qtd){

agathaTeclado(true);
notes = [];

// gera notas
for(let i = 0; i < qtd; i++){

const lane = lanes[Math.floor(Math.random() * lanes.length)];

const note = document.createElement("div");
note.className = "note";

lane.appendChild(note);

notes.push({
el: note,
key: lane.dataset.key,
y: -30 - (i * 80)
});
}

/* ===================== */
/* TEMPO AUTOMÁTICO */
/* ===================== */

// cada nota = 0.3s
const tempoPorNota = 0.33;

// tempo total baseado na quantidade
const tempoTotal = qtd * tempoPorNota;

// + 3 segundos finais
const tempoFinal = (tempoTotal + 3) * 1000;

// auto fechar
setTimeout(() => {
toggleRhythmGame(false);
}, tempoFinal);

}

// =====================
function startFever(){
feverActive=true;
feverStartTime=performance.now();
feverFill.style.width="100%";
document.body.classList.add("fever");
fever=0;
}

// =====================
function updateFeverWave(){

if(!feverActive){
lanes.forEach(l=>{
l._x=lerp(l._x||0,0,0.12);
l.style.transform=`translateX(${l._x}px)`;
});
return;
}

const now=performance.now();
const t=now-feverStartTime;

let p=0;

if(t<FEVER_OUT)p=t/FEVER_OUT;
else if(t<FEVER_OUT+FEVER_HOLD)p=1;
else if(t<FEVER_OUT+FEVER_HOLD+FEVER_IN)
p=1-((t-FEVER_OUT-FEVER_HOLD)/FEVER_IN);
else return endFever();

for(let i=0;i<lanes.length;i++){
let l=lanes[i];
let wave=Math.sin(now*0.004+i)*5;

l._x=targetX[i]*p;
l.style.transform=`translateX(${l._x}px) translateY(${wave}px)`;
}
}

// =====================
function endFever(){
feverActive=false;
feverStartTime=0;
feverFill.style.width="0%";
document.body.classList.remove("fever");

lanes.forEach(l=>{
l._x=0;
l.style.transform="translateX(0px)";
});
}

// =====================
function checkFever(){
fever=Math.max(0,Math.min(100,fever));
feverFill.style.width=fever+"%";
if(fever>=100 && !feverActive) startFever();
}

// =====================
function loop(){

updateFeverWave();

for(let i=notes.length-1;i>=0;i--){

let n=notes[i];

// velocidade original
n.y += 4;

n.el.style.top = n.y + "px";

if(n.y > 620) miss(i);
}

requestAnimationFrame(loop);
}
loop();

// =====================
document.addEventListener("keydown",e=>{
hit(e.key.toLowerCase());
});

// =====================
function hit(k){

const lane=[...lanes].find(l=>l.dataset.key===k);
if(!lane) return;

flash(lane);

for(let i=0;i<notes.length;i++){

let n=notes[i];
if(n.key!==k) continue;

let d=Math.abs(n.y-585);

if(d<25)return perfect(i);
if(d<60)return good(i);
}
}

// =====================
function perfect(i){
remove(i);
show("PERFECT","perfect");
fever+=6;
checkFever();
}

// =====================
function good(i){
remove(i);
show("GOOD","good");
fever+=3;
checkFever();
}

// =====================
function miss(i){
if(notes[i]){
notes[i].el.remove();
notes.splice(i,1);
}
fever-=10;
show("MISS","miss");
}

// =====================
function remove(i){
if(notes[i]){
notes[i].el.remove();
notes.splice(i,1);
}
}

// =====================
function show(t,c){
judgeEl.textContent=t;
judgeEl.className=c;
setTimeout(()=>judgeEl.textContent="",350);
}

// =====================
function flash(l){
let k=l.querySelector(".key");
k.classList.add("effect");
setTimeout(()=>k.classList.remove("effect"),80);
}

function agathaTeclado(ativo){
const el = document.getElementById("rhythmGame");
el.style.display = ativo ? "flex" : "none";
}