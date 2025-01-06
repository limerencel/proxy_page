/**
 * Validates if a string is a valid URL
 * @param url - The URL string to validate
 * @returns A validation result object containing status and error message
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateUrl(url: string): ValidationResult {
  if (!url.trim()) {
    return {
      isValid: false,
      error: "URL cannot be empty"
    };
  }

  try {
    const urlObject = new URL(url);
    // Check if protocol is http or https
    if (!['http:', 'https:'].includes(urlObject.protocol)) {
      return {
        isValid: false,
        error: "URL must start with http:// or https://"
      };
    }
    return { isValid: true };
  } catch {
    return {
      isValid: false,
      error: "Invalid URL format"
    };
  }
}