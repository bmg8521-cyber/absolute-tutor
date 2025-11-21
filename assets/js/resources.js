// Subject-based Resources Manager
class ResourcesManager {
  constructor() {
    this.currentSubject = 'math';
    this.quizAnswers = {
      math: 3, // n² grows fastest
      science: 3, // Mitochondria produces energy (ATP) in cells
      cs: 3, // Stack follows LIFO principle
      languages: 2 // Spaced repetition is most effective
    };
    this.initializeInterface();
  }

  initializeInterface() {
    // Subject tab switching
    document.querySelectorAll('.subject-tab').forEach(tab => {
      tab.addEventListener('click', (e) => this.switchSubject(e.target.dataset.subject));
    });

    // Lesson completion buttons
    document.querySelectorAll('[data-lesson]').forEach(btn => {
      btn.addEventListener('click', (e) => this.completeLesson(e.target.dataset.lesson));
    });

    // Quiz submission
    document.querySelectorAll('.submit-quiz').forEach(btn => {
      btn.addEventListener('click', (e) => this.submitQuiz(e.target.dataset.quiz));
    });

    // Initialize video thumbnails
    this.initializeVideoThumbnails();
  }

  switchSubject(subject) {
    // Update active tab
    document.querySelectorAll('.subject-tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById(`${subject}-tab`).classList.add('active');

    // Update active content
    document.querySelectorAll('.subject-content').forEach(content => content.classList.remove('active'));
    document.getElementById(`${subject}-content`).classList.add('active');

    this.currentSubject = subject;

    // Reinitialize video thumbnails for the new subject
    this.initializeVideoThumbnails();
  }

  completeLesson(lessonTitle) {
    saveProgressItem(lessonTitle);
    alert(`Great job! "${lessonTitle}" marked as complete. Check your Dashboard to see your progress.`);
  }

  submitQuiz(quizType) {
    const selectedAnswer = document.querySelector(`input[name="${quizType}Q1"]:checked`);
    const resultElement = document.querySelector(`#${quizType}-quiz .quiz-result`);
    
    if (!selectedAnswer) {
      resultElement.textContent = 'Please select an answer first.';
      resultElement.style.color = '#e67e22';
      return;
    }

    const userAnswer = parseInt(selectedAnswer.value);
    const correctAnswer = this.quizAnswers[quizType];
    const isCorrect = userAnswer === correctAnswer;

    if (isCorrect) {
      resultElement.textContent = '✓ Correct! Well done.';
      resultElement.style.color = '#27ae60';
      saveProgressItem(`${quizType.charAt(0).toUpperCase() + quizType.slice(1)} Quiz`);
    } else {
      resultElement.textContent = '✗ Incorrect. Try reviewing the material and try again.';
      resultElement.style.color = '#e74c3c';
    }

    // Disable quiz after submission
    document.querySelectorAll(`#${quizType}-quiz input`).forEach(input => input.disabled = true);
    document.querySelector(`#${quizType}-quiz .submit-quiz`).disabled = true;
  }

  initializeVideoThumbnails() {
    const activeContent = document.querySelector('.subject-content.active');
    if (!activeContent) return;

    const videoCards = activeContent.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
      const videoId = card.dataset.videoId;
      const startTime = card.dataset.startTime || '';
      
      if (videoId && !card.querySelector('img')) {
        this.setupVideoThumbnail(card, videoId, startTime);
      }
    });
  }

  setupVideoThumbnail(card, videoId, startTime = '') {
    // Create thumbnail image
    const thumbnail = document.createElement('img');
    thumbnail.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    thumbnail.alt = 'Video thumbnail - Click to play';
    thumbnail.className = 'video-thumb';

    // Create play button overlay
    const playButton = document.createElement('div');
    playButton.className = 'video-play';
    playButton.innerHTML = `
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="40" fill="rgba(255,255,255,0.9)"/>
        <polygon points="32,25 32,55 58,40" fill="#e74c3c"/>
      </svg>
    `;

    // Add elements to card
    card.appendChild(thumbnail);
    card.appendChild(playButton);

    // Add click handler to load video
    card.addEventListener('click', () => {
      const timeParam = startTime ? `&start=${startTime}` : '';
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1${timeParam}`;
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.title = 'Educational video';

      // Replace thumbnail with iframe
      card.innerHTML = '';
      card.appendChild(iframe);
    });

    // Add keyboard accessibility
    playButton.tabIndex = 0;
    playButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ResourcesManager();
});
