// Global State
let isBeginnerMode = true;
let explanationMode = 'idle'; // 'idle', 'line', 'full'
let isChatboxExpanded = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeLucideIcons();
    setupEventListeners();
    updateLineNumbers();
    initializeTheme();
    setupSmoothScroll();
});

// Initialize Lucide icons
function initializeLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Setup all event listeners
function setupEventListeners() {
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Code editor actions
    document.getElementById('runCode').addEventListener('click', handleRunCode);
    document.getElementById('lineExplain').addEventListener('click', handleLineExplain);
    document.getElementById('fullExplain').addEventListener('click', handleFullExplain);
    document.getElementById('copyCode').addEventListener('click', handleCopyCode);
    document.getElementById('downloadCode').addEventListener('click', handleDownloadCode);
    
    // Explanation panel
    document.getElementById('toggleBeginnerMode').addEventListener('click', toggleBeginnerMode);
    
    // Code textarea
    const codeTextarea = document.getElementById('codeTextarea');
    codeTextarea.addEventListener('input', updateLineNumbers);
    codeTextarea.addEventListener('scroll', syncLineNumbersScroll);
    
    // AI Chatbox
    document.getElementById('chatboxHeader').addEventListener('click', toggleChatbox);
    document.getElementById('chatboxToggle').addEventListener('click', toggleChatbox);
    document.getElementById('sendButton').addEventListener('click', sendMessage);
    document.getElementById('chatInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Quick action buttons
    document.querySelectorAll('.quick-action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            handleQuickAction(action);
        });
    });
}

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    }
}

function toggleTheme() {
    const isDark = document.body.classList.contains('dark-mode');
    
    if (isDark) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
        showToast('Switched to light mode', 'Theme updated successfully!');
    } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        showToast('Switched to dark mode', 'Theme updated successfully!');
    }
}

// Code Editor Functions
function handleRunCode() {
    showToast('Code executed!', 'Your code is running... (This is a demo - real execution would happen on the backend)');
}

function handleLineExplain() {
    explanationMode = 'line';
    updateExplanationPanel();
    showToast('Line-by-line explanation activated', 'Analyzing each line of your code...');
}

function handleFullExplain() {
    explanationMode = 'full';
    updateExplanationPanel();
    showToast('Full explanation activated', 'Generating comprehensive code analysis...');
}

function handleCopyCode() {
    const code = document.getElementById('codeTextarea').value;
    navigator.clipboard.writeText(code).then(() => {
        showToast('Code copied!', 'Code has been copied to your clipboard.');
    });
}

