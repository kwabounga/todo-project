import { Platform, NativeModules } from "react-native";
// import { DeviceEventEmitter } from "react-native-web";

const deviceLanguage =
  Platform.OS === "ios"
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier;

console.log(deviceLanguage); //en_US

const locales = {
  fr_FR: {
    title: "Choses à faire",
    input: "Qu'est-ce que vous voulez faire ?",
    heading: {
      todo: "À faire:",
      made: "Fait!",
    },
    swipeables: {
      archivate: "Archiver",
      reactivate: "Réactiver",
      delete: "Supprimer",
    },
  },
  en_US: {
    title: "Things to do",
    input: "What do you want to do ?",
    heading: {
      todo: "To do:",
      made: "Made!",
    },
    swipeables: {
      archivate: "Archive",
      reactivate: "Reactivate",
      delete: "Delete",
    },
  },
};

const languages = {
  fr_BE: "fr_FR",
  "fr_BE@euro": "fr_FR",
  fr_CA: "fr_FR",
  fr_CH: "fr_FR",
  fr_FR: "fr_FR",
  "fr_FR@euro": "fr_FR",
  fr_LU: "fr_FR",
  "fr_LU@euro": "fr_FR",
};

export const local = function () {
  if (languages.hasOwnProperty(deviceLanguage)) {
    return locales[languages[deviceLanguage]];
  } else {
    return locales["en_US"];
  }
};
