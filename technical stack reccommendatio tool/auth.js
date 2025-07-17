// Authentication JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Initialize authentication system
  initializeAuth()

  // Check if user is already logged in
  checkAuthStatus()
})

function initializeAuth() {
  // Initialize users storage if it doesn't exist
  if (!localStorage.getItem("techstack_users")) {
    localStorage.setItem("techstack_users", JSON.stringify([]))
  }

  // Initialize current user session
  if (!localStorage.getItem("techstack_current_user")) {
    localStorage.setItem("techstack_current_user", JSON.stringify(null))
  }
}

function checkAuthStatus() {
  const currentUser = getCurrentUser()
  if (
    currentUser &&
    (window.location.pathname.includes("login.html") || window.location.pathname.includes("signup.html"))
  ) {
    window.location.href = "dashboard.html"
  }
}

// Password strength checker
function checkPasswordStrength(password) {
  let strength = 0
  const feedback = []

  if (password.length >= 8) strength += 1
  else feedback.push("At least 8 characters")

  if (/[a-z]/.test(password)) strength += 1
  else feedback.push("Lowercase letter")

  if (/[A-Z]/.test(password)) strength += 1
  else feedback.push("Uppercase letter")

  if (/[0-9]/.test(password)) strength += 1
  else feedback.push("Number")

  if (/[^A-Za-z0-9]/.test(password)) strength += 1
  else feedback.push("Special character")

  return { strength, feedback }
}

// Update password strength indicator
function updatePasswordStrength(passwordInput) {
  const password = passwordInput.value
  const strengthBar = passwordInput.closest(".form-group").querySelector(".strength-fill")
  const strengthText = passwordInput.closest(".form-group").querySelector(".strength-text")

  if (!strengthBar || !strengthText) return

  const { strength, feedback } = checkPasswordStrength(password)
  const percentage = (strength / 5) * 100

  strengthBar.style.width = percentage + "%"

  if (strength <= 2) {
    strengthBar.style.backgroundColor = "#ef4444"
    strengthText.textContent = "Weak password"
    strengthText.style.color = "#ef4444"
  } else if (strength <= 3) {
    strengthBar.style.backgroundColor = "#f59e0b"
    strengthText.textContent = "Fair password"
    strengthText.style.color = "#f59e0b"
  } else if (strength <= 4) {
    strengthBar.style.backgroundColor = "#10b981"
    strengthText.textContent = "Good password"
    strengthText.style.color = "#10b981"
  } else {
    strengthBar.style.backgroundColor = "#059669"
    strengthText.textContent = "Strong password"
    strengthText.style.color = "#059669"
  }
}

// Toggle password visibility
function togglePassword(inputId) {
  const input = document.getElementById(inputId)
  const toggle = input.parentElement.querySelector(".password-toggle i")

  if (input.type === "password") {
    input.type = "text"
    toggle.classList.remove("fa-eye")
    toggle.classList.add("fa-eye-slash")
  } else {
    input.type = "password"
    toggle.classList.remove("fa-eye-slash")
    toggle.classList.add("fa-eye")
  }
}

// Show modal message
function showModal(type, title, message) {
  const modal = document.getElementById("messageModal")
  const modalIcon = modal.querySelector(".modal-icon")
  const modalTitle = modal.querySelector(".modal-title")
  const modalMessage = modal.querySelector(".modal-message")

  // Set icon based on type
  modalIcon.className = "modal-icon fas "
  switch (type) {
    case "success":
      modalIcon.classList.add("fa-check-circle")
      modalIcon.style.color = "#10b981"
      break
    case "error":
      modalIcon.classList.add("fa-times-circle")
      modalIcon.style.color = "#ef4444"
      break
    case "warning":
      modalIcon.classList.add("fa-exclamation-triangle")
      modalIcon.style.color = "#f59e0b"
      break
    default:
      modalIcon.classList.add("fa-info-circle")
      modalIcon.style.color = "#3b82f6"
  }

  modalTitle.textContent = title
  modalMessage.textContent = message
  modal.style.display = "block"

  // Close modal when clicking X or outside
  const closeBtn = modal.querySelector(".close")
  closeBtn.onclick = () => (modal.style.display = "none")

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none"
    }
  }
}

// Get all users from localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem("techstack_users") || "[]")
}

// Save users to localStorage
function saveUsers(users) {
  localStorage.setItem("techstack_users", JSON.stringify(users))
}

// Get current user
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("techstack_current_user"))
}

