//convert date string into yyyy-mm-dd format
export const yyyyMmDdFormat = (inputDate) => {
    const originalDate = new Date(inputDate);
    originalDate.setDate(originalDate.getDate() + 1);  // Subtract one day
    const formattedStartDate = originalDate.toISOString().split('T')[0];
    return formattedStartDate;
};

//convert date string into dd/mm/yyyy formate
export const ddmmyyyyFormat = (inputDate) => {
    const parts = inputDate.split('-');
 
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${year}-${month}-${day}`;
  
};
