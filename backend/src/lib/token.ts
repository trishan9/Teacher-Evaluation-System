import jwt from "jsonwebtoken";
import config from "../config";

type TSelectType = {
  secret: string;
  expiresIn: string;
};

const selectType = (type: string): TSelectType => {
  if (type === "access") {
    return {
      secret: config.jwt.accessToken.secret ?? "",
      expiresIn: config.jwt.accessToken.expiresIn ?? "",
    };
  } else {
    return {
      secret: "",
      expiresIn: "",
    };
  }
};

const generate = ({ payload, type }) => {
  const { expiresIn, secret } = selectType(type);
  return jwt.sign(payload, secret, { expiresIn, subject: type });
};

const verify = ({ token, type }) => {
  const { secret } = selectType(type);
  return jwt.verify(token, secret, { subject: type });
};

export default { generate, verify };