// Set current user
function setCurrentUser(user) {
  localStorage.setItem("techstack_current_user", JSON.stringify(user))
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Check if username exists
function usernameExists(username, excludeEmail = null) {
  const users = getUsers()
  return users.some((user) => user.username === username && user.email !== excludeEmail)
}

// Check if email exists
function emailExists(email) {
  const users = getUsers()
  return users.some((user) => user.email === email)
}

// Hash password (simple implementation for demo)
function hashPassword(password) {
  // In a real application, use a proper hashing library
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return hash.toString()
}

// Signup form handler
if (document.getElementById("signupForm")) {
  const signupForm = document.getElementById("signupForm")
  const passwordInput = document.getElementById("password")

  // Add password strength checking
  if (passwordInput) {
    passwordInput.addEventListener("input", function () {
      updatePasswordStrength(this)
    })
  }

  signupForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const formData = new FormData(this)
    const userData = {
      fullName: formData.get("fullName").trim(),
      username: formData.get("username").trim(),
      email: formData.get("email").trim().toLowerCase(),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      role: formData.get("role"),
      experience: formData.get("experience"),
      terms: formData.get("terms"),
      newsletter: formData.get("newsletter") === "on",
    }

    // Validation
    if (
      !userData.fullName ||
      !userData.username ||
      !userData.email ||
      !userData.password ||
      !userData.role ||
      !userData.experience
    ) {
      showModal("error", "Validation Error", "Please fill in all required fields.")
      return
    }

    if (!isValidEmail(userData.email)) {
      showModal("error", "Invalid Email", "Please enter a valid email address.")
      return
    }

    if (userData.password !== userData.confirmPassword) {
      showModal("error", "Password Mismatch", "Passwords do not match.")
      return
    }

    const { strength } = checkPasswordStrength(userData.password)
    if (strength < 3) {
      showModal("error", "Weak Password", "Please choose a stronger password.")
      return
    }

    if (!userData.terms) {
      showModal("error", "Terms Required", "Please accept the Terms of Service and Privacy Policy.")
      return
    }

    if (emailExists(userData.email)) {
      showModal("error", "Email Exists", "An account with this email already exists.")
      return
    }

    if (usernameExists(userData.username)) {
      showModal("error", "Username Taken", "This username is already taken.")
      return
    }

    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]')
    const btnText = submitBtn.querySelector(".btn-text")
    const btnLoading = submitBtn.querySelector(".btn-loading")

    btnText.style.opacity = "0"
    btnLoading.style.display = "inline-block"
    submitBtn.disabled = true

    // Simulate API call
    setTimeout(() => {
      try {
        // Create new user
        const newUser = {
          id: Date.now().toString(),
          fullName: userData.fullName,
          username: userData.username,
          email: userData.email,
          password: hashPassword(userData.password),
          role: userData.role,
          experience: userData.experience,
          newsletter: userData.newsletter,
          createdAt: new Date().toISOString(),
          avatar: null,
          bio: "",
          phone: "",
          stats: {
            recommendations: 0,
            comments: 0,
            downloads: 0,
          },
        }

        // Save user
        const users = getUsers()
        users.push(newUser)
        saveUsers(users)

        // Set as current user
        setCurrentUser(newUser)

        showModal(
          "success",
          "Account Created!",
          "Your account has been created successfully. Redirecting to dashboard...",
        )

        setTimeout(() => {
          window.location.href = "dashboard.html"
        }, 2000)
      } catch (error) {
        showModal("error", "Registration Failed", "An error occurred during registration. Please try again.")

        // Reset button state
        btnText.style.opacity = "1"
        btnLoading.style.display = "none"
        submitBtn.disabled = false
      }
    }, 1500)
  })
}

// Login form handler
if (document.getElementById("loginForm")) {
  const loginForm = document.getElementById("loginForm")

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const formData = new FormData(this)
    const loginData = {
      emailOrUsername: formData.get("loginEmail").trim().toLowerCase(),
      password: formData.get("loginPassword"),
      rememberMe: formData.get("rememberMe") === "on",
    }

    // Validation
    if (!loginData.emailOrUsername || !loginData.password) {
      showModal("error", "Missing Information", "Please enter both email/username and password.")
      return
    }

    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]')
    const btnText = submitBtn.querySelector(".btn-text")
    const btnLoading = submitBtn.querySelector(".btn-loading")

    btnText.style.opacity = "0"
    btnLoading.style.display = "inline-block"
    submitBtn.disabled = true

    // Simulate API call
    setTimeout(() => {
      try {
        const users = getUsers()
        const hashedPassword = hashPassword(loginData.password)

        // Find user by email or username
        const user = users.find(
          (u) =>
            (u.email === loginData.emailOrUsername || u.username === loginData.emailOrUsername) &&
            u.password === hashedPassword,
        )

        if (user) {
          // Set as current user
          setCurrentUser(user)

          showModal("success", "Login Successful!", `Welcome back, ${user.fullName}! Redirecting to dashboard...`)

          setTimeout(() => {
            window.location.href = "dashboard.html"
          }, 1500)
        } else {
          showModal("error", "Login Failed", "Invalid email/username or password.")

          // Reset button state
          btnText.style.opacity = "1"
          btnLoading.style.display = "none"
          submitBtn.disabled = false
        }
      } catch (error) {
        showModal("error", "Login Error", "An error occurred during login. Please try again.")

        // Reset button state
        btnText.style.opacity = "1"
        btnLoading.style.display = "none"
        submitBtn.disabled = false
      }
    }, 1000)
  })
}
