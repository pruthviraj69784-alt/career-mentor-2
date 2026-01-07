// ============================================
// DASHBOARD LOGIC
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
});

function initializeDashboard() {
    const userProfile = window.CareerMentorAI.Storage.get('userProfile');
    const topCareer = window.CareerMentorAI.Storage.get('topCareer');
    
    if (!userProfile || !topCareer) {
        // Redirect to quiz if not completed
        showEmptyState();
        return;
    }
    
    displayCareerPaths(userProfile);
    displaySkillGaps(topCareer);
    displayStrengths(userProfile);
    displayWeaknesses(topCareer);
    displayNextSteps(topCareer);
    createSkillsRadarChart(topCareer);
    createProgressChart();
}

function showEmptyState() {
    document.querySelector('.dashboard-section').innerHTML = `
        <div class="container" style="text-align: center; padding: 4rem 0;">
            <i class="fas fa-clipboard-list" style="font-size: 4rem; color: #667eea; margin-bottom: 2rem;"></i>
            <h2>Complete Your Career Assessment</h2>
            <p style="margin: 1rem 0 2rem; color: #6b7280;">Take our AI-powered quiz to get personalized career recommendations and insights</p>
            <a href="quiz.html" class="btn btn-primary btn-large">
                <i class="fas fa-brain"></i> Take Career Quiz
            </a>
        </div>
    `;
}

function displayCareerPaths(userProfile) {
    const recommendations = window.CareerMentorAI.CareerData.getRecommendations(userProfile);
    const container = document.getElementById('careerPaths');
    
    let html = '';
    recommendations.forEach(career => {
        html += `
            <div class="career-path-item">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div style="display: flex; gap: 1rem;">
                        <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: white;">
                            <i class="${career.icon}"></i>
                        </div>
                        <div>
                            <h4 style="margin-bottom: 0.25rem;">${career.title}</h4>
                            <p style="color: #6b7280; font-size: 0.9rem; margin-bottom: 0.5rem;">${career.description}</p>
                            <div style="display: flex; gap: 1rem; font-size: 0.85rem; color: #6b7280;">
                                <span><i class="fas fa-dollar-sign"></i> ${career.salary}</span>
                                <span><i class="fas fa-chart-line"></i> ${career.growth}% growth</span>
                            </div>
                        </div>
                    </div>
                    <span class="badge badge-success">${career.matchScore}% Match</span>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function displaySkillGaps(topCareer) {
    const container = document.getElementById('skillGaps');
    const userProfile = window.CareerMentorAI.Storage.get('userProfile') || { skills: [] };
    
    let html = '';
    topCareer.skills.slice(0, 6).forEach(skill => {
        const hasSkill = userProfile.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()));
        const level = hasSkill ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 40) + 20;
        
        html += `
            <div class="skill-gap-item">
                <div>
                    <strong style="font-size: 0.95rem;">${skill}</strong>
                    <div style="height: 6px; background: #f3f4f6; border-radius: 999px; margin-top: 0.5rem; overflow: hidden;">
                        <div style="height: 100%; width: ${level}%; background: ${hasSkill ? 'linear-gradient(90deg, #10b981, #34d399)' : 'linear-gradient(90deg, #f59e0b, #fbbf24)'}; transition: width 1s ease-out;"></div>
                    </div>
                </div>
                <span style="font-weight: 600; color: ${hasSkill ? '#10b981' : '#f59e0b'};">${level}%</span>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function displayStrengths(userProfile) {
    const container = document.getElementById('strengthsList');
    const strengths = [
        { icon: 'fas fa-lightbulb', text: 'Quick Learner', desc: 'Rapidly adapts to new technologies' },
        { icon: 'fas fa-users', text: 'Team Player', desc: 'Collaborates effectively with others' },
        { icon: 'fas fa-brain', text: 'Problem Solver', desc: 'Excels at analytical thinking' },
        { icon: 'fas fa-rocket', text: 'Self-Motivated', desc: 'Takes initiative on projects' }
    ];
    
    let html = '';
    strengths.forEach(strength => {
        html += `
            <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid #e5e7eb;">
                <div style="width: 40px; height: 40px; background: rgba(16, 185, 129, 0.1); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: #10b981; flex-shrink: 0;">
                    <i class="${strength.icon}"></i>
                </div>
                <div>
                    <strong style="display: block; margin-bottom: 0.25rem;">${strength.text}</strong>
                    <span style="font-size: 0.875rem; color: #6b7280;">${strength.desc}</span>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function displayWeaknesses(topCareer) {
    const container = document.getElementById('weaknessesList');
    const improvements = [
        { icon: 'fas fa-code', text: 'Advanced Algorithms', desc: 'Practice data structures' },
        { icon: 'fas fa-database', text: 'Database Design', desc: 'Learn SQL optimization' },
        { icon: 'fas fa-project-diagram', text: 'System Design', desc: 'Study scalable architectures' }
    ];
    
    let html = '';
    improvements.forEach(item => {
        html += `
            <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid #e5e7eb;">
                <div style="width: 40px; height: 40px; background: rgba(245, 158, 11, 0.1); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: #f59e0b; flex-shrink: 0;">
                    <i class="${item.icon}"></i>
                </div>
                <div>
                    <strong style="display: block; margin-bottom: 0.25rem;">${item.text}</strong>
                    <span style="font-size: 0.875rem; color: #6b7280;">${item.desc}</span>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function displayNextSteps(topCareer) {
    const container = document.getElementById('nextSteps');
    const steps = [
        { icon: 'fas fa-book-open', text: 'Complete Introduction to ' + topCareer.skills[0], status: 'In Progress' },
        { icon: 'fas fa-code', text: 'Build a portfolio project', status: 'Not Started' },
        { icon: 'fas fa-certificate', text: 'Get certified in ' + topCareer.skills[1], status: 'Not Started' },
        { icon: 'fas fa-users', text: 'Join developer community', status: 'Recommended' }
    ];
    
    let html = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">';
    steps.forEach(step => {
        html += `
            <div style="padding: 1rem; border: 2px solid #e5e7eb; border-radius: 0.75rem; display: flex; align-items: start; gap: 1rem;">
                <i class="${step.icon}" style="font-size: 1.5rem; color: #667eea;"></i>
                <div>
                    <strong style="display: block; margin-bottom: 0.5rem;">${step.text}</strong>
                    <span class="badge ${step.status === 'In Progress' ? 'badge-info' : 'badge-warning'}" style="font-size: 0.75rem;">${step.status}</span>
                </div>
            </div>
        `;
    });
    html += '</div>';
    
    container.innerHTML = html;
}

function createSkillsRadarChart(topCareer) {
    const ctx = document.getElementById('skillsRadarChart');
    if (!ctx) return;
    
    const skills = topCareer.skills.slice(0, 6);
    const currentLevels = skills.map(() => Math.floor(Math.random() * 40) + 30);
    const targetLevels = skills.map(() => 90 + Math.floor(Math.random() * 10));
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: skills,
            datasets: [
                {
                    label: 'Current Level',
                    data: currentLevels,
                    fill: true,
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    borderColor: '#667eea',
                    pointBackgroundColor: '#667eea',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#667eea'
                },
                {
                    label: 'Target Level',
                    data: targetLevels,
                    fill: true,
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    borderColor: '#10b981',
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#10b981'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function createProgressChart() {
    const ctx = document.getElementById('progressChart');
    if (!ctx) return;
    
    const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    const data = [20, 35, 52, 67];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Learning Progress (%)',
                data: data,
                fill: true,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}