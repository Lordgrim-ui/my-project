// Profile page JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Check authentication
  const currentUser = getCurrentUser()
  if (!currentUser) {
    window.location.href = "login.html"
    return
  }

  // Initialize profile page
  initializeProfile()
  loadProfileData()
  setupProfileEventListeners()
})

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("techstack_current_user"))
}

function initializeProfile() {
  const currentUser = getCurrentUser()

  // Update user display name and avatar in header
  const userDisplayName = document.getElementById("userDisplayName")
  const userAvatar = document.getElementById("userAvatar")

  if (userDisplayName) {
    userDisplayName.textContent = currentUser.fullName
  }

  if (userAvatar && currentUser.avatar) {
    userAvatar.src = currentUser.avatar
  }
}

function loadProfileData() {
  const currentUser = getCurrentUser()

  // Load profile form data
  document.getElementById("profileFullName").value = currentUser.fullName || ""
  document.getElementById("profileUsername").value = currentUser.username || ""
  document.getElementById("profileEmail").value = currentUser.email || ""
  document.getElementById("profilePhone").value = currentUser.phone || ""
  document.getElementById("profileRole").value = currentUser.role || ""
  document.getElementById("profileExperience").value = currentUser.experience || ""
  document.getElementById("profileBio").value = currentUser.bio || ""

  // Load profile avatar
  const profileAvatar = document.getElementById("profileAvatar")
  if (profileAvatar && currentUser.avatar) {
    profileAvatar.src = currentUser.avatar
  }

  // Load statistics
  const stats = currentUser.stats || { recommendations: 0, comments: 0, downloads: 0 }

  document.getElementById("totalRecommendations").textContent = stats.recommendations
  document.getElementById("totalComments").textContent = stats.comments
  document.getElementById("totalDownloads").textContent = stats.downloads

  // Member since date
  const memberSince = document.getElementById("memberSince")
  if (memberSince && currentUser.createdAt) {
    const date = new Date(currentUser.createdAt)
    memberSince.textContent = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    })
  }
}

function setupProfileEventListeners() {
  // Avatar upload
  const avatarInput = document.getElementById("avatarInput")
  if (avatarInput) {
    avatarInput.addEventListener("change", handleAvatarUpload)
  }

  // Profile form submission
  const profileForm = document.getElementById("profileForm")
  if (profileForm) {
    profileForm.addEventListener("submit", handleProfileUpdate)
  }

  // Password form submission
  const passwordForm = document.getElementById("passwordForm")
  if (passwordForm) {
    passwordForm.addEventListener("submit", handlePasswordChange)
  }

  // Password strength checking
  const newPasswordInput = document.getElementById("newPassword")
  if (newPasswordInput) {
    newPasswordInput.addEventListener("input", function () {
      updatePasswordStrength(this)
    })
  }

  // Sidebar toggle for mobile
  const sidebarToggle = document.querySelector(".sidebar-toggle")
  const sidebar = document.querySelector(".sidebar")

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active")
    })
  }
}

function handleAvatarUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  // Validate file type
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
  if (!allowedTypes.includes(file.type)) {
    alert("Please select a valid image file (JPEG, PNG, GIF, or WebP).")
    return
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert("Please select an image smaller than 5MB.")
    return
  }

  // Show loading state
  const profileAvatar = document.getElementById("profileAvatar")
  const originalSrc = profileAvatar.src
  profileAvatar.style.opacity = "0.5"

  // Read file and convert to base64
  const reader = new FileReader()
  reader.onload = (e) => {
    const base64Image = e.target.result

    // Update profile avatar display
    const userAvatar = document.getElementById("userAvatar")

    if (profileAvatar) {
      profileAvatar.src = base64Image
      profileAvatar.style.opacity = "1"
    }
    if (userAvatar) userAvatar.src = base64Image

    // Save to user data
    const currentUser = getCurrentUser()
    currentUser.avatar = base64Image
    updateUserData(currentUser)

    // Show success message
    showSuccessMessage("Profile picture updated successfully!")
  }

  reader.onerror = () => {
    profileAvatar.src = originalSrc
    profileAvatar.style.opacity = "1"
    alert("Error reading the file. Please try again.")
  }

  reader.readAsDataURL(file)
}

