// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const development = {
  url : 'http://localhost:8080'
}

const apiGateway = development;

const pathProduk = '/produk';
const pathKomponen = '/komponen';
const pathLogin = '/login';
const pathSorting = '/sorting';

export const environment = {
  production: false,
  urlProduk : apiGateway.url + pathProduk,
  urlKomponen :apiGateway.url + pathKomponen,
  urlLogin : apiGateway.url + pathLogin,
  urlSorting : apiGateway.url + pathSorting,
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
