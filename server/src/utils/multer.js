import multer from "multer";
import { mkdirSync, existsSync } from "fs";
import { join } from "path";

const destinationDirectory = "/tmp/my-uploads";

// Ensure the destination directory exists
if (!existsSync(destinationDirectory)) {
  mkdirSync(destinationDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uniqueFolder = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const uploadPath = join(destinationDirectory, uniqueFolder);

    // Ensure the upload directory exists
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });



export { upload };
