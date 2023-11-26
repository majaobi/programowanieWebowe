import express,{ Request, Response } from 'express';
import {PrismaClient} from '@prisma/client';
import { TCreateUserRequest, TCreateUserResponse, TReadUserResponse, TUpdateUserRequest } from '../types/user.types';

const prisma = new PrismaClient();
const userCreate = async (req: Request<TCreateUserRequest>, res: Response< TCreateUserResponse | {message: string}>) => 
{
    try{
        const {email, name, password} = req.body;

        if(!email || !password)
        {
            res.status(400).send({message:"Nie podano wszystkich danych"});
            return;
        }
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password,
                profile: {
                    create: {
                        bio: ""
                    }
                }
            },
            include: {
                profile: true
            }
        });

        const result = {
            id: user.id,
            email: user.email,
            name: user.name || "",
            password: user.password,
            bio: user.profile?.bio || ""
        }


        res.json(result);
    }
    catch(err){
        console.log("Błąd dodawania użytkownika");
        console.log(err);
        res.status(500).json({message:"Błąd dodawania użytkownika"});
    }

}
const userRead = async (req: Request, res: Response<TReadUserResponse[] | {message:string}> ) =>
{
    try{
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true
            }
        });

        res.json(users);

    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Błąd odczytu użytkowników"});
    }
}
const userUpdate = async (req: Request<{id: string}, {}, TUpdateUserRequest>, res: Response) =>
{
    try{
        const {id} = req.params;
        const {email, name} = req.body;

        const user = await prisma.user.update({
            where: {
                id
            },
            data: {
                email,
                name
            }
        });

        res.json(user);
    
    } catch(err){
        console.log(err);
        res.status(500).json({message:"Błąd aktualizacji użytkownika"});
    }
}
const userDelete = async (req: Request<{id:string}>, res: Response) =>
{
    try{
        const {id} = req.params;

        const user = await prisma.user.delete({
            where: {
                id
            }
        });

        res.json({message: "Użytkownik został usunięty"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Błąd usuwania użytkownika"});
    }
}
export { userCreate, userRead, userUpdate, userDelete }