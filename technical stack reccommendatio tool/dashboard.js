// Dashboard JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Check authentication
  const currentUser = getCurrentUser()
  if (!currentUser) {
    window.location.href = "login.html"
    return
  }

  // Initialize dashboard
  initializeDashboard()
  loadUserData()
  setupEventListeners()
  loadHistory()
  loadComments()
})

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("techstack_current_user"))
}

function initializeDashboard() {
  const currentUser = getCurrentUser()

  // Update user display name and avatar
  const userDisplayName = document.getElementById("userDisplayName")
  const userAvatar = document.getElementById("userAvatar")

  if (userDisplayName) {
    userDisplayName.textContent = currentUser.fullName
  }

  if (userAvatar && currentUser.avatar) {
    userAvatar.src = currentUser.avatar
  }
}

function loadUserData() {
  const currentUser = getCurrentUser()

  // Load user statistics
  const stats = currentUser.stats || { recommendations: 0, comments: 0, downloads: 0 }

  // Update any stat displays if they exist
  const totalRecommendations = document.getElementById("totalRecommendations")
  const totalComments = document.getElementById("totalComments")
  const totalDownloads = document.getElementById("totalDownloads")

  if (totalRecommendations) totalRecommendations.textContent = stats.recommendations
  if (totalComments) totalComments.textContent = stats.comments
  if (totalDownloads) totalDownloads.textContent = stats.downloads
}

function setupEventListeners() {
  // Sidebar navigation
  const navItems = document.querySelectorAll(".nav-item[data-section]")
  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()
      const section = this.getAttribute("data-section")
      showSection(section)

      // Update active nav item
      navItems.forEach((nav) => nav.classList.remove("active"))
      this.classList.add("active")
    })
  })

  // Sidebar toggle for mobile
  const sidebarToggle = document.querySelector(".sidebar-toggle")
  const sidebar = document.querySelector(".sidebar")

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active")
    })
  }

  // Recommendation form
  const recommendationForm = document.getElementById("recommendationForm")
  if (recommendationForm) {
    recommendationForm.addEventListener("submit", handleRecommendationSubmit)
  }

  // Comment form
  const commentForm = document.getElementById("commentForm")
  if (commentForm) {
    commentForm.addEventListener("submit", handleCommentSubmit)
  }
}

function showSection(sectionName) {
  // Hide all sections
  const sections = document.querySelectorAll(".content-section")
  sections.forEach((section) => section.classList.remove("active"))

  // Show selected section
  const targetSection = document.getElementById(sectionName)
  if (targetSection) {
    targetSection.classList.add("active")
  }

  // Update page title
  const pageTitle = document.getElementById("pageTitle")
  if (pageTitle) {
    const titles = {
      recommendations: "Dashboard",
      stacks: "Tech Stacks",
      history: "History",
      comments: "Comments",
    }
    pageTitle.textContent = titles[sectionName] || "Dashboard"
  }
}

