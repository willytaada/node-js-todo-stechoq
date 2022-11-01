import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTodo = async (req, res) => {
    const { project, note, status } = req.body;
    const {user_id} = req.user;
    try{
        if(!project || !note || !status) {
            return res.status(400).json({error:"Please filled the field correctly"});
        }
        const data = await prisma.Todo.create({
            data:{
                project_name: project,
                notes: note,
                status: status,
                authorId: user_id
            }
        });
        res.status(201).json(data);
    }catch(error){
        res.status(400).json({msg: error.message});
    }
};

export const showTodo = async (req, res) => {
    const {user_id} = req.user;
    try{
        const data = await prisma.Todo.findMany({
            where:{
                authorId: user_id
            }
        });
        res.status(201).json(data);
    }catch(error){
        res.status(400).json({msg: error.message});
    }
};

export const updateTodo = async (req, res) => {
    const { project, note, status } = req.body;
    const {user_id} = req.user;
    try{
        if(!project || !note || !status) {
            return res.status(400).json({error:"Please filled the field correctly"});
        }
        const data = await prisma.Todo.updateMany({
            where:{
                id: Number(req.params.id),
                authorId: user_id
            },
            data:{
                project_name: project,
                notes: note,
                status: status
            }
        });
        if(data.count === 0)
            return res.status(401).json({error:"You Cant Update"});
        
        res.status(201).json({success:"Update Successfully"});
    }catch(error){
        res.status(400).json({msg: error.message});
    }
};

export const deleteTodo = async (req, res) => {
    const {user_id} = req.user;
    try{
        const data = await prisma.Todo.deleteMany({
            where:{
                id: Number(req.params.id),
                authorId: user_id
            }
        });
        if(data.count === 0)
            return res.status(401).json({error:"You Cant Delete"});
        
        res.status(201).json({success:"Delete Successfully"});
    }catch(error){
        res.status(400).json({msg: error.message});
    }
};