// ============================================
// RESUME ENHANCER LOGIC
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeResumeEnhancer();
});

function initializeResumeEnhancer() {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            e.target.classList.add('active');
            const tabName = e.target.dataset.tab;
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });
}

function analyzeResume() {
    const resumeText = document.getElementById('resumeText').value.trim();
    const targetRole = document.getElementById('targetRole').value.trim();

    if (!resumeText) {
        window.CareerMentorAI.showNotification('Please paste your resume content', 'warning');
        return;
    }

    // Show loading state
    showLoadingState();

    // Simulate AI analysis
    setTimeout(() => {
        const analysis = performAnalysis(resumeText, targetRole);
        displayResults(analysis);
    }, 50);
}

function analyzeFormResume() {
    window.CareerMentorAI.showNotification('Form analysis coming soon! Use paste text for now.', 'info');
}

function showLoadingState() {
    document.querySelector('.resume-input-section').style.opacity = '0.5';
    document.querySelector('.resume-input-section').style.pointerEvents = 'none';

    // Show progress message
    window.CareerMentorAI.showNotification('Analyzing your resume with AI...', 'info');
}

function performAnalysis(resumeText, targetRole) {
    // Simulate AI analysis logic
    const wordCount = resumeText.split(/\s+/).length;
    const hasEmail = /@/.test(resumeText);
    const hasPhone = /\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(resumeText);
    const hasSkills = /skills|technologies|tools/i.test(resumeText);
    const hasQuantifiables = /\d+%|\$\d+|\d+\+/.test(resumeText);

    // Calculate scores
    let contentScore = 50;
    if (wordCount > 200) contentScore += 15;
    if (hasQuantifiables) contentScore += 15;
    if (wordCount > 400) contentScore += 10;

    let keywordScore = hasSkills ? 75 : 45;
    let formatScore = (hasEmail && hasPhone) ? 95 : 70;
    let atsScore = 70;

    const overallScore = Math.round((contentScore + keywordScore + formatScore + atsScore) / 4);

    // Extract skills mentioned
    const commonSkills = ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS', 'Docker', 'Git', 'TypeScript', 'MongoDB'];
    const foundSkills = commonSkills.filter(skill =>
        resumeText.toLowerCase().includes(skill.toLowerCase())
    );

    // Determine missing keywords based on target role
    const roleKeywords = {
        'software engineer': ['Algorithms', 'Data Structures', 'System Design', 'REST APIs', 'Microservices', 'CI/CD'],
        'data scientist': ['Machine Learning', 'Statistical Analysis', 'Python', 'TensorFlow', 'Data Visualization', 'SQL'],
        'product manager': ['Product Strategy', 'Roadmap Planning', 'Agile', 'Stakeholder Management', 'User Research', 'Analytics'],
        'default': ['Leadership', 'Communication', 'Problem Solving', 'Team Collaboration', 'Project Management', 'Innovation']
    };

    const targetKeywords = roleKeywords[targetRole?.toLowerCase()] || roleKeywords['default'];
    const missingKeywords = targetKeywords.filter(keyword =>
        !resumeText.toLowerCase().includes(keyword.toLowerCase())
    );

    return {
        overallScore,
        scores: {
            content: contentScore,
            keyword: keywordScore,
            format: formatScore,
            ats: atsScore
        },
        foundSkills,
        missingKeywords,
        improvements: generateImprovements(resumeText, hasQuantifiables, hasSkills),
        strengths: generateStrengths(resumeText, foundSkills),
        actionItems: generateActionItems(missingKeywords)
    };
}

function generateImprovements(text, hasQuantifiables, hasSkills) {
    const improvements = [];

    if (!hasQuantifiables) {
        improvements.push({
            priority: 'high',
            title: 'Add Quantifiable Achievements',
            description: 'Include specific numbers, percentages, or metrics to demonstrate impact',
            example: '❌ "Improved website performance"\n✅ "Improved website load time by 45%, increasing user engagement by 30%"'
        });
    }

    if (text.split(/\s+/).length < 300) {
        improvements.push({
            priority: 'medium',
            title: 'Expand Your Experience Section',
            description: 'Provide more details about your responsibilities and achievements',
            example: 'Include 3-5 bullet points per role with specific accomplishments'
        });
    }

    if (!hasSkills) {
        improvements.push({
            priority: 'high',
            title: 'Add a Skills Section',
            description: 'Create a dedicated section listing your technical and soft skills',
            example: 'Technical Skills: JavaScript, React, Node.js, SQL, AWS\nSoft Skills: Leadership, Communication, Problem Solving'
        });
    }

    improvements.push({
        priority: 'medium',
        title: 'Use Strong Action Verbs',
        description: 'Start bullet points with powerful action verbs',
        example: 'Led, Developed, Implemented, Increased, Reduced, Managed, Created, Optimized'
    });

    if (!/experience|employment|work history/i.test(text)) {
        improvements.push({
            priority: 'high',
            title: 'Clarify Section Headers',
            description: 'Use clear, standard section headers for better ATS compatibility',
            example: 'Use: "Work Experience", "Education", "Skills", "Certifications"'
        });
    }

    return improvements;
}

