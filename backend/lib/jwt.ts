import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "@/config/env";

type JwtPayload = {
  userId: string;
  role: string;
};

export function signJwt(payload: JwtPayload) {
  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, env.JWT_SECRET, options);
}

export function verifyJwt(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
}