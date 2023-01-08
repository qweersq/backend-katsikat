import User from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!user) return res.status(404).json({ msg: "User not found" });
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    req.session.userId = user.id;
    const id = user.id;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({ id, name, email, role });
}

export const Me = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Please login first!" });
    }
    const user = await User.findOne({
        attributes: ['id', 'name', 'email', 'role'],
        where: {
            id: req.session.userId
        }
    });
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.status(200).json(user);
}

export const logOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({ msg: "Cannot Logout" });
        res.status(200).json({ msg: "You have logged out" });
    });
}