export const isEmail = (event) => {
    // Regular expression for validating email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    // Test the provided email against the regex pattern
    return emailRegex.test(event);
}