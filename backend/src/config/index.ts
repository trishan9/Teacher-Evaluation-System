import dotenv from "dotenv";

dotenv.config();

export default {
  app: {
    port: process.env.PORT,
  },
  database: {
    postgresql: {
      uri: process.env.DATABASE_URL,
    },
  },
  session: {
    secret: "scool-session-secret",
    resave: false,
    saveUninitialized: false,
  },
  jwt: {
    accessToken: {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    },
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
};
