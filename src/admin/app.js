
import favicon from "./extensions/favicon.png";

const config = {
  // head: {
  //   favicon: favicon,
  // },
  // menu: {
  //   logo: favicon,
  // },

  translations: {
    fr: {
     
      // Translate a plugin's key/value pair by adding the plugin's name as a prefix
      // In this case, we translate the "plugin.name" key of plugin "content-type-builder"
      "app.components.LeftMenu.navbrand.title": "IPA",
    },
  },
  locales: [
     'ar',
    'fr',
    // 'cs',
    // 'de',
    // 'dk',
    // 'es',
    // 'he',
    // 'id',
    // 'it',
    // 'ja',
    // 'ko',
    // 'ms',
    // 'nl',
    // 'no',
    // 'pl',
    // 'pt-BR',
    // 'pt',
    // 'ru',
    // 'sk',
    // 'sv',
    // 'th',
    // 'tr',
    // 'uk',
    // 'vi',
    // 'zh-Hans',
    // 'zh',
  ],
 
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
