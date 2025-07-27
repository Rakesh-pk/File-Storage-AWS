import { s3 } from "../config/s3Client.js";
import { PutObjectCommand, DeleteObjectCommand , GetObjectCommand} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


export const generatePresignedURL = async (key) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 }); // 5 minutes
  return signedUrl;
};

export const uploadToS3 = async (buffer, key, contentType) => {
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  };

  await s3.send(new PutObjectCommand(uploadParams));
  // return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};

export const deleteFromS3 = async (key) => {
  await s3.send(
    new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    })
  );
};
