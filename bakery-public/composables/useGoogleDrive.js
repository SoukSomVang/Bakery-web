export const useGoogleDrive = () => {
  // Convert Google Drive sharing URLs to direct image URLs
  const convertGoogleDriveUrl = (url) => {
    if (!url) return url

    // Handle sharing URLs (view and edit) with optional query parameters
    const shareMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/)
    if (shareMatch) {
      const fileId = shareMatch[1]
      return `https://drive.google.com/uc?export=view&id=${fileId}`
    }

    // Already a direct uc URL, return as is
    return url
  }

  return {
    convertGoogleDriveUrl
  }
}