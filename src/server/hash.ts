import bcrypt from "bcrypt";

export const hashPw = (pass: string) => {
    const passw = bcrypt.hash(pass,10)
    return passw
}