function generateStrengths(text, foundSkills) {
    const strengths = [];

    if (foundSkills.length > 3) {
        strengths.push({
            icon: 'fas fa-code',
            title: 'Strong Technical Skills',
            description: `Includes ${foundSkills.length} relevant technical skills`
        });
    }

    if (/led|managed|coordinated|organized/i.test(text)) {
        strengths.push({
            icon: 'fas fa-users',
            title: 'Leadership Experience',
            description: 'Demonstrates leadership and management capabilities'
        });
    }

    if (/improved|increased|reduced|optimized/i.test(text)) {
        strengths.push({
            icon: 'fas fa-chart-line',
            title: 'Results-Oriented',
            description: 'Focuses on achievements and measurable outcomes'
        });
    }

    if (foundSkills.some(skill => ['AWS', 'Azure', 'Docker', 'Kubernetes'].includes(skill))) {
        strengths.push({
            icon: 'fas fa-cloud',
            title: 'Cloud & DevOps Skills',
            description: 'Includes modern cloud technologies and DevOps practices'
        });
    }

    return strengths;
}

function generateActionItems(missingKeywords) {
    return missingKeywords.slice(0, 4).map(keyword => ({
        priority: 'high',
        text: `Add "${keyword}" keyword if applicable to your experience`,
        action: `Research how to incorporate ${keyword} naturally into your resume`
    }));
}

function displayResults(analysis) {
    // Show results section
    document.querySelector('.resume-input-section').style.opacity = '1';
    document.querySelector('.resume-input-section').style.pointerEvents = 'auto';
    document.getElementById('resumeResults').style.display = 'block';

    // Scroll to results
    document.getElementById('resumeResults').scrollIntoView({ behavior: 'smooth' });

    // Update overall score
    document.getElementById('overallScore').textContent = analysis.overallScore;

    // Animate score circle
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (analysis.overallScore / 100) * circumference;
    document.getElementById('scoreCircle').style.strokeDashoffset = offset;

    // Update score breakdowns
    const breakdowns = document.querySelectorAll('.breakdown-item');
    breakdowns[0].querySelector('.breakdown-fill').style.width = analysis.scores.content + '%';
    breakdowns[0].querySelector('strong').textContent = analysis.scores.content + '%';
    breakdowns[1].querySelector('.breakdown-fill').style.width = analysis.scores.keyword + '%';
    breakdowns[1].querySelector('strong').textContent = analysis.scores.keyword + '%';
    breakdowns[2].querySelector('.breakdown-fill').style.width = analysis.scores.format + '%';
    breakdowns[2].querySelector('strong').textContent = analysis.scores.format + '%';
    breakdowns[3].querySelector('.breakdown-fill').style.width = analysis.scores.ats + '%';
    breakdowns[3].querySelector('strong').textContent = analysis.scores.ats + '%';

    // Display missing keywords
    displayMissingKeywords(analysis.missingKeywords);

    // Display improvements
    displayImprovements(analysis.improvements);

    // Display strengths
    displayStrengthsResults(analysis.strengths);

    // Display action items
    displayActionItems(analysis.actionItems);

    // Display enhanced preview
    displayEnhancedPreview();

    window.CareerMentorAI.showNotification('Analysis complete! Review your results below.', 'success');
}

function displayMissingKeywords(keywords) {
    const container = document.getElementById('missingKeywords');

    let html = '<div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">';
    keywords.forEach(keyword => {
        html += `
            <span style="padding: 0.5rem 1rem; background: rgba(245, 158, 11, 0.1); color: #f59e0b; border: 2px dashed #f59e0b; border-radius: 999px; font-size: 0.875rem; font-weight: 600; cursor: pointer;" 
                  onclick="copyKeyword('${keyword}')" title="Click to copy">
                ${keyword} <i class="fas fa-copy" style="opacity: 0.5;"></i>
            </span>
        `;
    });
    html += '</div>';

    container.innerHTML = html;
}

function displayImprovements(improvements) {
    const container = document.getElementById('improvementsList');

    let html = '';
    improvements.forEach(item => {
        const priorityClass = item.priority === 'high' ? 'badge-warning' : 'badge-info';
        html += `
            <div style="padding: 1rem; background: #f9fafb; border-radius: 0.5rem; border-left: 4px solid ${item.priority === 'high' ? '#f59e0b' : '#3b82f6'}; margin-bottom: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                    <strong>${item.title}</strong>
                    <span class="badge ${priorityClass}" style="text-transform: capitalize;">${item.priority}</span>
                </div>
                <p style="color: #6b7280; font-size: 0.9rem; margin-bottom: 0.5rem;">${item.description}</p>
                ${item.example ? `<pre style="background: white; padding: 0.75rem; border-radius: 0.375rem; font-size: 0.85rem; overflow-x: auto; color: #374151;">${item.example}</pre>` : ''}
            </div>
        `;
    });

    container.innerHTML = html;
}

