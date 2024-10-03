
import bcrypt from "bcrypt"; 

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10)); 

const isValidPassword = (password, email) => bcrypt.compareSync(password, email.password);
export {createHash, isValidPassword}; 
