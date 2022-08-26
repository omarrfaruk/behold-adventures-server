import jwt from 'jsonwebtoken'
import UserModal from '../models/user.js'

// const secret = 'test'

// const auth = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(" ")[1]
//         // console.log(token);
//         const isViaGmail = token.length < 500

//         let decodedData;

//         if (token && isViaGmail) {
//             decodedData = jwt.verify(token, secret)
//             console.log(decodedData)
//             req.userId = decodedData?.id
//         } else {
//             decodedData = jwt.decode(token)
//             const googleId = decodedData?.sub.toString();
//             const user = await UserModel.findOne({ googleId });
//             req.userId = user?._id;
//         }
//         next()
//     } catch (error) {
//         console.log(error);
//     }
const secret = "test";

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        let decodedData = jwt.verify(token, secret);
        req.userId = decodedData?.id;
        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;