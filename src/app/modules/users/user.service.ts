import { IUser } from "./user.interface";
import User from "./user.model";


// Register a new user
const registerUser = async (user: IUser): Promise<IUser> => {

    const result = await User.create(user);

    return result;
}

// find/get a user
const getUser = async () => {

    const result = await User.find();

    return result;
}

export const userService = {
    registerUser,
    getUser,
};