import userDao from "../dao/user.dao.js";

class UserRepository {
    async createUser(userData) {
        return await userDao.save(userData);
    }

    async getUserById(id) {
        return await userDao.findById(id);
    }

    async getUserByEmail(email) {
        return await userDao.findOne({email}); 
    }

    async updateUser(id, userData) {
        try {
            const updatedUser = await userDao.update(id, userData);
            if (!updatedUser) {
                throw new Error("No se pudo actualizar el usuario");
            }
            return updatedUser;
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            throw new Error("No se pudo actualizar el usuario");
        }
    }

    async deleteUser(id) {
        try {
            const deletedUser = await userDao.delete(id);
            if (!deletedUser) {
                throw new Error("No se pudo eliminar el usuario");
            }
            return deletedUser;
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            throw new Error("No se pudo eliminar el usuario");
        }
    } 
}

export default UserRepository; 