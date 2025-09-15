export const useModal = () => {
  // Modal state
  const modalState = reactive({
    show: false,
    type: 'info',
    title: '',
    message: '',
    confirmText: 'OK',
    cancelText: 'Cancel',
    showCancel: false,
    onConfirm: null,
    onClose: null
  })

  // Loading state
  const loadingState = reactive({
    show: false,
    title: 'Loading...',
    message: '',
    showProgress: false,
    progress: 0
  })

  // Modal methods
  const showModal = (options) => {
    Object.assign(modalState, {
      show: true,
      type: 'info',
      title: '',
      message: '',
      confirmText: 'OK',
      cancelText: 'Cancel',
      showCancel: false,
      onConfirm: null,
      onClose: null,
      ...options
    })
  }

  const showSuccessModal = (title, message = '', options = {}) => {
    showModal({
      type: 'success',
      title,
      message,
      confirmText: 'Great!',
      ...options
    })
  }

  const showErrorModal = (title, message = '', options = {}) => {
    showModal({
      type: 'error',
      title,
      message,
      confirmText: 'OK',
      ...options
    })
  }

  const showWarningModal = (title, message = '', options = {}) => {
    showModal({
      type: 'warning',
      title,
      message,
      confirmText: 'OK',
      ...options
    })
  }

  const showConfirmModal = (title, message = '', onConfirm = null, options = {}) => {
    showModal({
      type: 'confirm',
      title,
      message,
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      showCancel: true,
      onConfirm,
      ...options
    })
  }

  const closeModal = () => {
    if (modalState.onClose) {
      modalState.onClose()
    }
    modalState.show = false
  }

  const confirmModal = () => {
    if (modalState.onConfirm) {
      modalState.onConfirm()
    }
    if (modalState.type !== 'confirm') {
      closeModal()
    }
  }

  // Loading methods
  const showLoading = (options = {}) => {
    Object.assign(loadingState, {
      show: true,
      title: 'Loading...',
      message: '',
      showProgress: false,
      progress: 0,
      ...options
    })
  }

  const hideLoading = () => {
    loadingState.show = false
  }

  const updateLoadingProgress = (progress, message = '') => {
    loadingState.progress = Math.max(0, Math.min(100, progress))
    if (message) {
      loadingState.message = message
    }
  }

  // Preset loading states for common operations
  const showCreateLoading = (entityName = 'item') => {
    showLoading({
      title: `Creating ${entityName}...`,
      message: 'Please wait while we save your data'
    })
  }

  const showUpdateLoading = (entityName = 'item') => {
    showLoading({
      title: `Updating ${entityName}...`,
      message: 'Please wait while we save your changes'
    })
  }

  const showDeleteLoading = (entityName = 'item') => {
    showLoading({
      title: `Deleting ${entityName}...`,
      message: 'Please wait while we remove the data'
    })
  }

  const showFetchLoading = (entityName = 'data') => {
    showLoading({
      title: `Loading ${entityName}...`,
      message: 'Please wait while we fetch the latest information'
    })
  }

  // CRUD operation wrappers with automatic loading and success/error handling
  const withLoading = async (operation, loadingOptions = {}) => {
    try {
      showLoading(loadingOptions)
      const result = await operation()
      hideLoading()
      return result
    } catch (error) {
      hideLoading()
      throw error
    }
  }

  const withCRUDModal = async (operation, options = {}) => {
    const {
      loadingTitle = 'Processing...',
      loadingMessage = 'Please wait...',
      successTitle = 'Success!',
      successMessage = 'Operation completed successfully',
      errorTitle = 'Error',
      entityName = 'item'
    } = options

    try {
      showLoading({
        title: loadingTitle,
        message: loadingMessage
      })

      const result = await operation()
      
      hideLoading()
      showSuccessModal(successTitle, successMessage)
      
      return result
    } catch (error) {
      hideLoading()
      showErrorModal(errorTitle, error.message || `Failed to process ${entityName}`)
      throw error
    }
  }

  return {
    // State
    modalState: readonly(modalState),
    loadingState: readonly(loadingState),
    
    // Modal methods
    showModal,
    showSuccessModal,
    showErrorModal,
    showWarningModal,
    showConfirmModal,
    closeModal,
    confirmModal,
    
    // Loading methods
    showLoading,
    hideLoading,
    updateLoadingProgress,
    showCreateLoading,
    showUpdateLoading,
    showDeleteLoading,
    showFetchLoading,
    
    // Utility methods
    withLoading,
    withCRUDModal
  }
}