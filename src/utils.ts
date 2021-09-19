import nodemailer from 'nodemailer';

import nodemailerSendgrid from 'nodemailer-sendgrid';
import jwt from 'jsonwebtoken';

import './utils';

import { adjectives, nouns } from './words';
import { UserId } from '../typings/User';

export const generateSecret = ():string => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);

  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export const sendMail = (email:any) => {
  const client = nodemailer.createTransport(nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY as string,
  }));

  return client.sendMail(email);
};

export const sendSecretMail = (emailAddress:string, secret: string) => {
  const email = {
    from: 'roman@photoservice.com',
    to: emailAddress,
    subject: 'Login Secret for photo service 🔒',
    html: `Hello! Login secret: is ${secret}.<br/>`,

  };

  return sendMail(email);
};

export const generateToken = (id: UserId) => jwt.sign({ id }, process.env.JWT_SECRET || '');
