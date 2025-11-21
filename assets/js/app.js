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

// Demo Progress Tracking - Resets on page reload for clean presentations
let demoProgressItems = [];

function saveProgressItem(title){
  if(!demoProgressItems.includes(title)) {
    demoProgressItems.push(title);
  }
}

function getProgressItems(){
  return demoProgressItems;
}

function clearProgress(){
  demoProgressItems = [];
}
