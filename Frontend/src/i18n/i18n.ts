import i18next from 'i18next';
import enLogin from './locale/login/en.json';
import neLogin from './locale/login/nep.json';

export const i18nLanguages = ["en", "nep"];

i18next.init({
interpolation: {
    // React already does escaping
    escapeValue: false,
  },
  lng: 'en', // 'en' | 'es'
  // Using simple hardcoded resources for simple example
  resources: {
    en: {
        login: enLogin,
    },
    nep: {
        login: neLogin,
    }
  },
})
  
/**
 * Returns data in selected language
 * @param dataEn any data containing english language
 * @param dataNe any data containing nepali language
 */
export const getTextByLanguage = (dataEn: any, dataNe: any) => {
    switch (i18next.language) {
        case 'nep': return dataNe;
        default: return dataEn;
    }
}

/**
 * API request time out message in selected language
 */
export const requestTimeoutLanguage = () => {
    switch (i18next.language) {
        case 'nep': return "सर्भरले प्रतिक्रिया दिन धेरै लामो समय लिइरहेको छ, कृपया केहि बेरमा पुन: प्रयास गर्नुहोस्!";
        default: return "Server is taking too long to respond, please try again in sometime!";
    }
}

/**
 * When no internet or no conection to server message in selected language
 */
export const noConnectionLanguage = () => {
    switch (i18next.language) {
        case 'nep': return "सर्भरले प्रतिक्रिया दिन धेरै लामो समय लिईरहेको छ, यो कम कनेक्टिभटी वा हाम्रो सर्भरहरूको साथ त्रुटि द्वारा हुन सक्छ। कृपया केहि बेरमा पुन: प्रयास गर्नुहोस्!";
        default: return "Server is taking too long to respond, this can be caused by either poor connectivity or an error with our servers. Please try again in a while!";
    }
}

const nepaliCount = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
/**
 * Converts 123456 to 1,23,456
 * @param enNumber Number to convert into Nepali comma separated text
 */
export const nepaliNumeralFormat = (enNumber: number) => {
    let [integer, decimal] = enNumber.toString().split(".");

    let integerBeforeLastThreeDigits = integer.slice(0, integer.length - 3);
    const integerOfLastThreeDigits = integer.slice(integer.length - 3);
    if (integerBeforeLastThreeDigits.length > 2) {
        integerBeforeLastThreeDigits = integerBeforeLastThreeDigits.replace(/(\d)(?=(\d{2})+$)/g, '$1,') + ",";
    }

    integer = integerBeforeLastThreeDigits + integerOfLastThreeDigits;

    switch (i18next.language) {
        case 'nep': return integer + decimal;
        default: return integer + decimal;
    }
}

/**
 * Converts english number to nepali number as string
 * @param numberEn number in english
 */
export const convertEngToNepNumber = (numberEn: number) => {
    return numberEn.toString().split("").map((number) => nepaliCount[+number] ? nepaliCount[+number] : number).join("");
}


export const confirmationMessage = () => {
    switch (i18next.language) {
        case 'nep': return "के तपाइँ मेटाउन निश्चित हुनुहुन्छ?";
        default: return "Are you sure you want to delete ?";
    }
}

export default i18next;

