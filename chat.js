// ============================================
// AI CHAT MENTOR LOGIC
// ============================================

const chatResponses = {
    greetings: [
        "Hello! I'm your AI Career Mentor. How can I help you today?",
        "Hi there! Ready to discuss your career journey?",
        "Welcome! I'm here to guide you through your career questions."
    ],
    
    careerPaths: [
        "Based on current trends, some of the most promising career paths include:\n\n• **Software Engineering** - High demand, great salary ($85K-$150K)\n• **Data Science** - Explosive growth, AI-focused ($90K-$160K)\n• **Cloud Engineering** - Essential for modern businesses ($90K-$160K)\n• **Cybersecurity** - Critical and growing field ($85K-$155K)\n\nWhat interests you most about these fields?",
        "The best career path depends on your interests and skills! Have you taken our career assessment quiz yet? It can help identify careers that match your unique profile."
    ],
    
    skills: [
        "Great question! Here are the most in-demand skills right now:\n\n**Technical:**\n• Python, JavaScript, React\n• Cloud platforms (AWS, Azure)\n• Data analysis and ML\n• Docker & Kubernetes\n\n**Soft Skills:**\n• Problem-solving\n• Communication\n• Adaptability\n• Leadership\n\nWhich area would you like to focus on first?",
        "To stay competitive, focus on:\n1. A programming language (Python or JavaScript)\n2. Cloud computing basics\n3. Version control (Git)\n4. Problem-solving and algorithms\n5. Communication skills\n\nWant specific learning resources for any of these?"
    ],
    
    transition: [
        "Career transitions can be challenging but rewarding! Here's my advice:\n\n1. **Assess transferable skills** - What do you already know?\n2. **Bridge skill gaps** - Take targeted courses\n3. **Build a portfolio** - Create projects in your new field\n4. **Network actively** - Connect with professionals\n5. **Start with freelance** - Gain practical experience\n\nWhat field are you considering transitioning to?",
        "Transitioning careers requires strategic planning:\n\n• Start learning on weekends/evenings\n• Build projects to showcase skills\n• Get certifications in your target field\n• Update your LinkedIn profile\n• Consider bootcamps or structured programs\n\nHow can I help you plan your transition?"
    ],
    
    resume: [
        "Here are key tips for an effective resume:\n\n✓ **Keep it concise** - 1-2 pages max\n✓ **Use action verbs** - Led, Built, Increased\n✓ **Quantify achievements** - Use numbers and percentages\n✓ **Tailor to each job** - Match keywords from job description\n✓ **Highlight impact** - Focus on results, not just duties\n✓ **ATS-friendly format** - Use standard fonts and sections\n\nWant me to review specific sections?",
        "For a strong resume:\n1. Clear professional summary at the top\n2. Skills section with relevant keywords\n3. Experience with quantifiable achievements\n4. Education and certifications\n5. Portfolio/GitHub links if applicable\n\nCheck out our Resume Enhancer tool for AI-powered suggestions!"
    ],
    
    certifications: [
        "Top certifications by field:\n\n**Cloud Computing:**\n• AWS Certified Solutions Architect\n• Google Cloud Professional\n• Azure Administrator\n\n**Data Science:**\n• Google Data Analytics Professional\n• IBM Data Science Professional\n• TensorFlow Developer\n\n**Cybersecurity:**\n• CompTIA Security+\n• CISSP\n• CEH (Certified Ethical Hacker)\n\nWhich field interests you?",
        "Certifications can definitely boost your career! Focus on:\n\n• Industry-recognized certifications\n• Vendor-specific (AWS, Google, Microsoft)\n• Practical, hands-on programs\n• Certifications that match job requirements\n\nWant recommendations for your target role?"
    ],
    
    salary: [
        "Salary ranges vary by location, experience, and company size. Here are general US averages:\n\n• **Entry-level**: $50K - $75K\n• **Mid-level**: $75K - $120K\n• **Senior**: $120K - $180K+\n• **Lead/Principal**: $150K - $250K+\n\nTech hubs (SF, NYC, Seattle) typically pay 20-30% more. What role are you considering?",
        "Compensation factors to consider:\n\n💰 Base salary\n📈 Stock options/equity\n🏥 Benefits package\n🏠 Remote work opportunities\n📚 Learning & development budget\n⏰ Work-life balance\n\nTotal compensation often exceeds base salary by 20-40%!"
    ],
    
    learning: [
        "Best learning platforms for tech skills:\n\n**Free:**\n• freeCodeCamp - Web development\n• YouTube - Tutorials on everything\n• MDN Docs - Web technologies\n• Coursera - University courses\n\n**Paid:**\n• Udemy - Affordable courses ($10-20)\n• Pluralsight - Tech skills library\n• Frontend Masters - Advanced JavaScript\n• DataCamp - Data science\n\nWhat are you trying to learn?",
        "Here's an effective learning strategy:\n\n1. **Watch tutorials** (20%) - Get overview\n2. **Practice coding** (60%) - Build projects\n3. **Read documentation** (10%) - Deep understanding\n4. **Teach others** (10%) - Solidify knowledge\n\nConsistency beats intensity - 1 hour daily is better than 7 hours on Sunday!"
    ],
    
    default: [
        "That's a great question! While I'm still learning, I can help you with:\n\n• Career path recommendations\n• Skill development advice\n• Resume and interview tips\n• Learning resources\n• Industry trends\n• Salary insights\n\nCould you rephrase your question or ask about one of these topics?",
        "I'm here to help! I can provide guidance on career planning, skill development, and job market trends. What specific aspect of your career would you like to discuss?",
        "Interesting question! For detailed guidance on that topic, I recommend:\n\n1. Taking our Career Assessment Quiz\n2. Checking our Learning Paths section\n3. Reviewing Job Trends data\n4. Using our Resume Enhancer\n\nWhat would be most helpful right now?"
    ]
};

