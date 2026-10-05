<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Trade Journal</title>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
<style>
:root{--bg:#000;--panel:#0b0b12;--panel2:#17172a;--blue:#7c5cff;--blue2:#38bdf8;--or:#fb7185;--tx:#F9F9F9;--mut:#8d93b5;--up:#4ade80;--ln:rgba(249,249,249,.09);color-scheme:dark;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
html{scroll-padding-top:env(safe-area-inset-top,0px)}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--tx);font:14px/1.5 Sora,system-ui,sans-serif}
header{display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid var(--ln);position:sticky;top:env(safe-area-inset-top,0px);background:var(--bg);z-index:5}
h1{font-size:18px;margin:0;font-weight:700}
nav{display:flex;gap:4px;overflow-x:auto}
nav button{background:none;border:0;color:var(--mut);padding:8px 14px;border-radius:8px;font:inherit;cursor:pointer;white-space:nowrap}
nav button.on{background:var(--blue);color:var(--tx)}
button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid var(--or);outline-offset:2px}
main{padding:20px;max-width:1280px;margin:auto}
.view{display:none}.view.on{display:block}
.row{display:grid;gap:14px;margin-bottom:14px}
.kpis{grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}
.g3{grid-template-columns:repeat(auto-fit,minmax(300px,1fr))}
.g2{grid-template-columns:repeat(auto-fit,minmax(380px,1fr))}
.card{background:var(--panel);border:1px solid var(--ln);border-radius:12px;padding:16px}
.card h3{margin:0 0 10px;font-size:13px;font-weight:600;color:var(--mut)}
.kpi b{display:block;font-size:24px;margin-top:2px}
.kpi small{color:var(--mut)}
.up{color:var(--up)}.dn{color:var(--or)}
canvas{max-height:240px}
.bar{display:flex;gap:10px;align-items:center;margin-bottom:14px;flex-wrap:wrap}
select,input,textarea{background:var(--bg);color:var(--tx);border:1px solid var(--ln);border-radius:8px;padding:9px 10px;font:inherit;width:100%}
label{display:block;font-size:12px;color:var(--mut)}
.bar select{width:auto}
.form{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px}
.form .w{grid-column:1/-1}
.btn{background:var(--blue);color:#fff;border:0;border-radius:8px;padding:10px 18px;font:inherit;font-weight:700;cursor:pointer}
.btn.g{background:var(--panel2);color:var(--tx);font-weight:600}
.chk{display:flex;gap:8px;align-items:center;padding-top:22px}.chk input{width:auto}
.tw{overflow-x:auto}
table{border-collapse:collapse;width:100%;min-width:760px}
th{text-align:left;color:var(--mut);font-weight:600;font-size:12px;padding:8px;border-bottom:1px solid var(--ln)}
td{padding:8px;border-bottom:1px solid var(--ln);white-space:nowrap}
td button{background:none;border:0;color:var(--mut);cursor:pointer}
.cal{display:grid;grid-template-columns:repeat(7,1fr);gap:6px}
.cal .h{text-align:center;color:var(--mut);font-size:12px}
.day{min-height:78px;background:var(--panel);border:1px solid var(--ln);border-radius:8px;padding:6px;font-size:12px}
.day.w{background:rgba(74,222,128,.14);border-color:rgba(74,222,128,.4)}
.day.l{background:rgba(251,113,133,.14);border-color:rgba(251,113,133,.45)}
.day b{display:block;margin-top:6px;font-size:13px}
.day span{color:var(--mut)}
.note{border-left:3px solid var(--or);padding:6px 12px;margin-bottom:10px;background:var(--panel2);border-radius:0 8px 8px 0}
.note small{color:var(--mut)}
.empty{color:var(--mut);padding:20px;text-align:center}
@media(max-width:520px){.g2{grid-template-columns:1fr}.day{min-height:60px;padding:4px}main{padding:12px}}

body{background:radial-gradient(900px 400px at 10% -10%,rgba(109,94,240,.22),transparent),var(--bg)}
.card{border-radius:16px;box-shadow:0 8px 24px rgba(0,0,0,.25)}
.kpi{border-top:3px solid var(--blue)}.kpi b{font-size:28px}
nav{background:var(--panel);padding:4px;border-radius:12px}nav button{border-radius:9px}
.ex{border:1px dashed #8b7cf6;background:linear-gradient(135deg,rgba(109,94,240,.18),var(--panel))}
.ex ol{margin:8px 0 14px;padding-left:20px;color:var(--mut)}.ex .bt{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}

body{background:#000}body::before{content:'';position:fixed;inset:0;z-index:-1;background:radial-gradient(520px 320px at 18% 8%,rgba(124,92,255,.28),transparent),radial-gradient(520px 320px at 88% 28%,rgba(34,211,238,.2),transparent);animation:drift 14s ease-in-out infinite alternate}
@keyframes drift{to{transform:translate3d(40px,30px,0) scale(1.12)}}
.floor{position:fixed;left:-50%;right:-50%;bottom:0;height:45vh;z-index:-1;background:linear-gradient(rgba(124,92,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(124,92,255,.4) 1px,transparent 1px);background-size:60px 60px;transform:perspective(300px) rotateX(62deg);transform-origin:bottom;animation:flr 4s linear infinite;-webkit-mask:linear-gradient(transparent,#000);mask:linear-gradient(transparent,#000)}
@keyframes flr{to{background-position:0 60px}}
header{background:rgba(0,0,0,.7);backdrop-filter:blur(12px)}
.card{background:linear-gradient(160deg,#14142200,#0b0b12);background-color:rgba(11,11,18,.85);border:1px solid rgba(255,255,255,.09);box-shadow:0 22px 40px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.08);transition:transform .15s ease-out,box-shadow .3s}
.card.tl{box-shadow:0 30px 60px rgba(0,0,0,.8),0 0 28px rgba(124,92,255,.35),inset 0 1px 0 rgba(255,255,255,.12)}
.view.on .card{animation:rise .8s cubic-bezier(.2,.8,.2,1) backwards}
.row>.card:nth-child(2){animation-delay:.08s}.row>.card:nth-child(3){animation-delay:.16s}.row>.card:nth-child(4){animation-delay:.24s}
@keyframes rise{from{opacity:0;transform:perspective(900px) translateY(30px) rotateX(14deg)}}
.rings{grid-template-columns:repeat(auto-fit,minmax(170px,1fr))}
.ring{text-align:center;position:relative;padding:18px 10px}
.ring svg{width:130px;height:130px;transform:rotate(-90deg);overflow:visible}
.ring circle{fill:none;stroke-width:9;stroke-linecap:round}
.ring .bgc{stroke:rgba(255,255,255,.07)}
.ring .fg{stroke:currentColor;stroke-dasharray:314;stroke-dashoffset:314;filter:drop-shadow(0 0 7px currentColor);animation:ring 1.6s cubic-bezier(.2,.8,.2,1) .2s forwards}
@keyframes ring{to{stroke-dashoffset:calc(314 - 314*var(--p)/100)}}
.rv{position:absolute;top:18px;left:0;right:0;height:130px;display:flex;justify-content:center;align-items:center;font-size:28px;font-weight:700}
.ring b{display:block;margin-top:8px}.ring small{color:var(--mut)}
.hero{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:14px}
.hero h2{margin:0;font-size:26px;background:linear-gradient(90deg,#fff,#a78bfa,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent}
.hero small{color:var(--mut)}
.rl{display:flex;gap:8px;align-items:center;color:var(--tx);font-size:14px;padding:5px 0}.rl input{width:auto}
.big{font-size:42px;font-weight:700;text-shadow:0 0 24px currentColor}
.tr{display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--ln)}
.mini{display:flex;gap:6px;justify-content:center}.mini .ring{background:none;box-shadow:none;border:0;animation:none}
.stars button{background:none;border:0;font-size:26px;cursor:pointer;color:#3a3a4a}.stars button.on{color:#fbbf24;text-shadow:0 0 12px #fbbf24}
.btn{box-shadow:0 0 18px rgba(124,92,255,.5)}
@media(prefers-reduced-motion:reduce){*{animation:none!important}.ring .fg{stroke-dashoffset:calc(314 - 314*var(--p)/100)}}
</style>
</head>
<body><div class="floor"></div>
<header>
<h1>📈 Trade Journal</h1>
<nav id="nav"></nav>
</header>
<main>

<section class="view on" id="v-today"></section>
<section class="view" id="v-dash">
<div class="bar"><select id="range"><option value="30">Last 30 days</option><option value="90">Last 90 days</option><option value="9999" selected>All time</option></select></div>
<div class="row rings" id="rings"></div><div class="row kpis" id="kpis"></div>
<div class="row g2"><div class="card"><h3>Cumulative P&amp;L</h3><canvas id="c1"></canvas></div><div class="card"><h3>P&amp;L per trade</h3><canvas id="c2"></canvas></div></div>
<div class="row g3"><div class="card"><h3>Win rate by setup</h3><canvas id="c3"></canvas></div><div class="card"><h3>Execution rate by setup (plan followed)</h3><canvas id="c4"></canvas></div><div class="card"><h3>Profit share by symbol</h3><canvas id="c5"></canvas></div></div>
<div class="row g3"><div class="card"><h3>Monthly P&amp;L</h3><canvas id="c6"></canvas></div><div class="card"><h3>Cost of mistakes</h3><canvas id="c7"></canvas></div><div class="card"><h3>Drawdown by trade</h3><canvas id="c8"></canvas></div></div>
</section>

<section class="view" id="v-log">
<div class="card ex" style="margin-bottom:14px"><h3 style="color:#fff;font-size:15px">New here? Here is one example day</h3>
<ol><li>Enter each trade after you close it: symbol, entry, exit and your stop loss.</li><li>Tick "I followed my plan" only if you obeyed your own rules.</li><li>Write one lesson. Mistakes you tag show up in the Dashboard's "Cost of mistakes" chart.</li></ol>
<div class="tw"><table style="min-width:640px"><thead><tr><th>Symbol</th><th>Trade</th><th>Entry → Exit (stop)</th><th>Result</th><th>Lesson written</th></tr></thead><tbody id="extb"></tbody></table></div>
<div class="bt"><button class="btn" id="exday">Add this example day to my journal</button><button class="btn g" id="exfill">Fill the form with trade 1</button></div></div>
<div class="card" style="margin-bottom:14px"><h3>Daily trade log</h3>
<div class="form" id="form">
<div><label>Date</label><input type="date" id="f-date"></div>
<div><label>Symbol</label><input id="f-sym" placeholder="e.g. NVDA"></div>
<div><label>Direction</label><select id="f-dir"><option>Long</option><option>Short</option></select></div>
<div><label>Setup / strategy</label><select id="f-strat"></select></div>
<div><label>Quantity</label><input type="number" id="f-qty" min="0" step="any"></div>
<div><label>Entry price</label><input type="number" id="f-entry" step="any"></div>
<div><label>Exit price</label><input type="number" id="f-exit" step="any"></div>
<div><label>Stop loss</label><input type="number" id="f-stop" step="any"></div>
<div><label>Fees</label><input type="number" id="f-fee" step="any" value="0"></div>
<div><label>Emotion</label><select id="f-emo"></select></div>
<div><label>Mistake made</label><select id="f-mis"></select></div>
<div class="chk"><input type="checkbox" id="f-plan" checked><label for="f-plan" style="font-size:14px;color:var(--tx)">I followed my plan</label></div>
<div class="w"><label>Reflection: what did I learn from this trade?</label><textarea id="f-note" rows="2"></textarea></div>
<div class="w"><button class="btn" id="add">Save trade</button> <span id="msg" style="color:var(--mut);margin-left:10px"></span></div>
</div></div>
<div class="card tw"><table><thead><tr><th>Date</th><th>Symbol</th><th>Side</th><th>Setup</th><th>Entry</th><th>Exit</th><th>P&amp;L</th><th>R</th><th>Plan</th><th>Mistake</th><th></th></tr></thead><tbody id="tb"></tbody></table></div>
<p style="margin-top:14px"><button class="btn g" id="clear">Clear all trades</button></p>
</section>

<section class="view" id="v-cal">
<div class="bar"><button class="btn g" id="pm">Previous</button><b id="mt" style="min-width:140px;text-align:center"></b><button class="btn g" id="nm">Next</button></div>
<div class="cal" id="cal"></div>
</section>

<section class="view" id="v-rep">
<div class="row g2"><div class="card tw"><h3>Strategy report</h3><table id="t-strat"></table></div><div class="card tw"><h3>Symbol report</h3><table id="t-sym"></table></div></div>
<div class="card"><h3>Lessons learned</h3><div id="notes"></div></div>
</section>

</main>
<script>
const $=id=>document.getElementById(id);
const K='tj_trades_v1';
const STRATS=['Breakout','Pullback','Reversal','Range'];
const EMOS=['Calm','Confident','Anxious','FOMO','Frustrated'];
const MIS=['None','Early exit','Moved stop','Oversized','FOMO entry','Revenge trade'];
const BLUE='#22d3ee',OR='#fb7185',UP='#4ade80',MUT='#9aa3c7';
const iso=d=>new Date(d.getTime()-d.getTimezoneOffset()*6e4).toISOString().slice(0,10);
let T=load(),charts=[],cm=new Date();if(window.Chart)Chart.defaults.animation={duration:1600,easing:'easeOutQuart'};

function seed(){
  let s=7;const r=()=>(s=(s*16807)%2147483647)/2147483647;
  const syms={AAPL:190,TSLA:240,NVDA:120,AMZN:180,META:500},out=[];
  const d=new Date();let n=0;
  for(let i=0;i<70&&n<38;i++){
    const x=new Date(d);x.setDate(d.getDate()-i);if([0,6].includes(x.getDay())||r()<.35)continue;
    const sym=Object.keys(syms)[Math.floor(r()*5)],p=syms[sym],plan=r()<.74,win=plan?r()<.66:r()<.3;
    const dir=r()<.7?'Long':'Short',mv=p*(.004+r()*.012)*(win?1:-.8),entry=+p.toFixed(2);
    const exit=+(entry+(dir==='Long'?mv:-mv)).toFixed(2),qty=Math.round(20+r()*60);
    const mis=plan?'None':MIS[1+Math.floor(r()*5)];
    out.push({id:'s'+n++,date:iso(x),sym,dir,strat:STRATS[Math.floor(r()*4)],qty,entry,exit,stop:+(entry*(dir==='Long'?.99:1.01)).toFixed(2),fee:2,emo:plan?EMOS[Math.floor(r()*2)]:EMOS[2+Math.floor(r()*3)],plan,mistake:mis,note:plan?'Waited for confirmation and stuck to the plan.':'Broke my rules: '+mis.toLowerCase()+'. Write the checklist before entering.'});
  }
  return out;
}
function load(){try{const s=localStorage.getItem(K);if(s)return JSON.parse(s)}catch(e){}return seed()}
function save(){try{localStorage.setItem(K,JSON.stringify(T))}catch(e){}}

const pnl=t=>(t.dir==='Long'?t.exit-t.entry:t.entry-t.exit)*t.qty-t.fee;
const rr=t=>{const k=Math.abs(t.entry-t.stop)*t.qty;return k?pnl(t)/k:0};
const money=v=>(v<0?'-':'')+'$'+Math.abs(v).toLocaleString(undefined,{maximumFractionDigits:0});
const cls=v=>v>=0?'up':'dn';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sorted=l=>[...l].sort((a,b)=>a.date.localeCompare(b.date));
function group(l,key){const m={};l.forEach(t=>{(m[key(t)]=m[key(t)]||[]).push(t)});return m}
function rate(l,f){return l.length?Math.round(100*l.filter(f).length/l.length):0}

function filtered(){const n=+$('range').value,c=new Date();c.setDate(c.getDate()-n);return sorted(T).filter(t=>t.date>=iso(c))}

function mk(id,cfg){charts.push(new Chart($(id),cfg))}
function opts(extra){return Object.assign({responsive:true,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{color:MUT,maxTicksLimit:8}},y:{grid:{color:'rgba(249,249,249,.07)'},ticks:{color:MUT}}}},extra||{})}

function dash(){
  charts.forEach(c=>c.destroy());charts=[];
  const L=filtered(),P=L.map(pnl),net=P.reduce((a,b)=>a+b,0);
  const gw=P.filter(v=>v>0).reduce((a,b)=>a+b,0),gl=-P.filter(v=>v<0).reduce((a,b)=>a+b,0);
  let cum=0,pk=0,dd=0;const C=[],D=[];
  P.forEach(v=>{cum+=v;pk=Math.max(pk,cum);C.push(+cum.toFixed(2));D.push(+(pk?(cum-pk)/Math.max(pk,1)*100:0).toFixed(1));dd=Math.min(dd,cum-pk)});
  const avgR=L.length?L.reduce((a,t)=>a+rr(t),0)/L.length:0;
  const K=[['Net P&L',money(net),cls(net),L.length+' trades'],['Win rate',rate(L,t=>pnl(t)>0)+'%','', 'avg win '+money(gw/Math.max(1,P.filter(v=>v>0).length))],['Execution rate',rate(L,t=>t.plan)+'%','','plan followed'],['Profit factor',gl?(gw/gl).toFixed(2):'-','','gross win / loss'],['Average R',avgR.toFixed(2)+'R',cls(avgR),'per trade'],['Max drawdown',money(dd),'dn','peak to trough']];
  $('kpis').innerHTML=K.map(k=>`<div class="card kpi"><small>${k[0]}</small><b class="${k[2]}">${k[1]}</b><small>${k[3]}</small></div>`).join('');
  const gd=group(L,t=>t.date),gk=Object.keys(gd),mnet=T.filter(t=>t.date.slice(0,7)===iso(new Date()).slice(0,7)).reduce((a,t)=>a+pnl(t),0);
  $('rings').innerHTML=ringH(rate(L,t=>pnl(t)>0),'Win rate',BLUE,'trades won')+ringH(rate(L,t=>t.plan),'Execution rate','#a78bfa','plan followed')+ringH(gk.length?100*gk.filter(k=>gd[k].reduce((a,t)=>a+pnl(t),0)>0).length/gk.length:0,'Green days','#34d399','profitable days')+`<div data-goal style="cursor:pointer">${ringH(mnet/G*100,'Monthly goal','#fbbf24','of '+money(G)+' · tap to edit')}</div>`;count();
  if(!L.length)return;
  const lab=L.map((t,i)=>t.date.slice(5));
  mk('c1',{type:'line',data:{labels:lab,datasets:[{data:C,borderColor:BLUE,backgroundColor:'rgba(56,189,248,.15)',fill:true,tension:.3,pointRadius:0}]},options:opts()});
  mk('c2',{type:'bar',data:{labels:lab,datasets:[{data:P,backgroundColor:P.map(v=>v>=0?UP:OR)}]},options:opts()});
  const bs=group(L,t=>t.strat),ks=Object.keys(bs);
  mk('c3',{type:'bar',data:{labels:ks,datasets:[{data:ks.map(k=>rate(bs[k],t=>pnl(t)>0)),backgroundColor:BLUE}]},options:opts({scales:{x:{grid:{display:false},ticks:{color:MUT}},y:{max:100,grid:{color:'rgba(249,249,249,.07)'},ticks:{color:MUT,callback:v=>v+'%'}}}})});
  mk('c4',{type:'bar',data:{labels:ks,datasets:[{data:ks.map(k=>rate(bs[k],t=>t.plan)),backgroundColor:OR}]},options:opts({scales:{x:{grid:{display:false},ticks:{color:MUT}},y:{max:100,grid:{color:'rgba(249,249,249,.07)'},ticks:{color:MUT,callback:v=>v+'%'}}}})});
  const sy=group(L,t=>t.sym),sk=Object.keys(sy),sv=sk.map(k=>Math.max(0,sy[k].reduce((a,t)=>a+pnl(t),0)));
  mk('c5',{type:'doughnut',data:{labels:sk,datasets:[{data:sv,backgroundColor:[BLUE,OR,'#8b7cf6','#fbbf24','#6fc3ee'],borderWidth:0}]},options:{cutout:'65%',plugins:{legend:{position:'right',labels:{color:MUT,boxWidth:10}}}}});
  const mo=group(L,t=>t.date.slice(0,7)),mk2=Object.keys(mo).sort(),mv=mk2.map(k=>+mo[k].reduce((a,t)=>a+pnl(t),0).toFixed(0));
  mk('c6',{type:'bar',data:{labels:mk2,datasets:[{data:mv,backgroundColor:mv.map(v=>v>=0?UP:OR)}]},options:opts()});
  const ms=group(L.filter(t=>t.mistake!=='None'&&pnl(t)<0),t=>t.mistake),mn=Object.keys(ms),mc=mn.map(k=>-ms[k].reduce((a,t)=>a+pnl(t),0));
  mk('c7',{type:'bar',data:{labels:mn,datasets:[{data:mc,backgroundColor:OR}]},options:opts({indexAxis:'y',scales:{x:{grid:{color:'rgba(249,249,249,.07)'},ticks:{color:MUT}},y:{grid:{display:false},ticks:{color:MUT}}}})});
  mk('c8',{type:'line',data:{labels:lab,datasets:[{data:D,borderColor:OR,backgroundColor:'rgba(251,113,133,.15)',fill:true,pointRadius:0,tension:.2}]},options:opts()});
}

function log(){
  $('tb').innerHTML=T.length?[...sorted(T)].reverse().map(t=>{const p=pnl(t);return `<tr><td>${t.date}</td><td>${esc(t.sym)}</td><td>${t.dir}</td><td>${esc(t.strat)}</td><td>${t.entry}</td><td>${t.exit}</td><td class="${cls(p)}">${money(p)}</td><td>${rr(t).toFixed(2)}</td><td>${t.plan?'Yes':'No'}</td><td>${esc(t.mistake)}</td><td><button data-d="${t.id}" aria-label="Delete trade">Delete</button></td></tr>`}).join(''):'<tr><td colspan="11" class="empty">No trades yet. Fill in the form above and save your first trade.</td></tr>';
}

function cal(){
  const y=cm.getFullYear(),m=cm.getMonth(),first=new Date(y,m,1).getDay(),days=new Date(y,m+1,0).getDate();
  $('mt').textContent=cm.toLocaleString('en',{month:'long',year:'numeric'});
  const by=group(T,t=>t.date);let h=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=>`<div class="h">${d}</div>`).join('')+'<div></div>'.repeat(first);
  let tot=0;
  for(let d=1;d<=days;d++){const k=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`,l=by[k];
    if(l){const p=l.reduce((a,t)=>a+pnl(t),0);tot+=p;h+=`<div class="day ${p>=0?'w':'l'}">${d}<b class="${cls(p)}">${money(p)}</b><span>${l.length} trade${l.length>1?'s':''}</span></div>`}
    else h+=`<div class="day">${d}</div>`}
  $('cal').innerHTML=h;$('mt').insertAdjacentHTML('afterend','');
  $('mt').title='Month total '+money(tot);$('mt').textContent+=' ('+money(tot)+')';
}

function rep(){
  const tbl=(l,key,id)=>{const g=group(l,key);$(id).innerHTML='<thead><tr><th>Name</th><th>Trades</th><th>Win rate</th><th>Net P&amp;L</th><th>Avg R</th></tr></thead><tbody>'+Object.keys(g).map(k=>{const a=g[k],p=a.reduce((s,t)=>s+pnl(t),0);return `<tr><td>${esc(k)}</td><td>${a.length}</td><td>${rate(a,t=>pnl(t)>0)}%</td><td class="${cls(p)}">${money(p)}</td><td>${(a.reduce((s,t)=>s+rr(t),0)/a.length).toFixed(2)}</td></tr>`}).join('')+'</tbody>'};
  tbl(T,t=>t.strat,'t-strat');tbl(T,t=>t.sym,'t-sym');
  const N=sorted(T).reverse().filter(t=>t.note).slice(0,12);
  $('notes').innerHTML=N.length?N.map(t=>`<div class="note"><small>${t.date} · ${esc(t.sym)} · ${money(pnl(t))} · ${esc(t.emo)}</small><div>${esc(t.note)}</div></div>`).join(''):'<div class="empty">Reflections you write while logging trades show up here.</div>';
}

const views={today,dash,log,cal,rep};
function show(v){document.querySelectorAll('.view').forEach(e=>e.classList.toggle('on',e.id==='v-'+v));[...$('nav').children].forEach(b=>b.classList.toggle('on',b.dataset.v===v));views[v]()}
[['today','Today'],['dash','Dashboard'],['log','Trade log'],['cal','Calendar'],['rep','Reports']].forEach(([v,n])=>{const b=document.createElement('button');b.textContent=n;b.dataset.v=v;b.onclick=()=>show(v);$('nav').appendChild(b)});
const fill=(id,a)=>$(id).innerHTML=a.map(x=>`<option>${x}</option>`).join('');
fill('f-strat',STRATS);fill('f-emo',EMOS);fill('f-mis',MIS);
$('f-date').value=iso(new Date());
$('range').onchange=dash;
$('pm').onclick=()=>{cm=new Date(cm.getFullYear(),cm.getMonth()-1,1);cal()};
$('nm').onclick=()=>{cm=new Date(cm.getFullYear(),cm.getMonth()+1,1);cal()};
$('add').onclick=()=>{
  const g=i=>$('f-'+i).value,n=i=>parseFloat(g(i));
  if(!g('sym').trim()||[n('qty'),n('entry'),n('exit'),n('stop')].some(isNaN)){$('msg').textContent='Add a symbol, quantity, entry, exit and stop loss.';return}
  T.push({id:'t'+Date.now(),date:g('date'),sym:g('sym').trim().toUpperCase(),dir:g('dir'),strat:g('strat'),qty:n('qty'),entry:n('entry'),exit:n('exit'),stop:n('stop'),fee:n('fee')||0,emo:g('emo'),plan:$('f-plan').checked,mistake:g('mis'),note:g('note').trim()});
  save();['sym','qty','entry','exit','stop','note'].forEach(i=>$('f-'+i).value='');$('msg').textContent='Trade saved.';log();
};
$('tb').onclick=e=>{const d=e.target.dataset.d;if(d){T=T.filter(t=>t.id!==d);save();log()}};
$('clear').onclick=()=>{if(confirm('Delete every trade, including the sample data?')){T=[];save();log()}};
const EX=[{sym:'NVDA',dir:'Long',strat:'Breakout',qty:50,entry:120,exit:123.5,stop:118.5,fee:2,emo:'Calm',plan:true,mistake:'None',note:'Waited for the 15-min close above resistance and held to my target.'},
{sym:'TSLA',dir:'Short',strat:'Reversal',qty:30,entry:240,exit:244,stop:243,fee:2,emo:'Frustrated',plan:false,mistake:'Moved stop',note:'I widened my stop hoping it would turn. Rule: never move a stop further away.'},
{sym:'AAPL',dir:'Long',strat:'Pullback',qty:40,entry:190,exit:191.5,stop:188.5,fee:2,emo:'Confident',plan:true,mistake:'None',note:'Small win, clean entry on the pullback to support.'}];
$('extb').innerHTML=EX.map(t=>{const p=pnl(t);return `<tr><td>${t.sym}</td><td>${t.dir} · ${t.strat}</td><td>${t.entry} → ${t.exit} (${t.stop})</td><td class="${cls(p)}">${money(p)} · ${rr(t).toFixed(1)}R</td><td style="white-space:normal;min-width:240px">${t.note}</td></tr>`}).join('');
$('exday').onclick=()=>{if(T.some(t=>t.id==='ex1')){$('msg').textContent='Example day is already added.';return}EX.forEach((t,i)=>T.push({...t,id:'ex'+(i+1),date:iso(new Date())}));save();log();$('msg').textContent='Example day added. Check the Dashboard and Calendar.'};
$('exfill').onclick=()=>{const t=EX[0];$('f-sym').value=t.sym;$('f-qty').value=t.qty;$('f-entry').value=t.entry;$('f-exit').value=t.exit;$('f-stop').value=t.stop;$('f-fee').value=t.fee;$('f-strat').value=t.strat;$('f-note').value=t.note;$('f-plan').checked=true;$('msg').textContent='Form filled. Press Save trade.'};
const DK='tj_days_v1';let D={};try{D=JSON.parse(localStorage.getItem(DK))||{}}catch(e){}
let G=+(()=>{try{return localStorage.getItem('tj_goal')}catch(e){return 0}})()||2000,cd=iso(new Date());
const saveD=()=>{try{localStorage.setItem(DK,JSON.stringify(D))}catch(e){}};
const RULES=['Risk 1% or less per trade','Only A+ setups','No revenge trades','Respected daily loss limit','Journaled every trade'];
function ringH(p,l,c,sub){p=Math.max(0,Math.min(100,Math.round(p||0)));return `<div class="ring card"><svg viewBox="0 0 120 120" style="color:${c}"><circle class="bgc" cx="60" cy="60" r="50"/><circle class="fg" cx="60" cy="60" r="50" style="--p:${p}"/></svg><div class="rv"><span data-n="${p}">0</span>%</div><b>${l}</b><small>${sub||''}</small></div>`}
function count(){document.querySelectorAll('[data-n]').forEach(e=>{const t=+e.dataset.n,s=performance.now();(function f(n){const k=Math.min(1,(n-s)/1400);e.textContent=Math.round(t*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)})(s)})}
function today(){
  const d=D[cd]||(D[cd]={rules:[]}),L=T.filter(t=>t.date===cd),P=L.reduce((a,t)=>a+pnl(t),0),rules=d.rules||[];
  let st=0;const x=new Date(cd+'T12:00');
  for(let i=0;i<400;i++){const k=iso(x),e=D[k];if((e&&(e.lesson||e.plan))||T.some(t=>t.date===k))st++;else if(!([0,6].includes(x.getDay())||(i===0)))break;x.setDate(x.getDate()-1)}
  const opt=(a,v)=>a.map(o=>`<option ${v===o?'selected':''}>${o}</option>`).join('');
  $('v-today').innerHTML=`<div class="hero card"><div><h2>Daily record</h2><small>${new Date(cd+'T12:00').toDateString()} · 🔥 ${st}-day journaling streak</small></div>
<div class="bar" style="margin:0"><button class="btn g" data-dd="-1" aria-label="Previous day">‹</button><input type="date" id="cdate" value="${cd}" style="width:auto"><button class="btn g" data-dd="1" aria-label="Next day">›</button></div></div>
<div class="row g2"><div class="card"><h3>1 · Before the market: your plan</h3>
<label>Market bias</label><select data-k="bias">${opt(['Bullish','Bearish','Neutral / choppy'],d.bias)}</select>
<label style="margin-top:10px">Game plan: levels, setups, max loss today</label><textarea data-k="plan" rows="4" placeholder="e.g. Watch NVDA above 120. Breakouts only. Stop trading after -$150.">${esc(d.plan||'')}</textarea>
<label style="margin:10px 0 2px">Rules checklist</label>${RULES.map((r,i)=>`<label class="rl"><input type="checkbox" data-r="${i}" ${rules.includes(i)?'checked':''}>${r}</label>`).join('')}</div>
<div class="card"><h3>2 · Today's result</h3><div class="big ${cls(P)}">${money(P)}</div><small style="color:var(--mut)">${L.length} trade${L.length==1?'':'s'} logged</small>
<div class="mini">${ringH(rate(L,t=>t.plan),'Execution','#a78bfa','plan followed')}${ringH(100*rules.length/RULES.length,'Discipline','#22d3ee','rules kept')}</div>
${L.length?L.map(t=>`<div class="tr"><span>${esc(t.sym)} · ${t.dir} · ${esc(t.strat)}</span><b class="${cls(pnl(t))}">${money(pnl(t))}</b></div>`).join(''):'<div class="empty">No trades for this day yet.</div>'}
<p><button class="btn" id="golog">Log a trade for this day</button></p></div></div>
<div class="card"><h3>3 · After the market: review</h3><div class="form">
<div class="w"><label>What went well?</label><textarea data-k="well" rows="2">${esc(d.well||'')}</textarea></div>
<div class="w"><label>What mistakes did I make?</label><textarea data-k="mist" rows="2">${esc(d.mist||'')}</textarea></div>
<div class="w"><label>One lesson for tomorrow</label><textarea data-k="lesson" rows="2">${esc(d.lesson||'')}</textarea></div>
<div><label>How did I feel?</label><select data-k="mood">${opt(['Calm','Confident','Anxious','FOMO','Frustrated','Tired'],d.mood)}</select></div>
<div><label>Rate my day</label><div class="stars">${[1,2,3,4,5].map(n=>`<button data-star="${n}" aria-label="${n} stars" class="${(d.rating||0)>=n?'on':''}">★</button>`).join('')}</div></div></div></div>`;
  count();
}
const V=$('v-today');
V.addEventListener('input',e=>{const t=e.target;if(t.dataset.k){D[cd][t.dataset.k]=t.value;saveD()}});
V.addEventListener('change',e=>{const t=e.target,d=D[cd];if(t.dataset.r!==undefined){const i=+t.dataset.r;d.rules=(d.rules||[]).filter(v=>v!==i);if(t.checked)d.rules.push(i);saveD();today()}else if(t.id==='cdate'&&t.value){cd=t.value;today()}});
V.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.dd){const x=new Date(cd+'T12:00');x.setDate(x.getDate()+ +b.dataset.dd);cd=iso(x);today()}else if(b.dataset.star){D[cd].rating=+b.dataset.star;saveD();today()}else if(b.id==='golog'){show('log');$('f-date').value=cd;scrollTo(0,0)}});
$('rings').onclick=e=>{if(e.target.closest('[data-goal]')){const v=parseFloat(prompt('Monthly profit goal ($)',G));if(v>0){G=v;try{localStorage.setItem('tj_goal',v)}catch(x){}dash()}}};
document.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const c=e.target.closest&&e.target.closest('.card');document.querySelectorAll('.card.tl').forEach(x=>{if(x!==c){x.classList.remove('tl');x.style.transform=''}});if(!c)return;const r=c.getBoundingClientRect();c.classList.add('tl');c.style.transform=`perspective(900px) rotateX(${-((e.clientY-r.top)/r.height-.5)*6}deg) rotateY(${((e.clientX-r.left)/r.width-.5)*6}deg) translateZ(6px)`});
show('today');
</script>
</body>
</html>
