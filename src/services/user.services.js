import userRepository from "../repositories/user.repository.js";
import { createHash, isValidPassword } from "../utils/util.js";

class UserServices {
    async registerUser(userData) {
        const existingUser = await userRepository.getUserByEmail(userData.email);
        if(existingUser) throw new Error("El usuario ya existe"); 

        userData.password = createHash(userData.password); 
        return await userRepository.createUser(userData); 
    }

    async loginUser(email, password) {
        const user = await userRepository.getUserByEmail(email); 
        if(!user || !isValidPassword(password, user)) throw new Error("Credenciales incorrectas"); 
        return user; 
    }

    async getUserById(id) {
        return await userRepository.getUserById(id); 
    }

    async updateUser(id, userData) {
        const updatedUser = await userRepository.updateUser(id, userData);
        if (!updatedUser) throw new Error("No se pudo actualizar el usuario");
        return updatedUser;
    }

    async deleteUser(id) {
        const deletedUser = await userRepository.deleteUser(id);
        if (!deletedUser) throw new Error("No se pudo eliminar el usuario");
        return deletedUser;
}
}
export default UserServices; 