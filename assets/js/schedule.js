// Demo Database - Resets on page reload for clean presentations
// Perfect for showcasing the UI without persistent data complications
class SessionDatabase {
  constructor() {
    // Use in-memory storage instead of localStorage for demo purposes
    this.sessions = [];
    this.userSessions = [];
    this.initializeDefaultSessions();
  }

  // Initialize with default sessions for demonstration
  initializeDefaultSessions() {
    this.sessions = [
      {
        id: 1,
        title: 'Intro to Python — Peer Tutor',
        subject: 'Computer Science',
        date: this.getNextWeekday(1), // Monday
        time: '17:00',
        duration: 60,
        tutorName: 'Aisha',
        description: 'Learn Python basics with hands-on examples',
        maxParticipants: 8,
        participants: ['demo_user_1', 'demo_user_2'],
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        title: 'Data Structures Study Group',
        subject: 'Computer Science',
        date: this.getNextWeekday(2), // Tuesday
        time: '19:00',
        duration: 90,
        tutorName: 'Team Alpha',
        description: 'Review arrays, linked lists, and trees',
        maxParticipants: 6,
        participants: ['demo_user_3'],
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        title: 'Calculus Problem Solving',
        subject: 'Math',
        date: this.getNextWeekday(3), // Wednesday
        time: '18:00',
        duration: 60,
        tutorName: 'Carlos',
        description: 'Work through challenging calculus problems together',
        maxParticipants: 5,
        participants: [],
        createdAt: new Date().toISOString()
      },
      {
        id: 4,
        title: 'Spanish Conversation Practice',
        subject: 'Languages',
        date: this.getNextWeekday(4), // Thursday
        time: '16:30',
        duration: 45,
        tutorName: 'Maria',
        description: 'Practice conversational Spanish in a supportive environment',
        maxParticipants: 4,
        participants: ['demo_user_4'],
        createdAt: new Date().toISOString()
      }
    ];
  }

  // Helper to get next occurrence of a weekday
  getNextWeekday(dayOfWeek) {
    const today = new Date();
    const daysUntil = (dayOfWeek - today.getDay() + 7) % 7;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + (daysUntil === 0 ? 7 : daysUntil));
    return targetDate.toISOString().split('T')[0];
  }

  // Get all sessions
  getAllSessions() {
    return this.sessions;
  }

  // Save sessions (no-op in demo mode, but keeps interface consistent)
  saveSessions(sessions) {
    this.sessions = sessions;
  }

  // Create a new session
  createSession(sessionData) {
    const newSession = {
      id: Date.now(), // Simple ID generation
      ...sessionData,
      participants: [],
      createdAt: new Date().toISOString()
    };
    this.sessions.push(newSession);
    return newSession;
  }

  // Register a user for a session
  registerForSession(sessionId, userId = 'current_user') {
    const session = this.sessions.find(s => s.id === sessionId);
    
    if (!session) return { success: false, message: 'Session not found' };
    if (session.participants.includes(userId)) {
      return { success: false, message: 'Already registered for this session' };
    }
    if (session.participants.length >= session.maxParticipants) {
      return { success: false, message: 'Session is full' };
    }

    session.participants.push(userId);
    
    // Also save to user's personal sessions
    this.saveUserSession(session);
    
    return { success: true, message: 'Successfully registered' };
  }

  // Unregister from a session
  unregisterFromSession(sessionId, userId = 'current_user') {
    const session = this.sessions.find(s => s.id === sessionId);
    
    if (!session) return { success: false, message: 'Session not found' };
    
    const index = session.participants.indexOf(userId);
    if (index === -1) {
      return { success: false, message: 'Not registered for this session' };
    }

    session.participants.splice(index, 1);
    
    // Remove from user's personal sessions
    this.removeUserSession(sessionId);
    
    return { success: true, message: 'Successfully unregistered' };
  }

  // Get user's registered sessions
  getUserSessions() {
    return this.userSessions;
  }

  // Save user session
  saveUserSession(session) {
    if (!this.userSessions.find(s => s.id === session.id)) {
      this.userSessions.push({
        id: session.id,
        title: session.title,
        date: session.date,
        time: session.time,
        tutorName: session.tutorName
      });
    }
  }

  // Remove user session
  removeUserSession(sessionId) {
    this.userSessions = this.userSessions.filter(s => s.id !== sessionId);
  }

  // Clear all user sessions
  clearUserSessions() {
    this.userSessions = [];
    
    // Also unregister from all sessions in the shared database
    this.sessions.forEach(session => {
      const index = session.participants.indexOf('current_user');
      if (index !== -1) {
        session.participants.splice(index, 1);
      }
    });
  }

  // Filter sessions by subject
  getSessionsBySubject(subject) {
    return subject ? this.sessions.filter(s => s.subject === subject) : this.sessions;
  }
}

// UI Controller
class ScheduleUI {
  constructor() {
    this.db = new SessionDatabase();
    this.currentFilter = '';
    this.initializeUI();
  }