function displayStrengthsResults(strengths) {
    const container = document.getElementById('strengthsList');

    let html = '';
    strengths.forEach(strength => {
        html += `
            <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid #e5e7eb;">
                <div style="width: 40px; height: 40px; background: rgba(16, 185, 129, 0.1); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: #10b981; flex-shrink: 0;">
                    <i class="${strength.icon}"></i>
                </div>
                <div>
                    <strong style="display: block; margin-bottom: 0.25rem;">${strength.title}</strong>
                    <span style="font-size: 0.875rem; color: #6b7280;">${strength.description}</span>
                </div>
            </div>
        `;
    });

    container.innerHTML = html || '<p style="color: #6b7280;">Complete the analysis to see your strengths</p>';
}

function displayActionItems(items) {
    const container = document.getElementById('actionsList');

    let html = '';
    items.forEach((item, index) => {
        html += `
            <div style="display: flex; align-items: start; gap: 1rem; padding: 1rem; background: #f9fafb; border-radius: 0.5rem; margin-bottom: 0.75rem;">
                <div style="width: 28px; height: 28px; background: #667eea; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.875rem; flex-shrink: 0;">
                    ${index + 1}
                </div>
                <div style="flex: 1;">
                    <strong style="display: block; margin-bottom: 0.25rem;">${item.text}</strong>
                    <span style="font-size: 0.875rem; color: #6b7280;">${item.action}</span>
                </div>
                <input type="checkbox" style="width: 20px; height: 20px; cursor: pointer;">
            </div>
        `;
    });

    container.innerHTML = html;
}

function displayEnhancedPreview() {
    const container = document.getElementById('enhancedPreview');

    container.innerHTML = `
        <div style="background: white; padding: 2rem; font-family: 'Times New Roman', serif;">
            <div style="text-align: center; margin-bottom: 2rem;">
                <h2 style="font-size: 1.75rem; margin-bottom: 0.5rem;">JOHN DOE</h2>
                <p style="color: #6b7280;">Software Engineer</p>
                <p style="color: #6b7280; font-size: 0.9rem;">
                    john.doe@email.com | (555) 123-4567 | linkedin.com/in/johndoe | github.com/johndoe
                </p>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h3 style="border-bottom: 2px solid #667eea; padding-bottom: 0.5rem; margin-bottom: 1rem;">PROFESSIONAL SUMMARY</h3>
                <p style="color: #374151; line-height: 1.7;">
                    Results-driven Software Engineer with 5+ years of experience building scalable web applications. 
                    Increased application performance by 45% and reduced server costs by $50K annually. 
                    Expertise in JavaScript, React, and Node.js with a proven track record of delivering high-quality solutions.
                </p>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h3 style="border-bottom: 2px solid #667eea; padding-bottom: 0.5rem; margin-bottom: 1rem;">SKILLS</h3>
                <p style="color: #374151;">
                    <strong>Technical:</strong> JavaScript, Python, React, Node.js, TypeScript, SQL, MongoDB, AWS, Docker, Git<br>
                    <strong>Soft Skills:</strong> Problem Solving, Team Leadership, Agile Development, Communication
                </p>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h3 style="border-bottom: 2px solid #667eea; padding-bottom: 0.5rem; margin-bottom: 1rem;">WORK EXPERIENCE</h3>
                <div style="margin-bottom: 1rem;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <strong>Senior Software Engineer - Tech Company</strong>
                        <span style="color: #6b7280;">2021 - Present</span>
                    </div>
                    <ul style="color: #374151; line-height: 1.7; margin-left: 1.5rem;">
                        <li>Led development of microservices architecture, improving system scalability by 60%</li>
                        <li>Implemented CI/CD pipeline, reducing deployment time from 2 hours to 15 minutes</li>
                        <li>Mentored 5 junior developers, improving team productivity by 35%</li>
                    </ul>
                </div>
            </div>
            
            <div>
                <h3 style="border-bottom: 2px solid #667eea; padding-bottom: 0.5rem; margin-bottom: 1rem;">EDUCATION</h3>
                <div style="display: flex; justify-content: space-between;">
                    <strong>Bachelor of Science in Computer Science</strong>
                    <span style="color: #6b7280;">2016 - 2020</span>
                </div>
                <p style="color: #6b7280;">University Name</p>
            </div>
        </div>
    `;
}

function copyKeyword(keyword) {
    navigator.clipboard.writeText(keyword).then(() => {
        window.CareerMentorAI.showNotification(`"${keyword}" copied to clipboard!`, 'success');
    });
}

function applyKeywords() {
    window.CareerMentorAI.showNotification('Keywords highlighted! Add them to relevant sections.', 'info');
}

function copyEnhanced() {
    const preview = document.getElementById('enhancedPreview');
    const text = preview.innerText;

    navigator.clipboard.writeText(text).then(() => {
        window.CareerMentorAI.showNotification('Enhanced resume copied to clipboard!', 'success');
    });
}

function downloadEnhanced() {
    window.CareerMentorAI.showNotification('Download feature coming soon! Use copy for now.', 'info');
}