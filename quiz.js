// ============================================
// CAREER QUIZ LOGIC
// ============================================

const quizQuestions = [
    {
        id: 1,
        category: 'Interests',
        question: 'What type of problems do you enjoy solving the most?',
        options: [
            { text: 'Building and creating new things from scratch', tags: ['creativity', 'technology', 'engineering'] },
            { text: 'Analyzing data and finding patterns', tags: ['analysis', 'mathematics', 'research'] },
            { text: 'Designing beautiful and user-friendly experiences', tags: ['design', 'creativity', 'user-experience'] },
            { text: 'Strategizing and making business decisions', tags: ['business', 'strategy', 'leadership'] }
        ]
    },
    {
        id: 2,
        category: 'Skills',
        question: 'Which of these skills do you already have or would like to develop?',
        options: [
            { text: 'Programming and coding', tags: ['programming', 'technology', 'logic'] },
            { text: 'Data analysis and statistics', tags: ['mathematics', 'statistics', 'analysis'] },
            { text: 'Visual design and creativity', tags: ['design', 'creativity', 'visual-arts'] },
            { text: 'Communication and leadership', tags: ['communication', 'leadership', 'business'] }
        ]
    },
    {
        id: 3,
        category: 'Work Style',
        question: 'What work environment appeals to you most?',
        options: [
            { text: 'Working independently on complex technical challenges', tags: ['independent', 'technical', 'focused'] },
            { text: 'Collaborating with teams on research and analysis', tags: ['collaborative', 'analytical', 'research'] },
            { text: 'Creating designs while getting user feedback', tags: ['creative', 'user-focused', 'iterative'] },
            { text: 'Leading projects and coordinating with stakeholders', tags: ['leadership', 'strategic', 'communicative'] }
        ]
    },
    {
        id: 4,
        category: 'Technical Interest',
        question: 'Which technology area excites you most?',
        options: [
            { text: 'Web and mobile app development', tags: ['web-development', 'apps', 'frontend'] },
            { text: 'Artificial intelligence and machine learning', tags: ['ai', 'ml', 'data-science'] },
            { text: 'Cybersecurity and system protection', tags: ['security', 'networking', 'systems'] },
            { text: 'Cloud computing and infrastructure', tags: ['cloud', 'devops', 'infrastructure'] }
        ]
    },
    {
        id: 5,
        category: 'Personality',
        question: 'How would you describe your problem-solving approach?',
        options: [
            { text: 'Logical and systematic - I break problems into smaller parts', tags: ['analytical', 'systematic', 'logical'] },
            { text: 'Research-driven - I gather and analyze all available data', tags: ['research-oriented', 'thorough', 'data-driven'] },
            { text: 'Creative and innovative - I think outside the box', tags: ['creative', 'innovative', 'unconventional'] },
            { text: 'Strategic and practical - I focus on actionable solutions', tags: ['strategic', 'practical', 'decisive'] }
        ]
    },
    {
        id: 6,
        category: 'Learning Style',
        question: 'How do you prefer to learn new skills?',
        options: [
            { text: 'Hands-on practice and building projects', tags: ['practical', 'project-based', 'experiential'] },
            { text: 'Reading research papers and documentation', tags: ['theoretical', 'reading', 'academic'] },
            { text: 'Visual tutorials and design examples', tags: ['visual', 'observational', 'example-based'] },
            { text: 'Mentorship and collaborative learning', tags: ['social', 'collaborative', 'mentored'] }
        ]
    },
    {
        id: 7,
        category: 'Career Goals',
        question: 'What\'s most important to you in a career?',
        options: [
            { text: 'High salary and job security', tags: ['financial', 'stable', 'established'] },
            { text: 'Cutting-edge technology and innovation', tags: ['innovative', 'emerging', 'advanced'] },
            { text: 'Creative freedom and self-expression', tags: ['creative', 'autonomous', 'expressive'] },
            { text: 'Impact and helping others', tags: ['impact', 'helpful', 'meaningful'] }
        ]
    },
    {
        id: 8,
        category: 'Skills',
        question: 'Which programming language or tool are you most interested in?',
        options: [
            { text: 'JavaScript, React, Node.js', tags: ['javascript', 'web-development', 'frontend'] },
            { text: 'Python, TensorFlow, Pandas', tags: ['python', 'data-science', 'ai'] },
            { text: 'Figma, Adobe XD, Sketch', tags: ['design-tools', 'ux', 'visual-design'] },
            { text: 'SQL, Excel, Tableau', tags: ['data-analysis', 'business-intelligence', 'analytics'] }
        ]
    },
    {
        id: 9,
        category: 'Work Content',
        question: 'What type of tasks energize you?',
        options: [
            { text: 'Writing code and debugging', tags: ['coding', 'technical', 'problem-solving'] },
            { text: 'Analyzing datasets and creating models', tags: ['data-analysis', 'modeling', 'quantitative'] },
            { text: 'Creating mockups and prototypes', tags: ['design', 'prototyping', 'visual'] },
            { text: 'Planning strategies and managing projects', tags: ['planning', 'management', 'organizational'] }
        ]
    },
    {
        id: 10,
        category: 'Interests',
        question: 'What do you enjoy doing in your free time?',
        options: [
            { text: 'Building personal coding projects or apps', tags: ['programming', 'builder', 'maker'] },
            { text: 'Reading about science and technology trends', tags: ['research', 'curious', 'informed'] },
            { text: 'Creating digital art or designs', tags: ['artistic', 'creative', 'visual'] },
            { text: 'Planning events or organizing activities', tags: ['organizational', 'social', 'coordinator'] }
        ]
    },
    {
        id: 11,
        category: 'Strengths',
        question: 'What are you naturally good at?',
        options: [
            { text: 'Attention to detail and precision', tags: ['detail-oriented', 'precise', 'meticulous'] },
            { text: 'Pattern recognition and logical thinking', tags: ['analytical', 'logical', 'pattern-oriented'] },
            { text: 'Visual thinking and aesthetics', tags: ['visual', 'aesthetic', 'design-minded'] },
            { text: 'Communication and persuasion', tags: ['communicative', 'persuasive', 'articulate'] }
        ]
    },
    {
        id: 12,
        category: 'Challenge',
        question: 'What kind of challenges do you want to tackle?',
        options: [
            { text: 'Scaling systems to handle millions of users', tags: ['scalability', 'systems', 'performance'] },
            { text: 'Predicting trends using machine learning', tags: ['predictive', 'ai', 'forecasting'] },
            { text: 'Improving user satisfaction and engagement', tags: ['user-experience', 'engagement', 'satisfaction'] },
            { text: 'Growing products and acquiring customers', tags: ['growth', 'business', 'marketing'] }
        ]
    },
    {
        id: 13,
        category: 'Industry',
        question: 'Which industry interests you most?',
        options: [
            { text: 'Tech startups and software companies', tags: ['startup', 'tech', 'software'] },
            { text: 'Finance and data-driven enterprises', tags: ['finance', 'data', 'analytics'] },
            { text: 'E-commerce and consumer products', tags: ['e-commerce', 'consumer', 'product'] },
            { text: 'Healthcare and education technology', tags: ['healthcare', 'education', 'impact'] }
        ]
    },
    {
        id: 14,
        category: 'Team Role',
        question: 'What role do you see yourself playing in a team?',
        options: [
            { text: 'The technical expert who implements solutions', tags: ['technical', 'implementer', 'specialist'] },
            { text: 'The analyst who interprets data and insights', tags: ['analyst', 'interpreter', 'data-expert'] },
            { text: 'The creative who designs the user experience', tags: ['designer', 'creative', 'ux-expert'] },
            { text: 'The leader who coordinates and makes decisions', tags: ['leader', 'coordinator', 'decision-maker'] }
        ]
    },
    {
        id: 15,
        category: 'Future Vision',
        question: 'Where do you see yourself in 5 years?',
        options: [
            { text: 'Senior engineer at a leading tech company', tags: ['engineering', 'senior', 'technical-leader'] },
            { text: 'Data science expert or AI researcher', tags: ['data-science', 'ai', 'research'] },
            { text: 'Lead designer creating award-winning products', tags: ['design-leader', 'creative-director', 'ux-lead'] },
            { text: 'Product leader or entrepreneur', tags: ['product-leader', 'entrepreneur', 'executive'] }
        ]
    }
];

