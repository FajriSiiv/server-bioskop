import { User } from "../model/Users.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.find();

    res.send(user);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = new User({
      username: "user1",
      password: "user1",
      contactInfo: {
        name: "fajri1",
        email: "email1@google.com",
        phoneNumber: "08221",
      },
    });

    const saveUser = await newUser.save();

    res.send(saveUser);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
