import crypto from "crypto";

const jwtSecretKey = crypto.randomBytes(32).toString("hex");
console.log(jwtSecretKey);
