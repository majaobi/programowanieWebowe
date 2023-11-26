import { Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
import { TCreatePostRequest, TCreatePostResponse, TReadPostResponse, TUpdatePostRequest } from "../types/post.types";

const prisma = new PrismaClient();

const postCreate = async (req: Request<TCreatePostRequest>, res: Response<TCreatePostResponse | { message: string }>) => {
    try {
        const { title, content, userId } = req.body;

        if (!title || !content || !userId) {
            res.status(400).send({ message: "Nie podano wszystkich danych" });
            return;
        }

        const post = await prisma.post.create({
            data: {
                title,
                content,
                userId
            }
        });

        const result = {
            id: post.id,
            title: post.title,
            content: post.content,
            userId: post.userId
        }

        res.json(result);
    }
    catch (err) {
        console.log("Błąd dodawania posta");
        console.log(err);
        res.status(500).json({ message: "Błąd dodawania posta" });
    }

}


const postRead = async (req: Request, res: Response<TReadPostResponse[] | { message: string }>) => {
    try {
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                userId: true
            }
        });

        res.json(posts);
    }
    catch (err) {
        console.log("Błąd pobierania postów");
        console.log(err);
        res.status(500).json({ message: "Błąd pobierania postów" });
    }
}

const postUpdate = async (req: Request<{id:string}, {}, TUpdatePostRequest>, res: Response<{ message: string }>) => {
    try {
        const { id } = req.params;
        const { title, content, userId } = req.body;

        if (!title || !content || !userId) {
            res.status(400).send({ message: "Nie podano wszystkich danych" });
            return;
        }

        const post = await prisma.post.update({
            where: {
                id
            },
            data: {
                title,
                content,
                userId
            }
        });

        res.json({ message: "Zaktualizowano post" });
    }
    catch (err) {
        console.log("Błąd aktualizacji posta");
        console.log(err);
        res.status(500).json({ message: "Błąd aktualizacji posta" });
    }
}

const postDelete = async (req: Request, res: Response<{ message: string }>) => {
    try {
        const { id } = req.params;

        await prisma.post.delete({
            where: {
                id
            }
        });

        res.json({ message: "Usunięto post" });
    }
    catch (err) {
        console.log("Błąd usuwania posta");
        console.log(err);
        res.status(500).json({ message: "Błąd usuwania posta" });
    }
}

export { postCreate, postRead, postUpdate, postDelete };