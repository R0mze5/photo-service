/* eslint-disable spaced-comment */
/* /// <reference types="nodemailer-sendgrid-transport" /> */

declare module 'nodemailer-sendgrid-transport1' {

  import sgTransport from 'nodemailer-sendgrid-transport';

  declare const sgTransport: any;

  export = sgTransport

}
