document.addEventListener('DOMContentLoaded', ()=>{
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const activitiesCount = document.getElementById('activities-count');
  const completedList = document.getElementById('completed-list');
  const emptyState = document.getElementById('empty-state');
  const resetBtn = document.getElementById('reset-btn');

  function render(){
    const items = getProgressItems();
    const totalPossibleActivities = 12; // Estimated total activities across all subjects
    
    // Update activity count
    activitiesCount.textContent = items.length;
    
    // Calculate and update progress percentage
    const pct = Math.min(100, Math.round((items.length / totalPossibleActivities) * 100));
    progressBar.style.width = pct + '%';
    progressText.textContent = pct + '%';
    
    // Update activities list
    completedList.innerHTML = '';
    
    if (items.length === 0) {
      // Show empty state
      emptyState.style.display = 'block';
      completedList.style.display = 'none';
    } else {
      // Show activities list
      emptyState.style.display = 'none';
      completedList.style.display = 'block';
      
      items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        completedList.appendChild(li);
      });
    }
    
    // Update progress description based on completion
    const progressDescription = document.querySelector('.progress-description');
    if (pct === 0) {
      progressDescription.textContent = 'Start your learning journey by completing activities!';
    } else if (pct < 25) {
      progressDescription.textContent = 'Great start! Keep exploring to build momentum.';
    } else if (pct < 50) {
      progressDescription.textContent = 'You\'re making good progress! Keep it up.';
    } else if (pct < 75) {
      progressDescription.textContent = 'Excellent work! You\'re more than halfway there.';
    } else if (pct < 100) {
      progressDescription.textContent = 'Amazing progress! You\'re almost at 100%.';
    } else {
      progressDescription.textContent = 'Congratulations! You\'ve completed all activities!';
    }
  }

  resetBtn.addEventListener('click', ()=>{ 
    if(confirm('Reset your progress? This will clear all completed activities.')) { 
      clearProgress(); 
      render(); 
      
      // Show success message
      const resetMessage = document.createElement('div');
      resetMessage.className = 'reset-message';
      resetMessage.innerHTML = '<p><strong>Progress reset successfully!</strong> Start learning to track new activities.</p>';
      resetMessage.style.cssText = `
        background: #e8f5e8;
        border: 1px solid var(--accent);
        color: #333;
        padding: 12px 16px;
        border-radius: 6px;
        margin-top: 20px;
        text-align: center;
      `;
      
      const progressCard = document.querySelector('.progress-card');
      progressCard.appendChild(resetMessage);
      
      // Remove message after 3 seconds
      setTimeout(() => {
        resetMessage.remove();
      }, 3000);
    } 
  });
  
  // Initial render
  render();
})
