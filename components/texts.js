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
            archivate:"Archivate",
            reactivate:"Reactivate",
            delete:"Delete",
        }
    },
}

export const local = () => {
    return  locales[deviceLanguage];
}
