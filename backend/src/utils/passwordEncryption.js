import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

//method for comparing password
const comparePassword = async (plainPassword, hashedPassword) => {
    // console.log("Hash password :: ",hashedPassword)
    // console.log("Plain Password  ::",plain)
    return await bcrypt.compare(plainPassword, hashedPassword);
}

export { hashPassword, comparePassword };