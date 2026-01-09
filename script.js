/* PARTICLE BACKGROUND */
const canvas=document.getElementById("bg");
const ctx=canvas.getContext("2d");
canvas.width=innerWidth;
canvas.height=innerHeight;

let particles=[];
class Particle{
  constructor(){
    this.x=Math.random()*canvas.width;
    this.y=Math.random()*canvas.height;
    this.vx=(Math.random()-.5)*1.2;
    this.vy=(Math.random()-.5)*1.2;
    this.size=2;
  }
  move(){
    this.x+=this.vx;
    this.y+=this.vy;
    if(this.x<0||this.x>canvas.width) this.vx*=-1;
    if(this.y<0||this.y>canvas.height) this.vy*=-1;
  }
  draw(){
    ctx.fillStyle="#00eaff";
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
  }
}
for(let i=0;i<120;i++)particles.push(new Particle());

function connect(){
  for(let a=0;a<particles.length;a++){
    for(let b=a;b<particles.length;b++){
      let dx=particles[a].x-particles[b].x;
      let dy=particles[a].y-particles[b].y;
      let d=Math.sqrt(dx*dx+dy*dy);
      if(d<140){
        ctx.strokeStyle=`rgba(0,234,255,${1-d/140})`;
        ctx.beginPath();
        ctx.moveTo(particles[a].x,particles[a].y);
        ctx.lineTo(particles[b].x,particles[b].y);
        ctx.stroke();
      }
    }
  }
}
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{p.move();p.draw()});
  connect();
  requestAnimationFrame(animate);
}
animate();

/* GET STARTED */
document.getElementById("getStarted").onclick=()=>{
  document.getElementById("scanner").scrollIntoView({behavior:"smooth"});
};

/* SCAN */
const scanBtn=document.getElementById("scanBtn");
const loader=document.getElementById("loader");
const result=document.getElementById("result");
const riskValue=document.getElementById("riskValue");
const riskText=document.getElementById("riskText");

scanBtn.onclick=()=>{
  const url=document.getElementById("urlInput").value;
  if(!url.startsWith("http")) return alert("Enter valid URL");

  loader.classList.remove("hidden");
  result.classList.add("hidden");

  setTimeout(()=>{
    loader.classList.add("hidden");
    let risk=Math.floor(Math.random()*100);
    riskValue.textContent=risk+"%";
    riskText.textContent=risk<30?"Safe":risk<70?"Medium Risk":"Dangerous";
    riskText.style.color=risk<30?"#00ff99":risk<70?"#ffcc00":"#ff4444";
    result.classList.remove("hidden");
  },2000);
};

/* SCROLL REVEAL */
const reveals=document.querySelectorAll(".reveal");
window.addEventListener("scroll",()=>{
  reveals.forEach(el=>{
    if(el.getBoundingClientRect().top<window.innerHeight-100)
      el.classList.add("active");
  });
});
window.onresize=()=>{
  canvas.width=innerWidth;
  canvas.height=innerHeight;
};