let currentQuestion = 0;
let userAnswers = [];

// Start the quiz
function startQuiz() {
    document.getElementById('quizStart').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('progressContainer').style.display = 'block';
    
    currentQuestion = 0;
    userAnswers = [];
    
    displayQuestion();
}

// Display current question
function displayQuestion() {
    const question = quizQuestions[currentQuestion];
    const totalQuestions = quizQuestions.length;
    
    // Update progress
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    document.getElementById('totalQuestions').textContent = totalQuestions;
    
    // Update question content
    document.getElementById('questionCategory').textContent = question.category;
    document.getElementById('questionNumber').textContent = `Question ${currentQuestion + 1}`;
    document.getElementById('questionText').textContent = question.question;
    
    // Display options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option.text;
        optionDiv.onclick = () => selectOption(index);
        
        // Check if this option was previously selected
        if (userAnswers[currentQuestion] === index) {
            optionDiv.classList.add('selected');
        }
        
        optionsContainer.appendChild(optionDiv);
    });
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = currentQuestion === 0;
    document.getElementById('nextBtn').disabled = userAnswers[currentQuestion] === undefined;
    document.getElementById('nextBtn').innerHTML = currentQuestion === totalQuestions - 1 
        ? '<i class="fas fa-check"></i> Finish' 
        : 'Next <i class="fas fa-arrow-right"></i>';
}

