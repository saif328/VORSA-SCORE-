setTimeout(()=>{
document.getElementById("splash").style.display="none";
document.getElementById("app").classList.remove("hidden");
},3000);

let all=[];

// تحميل مباريات
function load(date){
fetch(`/matches?date=${date}`)
.then(r=>r.json())
.then(d=>{
all=d.response||[];
render();
});
}

function render(){
let box=document.getElementById("matches");
box.innerHTML="";

all.forEach(m=>{
box.innerHTML+=`
<div class="match" onclick="openMatch(${m.fixture.id})">
${m.teams.home.name} 🆚 ${m.teams.away.name}
</div>`;
});
}

// تفاصيل
function openMatch(id){
let m=all.find(x=>x.fixture.id==id);

document.getElementById("details").innerHTML=`
<div class="match">
<h3>${m.teams.home.name} vs ${m.teams.away.name}</h3>
<p>${m.goals.home} - ${m.goals.away}</p>

<button onclick="lineup(${id})">التشكيل</button>
</div>
`;
}

// التشكيل
function lineup(id){
fetch(`/lineup/${id}`)
.then(r=>r.json())
.then(d=>{
alert(JSON.stringify(d.response));
});
}

// تاريخ
let t=new Date();
t.setDate(t.getDate()+1);

let d=t.toISOString().split("T")[0];
document.getElementById("date").value=d;

load(d);

document.getElementById("date").onchange=(e)=>{
load(e.target.value);
};