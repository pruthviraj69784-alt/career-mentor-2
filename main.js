// ============================================
// CAREER MENTOR AI - MAIN JAVASCRIPT
// ============================================

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navToggle) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        }
    });
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
});

// ============================================
// LOCAL STORAGE UTILITIES
// ============================================

const Storage = {
    // Save user data
    save: (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },
    
    // Get user data
    get: (key) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },
    
    // Remove data
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    },
    
    // Clear all data
    clear: () => {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }
};

// ============================================
// CAREER DATA & AI LOGIC
// ============================================

const CareerData = {
    careers: [
        {
            id: 'software-engineer',
            title: 'Software Engineer',
            icon: 'fas fa-code',
            description: 'Design, develop, and maintain software applications and systems',
            salary: '$85,000 - $150,000',
            demand: 'Very High',
            growth: 22,
            timeToReady: '12-18 months',
            skills: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git', 'Problem Solving', 'Algorithms'],
            interests: ['technology', 'problem-solving', 'logic', 'creativity'],
            personality: ['analytical', 'detail-oriented', 'innovative']
        },
        {
            id: 'data-scientist',
            title: 'Data Scientist',
            icon: 'fas fa-chart-line',
            description: 'Analyze complex data to help companies make better decisions',
            salary: '$90,000 - $160,000',
            demand: 'Very High',
            growth: 36,
            timeToReady: '12-24 months',
            skills: ['Python', 'R', 'Machine Learning', 'Statistics', 'SQL', 'TensorFlow', 'Data Visualization'],
            interests: ['mathematics', 'statistics', 'analysis', 'research'],
            personality: ['analytical', 'curious', 'methodical']
        },
        {
            id: 'ux-designer',
            title: 'UX/UI Designer',
            icon: 'fas fa-palette',
            description: 'Create intuitive and beautiful user experiences for digital products',
            salary: '$70,000 - $130,000',
            demand: 'High',
            growth: 18,
            timeToReady: '9-15 months',
            skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'HTML/CSS', 'Design Thinking'],
            interests: ['design', 'creativity', 'user-experience', 'visual-arts'],
            personality: ['creative', 'empathetic', 'detail-oriented']
        },
        {
            id: 'product-manager',
            title: 'Product Manager',
            icon: 'fas fa-tasks',
            description: 'Lead product strategy and coordinate teams to deliver successful products',
            salary: '$95,000 - $170,000',
            demand: 'High',
            growth: 24,
            timeToReady: '18-24 months',
            skills: ['Product Strategy', 'Agile', 'User Stories', 'Analytics', 'Communication', 'Leadership'],
            interests: ['business', 'strategy', 'leadership', 'technology'],
            personality: ['strategic', 'communicative', 'decisive']
        },
        {
            id: 'cybersecurity',
            title: 'Cybersecurity Specialist',
            icon: 'fas fa-shield-alt',
            description: 'Protect systems, networks, and data from cyber threats',
            salary: '$85,000 - $155,000',
            demand: 'Very High',
            growth: 31,
            timeToReady: '12-18 months',
            skills: ['Network Security', 'Penetration Testing', 'Cryptography', 'Linux', 'Python', 'Risk Assessment'],
            interests: ['security', 'technology', 'problem-solving', 'ethics'],
            personality: ['vigilant', 'analytical', 'ethical']
        },
        {
            id: 'devops-engineer',
            title: 'DevOps Engineer',
            icon: 'fas fa-server',
            description: 'Bridge development and operations to streamline software delivery',
            salary: '$90,000 - $160,000',
            demand: 'Very High',
            growth: 28,
            timeToReady: '15-20 months',
            skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Linux', 'Terraform', 'Monitoring'],
            interests: ['technology', 'automation', 'systems', 'efficiency'],
            personality: ['systematic', 'problem-solver', 'adaptable']
        },
        {
            id: 'digital-marketer',
            title: 'Digital Marketing Specialist',
            icon: 'fas fa-bullhorn',
            description: 'Create and execute online marketing strategies to grow businesses',
            salary: '$55,000 - $110,000',
            demand: 'High',
            growth: 19,
            timeToReady: '6-12 months',
            skills: ['SEO', 'Google Ads', 'Social Media', 'Content Marketing', 'Analytics', 'Email Marketing'],
            interests: ['marketing', 'creativity', 'communication', 'business'],
            personality: ['creative', 'analytical', 'persuasive']
        },
        {
            id: 'ai-engineer',
            title: 'AI/ML Engineer',
            icon: 'fas fa-robot',
            description: 'Build intelligent systems using artificial intelligence and machine learning',
            salary: '$100,000 - $180,000',
            demand: 'Very High',
            growth: 40,
            timeToReady: '18-24 months',
            skills: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'NLP', 'Computer Vision', 'Mathematics'],
            interests: ['ai', 'mathematics', 'research', 'innovation'],
            personality: ['analytical', 'innovative', 'research-oriented']
        }
    ],
    
    // Get career by ID
    getCareerById: (id) => {
        return CareerData.careers.find(career => career.id === id);
    },
    
    // Get recommended careers based on user profile
    getRecommendations: (userProfile) => {
        const scored = CareerData.careers.map(career => {
            let score = 0;
            
            // Match interests
            if (userProfile.interests) {
                const interestMatches = career.interests.filter(interest => 
                    userProfile.interests.includes(interest)
                ).length;
                score += interestMatches * 25;
            }
            
            // Match personality traits
            if (userProfile.personality) {
                const personalityMatches = career.personality.filter(trait =>
                    userProfile.personality.includes(trait)
                ).length;
                score += personalityMatches * 20;
            }
            
            // Match skills
            if (userProfile.skills) {
                const skillMatches = career.skills.filter(skill =>
                    userProfile.skills.some(userSkill => 
                        skill.toLowerCase().includes(userSkill.toLowerCase()) ||
                        userSkill.toLowerCase().includes(skill.toLowerCase())
                    )
                ).length;
                score += skillMatches * 15;
            }
            
            return { ...career, matchScore: Math.min(score, 100) };
        });
        
        // Sort by match score and return top 5
        return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);
    }
};

