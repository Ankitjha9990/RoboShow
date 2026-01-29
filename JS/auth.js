// ============================================
// RoboShow - Authentication Service
// ============================================

const AUTH_STORAGE_KEY = 'roboshow_users';
const SESSION_STORAGE_KEY = 'roboshow_session';

// Get all users from localStorage
function getAllUsers() {
    const data = localStorage.getItem(AUTH_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// Save users to localStorage
function saveUsers(users) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(users));
}

// Get current session
function getSession() {
    const data = localStorage.getItem(SESSION_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
}

// Save session
function saveSession(session) {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

// Clear session
function clearSession() {
    localStorage.removeItem(SESSION_STORAGE_KEY);
}

// Generate user ID
function generateUserId() {
    return 'user-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

// Simple password encoding (for demo purposes only)
function encodePassword(password) {
    // In production, use proper hashing like bcrypt
    return btoa(password + 'roboshow-salt');
}

// Decode password for comparison
function decodePassword(encoded) {
    try {
        return atob(encoded).replace('roboshow-salt', '');
    } catch (e) {
        return null;
    }
}

// Register new user
function register(name, email, password) {
    const users = getAllUsers();

    // Check if email already exists
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        return { success: false, error: 'Email already registered' };
    }

    // Validate inputs
    if (!name || name.length < 3) {
        return { success: false, error: 'Name must be at least 3 characters' };
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { success: false, error: 'Invalid email address' };
    }

    if (!password || password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
    }

    // Create new user
    const newUser = {
        id: generateUserId(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: encodePassword(password),
        createdAt: new Date().toISOString().split('T')[0],
        projects: []
    };

    users.push(newUser);
    saveUsers(users);

    // Auto-login after registration
    const sessionData = {
        userId: newUser.id,
        email: newUser.email,
        name: newUser.name,
        loginTime: Date.now(),
        isLoggedIn: true
    };

    saveSession(sessionData);

    return { success: true, user: newUser };
}

// Login user
function login(email, password) {
    const users = getAllUsers();

    // Find user by email
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
        return { success: false, error: 'Invalid email or password' };
    }

    // Check password
    const decodedPassword = decodePassword(user.password);
    if (decodedPassword !== password) {
        return { success: false, error: 'Invalid email or password' };
    }

    // Create session
    const sessionData = {
        userId: user.id,
        email: user.email,
        name: user.name,
        loginTime: Date.now(),
        isLoggedIn: true
    };

    saveSession(sessionData);

    return { success: true, user: sessionData };
}

// Logout user
function logout() {
    clearSession();
    return { success: true };
}

// Check if user is logged in
function isLoggedIn() {
    const session = getSession();
    return session && session.isLoggedIn === true;
}

// Get current logged-in user
function getCurrentUser() {
    const session = getSession();
    if (!session || !session.isLoggedIn) {
        return null;
    }
    return session;
}

// Require authentication (redirect if not logged in)
function requireAuth(redirectUrl = 'login.html') {
    if (!isLoggedIn()) {
        // Save current URL to return after login
        const currentUrl = window.location.pathname;
        const returnUrl = encodeURIComponent(currentUrl + window.location.search);
        window.location.href = `${redirectUrl}?return=${returnUrl}`;
        return false;
    }
    return true;
}

// Get user by ID
function getUserById(userId) {
    const users = getAllUsers();
    return users.find(u => u.id === userId);
}

// Update user projects
function addUserProject(userId, projectId) {
    const users = getAllUsers();
    const user = users.find(u => u.id === userId);

    if (user) {
        if (!user.projects) {
            user.projects = [];
        }
        if (!user.projects.includes(projectId)) {
            user.projects.push(projectId);
            saveUsers(users);
        }
    }
}

// Update navbar based on auth state
function updateNavbar() {
    const user = getCurrentUser();
    const navbar = document.querySelector('.navbar-menu');

    if (!navbar) return;

    // Remove existing auth elements
    const existingAuthItems = navbar.querySelectorAll('.auth-item');
    existingAuthItems.forEach(item => item.remove());

    if (user) {
        // User is logged in - show user menu
        const userMenuItem = document.createElement('li');
        userMenuItem.className = 'auth-item user-menu-item';
        userMenuItem.innerHTML = `
      <div class="user-menu">
        <button class="user-menu-button">
          <svg class="icon icon-user" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>${user.name}</span>
          <svg class="icon icon-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div class="user-dropdown">
          <a href="index.html#my-projects">My Projects</a>
          <a href="#" onclick="handleLogout(); return false;">Logout</a>
        </div>
      </div>
    `;
        navbar.appendChild(userMenuItem);
    } else {
        // User not logged in - show login/signup buttons
        const loginItem = document.createElement('li');
        loginItem.className = 'auth-item';
        loginItem.innerHTML = '<a href="login.html" class="btn btn-outline btn-sm">Login</a>';

        const signupItem = document.createElement('li');
        signupItem.className = 'auth-item';
        signupItem.innerHTML = '<a href="signup.html" class="btn btn-primary btn-sm">Sign Up</a>';

        navbar.appendChild(loginItem);
        navbar.appendChild(signupItem);
    }
}

// Handle logout
function handleLogout() {
    logout();
    window.location.href = 'index.html';
}

// Initialize auth on page load
function initAuth() {
    updateNavbar();
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        register,
        login,
        logout,
        isLoggedIn,
        getCurrentUser,
        requireAuth,
        getUserById,
        addUserProject,
        updateNavbar,
        initAuth
    };
}