function handleDownloadCode() {
    const code = document.getElementById('codeTextarea').value;
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'code.cpp';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function updateLineNumbers() {
    const textarea = document.getElementById('codeTextarea');
    const lineNumbers = document.getElementById('lineNumbers');
    const lines = textarea.value.split('\n');
    
    lineNumbers.innerHTML = lines.map((_, index) => 
        `<div style="text-align: right; padding-right: 0.5rem; line-height: 1.5;">${index + 1}</div>`
    ).join('');
}

function syncLineNumbersScroll() {
    const textarea = document.getElementById('codeTextarea');
    const lineNumbers = document.getElementById('lineNumbers');
    lineNumbers.scrollTop = textarea.scrollTop;
}

// Explanation Panel Functions
function toggleBeginnerMode() {
    isBeginnerMode = !isBeginnerMode;
    updateBeginnerModeButton();
    updateExplanationPanel();
    
    const mode = isBeginnerMode ? 'beginner' : 'advanced';
    showToast(`Switched to ${mode} mode`, 'Explanations will be adjusted to your level!');
}

function updateBeginnerModeButton() {
    const button = document.getElementById('toggleBeginnerMode');
    const beginnerIcon = button.querySelector('.beginner-icon');
    const advancedIcon = button.querySelector('.advanced-icon');
    const modeText = button.querySelector('.mode-text');
    
    if (isBeginnerMode) {
        button.className = 'btn btn-accent btn-sm';
        beginnerIcon.style.display = 'block';
        advancedIcon.style.display = 'none';
        modeText.textContent = 'Beginner Mode';
    } else {
        button.className = 'btn btn-secondary btn-sm';
        beginnerIcon.style.display = 'none';
        advancedIcon.style.display = 'block';
        modeText.textContent = 'Advanced Mode';
    }
}

function updateExplanationPanel() {
    const title = document.getElementById('explanationTitle');
    const badge = document.getElementById('explanationBadge');
    const idleState = document.getElementById('explanationIdle');
    const lineExplanations = document.getElementById('lineExplanations');
    const fullExplanations = document.getElementById('fullExplanations');
    
    // Hide all content areas
    idleState.style.display = 'none';
    lineExplanations.style.display = 'none';
    fullExplanations.style.display = 'none';
    
    if (explanationMode === 'idle') {
        title.textContent = 'AI Explanations';
        badge.style.display = 'none';
        idleState.style.display = 'flex';
    } else if (explanationMode === 'line') {
        title.textContent = 'Line-by-Line Explanation';
        badge.textContent = 'Interactive';
        badge.style.display = 'inline-block';
        badge.className = 'explanation-badge';
        lineExplanations.style.display = 'block';
        renderLineExplanations();
    } else if (explanationMode === 'full') {
        title.textContent = 'Full Code Explanation';
        badge.textContent = 'Comprehensive';
        badge.style.display = 'inline-block';
        badge.className = 'explanation-badge';
        fullExplanations.style.display = 'block';
        renderFullExplanations();
    }
}

function renderLineExplanations() {
    const container = document.getElementById('lineExplanations');
    
    const explanations = [
        {
            line: 1,
            code: "// Welcome to CodeLearn!",
            explanation: isBeginnerMode 
                ? "This is a comment - it's just a note for humans to read. The computer ignores anything after '//' on a line."
                : "Single-line comment using C++'s // syntax. Comments are ignored by the compiler."
        },
        {
            line: 4,
            code: "#include <iostream>",
            explanation: isBeginnerMode
                ? "This tells the computer to include a special toolbox called 'iostream' that lets us use input/output commands like 'cin' (input) and 'cout' (output). Think of it like importing a calculator app on your phone."
                : "Preprocessor directive that includes the iostream header file, providing access to standard input/output stream objects like cin and cout."
        },
        {
            line: 5,
            code: "using namespace std;",
            explanation: isBeginnerMode
                ? "This is a shortcut that saves us from typing 'std::' before commands like cout. Instead of writing 'std::cout', we can just write 'cout'. It's like setting a nickname for a long name."
                : "Using directive that brings the standard namespace into the current scope, eliminating the need to prefix standard library functions with 'std::'."
        },
        {
            line: 7,
            code: "int fibonacci(int n) {",
            explanation: isBeginnerMode
                ? "This creates a function (like a mini-program) called 'fibonacci'. It takes one whole number 'n' as input and will return a whole number back. The '{' starts the function's instructions."
                : "Function declaration defining fibonacci with integer parameter n and integer return type. Opening brace begins function body."
        },
        {
            line: 9,
            code: "if (n <= 1) {",
            explanation: isBeginnerMode
                ? "This checks: 'Is n less than or equal to 1?' If yes (true), it will do what's inside the next set of brackets. This handles the simple cases: F(0)=0 and F(1)=1."
                : "Conditional statement checking base cases for the recursive function when n ≤ 1."
        },
        {
            line: 16,
            code: "int main() {",
            explanation: isBeginnerMode
                ? "Every C++ program needs a 'main' function - this is where the program starts running, like the front door of a house. The computer always looks for 'main' first."
                : "Main function declaration - the entry point of every C++ program. Execution begins here."
        }
    ];
    
    container.innerHTML = explanations.map(item => `
        <div class="line-explanation">
            <div class="line-explanation-header">
                <span class="line-badge">Line ${item.line}</span>
                <code class="line-code">${item.code}</code>
            </div>
            <div class="line-explanation-content">
                ${item.explanation}
            </div>
        </div>
    `).join('');
}

function renderFullExplanations() {
    const container = document.getElementById('fullExplanations');
    
    const explanations = [
        {
            id: "overview",
            title: "What This Program Does",
            icon: "sparkles",
            content: isBeginnerMode
                ? "This C++ program calculates and prints the first 10 Fibonacci numbers. The Fibonacci sequence is famous in math and nature - each number is the sum of the two before it: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34... You can see this pattern in sunflower seeds, pinecones, and even galaxies!"
                : "Implementation of the Fibonacci sequence using recursive algorithm with exponential time complexity O(2^n). Demonstrates basic C++ syntax, recursion, and I/O operations."
        },
        {
            id: "structure",
            title: "Program Structure",
            icon: "code",
            content: isBeginnerMode
                ? "Every C++ program has the same basic parts: 1) Include statements (like importing tools), 2) The 'main' function (where the program starts), and 3) Other functions we create. This program also has a 'fibonacci' function that we created to do the math calculations."
                : "Standard C++ program structure with preprocessor directives, namespace usage, function declarations, and the main entry point. Follows typical C++ organizational patterns."
        },
        {
            id: "algorithm",
            title: "How the Fibonacci Function Works",
            icon: "brain",
            content: isBeginnerMode
                ? "The fibonacci function is 'recursive' - it calls itself! Think of it like Russian nesting dolls. To find F(5), it needs F(4) and F(3). To find F(4), it needs F(3) and F(2), and so on, until it reaches F(0)=0 and F(1)=1. Then it builds the answer back up: F(2)=1, F(3)=2, F(4)=3, F(5)=5."
                : "Classic recursive approach with base cases (n ≤ 1) and recursive cases (fibonacci(n-1) + fibonacci(n-2)). Demonstrates divide-and-conquer paradigm with exponential time complexity."
        },
        {
            id: "improvements",
            title: "Making It Better",
            icon: "lightbulb",
            content: isBeginnerMode
                ? "This code is great for learning, but it's slow for big numbers because it recalculates the same values many times. Imagine asking 'What's 2+2?' a thousand times instead of remembering the answer! We could make it faster by storing previous answers or using a different approach."
                : "Consider memoization or dynamic programming to reduce time complexity from O(2^n) to O(n). Iterative approach would be more memory efficient. Could also add input validation and error handling for production code."
        }
    ];
    
    container.innerHTML = explanations.map(item => `
        <div class="full-explanation">
            <button class="full-explanation-trigger" onclick="toggleFullExplanation('${item.id}')">
                <div class="full-explanation-header">
                    <div class="full-explanation-title">
                        <i data-lucide="${item.icon}"></i>
                        ${item.title}
                    </div>
                    <i data-lucide="chevron-right" id="chevron-${item.id}"></i>
                </div>
            </button>
            <div class="full-explanation-content" id="content-${item.id}" style="display: none;">
                ${item.content}
            </div>
        </div>
    `).join('');
    
    // Re-initialize Lucide icons for the new content
    setTimeout(initializeLucideIcons, 0);
}

function toggleFullExplanation(id) {
    const content = document.getElementById(`content-${id}`);
    const chevron = document.getElementById(`chevron-${id}`);
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        chevron.setAttribute('data-lucide', 'chevron-down');
    } else {
        content.style.display = 'none';
        chevron.setAttribute('data-lucide', 'chevron-right');
    }
    
    // Re-initialize Lucide icons for the updated chevron
    setTimeout(initializeLucideIcons, 0);
}

