//import { textInputElement, textareaInputElement, buttonComment } from "./script";

// функция даты

export function getDate(date) {
    const options = {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }
    const newDate = new Date(date);
    return newDate.toLocaleString('ru-RU', options).replace(',', '');

}


