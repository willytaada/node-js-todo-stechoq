import jwt from "jsonwebtoken";
import { jwt_secret } from "../config.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const checkCredentials = async (req, res, next) => {
    // get authorization user
    const {authorization} = req.headers;
    try{
        // check if token exists or not
        if(!authorization) {
            res.json({
                status: "error",
                message: "failed to access, credential not found"
            });
            return;
        }
        // if exsist split token
        const token = authorization.split("Bearer ");
        //verify using jwt verify
        const decode = jwt.verify(token[1], jwt_secret);
        delete decode.iat;
        delete decode.exp;
        //check decode token with user data
        const user = await prisma.User.findUnique({
            where:{
                email: decode.email
            }
        });
        // check if user exists or not
        if(user === null) {
            res.json({ status: "error", message: "authorization failed" });
            return;
        }

        req.user = {
            user_id: user.id,
            email: user.email,
        };
        next();
    }catch (error) {
        next(error);
    }
};