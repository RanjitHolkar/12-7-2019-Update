// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


/* app_id = "787846"
key = "ce83276d4dec69df667b"
secret = "846879f1085dc223de48"
cluster = "ap2" */

export const environment = {
  production: false,
  /* pusher: {
key : "91048c7220eb90664443",
cluster : "ap2"
  }, */
  pusher: {
    key : "3582e982ad4955c87d3f",
    cluster : "ap2"
      },

  firebase: {
    apiKey: "AIzaSyDU51489_qI8INZli1PlREpKOR_tfxbfTM",
    authDomain: "propertymgmt-28adb.firebaseapp.com",
    databaseURL: "https://propertymgmt-28adb.firebaseio.com",
    projectId: "propertymgmt-28adb",
    storageBucket: "propertymgmt-28adb.appspot.com",
    messagingSenderId: "496287645445"
  },
};

// apiKey: "AIzaSyDU51489_qI8INZli1PlREpKOR_tfxbfTM",
//     authDomain: "propertymgmt-28adb.firebaseapp.com",
//     databaseURL: "https://propertymgmt-28adb.firebaseio.com",
//     projectId: "propertymgmt-28adb",
//     storageBucket: "propertymgmt-28adb.appspot.com",
//     messagingSenderId: "496287645445"
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
