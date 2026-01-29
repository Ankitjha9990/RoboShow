// ============================================
// RoboShow - LocalStorage Management
// ============================================

const STORAGE_KEY = 'roboshow_projects';

// Get all projects from localStorage
function getAllProjects() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Get a single project by ID
function getProjectById(id) {
  const projects = getAllProjects();
  return projects.find(project => project.id === id);
}

// Save all projects to localStorage
function saveProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

// Generate unique project ID
function generateProjectId() {
  const projects = getAllProjects();
  const maxId = projects.length > 0 
    ? Math.max(...projects.map(p => parseInt(p.id.split('-')[1]))) 
    : 1000;
  return `RB-${maxId + 1}`;
}

// Add a new project
function addProject(projectData) {
  const projects = getAllProjects();
  
  const newProject = {
    id: generateProjectId(),
    title: projectData.title,
    team: projectData.team,
    description: projectData.description,
    category: projectData.category,
    technologies: projectData.technologies,
    avgRating: 0,
    totalRatings: 0,
    image: projectData.image || 'assets/placeholder.png',
    createdAt: new Date().toISOString().split('T')[0],
    feedback: []
  };
  
  projects.push(newProject);
  saveProjects(projects);
  return newProject;
}

// Update a project
function updateProject(id, updates) {
  const projects = getAllProjects();
  const index = projects.findIndex(p => p.id === id);
  
  if (index !== -1) {
    projects[index] = { ...projects[index], ...updates };
    saveProjects(projects);
    return projects[index];
  }
  return null;
}

// Delete a project
function deleteProject(id) {
  const projects = getAllProjects();
  const filtered = projects.filter(p => p.id !== id);
  saveProjects(filtered);
  return filtered.length < projects.length;
}

// Add feedback to a project
function addFeedback(projectId, feedbackData) {
  const project = getProjectById(projectId);
  
  if (!project) return null;
  
  const feedback = {
    name: feedbackData.name || 'Anonymous',
    rating: feedbackData.rating,
    comment: feedbackData.comment,
    date: new Date().toISOString().split('T')[0]
  };
  
  project.feedback.push(feedback);
  
  // Recalculate average rating
  const totalRating = project.feedback.reduce((sum, f) => sum + f.rating, 0);
  project.avgRating = (totalRating / project.feedback.length).toFixed(1);
  project.totalRatings = project.feedback.length;
  
  updateProject(projectId, project);
  return project;
}

// Get top rated projects
function getTopRatedProjects(limit = 6) {
  const projects = getAllProjects();
  return projects
    .filter(p => p.totalRatings > 0)
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, limit);
}

// Initialize with sample data if empty
function initializeSampleData() {
  const projects = getAllProjects();
  
  if (projects.length === 0) {
    const sampleProjects = [
      {
        id: 'RB-1001',
        title: 'Autonomous Line Follower',
        team: 'RoboTech Squad',
        description: 'A robot that follows paths using IR sensors. Designed for warehouse automation and educational purposes.',
        category: 'Line Follower',
        technologies: ['Arduino', 'IR Sensor', 'C++'],
        avgRating: 4.5,
        totalRatings: 8,
        image: 'assets/placeholder.png',
        createdAt: '2026-01-15',
        feedback: [
          {
            name: 'Aman Singh',
            rating: 5,
            comment: 'Very accurate movement! The line following algorithm is impressive.',
            date: '2026-01-16'
          },
          {
            name: 'Priya Sharma',
            rating: 4,
            comment: 'Great project with solid implementation. Would love to see obstacle detection added.',
            date: '2026-01-18'
          }
        ]
      },
      {
        id: 'RB-1002',
        title: 'Smart Robotic Arm',
        team: 'Innovators Club',
        description: 'A 6-DOF robotic arm controlled via gesture recognition. Perfect for industrial automation tasks.',
        category: 'Robotic Arm',
        technologies: ['Raspberry Pi', 'Python', 'OpenCV', 'Servo Motors'],
        avgRating: 4.8,
        totalRatings: 10,
        image: 'assets/placeholder.png',
        createdAt: '2026-01-10',
        feedback: [
          {
            name: 'Rahul Mehta',
            rating: 5,
            comment: 'Outstanding gesture recognition! Very smooth and precise movements.',
            date: '2026-01-12'
          },
          {
            name: 'Sneha Patel',
            rating: 5,
            comment: 'Excellent work on the inverse kinematics. Highly impressive!',
            date: '2026-01-14'
          }
        ]
      },
      {
        id: 'RB-1003',
        title: 'IoT Weather Station Bot',
        team: 'Tech Wizards',
        description: 'A mobile robot that collects environmental data and uploads it to the cloud for real-time monitoring.',
        category: 'IoT Robot',
        technologies: ['ESP32', 'Sensors', 'MQTT', 'Cloud Dashboard'],
        avgRating: 4.3,
        totalRatings: 6,
        image: 'assets/placeholder.png',
        createdAt: '2026-01-20',
        feedback: [
          {
            name: 'Akash Kumar',
            rating: 4,
            comment: 'Great IoT integration! Data visualization is clean and informative.',
            date: '2026-01-22'
          }
        ]
      },
      {
        id: 'RB-1004',
        title: 'AI Object Recognition Bot',
        team: 'Neural Ninjas',
        description: 'A robot that uses deep learning to identify and sort objects. Powered by TensorFlow Lite.',
        category: 'AI Robot',
        technologies: ['Jetson Nano', 'TensorFlow', 'Camera Module', 'Python'],
        avgRating: 4.9,
        totalRatings: 12,
        image: 'assets/placeholder.png',
        createdAt: '2026-01-05',
        feedback: [
          {
            name: 'Neha Gupta',
            rating: 5,
            comment: 'Mind-blowing accuracy! The object detection is incredibly fast and reliable.',
            date: '2026-01-07'
          },
          {
            name: 'Vikram Reddy',
            rating: 5,
            comment: 'Best AI project I have seen! The sorting mechanism is brilliant.',
            date: '2026-01-09'
          }
        ]
      },
      {
        id: 'RB-1005',
        title: 'Autonomous Delivery Drone',
        team: 'SkyTech Robotics',
        description: 'A quadcopter designed for autonomous package delivery with GPS navigation and obstacle avoidance.',
        category: 'Custom',
        technologies: ['Arduino', 'GPS Module', 'Ultrasonic Sensors', 'Brushless Motors'],
        avgRating: 4.6,
        totalRatings: 9,
        image: 'assets/placeholder.png',
        createdAt: '2026-01-12',
        feedback: [
          {
            name: 'Arjun Desai',
            rating: 5,
            comment: 'Amazing flight stability! The GPS navigation is spot on.',
            date: '2026-01-14'
          }
        ]
      },
      {
        id: 'RB-1006',
        title: 'Maze Solver Robot',
        team: 'Code Crushers',
        description: 'A robot that uses the flood-fill algorithm to navigate and solve complex mazes autonomously.',
        category: 'Line Follower',
        technologies: ['Arduino', 'Ultrasonic Sensors', 'C++', 'Motor Drivers'],
        avgRating: 4.4,
        totalRatings: 7,
        image: 'assets/placeholder.png',
        createdAt: '2026-01-18',
        feedback: [
          {
            name: 'Pooja Iyer',
            rating: 4,
            comment: 'Very clever algorithm implementation! Solved the maze in record time.',
            date: '2026-01-20'
          }
        ]
      }
    ];
    
    saveProjects(sampleProjects);
  }
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getAllProjects,
    getProjectById,
    addProject,
    updateProject,
    deleteProject,
    addFeedback,
    getTopRatedProjects,
    initializeSampleData
  };
}
