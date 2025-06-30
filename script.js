
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Supabase configuration
const supabaseUrl = 'https://vaazawhbtiiuustltscf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhYXphd2hidGlpdXVzdGx0c2NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyMjkwNzQsImV4cCI6MjA2NjgwNTA3NH0.BwS5hUmPaRGraHeKcCvLMpd4mH1PBe7hljpSwVBo-aY'
const supabase = createClient(supabaseUrl, supabaseKey)

// Wait for DOM to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Toggle forms with smooth animations - only if elements exist
  const showLoginBtn = document.getElementById('show-login')
  const showSignupBtn = document.getElementById('show-signup')

  if (showLoginBtn) {
    showLoginBtn.addEventListener('click', (e) => {
      e.preventDefault()
      const signupSection = document.getElementById('signup-section')
      const loginSection = document.getElementById('login-section')

      if (signupSection && loginSection) {
        signupSection.classList.remove('active')
        setTimeout(() => {
          signupSection.style.display = 'none'
          loginSection.style.display = 'block'
          setTimeout(() => loginSection.classList.add('active'), 50)
        }, 300)
      }
    })
  }

  if (showSignupBtn) {
    showSignupBtn.addEventListener('click', (e) => {
      e.preventDefault()
      const signupSection = document.getElementById('signup-section')
      const loginSection = document.getElementById('login-section')

      if (signupSection && loginSection) {
        loginSection.classList.remove('active')
        setTimeout(() => {
          loginSection.style.display = 'none'
          signupSection.style.display = 'block'
          setTimeout(() => signupSection.classList.add('active'), 50)
        }, 300)
      }
    })
  }

  // Sign Up Handler with success prompt and login transition
  const signupBtn = document.getElementById('signup-btn')
  if (signupBtn) {
    signupBtn.addEventListener('click', async (e) => {
      e.preventDefault()
      const emailField = document.getElementById('signup-email')
      const passwordField = document.getElementById('signup-password')
      
      if (!emailField || !passwordField) {
        console.error('Signup form fields not found')
        return
      }

      const email = emailField.value
      const password = passwordField.value

      // Basic validation
      if (!email || !password) {
        alert('❌ Please fill in all fields')
        return
      }

      // Add loading state
      const button = e.target
      const originalText = button.innerHTML
      button.innerHTML = '<span>Joining...</span><i class="fas fa-spinner fa-spin"></i>'
      button.disabled = true

      // Simulate signup process
      setTimeout(() => {
        // Show success modal
        showEnhancedSuccessModal(email)

        // Reset button
        button.innerHTML = originalText
        button.disabled = false
      }, 1500)
    })
  }

  // Login Handler (Symbolic - also goes to dashboard)
  const loginBtn = document.getElementById('login-btn')
  if (loginBtn) {
    loginBtn.addEventListener('click', async (e) => {
      e.preventDefault()
      const emailField = document.getElementById('login-email')
      const passwordField = document.getElementById('login-password')
      
      if (!emailField || !passwordField) {
        console.error('Login form fields not found')
        return
      }

      const email = emailField.value
      const password = passwordField.value

      // Basic validation
      if (!email || !password) {
        alert('❌ Please fill in all fields')
        return
      }

      // Add loading state
      const button = e.target
      const originalText = button.innerHTML
      button.innerHTML = '<span>Signing in...</span><i class="fas fa-spinner fa-spin"></i>'
      button.disabled = true

      // Simulate loading and redirect
      setTimeout(() => {
        window.location.href = 'dashboard.html'
      }, 1000)
    })
  }

  function showEnhancedSuccessModal(email) {
    // Create modal overlay with enhanced design
    const modalOverlay = document.createElement('div')
    modalOverlay.className = 'modal-overlay'
    modalOverlay.innerHTML = `
      <div class="success-modal">
        <div class="celebration-animation">
          ${createConfettiElements()}
        </div>
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h2>🎉 Welcome to PeerConnect!</h2>
        <p>Your account has been created successfully!</p>
        <div class="success-details">
          <div class="email-confirmation">
            <i class="fas fa-envelope-check"></i>
            <p><strong>Account Email:</strong> ${email}</p>
          </div>
          <div class="community-welcome">
            <i class="fas fa-users"></i>
            <p>You're now part of our decentralized STEM tutoring community!</p>
          </div>
          <div class="next-steps">
            <i class="fas fa-rocket"></i>
            <p>Ready to connect with fellow students and tutors?</p>
          </div>
        </div>
        <div class="modal-actions">
          <button id="proceed-login" class="success-btn primary">
            <span>Continue to Sign In</span>
            <i class="fas fa-arrow-right"></i>
          </button>
          <button id="view-dashboard" class="success-btn secondary">
            <span>View Dashboard</span>
            <i class="fas fa-tachometer-alt"></i>
          </button>
          <button id="login-redirect" class="success-btn delayed-btn" style="display: none;">
            <span>Go to Login Page</span>
            <i class="fas fa-sign-in-alt"></i>
          </button>
        </div>
      </div>
    `

    document.body.appendChild(modalOverlay)

    // Enhanced animation sequence with professional timing
    requestAnimationFrame(() => {
      modalOverlay.classList.add('active')
    })

    // Trigger confetti with delay for dramatic effect
    setTimeout(() => {
      startConfettiAnimation(modalOverlay)
    }, 600)

    // Handle proceed to login with enhanced transition
    const proceedBtn = modalOverlay.querySelector('#proceed-login')
    const dashboardBtn = modalOverlay.querySelector('#view-dashboard')
    const loginRedirectBtn = modalOverlay.querySelector('#login-redirect')

    if (proceedBtn) {
      proceedBtn.addEventListener('click', () => {
        closeModalWithAnimation(modalOverlay, () => transitionToLoginWithWelcome(email))
      })
    }

    if (dashboardBtn) {
      dashboardBtn.addEventListener('click', () => {
        closeModalWithAnimation(modalOverlay, () => {
          window.location.href = 'dashboard.html'
        })
      })
    }

    // Add delayed appearance and functionality for login redirect button
    if (loginRedirectBtn) {
      // Set initial styles and show button after delay
      loginRedirectBtn.style.opacity = '0'
      loginRedirectBtn.style.transform = 'translateY(20px)'
      loginRedirectBtn.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      
      // Show button after 1 second with smooth animation
      setTimeout(() => {
        loginRedirectBtn.style.display = 'flex'
        setTimeout(() => {
          loginRedirectBtn.style.opacity = '1'
          loginRedirectBtn.style.transform = 'translateY(0)'
        }, 50)
      }, 1000)

      loginRedirectBtn.addEventListener('click', () => {
        // Prevent multiple clicks
        if (loginRedirectBtn.disabled) return
        
        // Add loading state
        loginRedirectBtn.innerHTML = '<span>Redirecting...</span><i class="fas fa-spinner fa-spin"></i>'
        loginRedirectBtn.disabled = true
        
        closeModalWithAnimation(modalOverlay, () => {
          setTimeout(() => {
            window.location.href = 'login.html'
          }, 500)
        })
      })
    }
  }

  function createConfettiElements() {
    // Professional gradient color palette with better color harmony
    const colorPalettes = {
      premium: ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'],
      warm: ['#fa709a', '#fee140', '#ff9a9e', '#fecfef', '#ffecd2', '#fcb69f'],
      cool: ['#a8edea', '#fed6e3', '#d299c2', '#fef9d7', '#667eea', '#764ba2'],
      ocean: ['#2193b0', '#6dd5ed', '#00c6ff', '#0072ff', '#74b9ff', '#0984e3'],
      sunset: ['#ff6b6b', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3']
    }
    
    const paletteKeys = Object.keys(colorPalettes)
    const selectedPalette = colorPalettes[paletteKeys[Math.floor(Math.random() * paletteKeys.length)]]
    
    const shapes = ['circle', 'square', 'triangle', 'diamond', 'star']
    const sizes = ['small', 'medium', 'large']
    let confettiHTML = ''
    
    // Increased count for more premium feel
    for (let i = 0; i < 75; i++) {
      const color = selectedPalette[Math.floor(Math.random() * selectedPalette.length)]
      const shape = shapes[Math.floor(Math.random() * shapes.length)]
      const size = sizes[Math.floor(Math.random() * sizes.length)]
      const delay = Math.random() * 4
      const duration = 2.5 + Math.random() * 3
      const startX = Math.random() * 100
      const endX = startX + (Math.random() - 0.5) * 120
      const rotation = Math.random() * 1080
      const opacity = 0.7 + Math.random() * 0.3
      const scale = 0.5 + Math.random() * 1.5
      
      confettiHTML += `
        <div class="confetti confetti-${shape} confetti-${size}" 
             style="--color: ${color}; 
                    --delay: ${delay}s; 
                    --duration: ${duration}s;
                    --start-x: ${startX}%;
                    --end-x: ${endX}%;
                    --rotation: ${rotation}deg;
                    --opacity: ${opacity};
                    --scale: ${scale};
                    left: ${startX}%;">
        </div>
      `
    }
    
    return confettiHTML
  }

  function startConfettiAnimation(modalOverlay) {
    const celebrationEl = modalOverlay.querySelector('.celebration-animation')
    if (celebrationEl) {
      // Initial wave
      celebrationEl.classList.add('active')
      
      // Staggered burst effects for more dynamic animation
      setTimeout(() => {
        celebrationEl.classList.add('burst')
      }, 300)
      
      // Secondary wave
      setTimeout(() => {
        celebrationEl.classList.add('secondary-burst')
      }, 800)
      
      // Final sparkle effect
      setTimeout(() => {
        celebrationEl.classList.add('sparkle')
      }, 1500)
      
      // Gentle fade out
      setTimeout(() => {
        celebrationEl.classList.add('fade-out')
      }, 3500)
    }
  }

  function closeModalWithAnimation(modalOverlay, callback) {
    const modal = modalOverlay.querySelector('.success-modal')
    
    // Stop confetti
    const celebration = modalOverlay.querySelector('.celebration-animation')
    if (celebration) {
      celebration.classList.remove('active', 'burst')
    }
    
    // Smooth close animation
    modal.style.transform = 'scale(0.8) translateY(-50px)'
    modal.style.opacity = '0'
    modalOverlay.style.opacity = '0'
    
    setTimeout(() => {
      if (modalOverlay.parentNode) {
        document.body.removeChild(modalOverlay)
      }
      if (callback) callback()
    }, 400)
  }

  // Transition to Login Function
  function transitionToLogin(email) {
    const signupSection = document.getElementById('signup-section')
    const loginSection = document.getElementById('login-section')

    if (signupSection && loginSection) {
      // Smooth transition
      signupSection.classList.add('slide-out-left')

      setTimeout(() => {
        signupSection.classList.remove('active', 'slide-out-left')
        signupSection.style.display = 'none'

        loginSection.style.display = 'block'
        loginSection.classList.add('slide-in-right')

        setTimeout(() => {
          loginSection.classList.add('active')
          loginSection.classList.remove('slide-in-right')

          // Pre-fill email
          const emailField = document.getElementById('login-email')
          const passwordField = document.getElementById('login-password')
          if (emailField) emailField.value = email
          if (passwordField) passwordField.focus()
        }, 100)
      }, 300)
    }
  }

  // Enhanced Transition to Login Function
  function transitionToLoginWithWelcome(email) {
    transitionToLogin(email)
    
    // Show welcome tooltip after transition
    setTimeout(() => {
      showWelcomeTooltip()
    }, 1000)
  }

  // Welcome Tooltip Function
  function showWelcomeTooltip() {
    const tooltip = document.createElement('div')
    tooltip.className = 'welcome-tooltip'
    tooltip.innerHTML = `
      <div class="tooltip-content">
        <i class="fas fa-info-circle"></i>
        <span>You can now sign in with your new account!</span>
      </div>
    `
    tooltip.style.cssText = `
      position: fixed;
      top: 120px;
      right: 20px;
      background: var(--success);
      color: white;
      padding: 15px 20px;
      border-radius: 10px;
      z-index: 1001;
      transform: translateX(400px);
      transition: transform 0.3s ease;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `

    document.body.appendChild(tooltip)

    setTimeout(() => {
      tooltip.style.transform = 'translateX(0)'
    }, 100)

    setTimeout(() => {
      tooltip.style.transform = 'translateX(400px)'
      setTimeout(() => {
        if (tooltip.parentNode) {
          document.body.removeChild(tooltip)
        }
      }, 300)
    }, 3000)
  }
})
