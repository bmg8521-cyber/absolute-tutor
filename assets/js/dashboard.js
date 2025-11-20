document.addEventListener('DOMContentLoaded', ()=>{
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const completedList = document.getElementById('completed-list');
  const resetBtn = document.getElementById('reset-btn');

  function render(){
    const items = getProgressItems();
    completedList.innerHTML = '';
    items.forEach(i=>{
      const li = document.createElement('li'); li.textContent = i; completedList.appendChild(li);
    })
    const pct = Math.min(100, Math.round((items.length / 6) * 100));
    progressBar.style.width = pct + '%';
    progressText.textContent = pct + '% complete';
  }

  resetBtn.addEventListener('click', ()=>{ if(confirm('Reset your progress?')){ clearProgress(); render(); } });
  render();
})
