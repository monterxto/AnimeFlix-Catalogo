//criar esse tipo { videoFile?: Express.Multer.File[] } e exportar ele
export type FilesUpload = {
  videoFile?: Express.Multer.File[],
  thumbFile?: Express.Multer.File[]
  bannerFile?: Express.Multer.File[]
  traillerFile?: Express.Multer.File[]
}
