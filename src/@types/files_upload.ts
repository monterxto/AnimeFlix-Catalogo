export type FilesUpload = {
  video?: Express.Multer.File[];
  thumbnail?: Express.Multer.File[];
  trailer?: Express.Multer.File[];
  banner?: Express.Multer.File[];
};