let chatHistory = [];

document.addEventListener('DOMContentLoaded', () => {
    loadChatHistory();
});

function askQuestion(question) {
    document.getElementById('chatInput').value = question;
    sendMessage();
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Hide welcome message
    const welcomeMsg = document.querySelector('.welcome-message');
    if (welcomeMsg) {
        welcomeMsg.style.display = 'none';
    }
    
    // Hide suggested questions
    const suggestions = document.getElementById('suggestedQuestions');
    if (suggestions) {
        suggestions.style.display = 'none';
    }
    
    // Simulate AI thinking
    showTypingIndicator();
    
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateResponse(message);
        addMessage(response, 'ai');
    }, 50);
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'ai' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    content.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Save to history
    chatHistory.push({ text, sender, timestamp: new Date().toISOString() });
    saveChatHistory();
}

function generateResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Pattern matching for responses
    if (lowerMessage.match(/hello|hi|hey|greetings/)) {
        return getRandomResponse(chatResponses.greetings);
    }
    
    if (lowerMessage.match(/career|path|job|role|profession/)) {
        return getRandomResponse(chatResponses.careerPaths);
    }
    
    if (lowerMessage.match(/skill|learn|study|technology/)) {
        return getRandomResponse(chatResponses.skills);
    }
    
    if (lowerMessage.match(/transition|switch|change career/)) {
        return getRandomResponse(chatResponses.transition);
    }
    
    if (lowerMessage.match(/resume|cv|curriculum/)) {
        return getRandomResponse(chatResponses.resume);
    }
    
    if (lowerMessage.match(/certif|course|training/)) {
        return getRandomResponse(chatResponses.certifications);
    }
    
    if (lowerMessage.match(/salary|pay|compensation|money/)) {
        return getRandomResponse(chatResponses.salary);
    }
    
    if (lowerMessage.match(/learn|tutorial|resource|book/)) {
        return getRandomResponse(chatResponses.learning);
    }
    
    // Default response
    return getRandomResponse(chatResponses.default);
}

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const indicator = document.createElement('div');
    indicator.className = 'message ai typing-indicator';
    indicator.id = 'typingIndicator';
    indicator.innerHTML = `
        <div class="message-avatar"><i class="fas fa-robot"></i></div>
        <div class="message-content">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
        </div>
    `;
    
    // Add typing animation CSS
    if (!document.getElementById('typing-styles')) {
        const style = document.createElement('style');
        style.id = 'typing-styles';
        style.textContent = `
            .typing-indicator .dot {
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #667eea;
                margin: 0 2px;
                animation: typing 1.4s infinite;
            }
            .typing-indicator .dot:nth-child(2) { animation-delay: 0.2s; }
            .typing-indicator .dot:nth-child(3) { animation-delay: 0.4s; }
            @keyframes typing {
                0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
                30% { opacity: 1; transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    messagesContainer.appendChild(indicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function clearChat() {
    if (confirm('Are you sure you want to clear this chat?')) {
        document.getElementById('chatMessages').innerHTML = `
            <div class="welcome-message">
                <div class="welcome-icon">
                    <i class="fas fa-robot"></i>
                </div>
                <h2>Hello! I'm Your AI Career Mentor</h2>
                <p>I'm here to help you with:</p>
                <div class="help-topics">
                    <div class="help-topic">
                        <i class="fas fa-compass"></i>
                        <span>Career Path Guidance</span>
                    </div>
                    <div class="help-topic">
                        <i class="fas fa-lightbulb"></i>
                        <span>Skill Development</span>
                    </div>
                    <div class="help-topic">
                        <i class="fas fa-graduation-cap"></i>
                        <span>Learning Resources</span>
                    </div>
                    <div class="help-topic">
                        <i class="fas fa-briefcase"></i>
                        <span>Job Market Insights</span>
                    </div>
                </div>
                <p class="help-prompt">Ask me anything about your career!</p>
            </div>
        `;
        
        chatHistory = [];
        saveChatHistory();
        
        document.getElementById('suggestedQuestions').style.display = 'flex';
        
        window.CareerMentorAI.showNotification('Chat cleared', 'success');
    }
}

function newChat() {
    clearChat();
}

function loadChatHistory() {
    const saved = window.CareerMentorAI.Storage.get('chatHistory');
    if (saved && saved.length > 0) {
        chatHistory = saved;
        // Optionally restore messages
    }
}

function saveChatHistory() {
    window.CareerMentorAI.Storage.save('chatHistory', chatHistory);
}