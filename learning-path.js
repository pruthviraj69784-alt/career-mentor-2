// ============================================
// LEARNING PATH LOGIC
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeLearningPath();
});

function initializeLearningPath() {
    populateCareerSelect();
    
    const topCareer = window.CareerMentorAI.Storage.get('topCareer');
    if (topCareer) {
        document.getElementById('careerSelect').value = topCareer.id;
        generatePath();
    }
}

function populateCareerSelect() {
    const select = document.getElementById('careerSelect');
    const careers = window.CareerMentorAI.CareerData.careers;
    
    careers.forEach(career => {
        const option = document.createElement('option');
        option.value = career.id;
        option.textContent = career.title;
        select.appendChild(option);
    });
}

function generatePath() {
    const careerId = document.getElementById('careerSelect').value;
    if (!careerId) {
        window.CareerMentorAI.showNotification('Please select a career path', 'warning');
        return;
    }
    
    const career = window.CareerMentorAI.CareerData.getCareerById(careerId);
    if (!career) return;
    
    // Show sections
    document.getElementById('careerOverview').style.display = 'block';
    document.getElementById('pathTimeline').style.display = 'block';
    document.getElementById('resourceLibrary').style.display = 'block';
    document.getElementById('skillsChecklist').style.display = 'block';
    document.getElementById('actionPlan').style.display = 'block';
    
    displayCareerOverview(career);
    displayTimeline(career);
    displayResources(career);
    displaySkillsChecklist(career);
    displayActionPlan(career);
    
    window.CareerMentorAI.showNotification('Learning path generated successfully!', 'success');
}

function displayCareerOverview(career) {
    document.getElementById('careerIcon').innerHTML = `<i class="${career.icon}"></i>`;
    document.getElementById('careerTitle').textContent = career.title;
    document.getElementById('careerDesc').textContent = career.description;
    document.getElementById('avgSalary').textContent = career.salary;
    document.getElementById('timeEstimate').textContent = career.timeToReady;
    document.getElementById('demandLevel').textContent = career.demand;
}

function displayTimeline(career) {
    const container = document.getElementById('timelineContent');
    const phases = [
        { title: 'Foundation Phase', duration: '3-4 months', skills: career.skills.slice(0, 3) },
        { title: 'Intermediate Phase', duration: '4-6 months', skills: career.skills.slice(3, 6) },
        { title: 'Advanced Phase', duration: '3-4 months', skills: career.skills.slice(6) },
        { title: 'Portfolio & Interview Prep', duration: '2-3 months', skills: ['Portfolio Projects', 'Interview Skills'] }
    ];
    
    let html = '';
    phases.forEach((phase, index) => {
        html += `
            <div class="timeline-item" style="animation: fadeInUp 0.5s ease-out ${index * 0.2}s both;">
                <div style="background: white; padding: 1.5rem; border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <h3 style="font-size: 1.25rem;">${phase.title}</h3>
                        <span class="badge badge-primary">${phase.duration}</span>
                    </div>
                    <p style="color: #6b7280; margin-bottom: 1rem;">Master these skills:</p>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        ${phase.skills.map(skill => `
                            <span style="padding: 0.5rem 1rem; background: rgba(102, 126, 234, 0.1); color: #667eea; border-radius: 999px; font-size: 0.875rem; font-weight: 600;">
                                ${skill}
                            </span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    document.getElementById('overallProgress').textContent = '25%';
}

function displayResources(career) {
    const container = document.getElementById('resourcesGrid');
    const resources = [
        { type: 'course', title: 'Complete ' + career.title + ' Course', platform: 'Udemy', rating: 4.7, students: '50K+', price: '$89' },
        { type: 'certification', title: career.title + ' Professional Certificate', platform: 'Coursera', rating: 4.8, students: '100K+', price: '$49/mo' },
        { type: 'book', title: 'Master ' + career.skills[0], platform: 'O\'Reilly', rating: 4.6, students: '30K+', price: '$39' },
        { type: 'tutorial', title: career.skills[1] + ' Crash Course', platform: 'YouTube', rating: 4.5, students: '200K+', price: 'Free' },
        { type: 'course', title: 'Advanced ' + career.skills[2], platform: 'Pluralsight', rating: 4.7, students: '40K+', price: '$29/mo' },
        { type: 'tutorial', title: 'Build Real Projects', platform: 'FreeCodeCamp', rating: 4.9, students: '500K+', price: 'Free' }
    ];
    
    let html = '';
    resources.forEach((resource, index) => {
        const iconMap = {
            course: 'fas fa-video',
            certification: 'fas fa-certificate',
            book: 'fas fa-book',
            tutorial: 'fas fa-play-circle'
        };
        
        html += `
            <div class="resource-card" style="animation: fadeInUp 0.5s ease-out ${index * 0.1}s both;" data-type="${resource.type}">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                    <i class="${iconMap[resource.type]}" style="font-size: 2rem; color: #667eea;"></i>
                    <span class="badge badge-info">${resource.type}</span>
                </div>
                <h4 style="margin-bottom: 0.5rem;">${resource.title}</h4>
                <p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 1rem;">${resource.platform}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px solid #e5e7eb;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas fa-star" style="color: #fbbf24;"></i>
                        <span style="font-weight: 600;">${resource.rating}</span>
                        <span style="color: #6b7280; font-size: 0.875rem;">(${resource.students})</span>
                    </div>
                    <span style="font-weight: 700; color: #667eea;">${resource.price}</span>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Add filter functionality
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const filter = e.target.dataset.filter;
            document.querySelectorAll('.resource-card').forEach(card => {
                if (filter === 'all' || card.dataset.type === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function displaySkillsChecklist(career) {
    const container = document.getElementById('checklistContent');
    const categories = [
        { name: 'Technical Skills', skills: career.skills.slice(0, 4) },
        { name: 'Soft Skills', skills: ['Communication', 'Problem Solving', 'Teamwork', 'Time Management'] },
        { name: 'Tools & Technologies', skills: career.skills.slice(4) }
    ];
    
    let html = '';
    categories.forEach(category => {
        html += `
            <div style="background: white; padding: 1.5rem; border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 1.5rem;">
                <h3 style="margin-bottom: 1rem;">${category.name}</h3>
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    ${category.skills.map(skill => `
                        <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer;">
                            <input type="checkbox" style="width: 20px; height: 20px; cursor: pointer;">
                            <span style="font-weight: 500;">${skill}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function displayActionPlan(career) {
    const container = document.getElementById('actionItems');
    const actions = [
        { week: 'Week 1', task: 'Set up development environment and tools', priority: 'high' },
        { week: 'Week 1-2', task: 'Complete foundational ' + career.skills[0] + ' course', priority: 'high' },
        { week: 'Week 3', task: 'Build your first practice project', priority: 'high' },
        { week: 'Week 4', task: 'Join online communities and forums', priority: 'medium' }
    ];
    
    let html = '<div style="display: flex; flex-direction: column; gap: 1rem;">';
    actions.forEach(action => {
        const priorityColor = action.priority === 'high' ? '#ef4444' : '#f59e0b';
        html += `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f9fafb; border-radius: 0.5rem; border-left: 4px solid ${priorityColor};">
                <div>
                    <span style="display: block; font-weight: 700; color: ${priorityColor}; font-size: 0.875rem; margin-bottom: 0.25rem;">${action.week}</span>
                    <span style="font-weight: 500;">${action.task}</span>
                </div>
                <button class="btn btn-outline btn-sm" style="flex-shrink: 0;">Mark Done</button>
            </div>
        `;
    });
    html += '</div>';
    
    container.innerHTML = html;
}