/**
 * Composable for scroll-based animations using Intersection Observer
 * Usage: const { observeElement } = useScrollAnimation()
 */
export const useScrollAnimation = () => {
  const observer = ref(null)

  /**
   * Setup Intersection Observer for scroll animations
   * @param {Object} options - Observer options
   * @param {number} options.threshold - Percentage of element visibility to trigger (0-1)
   * @param {string} options.rootMargin - Margin around root
   */
  const setupObserver = (options = {}) => {
    if (!import.meta.client) return null

    const {
      threshold = 0.1,
      rootMargin = '0px 0px -50px 0px'
    } = options

    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target

            // Add will-change for GPU acceleration before animation
            element.style.willChange = 'opacity, transform'

            // Determine animation type from data attribute or default
            const animationType = element.dataset.animation || 'fade-up'

            // Use requestAnimationFrame for smoother animations
            requestAnimationFrame(() => {
              // Remove all initial state classes
              element.classList.remove('opacity-0', 'translate-y-20', 'translate-y-10', '-translate-x-20', 'translate-x-20', 'scale-95', 'scale-90', 'rotate-3', '-rotate-3', 'blur-sm')

              // Add visible state classes based on animation type
              switch (animationType) {
                case 'fade-up':
                  element.classList.add('opacity-100', 'translate-y-0')
                  break
                case 'fade-down':
                  element.classList.add('opacity-100', 'translate-y-0')
                  break
                case 'fade-left':
                  element.classList.add('opacity-100', 'translate-x-0')
                  break
                case 'fade-right':
                  element.classList.add('opacity-100', 'translate-x-0')
                  break
                case 'zoom-in':
                  element.classList.add('opacity-100', 'scale-100')
                  break
                case 'zoom-out':
                  element.classList.add('opacity-100', 'scale-100')
                  break
                case 'rotate-in':
                  element.classList.add('opacity-100', 'rotate-0', 'scale-100')
                  break
                case 'blur-in':
                  element.classList.add('opacity-100', 'blur-none', 'scale-100')
                  break
                default:
                  element.classList.add('opacity-100', 'translate-y-0')
              }

              // Remove will-change after animation completes
              setTimeout(() => {
                element.style.willChange = 'auto'
              }, 700) // Match animation duration
            })

            // Unobserve after animation (performance optimization)
            observer.value.unobserve(entry.target)
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )

    return observer.value
  }

  /**
   * Observe a single element
   * @param {Ref} elementRef - Vue ref to the element
   */
  const observeElement = (elementRef) => {
    if (!import.meta.client) return

    if (!observer.value) {
      setupObserver()
    }

    if (elementRef.value) {
      observer.value.observe(elementRef.value)
    }
  }

  /**
   * Observe multiple elements
   * @param {Array<Ref>} elementRefs - Array of Vue refs
   */
  const observeElements = (elementRefs) => {
    if (!import.meta.client) return

    if (!observer.value) {
      setupObserver()
    }

    elementRefs.forEach((ref) => {
      if (ref.value) {
        observer.value.observe(ref.value)
      }
    })
  }

  /**
   * Auto-observe all elements with .scroll-section class
   * Call this in onMounted
   */
  const observeAllSections = () => {
    if (!import.meta.client) return

    if (!observer.value) {
      setupObserver()
    }

    // Use nextTick to ensure DOM is ready
    nextTick(() => {
      const sections = document.querySelectorAll('.scroll-section')
      sections.forEach((section) => {
        observer.value.observe(section)
      })
    })
  }

  /**
   * Cleanup observer
   */
  const cleanup = () => {
    if (observer.value) {
      observer.value.disconnect()
      observer.value = null
    }
  }

  // Cleanup on unmount
  onUnmounted(() => {
    cleanup()
  })

  return {
    setupObserver,
    observeElement,
    observeElements,
    observeAllSections,
    cleanup
  }
}