function handleRecommendationSubmit(e) {
  e.preventDefault()

  const formData = new FormData(this)
  const projectData = {
    projectType: formData.get("projectType"),
    projectSize: formData.get("projectSize"),
    timeline: formData.get("timeline"),
    budget: formData.get("budget"),
    requirements: formData.get("requirements"),
  }

  // Validate form
  if (!projectData.projectType || !projectData.projectSize || !projectData.timeline || !projectData.budget) {
    alert("Please fill in all required fields.")
    return
  }

  // Show loading state
  const submitBtn = this.querySelector('button[type="submit"]')
  const originalText = submitBtn.innerHTML
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...'
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    const recommendation = generateRecommendation(projectData)
    displayRecommendation(recommendation)
    saveToHistory(projectData, recommendation)

    // Update user stats
    updateUserStats("recommendations")

    // Reset button
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false
  }, 2000)
}
function generateRecommendation(projectData) {
  const recommendations = {
    "web-app": {
      name: "MERN Stack",
      description: "Perfect for modern web applications with dynamic user interfaces",
      technologies: ["MongoDB", "Express.js", "React", "Node.js"],
      pros: ["Full JavaScript stack", "Large community", "Flexible and scalable"],
      cons: ["Learning curve for beginners", "Requires good architecture planning"],
      estimatedTime: "3-6 months",
      difficulty: "Intermediate",
      youtubeUrl: "https://www.youtube.com/watch?v=7CqJlxBYj-M"
    },
    "mobile-app": {
      name: "React Native + Firebase",
      description: "Cross-platform mobile development with real-time backend",
      technologies: ["React Native", "Firebase", "Redux", "Expo"],
      pros: ["Cross-platform", "Real-time features", "Quick development"],
      cons: ["Platform-specific limitations", "Vendor lock-in"],
      estimatedTime: "2-4 months",
      difficulty: "Intermediate",
      youtubeUrl: "https://www.youtube.com/watch?v=0-S5a0eXPoc"
    },
    "desktop-app": {
      name: "Electron + React",
      description: "Cross-platform desktop applications using web technologies",
      technologies: ["Electron", "React", "Node.js", "SQLite"],
      pros: ["Cross-platform", "Web technology familiarity", "Rich ecosystem"],
      cons: ["Resource intensive", "Security considerations"],
      estimatedTime: "4-8 months",
      difficulty: "Advanced",
      youtubeUrl: "https://www.youtube.com/watch?v=3yqDxhR2XxE"
    },
    api: {
      name: "Node.js + Express + PostgreSQL",
      description: "Robust and scalable API backend with relational database",
      technologies: ["Node.js", "Express.js", "PostgreSQL", "JWT"],
      pros: ["High performance", "Scalable", "Strong typing with TypeScript"],
      cons: ["Requires database knowledge", "Complex deployment"],
      estimatedTime: "2-3 months",
      difficulty: "Intermediate",
      youtubeUrl: "https://www.youtube.com/watch?v=l8WPWK9mS5M"
    },
    ecommerce: {
      name: "Next.js + Stripe + Supabase",
      description: "Modern e-commerce platform with payment processing",
      technologies: ["Next.js", "Stripe", "Supabase", "Tailwind CSS"],
      pros: ["SEO friendly", "Payment integration", "Real-time features"],
      cons: ["Complex payment flows", "Security requirements"],
      estimatedTime: "4-6 months",
      difficulty: "Advanced",
      youtubeUrl: "https://www.youtube.com/watch?v=5nCyC6lxhF4"
    },
    cms: {
      name: "Strapi + Next.js",
      description: "Headless CMS with modern frontend framework",
      technologies: ["Strapi", "Next.js", "PostgreSQL", "GraphQL"],
      pros: ["Flexible content management", "API-first approach", "Developer friendly"],
      cons: ["Learning curve", "Hosting complexity"],
      estimatedTime: "3-5 months",
      difficulty: "Intermediate",
      youtubeUrl: "https://www.youtube.com/watch?v=1rC5WWzP9yU"
    }
  }

  return recommendations[projectData.projectType] || recommendations["web-app"]
}

function displayRecommendation(recommendation) {
  const resultDiv = document.getElementById("recommendationResult")

  const html = `
        <div class="result-header">
            <div class="result-icon">
                <i class="fas fa-lightbulb"></i>
            </div>
            <div class="result-info">
                <h3>${recommendation.name}</h3>
                <p>${recommendation.description}</p>
            </div>
        </div>

        <div class="tech-stack">
            ${recommendation.technologies.map((tech) => `<span class="tech-tag">${tech}</span>`).join("")}
        </div>

        <div class="recommendation-details">
            <div class="detail-grid">
                <div class="detail-item">
                    <h4><i class="fas fa-clock"></i> Estimated Time</h4>
                    <p>${recommendation.estimatedTime}</p>
                </div>
                <div class="detail-item">
                    <h4><i class="fas fa-chart-bar"></i> Difficulty</h4>
                    <p>${recommendation.difficulty}</p>
                </div>
            </div>

            <div class="pros-cons">
                <div class="pros">
                    <h4><i class="fas fa-thumbs-up"></i> Pros</h4>
                    <ul>
                        ${recommendation.pros.map((pro) => `<li>${pro}</li>`).join("")}
                    </ul>
                </div>
                <div class="cons">
                    <h4><i class="fas fa-thumbs-down"></i> Cons</h4>
                    <ul>
                        ${recommendation.cons.map((con) => `<li>${con}</li>`).join("")}
                    </ul>
                </div>
            </div>
        </div>

        <div class="result-actions">
            <a class="btn btn-primary" href="${recommendation.youtubeUrl}" target="_blank">
                <i class="fab fa-youtube"></i> Watch Tutorial
            </a>
            <button class="btn btn-outline" onclick="saveRecommendation()">
                <i class="fas fa-bookmark"></i> Save Recommendation
            </button>
        </div>
     `

  resultDiv.innerHTML = html
  resultDiv.style.display = "block"

  // Scroll to result
  resultDiv.scrollIntoView({ behavior: "smooth" })
}

