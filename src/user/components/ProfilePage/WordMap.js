const wordMap = {
    'Father Name': 'पिता का नाम',
    'Mother Name': 'मां का नाम',
    'Manglic': 'मांगलिक',
    'Height': 'ऊचाई',
    'Package/Salary': 'पैकेज/वेतन',
    'Date Of Birth': 'जन्म तिथि',
    'Education': 'शिक्षा',
    'Job Profile': 'नौकरी की प्रोफाइल',
    'Brother Count': 'भाई की संख्या',
    'Sister Count': 'बहन की संख्या',
    'Subcast': 'उप-जाति',
    'Gender': 'लिंग',
    'Paternal Gotra': 'पितृ-गोत्र',
    'Maternal Gotra': 'मातृ-गोत्र',
    'Biodata': 'बायोडाटा',
    'Proposal Photo': 'प्रस्ताव की फोटो'
};
export const converToHindi=(inputText) => {
    for (const [englishWord, hindiWord] of Object.entries(wordMap)) {
        inputText = inputText.replace(englishWord, hindiWord);
    }
    return inputText;
}