// ============================================
// LEARNING RESOURCES
// ============================================

const LearningResources = {
    courses: {
        'software-engineer': [
            { title: 'Complete Web Development Bootcamp', platform: 'Udemy', type: 'course', duration: '54 hours' },
            { title: 'CS50: Introduction to Computer Science', platform: 'Harvard (edX)', type: 'course', duration: '12 weeks' },
            { title: 'The Odin Project', platform: 'Free', type: 'tutorial', duration: 'Self-paced' }
        ],
        'data-scientist': [
            { title: 'Data Science Professional Certificate', platform: 'IBM (Coursera)', type: 'certification', duration: '6 months' },
            { title: 'Python for Data Science', platform: 'DataCamp', type: 'course', duration: '36 hours' },
            { title: 'Machine Learning Specialization', platform: 'Andrew Ng (Coursera)', type: 'course', duration: '3 months' }
        ],
        'ux-designer': [
            { title: 'Google UX Design Professional Certificate', platform: 'Coursera', type: 'certification', duration: '6 months' },
            { title: 'User Experience Design Fundamentals', platform: 'Udemy', type: 'course', duration: '22 hours' },
            { title: 'Figma Masterclass', platform: 'YouTube', type: 'tutorial', duration: '8 hours' }
        ],
        'product-manager': [
            { title: 'Product Management Fundamentals', platform: 'Product School', type: 'course', duration: '40 hours' },
            { title: 'Agile Product Owner', platform: 'Scrum Alliance', type: 'certification', duration: '2 days' },
            { title: 'The Lean Product Playbook', platform: 'Book', type: 'book', duration: 'N/A' }
        ]
    },
    
    getResourcesForCareer: (careerId) => {
        return LearningResources.courses[careerId] || [];
    }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Format salary
function formatSalary(salary) {
    return salary;
}

// Calculate skill match percentage
function calculateSkillMatch(userSkills, requiredSkills) {
    if (!userSkills || !requiredSkills) return 0;
    const matches = requiredSkills.filter(skill =>
        userSkills.some(userSkill =>
            skill.toLowerCase().includes(userSkill.toLowerCase()) ||
            userSkill.toLowerCase().includes(skill.toLowerCase())
        )
    );
    return Math.round((matches.length / requiredSkills.length) * 100);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Export for use in other scripts
window.CareerMentorAI = {
    Storage,
    CareerData,
    LearningResources,
    calculateSkillMatch,
    showNotification
};