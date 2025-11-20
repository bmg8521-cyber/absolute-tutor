// Common utilities
document.addEventListener('DOMContentLoaded', ()=>{
  // highlight nav link
  const links = document.querySelectorAll('nav a');
  links.forEach(a => {
    if(location.pathname.endsWith(a.getAttribute('href'))){
      a.classList.add('active')
      a.setAttribute('aria-current','page')
    }
  })
})

function saveProgressItem(title){
  const key = 'rlc_completed';
  const data = JSON.parse(localStorage.getItem(key) || '[]');
  if(!data.includes(title)) data.push(title);
  localStorage.setItem(key, JSON.stringify(data));
}

function getProgressItems(){
  return JSON.parse(localStorage.getItem('rlc_completed') || '[]');
}

function clearProgress(){
  localStorage.removeItem('rlc_completed');
}