  initializeUI() {
    // Tab switching
    document.getElementById('view-sessions-tab').addEventListener('click', () => this.showTab('view-sessions'));
    document.getElementById('create-session-tab').addEventListener('click', () => this.showTab('create-session'));
    
    // Form submission
    document.getElementById('create-session-form').addEventListener('submit', (e) => this.handleCreateSession(e));
    
    // Filter
    document.getElementById('subject-filter').addEventListener('change', (e) => this.handleFilter(e));
    
    // Clear registrations
    document.getElementById('clear-registrations').addEventListener('click', () => this.clearAllRegistrations());
    
    // Set minimum date to today
    document.getElementById('session-date').min = new Date().toISOString().split('T')[0];
    
    // Initial render
    this.renderSessions();
    this.renderUserSessions();
  }

  showTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
  }

  handleCreateSession(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const sessionData = {
      title: formData.get('title'),
      subject: formData.get('subject'),
      date: formData.get('date'),
      time: formData.get('time'),
      duration: parseInt(formData.get('duration')),
      tutorName: formData.get('tutorName'),
      description: formData.get('description'),
      maxParticipants: parseInt(formData.get('maxParticipants'))
    };

    // Validation
    if (new Date(sessionData.date) < new Date().setHours(0,0,0,0)) {
      alert('Session date cannot be in the past');
      return;
    }

    const newSession = this.db.createSession(sessionData);
    
    // Show success message and reset form
    alert(`Session "${sessionData.title}" created successfully!`);
    e.target.reset();
    
    // Switch to view tab and refresh
    this.showTab('view-sessions');
    this.renderSessions();
  }

  handleFilter(e) {
    this.currentFilter = e.target.value;
    this.renderSessions();
  }

  renderSessions() {
    const sessions = this.db.getSessionsBySubject(this.currentFilter);
    const sessionList = document.getElementById('session-list');
    
    if (sessions.length === 0) {
      sessionList.innerHTML = '<div class=\"card\"><p class=\"muted\">No sessions available for the selected filter.</p></div>';
      return;
    }

    sessionList.innerHTML = sessions.map(session => {
      const isRegistered = this.db.getUserSessions().some(s => s.id === session.id);
      const spotsLeft = session.maxParticipants - session.participants.length;
      const isFull = spotsLeft <= 0;
      
      const formattedDate = new Date(session.date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      
      const formattedTime = new Date(`2000-01-01T${session.time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });

      return `
        <div class=\"session card\">
          <div class=\"session-info\">
            <div class=\"session-header\">
              <strong>${session.title}</strong>
              <span class=\"subject-badge\">${session.subject}</span>
            </div>
            <div class=\"session-details\">
              <div class=\"muted\">${formattedDate} at ${formattedTime} • ${session.duration}min • by ${session.tutorName}</div>
              ${session.description ? `<p class=\"session-description\">${session.description}</p>` : ''}
              <div class=\"session-capacity ${isFull ? 'full' : spotsLeft <= 2 ? 'almost-full' : ''}\">\n                ${spotsLeft} of ${session.maxParticipants} spots available\n              </div>
            </div>
          </div>
          <div class=\"session-actions\">
            ${isRegistered 
              ? `<button class=\"btn secondary\" onclick=\"scheduleUI.unregisterFromSession(${session.id})\">Unregister</button>`
              : isFull 
                ? `<button class=\"btn\" disabled>Full</button>`
                : `<button class=\"btn primary\" onclick=\"scheduleUI.registerForSession(${session.id})\">Register</button>`
            }
          </div>
        </div>
      `;
    }).join('');
  }

  renderUserSessions() {
    const userSessions = this.db.getUserSessions();
    const myList = document.getElementById('my-sessions-list');
    
    if (userSessions.length === 0) {
      myList.innerHTML = '<p class="muted">No sessions registered</p>';
      return;
    }

    myList.innerHTML = userSessions.map(session => {
      const formattedDate = new Date(session.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
      
      const formattedTime = new Date(`2000-01-01T${session.time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });

      return `
        <div class="registered-session">
          <div class="session-info">
            <strong>${session.title}</strong>
            <div class="muted">${formattedDate} ${formattedTime} • by ${session.tutorName}</div>
          </div>
          <button class="btn secondary small" onclick="scheduleUI.unregisterFromSession(${session.id})" type="button">
            Unenroll
          </button>
        </div>
      `;
    }).join('');
  }

  registerForSession(sessionId) {
    const result = this.db.registerForSession(sessionId);
    
    if (result.success) {
      alert(result.message + ' — Check your Dashboard for reminders');
      this.renderSessions();
      this.renderUserSessions();
    } else {
      alert(result.message);
    }
  }

  unregisterFromSession(sessionId) {
    if (confirm('Are you sure you want to unregister from this session?')) {
      const result = this.db.unregisterFromSession(sessionId);
      
      if (result.success) {
        alert(result.message);
        this.renderSessions();
        this.renderUserSessions();
      } else {
        alert(result.message);
      }
    }
  }

  clearAllRegistrations() {
    if (confirm('Are you sure you want to unregister from all sessions?')) {
      this.db.clearUserSessions();
      alert('All registrations cleared');
      this.renderSessions();
      this.renderUserSessions();
    }
  }
}

// Initialize when DOM is loaded
let scheduleUI;
document.addEventListener('DOMContentLoaded', () => {
  scheduleUI = new ScheduleUI();
});
