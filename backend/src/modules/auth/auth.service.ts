import validator from "validator";

import { db } from "@/db";
import token from "@/lib/token";
import hash from "@/lib/hash";
import uploadToCloudinary from "@/lib/cloudinary";

const signup = async (
  name: string,
  email: string,
  password: string,
  avatar: any,
) => {
  if (!email || !name || !password || !avatar) {
    throw Error("All the fields are required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email address is not valid");
  }

  const exists = await db.user.findUnique({
    where: { email },
  });

  if (exists) {
    throw Error("User with this email address already exists");
  }

  const avatarUrl: any = await uploadToCloudinary(avatar);
  const hashedPassword = await hash.generate(password);
  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      avatar: avatarUrl.secure_url,
    },
  });
  return user;
};

const login = async (email: any, password: any) => {
  if (!email || !password) {
    throw Error("All the fields are required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email address is not valid");
  }

  const user = await db.user.findUnique({ where: { email } });

  if (!user) {
    throw Error("User with this email address doesn't exist");
  }

  const isPasswordCorrect = await hash.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw Error("Password is incorrect");
  }

  const acccessToken = token.generate({
    payload: { _id: user.id },
    type: "access",
  });

  return {
    token: acccessToken,
    _id: user.id,
  };
};

const getMe = async (id: string) => {
  const user = await db.user.findUnique({ where: { id } });
  if (!user) {
    throw Error("User doesn't exists!");
  }
  return {
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  };
};

export default { signup, login, getMe };