function saveToHistory(projectData, recommendation) {
  const currentUser = getCurrentUser()
  let history = JSON.parse(localStorage.getItem(`techstack_history_${currentUser.id}`) || "[]")

  const historyItem = {
    id: Date.now().toString(),
    projectData,
    recommendation,
    createdAt: new Date().toISOString(),
  }

  history.unshift(historyItem)

  // Keep only last 50 items
  if (history.length > 50) {
    history = history.slice(0, 50)
  }

  localStorage.setItem(`techstack_history_${currentUser.id}`, JSON.stringify(history))

  // Reload history if we're on that section
  if (document.getElementById("history").classList.contains("active")) {
    loadHistory()
  }
}

function loadHistory() {
  const currentUser = getCurrentUser()
  const history = JSON.parse(localStorage.getItem(`techstack_history_${currentUser.id}`) || "[]")
  const historyList = document.getElementById("historyList")

  if (!historyList) return

  if (history.length === 0) {
    historyList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-history"></i>
                <h3>No History Yet</h3>
                <p>Your recommendation history will appear here once you start generating recommendations.</p>
            </div>
        `
    return
  }

  const html = history
    .map(
      (item) => `
        <div class="history-item">
            <div class="history-info">
                <h4>${item.recommendation.name}</h4>
                <p>${item.projectData.projectType} • ${item.projectData.projectSize} • ${item.projectData.timeline}</p>
            </div>
            <div class="history-date">
                ${new Date(item.createdAt).toLocaleDateString()}
            </div>
        </div>
    `,
    )
    .join("")

  historyList.innerHTML = html
}

function handleCommentSubmit(e) {
  e.preventDefault()

  const formData = new FormData(this)
  const commentData = {
    title: formData.get("commentTitle"),
    text: formData.get("commentText"),
    rating: formData.get("rating"),
  }

  if (!commentData.title || !commentData.text || !commentData.rating) {
    alert("Please fill in all fields and select a rating.")
    return
  }

  const currentUser = getCurrentUser()
  const comment = {
    id: Date.now().toString(),
    userId: currentUser.id,
    userName: currentUser.fullName,
    userAvatar: currentUser.avatar,
    title: commentData.title,
    text: commentData.text,
    rating: Number.parseInt(commentData.rating),
    createdAt: new Date().toISOString(),
  }

  // Save comment
  const comments = JSON.parse(localStorage.getItem("techstack_comments") || "[]")
  comments.unshift(comment)
  localStorage.setItem("techstack_comments", JSON.stringify(comments))

  // Update user stats
  updateUserStats("comments")

  // Reset form
  this.reset()

  // Reload comments
  loadComments()

  alert("Thank you for your feedback!")
}

function loadComments() {
  const comments = JSON.parse(localStorage.getItem("techstack_comments") || "[]")
  const commentsList = document.getElementById("commentsList")

  if (!commentsList) return

  if (comments.length === 0) {
    commentsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-comments"></i>
                <h3>No Comments Yet</h3>
                <p>Be the first to share your experience with the community!</p>
            </div>
        `
    return
  }

  const html = comments
    .map(
      (comment) => `
        <div class="comment-item">
            <div class="comment-header">
                <div class="comment-author">
                    <div class="comment-avatar">
                        ${
                          comment.userAvatar
                            ? `<img src="${comment.userAvatar}" alt="${comment.userName}">`
                            : comment.userName.charAt(0).toUpperCase()
                        }
                    </div>
                    <div class="comment-info">
                        <h5>${comment.userName}</h5>
                        <div class="comment-rating">
                            ${Array.from(
                              { length: 5 },
                              (_, i) => `<i class="fas fa-star${i < comment.rating ? "" : " opacity-25"}"></i>`,
                            ).join("")}
                        </div>
                    </div>
                </div>
                <div class="comment-date">
                    ${new Date(comment.createdAt).toLocaleDateString()}
                </div>
            </div>
            <h4>${comment.title}</h4>
            <div class="comment-content">
                ${comment.text}
            </div>
        </div>
    `,
    )
    .join("")

  commentsList.innerHTML = html
}

function updateUserStats(type) {
  const currentUser = getCurrentUser()
  if (!currentUser.stats) {
    currentUser.stats = { recommendations: 0, comments: 0, downloads: 0 }
  }

  currentUser.stats[type]++

  // Update in localStorage
  localStorage.setItem("techstack_current_user", JSON.stringify(currentUser))

  // Update in users array
  const users = JSON.parse(localStorage.getItem("techstack_users") || "[]")
  const userIndex = users.findIndex((u) => u.id === currentUser.id)
  if (userIndex !== -1) {
    users[userIndex] = currentUser
    localStorage.setItem("techstack_users", JSON.stringify(users))
  }

  // Update display
  loadUserData()
}