function showSuccessMessage(message) {
  // Create a temporary success notification
  const notification = document.createElement("div")
  notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
      z-index: 9999;
      font-weight: 600;
      animation: slideInRight 0.3s ease-out;
  `
  notification.textContent = message

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease-in"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

const notificationCSS = `
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
`

const style = document.createElement("style")
style.textContent = notificationCSS
document.head.appendChild(style)

function removeAvatar() {
  if (confirm("Are you sure you want to remove your profile picture?")) {
    const currentUser = getCurrentUser()
    currentUser.avatar = null
    updateUserData(currentUser)

    // Reset avatar displays
    const profileAvatar = document.getElementById("profileAvatar")
    const userAvatar = document.getElementById("userAvatar")

    if (profileAvatar) profileAvatar.src = "/placeholder.svg?height=120&width=120"
    if (userAvatar) userAvatar.src = "/placeholder.svg?height=40&width=40"

    alert("Profile picture removed successfully!")
  }
}

function handleProfileUpdate(event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const currentUser = getCurrentUser()

  // Get form data
  const updatedData = {
    fullName: formData.get("fullName").trim(),
    username: formData.get("username").trim(),
    email: formData.get("email").trim().toLowerCase(),
    phone: formData.get("phone").trim(),
    role: formData.get("role"),
    experience: formData.get("experience"),
    bio: formData.get("bio").trim(),
  }

  // Validation
  if (!updatedData.fullName || !updatedData.username || !updatedData.email) {
    alert("Please fill in all required fields.")
    return
  }

  if (!isValidEmail(updatedData.email)) {
    alert("Please enter a valid email address.")
    return
  }

  // Check if username is taken by another user
  if (usernameExists(updatedData.username, currentUser.email)) {
    alert("This username is already taken.")
    return
  }

  // Check if email is taken by another user
  if (updatedData.email !== currentUser.email && emailExists(updatedData.email)) {
    alert("This email is already registered.")
    return
  }

  // Show loading state
  const submitBtn = event.target.querySelector('button[type="submit"]')
  const originalText = submitBtn.innerHTML
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...'
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    try {
      // Update user data
      Object.assign(currentUser, updatedData)
      updateUserData(currentUser)

      // Update display name in header
      const userDisplayName = document.getElementById("userDisplayName")
      if (userDisplayName) {
        userDisplayName.textContent = currentUser.fullName
      }

      alert("Profile updated successfully!")
    } catch (error) {
      alert("An error occurred while updating your profile. Please try again.")
    } finally {
      // Reset button state
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }
  }, 1000)
}

function handlePasswordChange(event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const currentUser = getCurrentUser()

  const passwordData = {
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmNewPassword: formData.get("confirmNewPassword"),
  }

  // Validation
  if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmNewPassword) {
    alert("Please fill in all password fields.")
    return
  }

  // Verify current password
  const hashedCurrentPassword = hashPassword(passwordData.currentPassword)
  if (hashedCurrentPassword !== currentUser.password) {
    alert("Current password is incorrect.")
    return
  }

  // Check new password confirmation
  if (passwordData.newPassword !== passwordData.confirmNewPassword) {
    alert("New passwords do not match.")
    return
  }

  // Check password strength
  const { strength } = checkPasswordStrength(passwordData.newPassword)
  if (strength < 3) {
    alert("Please choose a stronger password.")
    return
  }

  // Show loading state
  const submitBtn = event.target.querySelector('button[type="submit"]')
  const originalText = submitBtn.innerHTML
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...'
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    try {
      // Update password
      currentUser.password = hashPassword(passwordData.newPassword)
      updateUserData(currentUser)

      // Reset form
      event.target.reset()

      alert("Password updated successfully!")
    } catch (error) {
      alert("An error occurred while updating your password. Please try again.")
    } finally {
      // Reset button state
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }
  }, 1000)
}

function updatePasswordStrength(input) {
  // Placeholder function for password strength checking
  const strength = input.value.length > 8 ? 3 : 2
  input.style.color = strength === 3 ? "green" : "red"
}

function updateUserData(user) {
  localStorage.setItem("techstack_current_user", JSON.stringify(user))
}

function isValidEmail(email) {
  // Placeholder function for email validation
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function usernameExists(username, email) {
  // Placeholder function for username existence check
  // This should be replaced with actual logic to check if username exists
  return false
}

function emailExists(email) {
  // Placeholder function for email existence check
  // This should be replaced with actual logic to check if email exists
  return false
}

function hashPassword(password) {
  // Placeholder function for password hashing
  // This should be replaced with actual password hashing logic
  return password
}

function checkPasswordStrength(password) {
  // Placeholder function for password strength checking
  const strength = password.length > 8 ? 3 : 2
  return { strength }
}
