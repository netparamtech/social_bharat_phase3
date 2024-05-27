//get feet from total height
export const getFeet = (totalHeight) => {
    const heightInFeet = parseInt(totalHeight);
    // Calculate feet and inches
    const feet = Math.floor(heightInFeet); // Get the whole feet part (6)
    return feet;
}

//get inches from total height
export const getInches = (totalHeight) => {
    console.log("total height", totalHeight)
    const heightInFeet = parseFloat(totalHeight);
    console.log("total height after", heightInFeet)
    // Calculate feet and inches
    const feet = Math.floor(heightInFeet); // Get the whole feet part (6)
    const inches = Math.round((heightInFeet - feet) * 12); // Get the remaining inches part (0.7 * 12 = 8.4 rounded to 8)
    console.log("inches", inches)
    return inches;
}
// export function getDecimalPartAsInteger(number) {
//     if (typeof number !== 'number') {
//         throw new Error('Input must be a number');
//     }

//     let decimalPart = number - Math.floor(number);
//     let decimalAsInteger = Math.round(decimalPart * 10); // Convert the decimal part to an integer

//     return decimalAsInteger;
// }

export function getDecimalPartAsInteger(totalHeight) {
    const number = parseFloat(totalHeight);
    if (typeof number !== 'number') {
        throw new Error('Input must be a number');
    }

    let decimalPart = number.toString().split('.')[1];
    if (decimalPart === undefined) {
        return 0; // No decimal part
    }

    return parseInt(decimalPart); // Convert the decimal part to an integer
}
