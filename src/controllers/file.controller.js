import File from "../models/File.js";
import {uploadToS3,deleteFromS3,generatePresignedURL} from "../services/s3.service.js";
import { v4 as uuid } from "uuid";
import ApiError from "../utils/customApiErrorHandle.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const uploadFile = asyncHandler(async (req, res) => {
  try {
    const { originalname, buffer, mimetype, size } = req.file;
    const key = `${uuid()}-${originalname}`;

    await uploadToS3(buffer, key, mimetype);

    const file = await File.create({
      filename: originalname,
      key,
      size,
      contentType: mimetype,
      user: req.user.id,
    });

    res.status(201).json(file);
  } catch (error) {
    res.json(new ApiError(400, error.message));
  }
});

export const previewOrDownloadURL = asyncHandler(async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    //   if (!file || file.user.toString() !== req.user.id) {
    //     return res.status(404).json({ error: "File not found or access denied" });
    //   }
    const url = await generatePresignedURL(file.key);
    res.json({ url });
  } catch (error) {
    res.json(new ApiError(400, error.message));
  }
})

export const listFiles = asyncHandler(async (req, res) => {
  const files = await File.find({ user: req.user.id });
  res.json(files);
})

export const deleteFile = asyncHandler(async (req, res) => {
  const file = await File.findById(req.params.id);
  if (!file || file.user.toString() !== req.user.id)
    return res.status(404).json({ error: "File not found" });

  await deleteFromS3(file.key);
  await file.deleteOne();

  res.json({ message: "Deleted successfully" });
})
