import { User } from "../model/Users.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.find();

    res.send(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = new User({
      username: "admin",
      password: "admin",
      contactInfo: {
        name: "admin",
        email: "admin@google.com",
        phoneNumber: "08221111111",
      },
    });

    const saveUser = await newUser.save();

    res.send(saveUser);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
