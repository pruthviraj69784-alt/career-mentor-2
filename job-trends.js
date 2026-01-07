// ============================================
// JOB TRENDS ANALYSIS LOGIC
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeTrends();
});

function initializeTrends() {
    displayTrendingJobs();
    createSalaryChart();
    createDemandChart();
    displaySkillDemand();
    displayEmergingCareers();
    displayTopLocations();
}

function displayTrendingJobs() {
    const container = document.getElementById('trendingJobsGrid');
    
    const jobs = [
        { title: 'AI/ML Engineer', growth: 40, demand: 'Extreme', salary: '$100K-$180K', icon: 'fas fa-robot', trend: 'up' },
        { title: 'Cloud Architect', growth: 35, demand: 'Very High', salary: '$120K-$200K', icon: 'fas fa-cloud', trend: 'up' },
        { title: 'Cybersecurity Specialist', growth: 31, demand: 'Very High', salary: '$85K-$155K', icon: 'fas fa-shield-alt', trend: 'up' },
        { title: 'Data Scientist', growth: 36, demand: 'Very High', salary: '$90K-$160K', icon: 'fas fa-chart-line', trend: 'up' },
        { title: 'Full Stack Developer', growth: 22, demand: 'High', salary: '$75K-$140K', icon: 'fas fa-code', trend: 'up' },
        { title: 'DevOps Engineer', growth: 28, demand: 'High', salary: '$90K-$160K', icon: 'fas fa-server', trend: 'up' }
    ];
    
    let html = '';
    jobs.forEach((job, index) => {
        html += `
            <div class="trending-job-card" style="animation: fadeInUp 0.5s ease-out ${index * 0.1}s both;">
                <div style="position: absolute; top: 1rem; right: 1rem;">
                    <span class="badge badge-success">
                        <i class="fas fa-arrow-${job.trend}"></i> ${job.growth}%
                    </span>
                </div>
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 0.75rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.75rem; margin-bottom: 1rem;">
                    <i class="${job.icon}"></i>
                </div>
                <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">${job.title}</h3>
                <div style="display: flex; flex-direction: column; gap: 0.5rem; margin: 1rem 0;">
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #6b7280;">Demand:</span>
                        <strong style="color: #10b981;">${job.demand}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #6b7280;">Salary:</span>
                        <strong>${job.salary}</strong>
                    </div>
                </div>
                <button class="btn btn-outline" style="width: 100%; justify-content: center;">
                    View Details
                </button>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Add CSS
    if (!document.getElementById('trends-styles')) {
        const style = document.createElement('style');
        style.id = 'trends-styles';
        style.textContent = `
            .trending-job-card {
                background: white;
                padding: 1.5rem;
                border-radius: 1rem;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                position: relative;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .trending-job-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 15px rgba(0,0,0,0.15);
            }
            .jobs-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 1.5rem;
                margin-top: 1.5rem;
            }
        `;
        document.head.appendChild(style);
    }
}

function createSalaryChart() {
    const ctx = document.getElementById('salaryChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['AI/ML Engineer', 'Cloud Architect', 'Data Scientist', 'DevOps Engineer', 'Software Engineer', 'UX Designer'],
            datasets: [{
                label: 'Average Salary (USD)',
                data: [140000, 160000, 125000, 125000, 110000, 95000],
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(118, 75, 162, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return '$' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + (value / 1000) + 'K';
                        }
                    }
                }
            }
        }
    });
}

function createDemandChart() {
    const ctx = document.getElementById('demandChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2024', '2025', '2026', '2027', '2028', '2029'],
            datasets: [
                {
                    label: 'AI/ML',
                    data: [100, 140, 185, 235, 290, 350],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Cloud Computing',
                    data: [100, 135, 175, 220, 270, 325],
                    borderColor: '#764ba2',
                    backgroundColor: 'rgba(118, 75, 162, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Cybersecurity',
                    data: [100, 131, 168, 210, 258, 315],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Growth Index (2024 = 100)'
                    }
                }
            }
        }
    });
}

function displaySkillDemand() {
    const technical = document.getElementById('technicalSkills');
    const soft = document.getElementById('softSkills');
    
    const techSkills = [
        { name: 'Python', demand: 95 },
        { name: 'JavaScript', demand: 90 },
        { name: 'Cloud (AWS/Azure)', demand: 88 },
        { name: 'Machine Learning', demand: 85 },
        { name: 'Docker/Kubernetes', demand: 80 },
        { name: 'React', demand: 78 }
    ];
    
    const softSkills = [
        { name: 'Problem Solving', demand: 98 },
        { name: 'Communication', demand: 95 },
        { name: 'Adaptability', demand: 90 },
        { name: 'Leadership', demand: 85 },
        { name: 'Collaboration', demand: 88 },
        { name: 'Critical Thinking', demand: 92 }
    ];
    
    technical.innerHTML = techSkills.map(skill => `
        <div style="margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span style="font-weight: 600;">${skill.name}</span>
                <span style="color: #667eea; font-weight: 700;">${skill.demand}%</span>
            </div>
            <div style="height: 8px; background: #f3f4f6; border-radius: 999px; overflow: hidden;">
                <div style="height: 100%; width: ${skill.demand}%; background: linear-gradient(90deg, #667eea, #764ba2); transition: width 1s ease-out;"></div>
            </div>
        </div>
    `).join('');
    
    soft.innerHTML = softSkills.map(skill => `
        <div style="margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span style="font-weight: 600;">${skill.name}</span>
                <span style="color: #10b981; font-weight: 700;">${skill.demand}%</span>
            </div>
            <div style="height: 8px; background: #f3f4f6; border-radius: 999px; overflow: hidden;">
                <div style="height: 100%; width: ${skill.demand}%; background: linear-gradient(90deg, #10b981, #34d399); transition: width 1s ease-out;"></div>
            </div>
        </div>
    `).join('');
}

function displayEmergingCareers() {
    const container = document.getElementById('emergingGrid');
    
    const emerging = [
        { title: 'Quantum Computing Engineer', potential: 'Very High', icon: 'fas fa-atom' },
        { title: 'Prompt Engineer', potential: 'High', icon: 'fas fa-magic' },
        { title: 'Web3 Developer', potential: 'High', icon: 'fas fa-cube' },
        { title: 'Sustainability Consultant', potential: 'Growing', icon: 'fas fa-leaf' }
    ];
    
    let html = '';
    emerging.forEach(career => {
        html += `
            <div style="background: white; padding: 1.5rem; border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center;">
                <div style="width: 60px; height: 60px; margin: 0 auto 1rem; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                    <i class="${career.icon}"></i>
                </div>
                <h4 style="margin-bottom: 0.5rem;">${career.title}</h4>
                <span class="badge badge-info">${career.potential} Potential</span>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function displayTopLocations() {
    const container = document.getElementById('locationsGrid');
    
    const locations = [
        { city: 'San Francisco', jobs: '125K+', avgSalary: '$145K', growth: '+18%' },
        { city: 'Seattle', jobs: '95K+', avgSalary: '$135K', growth: '+22%' },
        { city: 'New York', jobs: '150K+', avgSalary: '$130K', growth: '+15%' },
        { city: 'Austin', jobs: '65K+', avgSalary: '$115K', growth: '+28%' }
    ];
    
    let html = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">';
    locations.forEach(loc => {
        html += `
            <div style="background: white; padding: 1.5rem; border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h4 style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                    <i class="fas fa-map-marker-alt" style="color: #667eea;"></i>
                    ${loc.city}
                </h4>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #6b7280;">Open Jobs:</span>
                        <strong>${loc.jobs}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #6b7280;">Avg Salary:</span>
                        <strong>${loc.avgSalary}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #6b7280;">Growth:</span>
                        <strong style="color: #10b981;">${loc.growth}</strong>
                    </div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    
    container.innerHTML = html;
}