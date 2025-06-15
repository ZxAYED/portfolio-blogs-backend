
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.join(process.cwd(), '.env'),
})

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  gen_salt: process.env.GEN_SALT,
  secret: process.env.SECRET,
  cloudinary_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  accessToken_secret: process.env.ACCESS_TOKEN_SECRET,
  accessToken_expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  app_password:process.env.APP_PASSWORD,
  app_gmail:process.env.APP_GMAIL,
}
