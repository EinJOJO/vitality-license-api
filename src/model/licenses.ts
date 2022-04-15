import { OkPacket } from 'mysql2';
import { License, Product } from '../types/License';
import database from './database';
import Logger from './logger';

const registerLicense = (args: License) => {
  return new Promise<OkPacket>((resolve, reject) => {
    const query = 'INSERT INTO keylist (`product`,`license`) VALUES (?,?)';
    database.query(query, [args.product, args.license], (err, results) => {
      if (err) return reject(err);
      resolve(<OkPacket>results);
    });
  });
};

const generateLicenseString = () => {
  return `VITALITYZ-${[...Array(25)]
    .map((i) => (~~(Math.random() * 36)).toString(36).toUpperCase())
    .join('')}`;
};

export const createLicense = (product: Product) => {
  return new Promise<string>(async (resolve, reject) => {
    const licenseString = generateLicenseString();
    try {
      await registerLicense({
        license: licenseString,
        product: product,
      });
      Logger.log(
        `Created a new License: ${licenseString} \n Product: ${product}`,
        'License Generator'
      );
      resolve(licenseString);
    } catch (error) {
      reject(error);
    }
  });
};
