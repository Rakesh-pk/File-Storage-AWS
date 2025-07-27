import express from "express";
import multer from "multer";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { uploadFile, previewOrDownloadURL, listFiles, deleteFile} from "../controllers/file.controller.js";

const router = express.Router();

const upload = multer();

router.post("/upload",verifyJWT, upload.single("file"), uploadFile);
router.get("/:id/url", verifyJWT ,previewOrDownloadURL);
router.get("/", verifyJWT, listFiles);
router.delete("/:id", verifyJWT, deleteFile);

export default router;
