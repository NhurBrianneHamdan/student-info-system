const generateFormattedStudentId = () => {

const currentYear = new Date().getFullYear().toString();
const yearPart = currentYear.slice(-2);

const uniquePart = Math.floor(Math.random() * 100000).toString().padStart(5, '0');

const suffixPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

return `${yearPart}-${uniquePart}-${suffixPart}`;
};

export default generateFormattedStudentId;
