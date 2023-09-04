//get feet from total height
export const getFeet = (totalHeight) => {
const heightInFeet = totalHeight;
// Calculate feet and inches
const feet = Math.floor(heightInFeet); // Get the whole feet part (6)
return feet;
}

//get inches from total height
export const getInches = (totalHeight) => {
    const heightInFeet = totalHeight;
    // Calculate feet and inches
    const feet = Math.floor(heightInFeet); // Get the whole feet part (6)
    const inches = Math.round((heightInFeet - feet) * 12); // Get the remaining inches part (0.7 * 12 = 8.4 rounded to 8)
    return inches;
    }