// Select an option
function selectOption(index) {
    userAnswers[currentQuestion] = index;
    
    // Update visual selection
    const options = document.querySelectorAll('.option');
    options.forEach((opt, i) => {
        if (i === index) {
            opt.classList.add('selected');
        } else {
            opt.classList.remove('selected');
        }
    });
    
    // Enable next button
    document.getElementById('nextBtn').disabled = false;
}

// Go to next question
function nextQuestion() {
    if (userAnswers[currentQuestion] === undefined) return;
    
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        finishQuiz();
    }
}

// Go to previous question
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
}

// Finish quiz and show results
function finishQuiz() {
    // Analyze answers
    const profile = analyzeAnswers();
    
    // Save to localStorage
    window.CareerMentorAI.Storage.save('userProfile', profile);
    window.CareerMentorAI.Storage.save('quizCompleted', true);
    window.CareerMentorAI.Storage.save('quizDate', new Date().toISOString());
    
    // Show results
    displayResults(profile);
}

// Analyze user answers to create profile
function analyzeAnswers() {
    const allTags = [];
    
    quizQuestions.forEach((question, index) => {
        const answerIndex = userAnswers[index];
        if (answerIndex !== undefined) {
            const selectedOption = question.options[answerIndex];
            allTags.push(...selectedOption.tags);
        }
    });
    
    // Count tag frequencies
    const tagCounts = {};
    allTags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
    
    // Get top tags
    const topTags = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([tag]) => tag);
    
    return {
        interests: topTags.filter(tag => 
            ['technology', 'design', 'business', 'research', 'creativity', 'analysis'].some(i => tag.includes(i))
        ),
        personality: topTags.filter(tag =>
            ['analytical', 'creative', 'strategic', 'communicative', 'detail-oriented'].some(p => tag.includes(p))
        ),
        skills: topTags.filter(tag =>
            ['programming', 'data', 'design', 'leadership', 'javascript', 'python'].some(s => tag.includes(s))
        ),
        completedAt: new Date().toISOString()
    };
}

// Display quiz results
function displayResults(profile) {
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('progressContainer').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
    
    const recommendations = window.CareerMentorAI.CareerData.getRecommendations(profile);
    
    let resultsHTML = '<div class="career-recommendations">';
    
    recommendations.forEach((career, index) => {
        resultsHTML += `
            <div class="career-result-card" style="animation: fadeInUp 0.5s ease-out ${index * 0.1}s both">
                <div class="career-rank">#${index + 1}</div>
                <div class="career-header">
                    <div class="career-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                        <i class="${career.icon}"></i>
                    </div>
                    <div>
                        <h3>${career.title}</h3>
                        <p>${career.description}</p>
                    </div>
                </div>
                <div class="match-score">
                    <div class="match-bar">
                        <div class="match-fill" style="width: ${career.matchScore}%; background: linear-gradient(90deg, #667eea, #764ba2);"></div>
                    </div>
                    <span><strong>${career.matchScore}%</strong> Match</span>
                </div>
                <div class="career-details">
                    <div class="detail-item">
                        <i class="fas fa-dollar-sign"></i>
                        <span>${career.salary}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-chart-line"></i>
                        <span>${career.growth}% Growth</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-clock"></i>
                        <span>${career.timeToReady}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    resultsHTML += '</div>';
    
    // Add CSS for career result cards
    const style = document.createElement('style');
    style.textContent = `
        .career-recommendations { display: flex; flex-direction: column; gap: 1.5rem; }
        .career-result-card { 
            background: white; 
            padding: 1.5rem; 
            border-radius: 1rem; 
            box-shadow: 0 4px 6px rgba(0,0,0,0.1); 
            position: relative;
        }
        .career-rank {
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
        }
        .career-header {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        .career-icon {
            width: 60px;
            height: 60px;
            border-radius: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.75rem;
            flex-shrink: 0;
        }
        .career-header h3 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }
        .match-score {
            margin: 1.5rem 0;
        }
        .match-bar {
            height: 8px;
            background: #f3f4f6;
            border-radius: 9999px;
            overflow: hidden;
            margin-bottom: 0.5rem;
        }
        .match-fill {
            height: 100%;
            transition: width 1s ease-out;
        }
        .match-score span {
            color: #6b7280;
        }
        .career-details {
            display: flex;
            gap: 2rem;
            padding-top: 1rem;
            border-top: 1px solid #e5e7eb;
        }
        .detail-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #6b7280;
        }
        .detail-item i {
            color: #667eea;
        }
    `;
    document.head.appendChild(style);
    
    document.getElementById('resultsSummary').innerHTML = resultsHTML;
    
    // Save top recommendation
    window.CareerMentorAI.Storage.save('topCareer', recommendations[0]);
    
    window.CareerMentorAI.showNotification('Quiz completed successfully! Check your personalized recommendations.', 'success');
}

// Retake quiz
function retakeQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    document.getElementById('quizResults').style.display = 'none';
    document.getElementById('quizStart').style.display = 'block';
}