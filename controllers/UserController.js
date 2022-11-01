import { PrismaClient } from "@prisma/client";
import { hash, compare } from "../helpers/bcrypt.js";
import jwt from 'jsonwebtoken';
import { jwt_secret } from "../config.js";

const prisma = new PrismaClient();

export const register = async (req, res) => {
    const { email, password } = req.body;
    try{
        if(!email|| !password) {
            return res.status(400).json({error:"Please filled the field correctly"});
        }
        const encrypted = await hash(password);
        const user = await prisma.User.create({
            data:{
                email: email,
                password: encrypted
            }
        });
        delete user.password;
        res.status(201).json(user);
    }catch(error){
        res.status(400).json({msg: error.message});
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try{
        if(!email|| !password) {
            return res.status(400).json({error:"Please filled the field correctly"});
        }
        const data = await prisma.User.findUnique({
            where:{
                email: email
            }
        });

        if(data === null){
            return res.status(404).json({error: "email not found"});
        }

        if(!(await compare(password, data.password))){
            return res.status(500).json({error: "password wrong"});
        }else {
            delete data.password;
            const token = jwt.sign({...data}, jwt_secret, {expiresIn: "24h"});
            return res.status(201).json({...data, token: token});
        }
    }catch(error){
        res.status(500).json({msg: error.message});
    }
};

export const showUser = async (req, res) => {
    try{
        const data = await prisma.User.findMany();
        delete data.password;
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({msg: error.message});
    }
};

export const updateUser = async (req, res) => {
    const { email, password } = req.body;
    const encrypted = await hash(password);
    try{
        if(!email|| !password) {
            return res.status(400).json({error:"Please filled the field correctly"});
        }
        const user = await prisma.User.update({
            where:{
                id: Number(req.params.id)
            },
            data:{
                email: email,
                password: encrypted
            }
        });
        delete user.password;
        res.status(201).json(user);
    }catch(error){
        res.status(400).json({msg: error.message});
    }
};

export const deleteUser = async (req, res) => {
    try{
        const user = await prisma.User.delete({
            where:{
                id: Number(req.params.id)
            }
        });
        res.status(201).json({msg: "User Has Been Deleted"});
    }catch(error){
        res.status(400).json({msg: error.message});
    }
};