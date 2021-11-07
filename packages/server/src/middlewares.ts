import { User } from '@photo-service/contracts';

import multer from 'multer';
import multerS3 from 'multer-s3';
import { Response, Request } from 'express';
import aws from 'aws-sdk';

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const multerFiles = multer({
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: 'st-media-service/files',
  }),
});

const multerRequestFileName = 'file';

export const uploadPostFile = multerFiles.single(multerRequestFileName);

export const uploadController = (req: Request, res:Response) => {
  const file = req[multerRequestFileName];

  res.json(file);
};

export const isAuthenticated = (request: {user: User}):void => {
  if (!request?.user) {
    throw Error('Not authorized action');
  }
};
