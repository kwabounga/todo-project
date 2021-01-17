import { Platform, NativeModules } from 'react-native'

const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;

console.log(deviceLanguage); //en_US

const locales = {
    fr_FR:{
        title:"Choses à faire",
        input:"Qu'est-ce que vous voulez faire ?",
        heading:{
            todo:"À faire:",
            made:"Fait!"
        },
        swipeables:{
            archivate:"Archiver",
            reactivate:"Réactiver",
            delete:"Supprimer",
        }
    },
    en_US:{
        title:"Things to do",
        input:"What do you want to do ?",
        heading:{
            todo:"To do:",
            made:"Made!"
        },
        swipeables:{
            archivate:"Archive",
            reactivate:"Reactivate",
            delete:"Delete",
        }
    },
}

export const local = () => {
    let language  = '';
    switch (deviceLanguage) { 
        case 'fr_BE':
        case 'fr_BE@euro':
        case 'fr_CA':
        case 'fr_CH':
        case 'fr_FR':
        case 'fr_FR@euro':
        case 'fr_LU':
        case 'fr_LU@euro':   
            language = 'fr_FR';
            break;
        case 'en_AG':
        case 'en_AU':
        case 'en_BW':
        case 'en_CA':
        case 'en_DK':
        case 'en_GB':
        case 'en_HK':
        case 'en_IE':
        case 'en_IN':
        case 'en_NG':
        case 'en_NZ':
        case 'en_PH':
        case 'en_SG':
        case 'en_US':
        case 'en_ZA':
        case 'en_ZM':
        case 'en_ZW':
        default:
            language = 'en_US';
            break;
    }
    return  locales[language];
}