// AI Chatbox Functions
function toggleChatbox() {
    const chatbox = document.getElementById('aiChatbox');
    const expandIcon = document.querySelector('.expand-icon');
    const collapseIcon = document.querySelector('.collapse-icon');
    
    isChatboxExpanded = !isChatboxExpanded;
    
    if (isChatboxExpanded) {
        chatbox.classList.remove('collapsed');
        expandIcon.style.display = 'none';
        collapseIcon.style.display = 'block';
    } else {
        chatbox.classList.add('collapsed');
        expandIcon.style.display = 'block';
        collapseIcon.style.display = 'none';
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const responses = [
            "I can help explain that part of your C++ code! Which specific line would you like me to break down?",
            "That's a great question about the Fibonacci algorithm. The recursive approach you're using is elegant but has exponential time complexity.",
            "I notice your code uses recursion. Would you like me to explain how the function calls itself, or show you an iterative alternative?",
            "The iostream header you included gives you access to cout and cin for input/output operations. Would you like to know more about C++ headers?"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addChatMessage(randomResponse, 'ai');
    }, 1000);
}

function addChatMessage(message, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    
    const avatarIcon = sender === 'ai' ? 'bot' : 'user';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i data-lucide="${avatarIcon}"></i>
        </div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Re-initialize Lucide icons for the new message
    setTimeout(initializeLucideIcons, 0);
}

function handleQuickAction(action) {
    const actions = {
        'step-by-step': 'Can you explain my C++ code step by step?',
        'optimize': 'How can I optimize my Fibonacci code?',
        'find-errors': 'Are there any errors in my C++ code?'
    };
    
    const message = actions[action];
    if (message) {
        document.getElementById('chatInput').value = message;
        sendMessage();
    }
}

// Toast Notification System
function showToast(title, description) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    toast.innerHTML = `
        <div class="toast-header">${title}</div>
        <div class="toast-description">${description}</div>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}

// Smooth scroll navigation
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Update active nav on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Initialize collapsed chatbox state
document.addEventListener('DOMContentLoaded', function() {
    const chatbox = document.getElementById('aiChatbox');
    chatbox.classList.add('collapsed');
});