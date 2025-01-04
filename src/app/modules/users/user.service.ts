import { IUser } from "./user.interface";
import User from "./user.model";


// Register a new user
const registereUser = async (user: IUser): Promise<IUser> => {

    const result = await User.create(user);

    return result;
}

export const userService = {
    registereUser,
};