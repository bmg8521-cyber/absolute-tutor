const SESSIONS = [
  {id:1, title:'Intro to Python — Peer Tutor', time:'Mon 5:00 PM', host:'Aisha'},
  {id:2, title:'Data Structures Study Group', time:'Tue 7:00 PM', host:'Team Alpha'},
  {id:3, title:'Algorithms Q&A', time:'Wed 6:00 PM', host:'Carlos'},
  {id:4, title:'Exam Review — CS101', time:'Thu 4:00 PM', host:'Study Circle'}
];

function getMySessions(){
  return JSON.parse(localStorage.getItem('rlc_my_sessions') || '[]');
}
function saveMySessions(arr){ localStorage.setItem('rlc_my_sessions', JSON.stringify(arr)); }

document.addEventListener('DOMContentLoaded', ()=>{
  const list = document.getElementById('session-list');
  const myList = document.getElementById('my-sessions');

  function renderSessions(){
    list.innerHTML = '';
    SESSIONS.forEach(s=>{
      const div = document.createElement('div'); div.className='session card';
      div.innerHTML = `<div>
        <strong>${s.title}</strong><div class="muted">${s.time} • ${s.host}</div>
      </div>`;
      const btn = document.createElement('button'); btn.className='btn'; btn.textContent='Register';
      btn.addEventListener('click', ()=>{ register(s); });
      div.appendChild(btn);
      list.appendChild(div);
    })
  }

  function renderMy(){
    myList.innerHTML = '';
    const mine = getMySessions();
    if(mine.length===0){ myList.innerHTML='<li class="muted">No sessions registered</li>'; return }
    mine.forEach(s=>{
      const li = document.createElement('li'); li.textContent = `${s.title} — ${s.time}`;
      myList.appendChild(li);
    })
  }

  function register(session){
    const mine = getMySessions();
    if(mine.find(x=>x.id===session.id)) { alert('Already registered'); return }
    mine.push(session); saveMySessions(mine); renderMy(); alert('Registered — check Dashboard for reminders');
  }

  renderSessions(); renderMy();
})
