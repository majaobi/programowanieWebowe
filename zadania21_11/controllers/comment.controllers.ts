import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { TCreateCommentRequest, TCreateCommentResponse, TReadCommentResponse, TUpdateCommentRequest } from "../types/comment.types";

const prisma = new PrismaClient();

const commentCreate = async (req: Request<TCreateCommentRequest>, res: Response<TCreateCommentResponse | { message: string }>) => {
    try {
        const { content, userId, postId } = req.body;

        if (!content || !userId || !postId) {
            res.status(400).send({ message: "Nie podano wszystkich danych" });
            return;
        }

        const comment = await prisma.comment.create({
            data: {
                content,
                userId,
                postId
            }
        });

        const result = {
            id: comment.id,
            content: comment.content,
            userId: comment.userId,
            postId: comment.postId
        }

        res.json(result);
    }
    catch (err) {
        console.log("Błąd dodawania komentarza");
        console.log(err);
        res.status(500).json({ message: "Błąd dodawania komentarza" });
    }

}


const commentRead = async (req: Request, res: Response<TReadCommentResponse[] | { message: string }>) => {
    try {
        const comments = await prisma.comment.findMany({
            select: {
                id: true,
                content: true,
                userId: true,
                postId: true
            }
        });

        res.json(comments);
    }
    catch (err) {
        console.log("Błąd pobierania komentarzy");
        console.log(err);
        res.status(500).json({ message: "Błąd pobierania komentarzy" });
    }
}


const commentUpdate = async (req: Request<{id:string}, {}, TUpdateCommentRequest>, res: Response<{ message: string }>) => {
    try {
        const { id } = req.params;
        const { content, userId, postId } = req.body;

        if (!content || !userId || !postId) {
            res.status(400).send({ message: "Nie podano wszystkich danych" });
            return;
        }

        const comment = await prisma.comment.update({
            where: {
                id
            },
            data: {
                content,
                userId,
                postId
            }
        });

        res.json({ message: "Zaktualizowano komentarz" });
    }
    catch (err) {
        console.log("Błąd aktualizacji komentarza");
        console.log(err);
        res.status(500).json({ message: "Błąd aktualizacji komentarza" });
    }
}


const commentDelete = async (req: Request<{id:string}>, res: Response<{ message: string }>) => {
    try {
        const { id } = req.params;

        const comment = await prisma.comment.delete({
            where: {
                id
            }
        });

        res.json({ message: "Usunięto komentarz" });
    }
    catch (err) {
        console.log("Błąd usuwania komentarza");
        console.log(err);
        res.status(500).json({ message: "Błąd usuwania komentarza" });
    }
}

export {
    commentCreate,
    commentRead,
    commentUpdate,
    commentDelete
}