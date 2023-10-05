//convert date string into yyyy-mm-dd format
export const yyyyMmDdFormat = (inputDate) => {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${day}-${month}`;
};

//convert date string into dd/mm/yyyy formate
export const ddmmyyyyFormat = (inputDate) => {
    const parts = inputDate.split('-');
 
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${year}-${month}-${day}`;
  
};
