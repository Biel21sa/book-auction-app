export default () => ({
  appSecret: process.env.JWT_SECRET,
  jwtTokenExpiresIn: process.env.JWT_TOKEN_EXPIRESIN,
  maintenanceWindow: Number(process.env.MAINTENANCE_WINDOW)
    ? Number(process.env.MAINTENANCE_WINDOW)
    : 168,
  bucketName: process.env.AWS_BUCKET_NAME,
  bucketFolder: process.env.AWS_BUCKET_FOLDER,
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
