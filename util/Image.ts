export function isBase64(str: string) {
  return /^data:image\/[a-zA-Z]+;base64,/.test(str)
}

// Helper function to convert file to Base64
export const convertFileToBase64 = (
  file: File
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      resolve(reader.result) // Return Base64 string
    }
    reader.onerror = reject
  })
}

export const isUrl = (str: string): boolean => {
  // Check if the string is a data URL
  if (str.startsWith('data:')) {
    return false // Return false for data URLs
  }

  try {
    // Create a URL object. If it throws, the string is not a valid URL.
    const url = new URL(str)
    // Check if the URL has a protocol and hostname
    return !!(url.protocol && url.hostname)
  } catch (_) {
    // If an error is thrown, it's not a valid URL
    return false
  }
}
