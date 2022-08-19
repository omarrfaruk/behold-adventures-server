import userModel from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const secret = 'tarek'

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await userModel.findOne({ email })
        if (!oldUser) return res.status(404).json({ message: 'User Did not Exist' })

        const isPassCorrect = await bcrypt.compare(password, oldUser.password)
        console.log(isPassCorrect);
        if (!isPassCorrect) return res.status(400).json({ message: 'invalid password' })

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: '1h' })
        res.status(200).json({ result: oldUser, token })

    } catch (err) {
        res.status(500).json({ message: 'something went wrong' })
        console.log(err);
    }
}

export const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {


        const oldUser = await userModel.findOne({ email })
        if (oldUser) {
            return res.status(400).json({ message: 'User already exist' })
        }
        const hashPass = await bcrypt.hash(password, 12)
        const result = await userModel.create({
            email,
            password: hashPass,
            name: `${firstName} ${lastName}`
        })
        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: '1h' })
        res.status(201).json({ result, token })

    } catch (err) {
        res.status(500).json({ message: 'something went wrong' })
        console.log(err);
    }
}


export const googleSignIn = async (req, res) => {
    const { email, name, token, googleId } = req.body;

    try {
        const oldUser = await UserModal.findOne({ email });
        if (oldUser) {
            const result = { _id: oldUser._id.toString(), email, name };
            return res.status(200).json({ result, token });
        }

        const result = await UserModal.create({
            email,
            name,
            googleId,
        });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
};