function viewStackDetails(stackName) {
  const stackDetails = {
    mean: {
      name: "MEAN Stack",
      description: "MongoDB, Express.js, Angular, Node.js - A full-stack JavaScript solution",
      detailedInfo: "The MEAN stack is a popular choice for building dynamic web applications...",
      useCases: ["Single Page Applications", "Real-time Applications", "RESTful APIs"],
      companies: ["Netflix", "WhatsApp", "Upwork"],
      youtubeUrl: "https://www.youtube.com/watch?v=1tRLveSyNz8"
    },
    mern: {
      name: "MERN Stack",
      description: "MongoDB, Express.js, React, Node.js - Modern web development stack",
      detailedInfo: "The MERN stack combines the power of React for frontend development...",
      useCases: ["Social Media Apps", "E-commerce Platforms", "Content Management"],
      companies: ["Facebook", "Instagram", "Airbnb"],
      youtubeUrl: "https://www.youtube.com/watch?v=7CqJlxBYj-M"
    },
    lamp: {
      name: "LAMP Stack",
      description: "Linux, Apache, MySQL, PHP - Traditional web development stack",
      detailedInfo: "LAMP has been the backbone of web development for decades...",
      useCases: ["Content Websites", "Blogs", "Small to Medium Web Apps"],
      companies: ["WordPress", "Wikipedia", "Tumblr"],
      youtubeUrl: "https://www.youtube.com/watch?v=Uelx0bN8VqI"
    }
  }

  const stack = stackDetails[stackName]
  if (stack) {
    alert(
      `${stack.name}\n\n${stack.description}\n\nUse Cases:\n${stack.useCases.join(", ")}\n\nUsed by: ${stack.companies.join(", ")}\n\nWatch Tutorial: ${stack.youtubeUrl}`
    )
  }
}

function downloadVideo(stackName) {
  const currentUser = getCurrentUser()
  updateUserStats("downloads")

// Updated with publicly accessible real video download links (replace with your own if needed)
  const videoUrls = {
     mean: "https://archive.org/download/mean-stack-tutorial/mean-stack-tutorial.mp4",
  mern: "https://archive.org/download/mern-stack-tutorial/mern-stack-tutorial.mp4",
  lamp: "https://archive.org/download/lamp-stack-tutorial/lamp-stack-tutorial.mp4"
  }

  const url = videoUrls[stackName.toLowerCase()]
  if (url) {
    const link = document.createElement("a")
    link.href = url
    link.download = `${stackName}-tutorial.mp4`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } else {
    alert("Video not available for this stack.")
  }
} 

//  Ensure this runs on page load
if (document.readyState !== 'loading') {
  fetchData()
} else {
  document.addEventListener('DOMContentLoaded', fetchData)
} 

function saveRecommendation() {
  alert("Recommendation saved to your profile!")
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.setItem("techstack_current_user", JSON.stringify(null))
    window.location.href = "index.html"
  }
}

// Add CSS for empty states and additional styling
const additionalCSS = `
.empty-state {
    text-align: center;
    padding: 3rem;
    color: var(--text-muted);
}

.empty-state i {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
}

.empty-state h3 {
    margin-bottom: 0.5rem;
    color: var(--dark-color);
}

.detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 1.5rem 0;
}

.detail-item {
    padding: 1rem;
    background-color: var(--light-color);
    border-radius: var(--border-radius);
}

.detail-item h4 {
    color: var(--dark-color);
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.detail-item i {
    color: var(--primary-color);
}

.pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 1.5rem 0;
}

.pros h4, .cons h4 {
    color: var(--dark-color);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.pros h4 i {
    color: var(--success-color);
}

.cons h4 i {
    color: var(--warning-color);
}

.pros ul, .cons ul {
    list-style: none;
    padding: 0;
}

.pros li, .cons li {
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border-color);
}

.pros li:last-child, .cons li:last-child {
    border-bottom: none;
}

.opacity-25 {
    opacity: 0.25;
}

@media (max-width: 768px) {
    .detail-grid,
    .pros-cons {
        grid-template-columns: 1fr;
    }
}
`

// Inject additional CSS
const style = document.createElement("style")
style.textContent = additionalCSS
document.head.appendChild(style)
