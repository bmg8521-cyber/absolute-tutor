document.addEventListener('DOMContentLoaded', ()=>{
  // mark lesson complete
  document.querySelectorAll('button[data-lesson]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const title = btn.getAttribute('data-lesson');
      saveProgressItem(title);
      alert('Marked "' + title + '" as complete. Visit Dashboard to view progress.');
    })
  })

  // quiz
  const submit = document.getElementById('submit-quiz');
  if(submit){
    submit.addEventListener('click', ()=>{
      const choices = document.getElementsByName('q1');
      let val=null; for(const c of choices) if(c.checked) val=c.value;
      const result = document.getElementById('quiz-result');
      if(!val){ result.textContent='Please choose an answer.'; return }
      if(val==='3'){
        result.textContent='Correct — n^2 grows fastest here.';
        saveProgressItem('Quiz: Big-O');
      } else {
        result.textContent='Not quite — try re-watching the video or discussing in a study group.';
      }
    })
  }
  
  // Lazy-load YouTube embeds: create thumbnail + play overlay, swap to iframe on click
  function setupLazyVideos(){
    const cards = document.querySelectorAll('.video-card');
    cards.forEach(card => {
      const id = card.getAttribute('data-video-id');
      if(!id) return;
      // create thumbnail image
      const thumb = document.createElement('img');
      thumb.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
      thumb.alt = 'Play video';
      thumb.className = 'video-thumb';
      thumb.style.cursor = 'pointer';
      // play overlay
      const overlay = document.createElement('div'); overlay.className='video-play';
      overlay.setAttribute('aria-hidden','true');
      overlay.innerHTML = '<svg width="72" height="72" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="rgba(0,0,0,0.6)"/><path d="M10 8l6 4-6 4V8z" fill="#fff"/></svg>';
      // clear card and append
      card.innerHTML = '';
      card.appendChild(thumb); card.appendChild(overlay);

      function loadIframe(){
        const iframe = document.createElement('iframe');
        iframe.width = '560'; iframe.height='315';
        iframe.loading = 'lazy';
        iframe.src = `https://www.youtube.com/embed/${id}?rel=0&playsinline=1`;
        iframe.title = 'YouTube video player';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.setAttribute('allowfullscreen','');
        // replace content
        card.innerHTML = '';
        card.appendChild(iframe);
      }

      // click or keyboard activation
      thumb.addEventListener('click', loadIframe);
      overlay.addEventListener('click', loadIframe);
      // keyboard accessibility: make overlay focusable
      overlay.tabIndex = 0;
      overlay.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); loadIframe(); } });
    })
  }

  setupLazyVideos();
})
