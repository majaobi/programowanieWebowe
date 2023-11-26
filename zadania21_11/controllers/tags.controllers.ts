import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { TCreateTagsRequest, TCreateTagsResponse, TReadTagsResponse, TUpdateTagsRequest } from "../types/tags.types";

const prisma = new PrismaClient();

const tagsCreate = async (req: Request<TCreateTagsRequest>, res: Response<TCreateTagsResponse | { message: string }>) => {
    try {
        const { name } = req.body;

        if (!name) {
            res.status(400).send({ message: "Nie podano wszystkich danych" });
            return;
        }

        const tags = await prisma.tag.create({
            data: {
                name
            }
        });

        const result = {
            id: tags.id,
            name: tags.name
        }

        res.json(result);
    }
    catch (err) {
        console.log("Błąd dodawania tagów");
        console.log(err);
        res.status(500).json({ message: "Błąd dodawania tagów" });
    }

}


const tagsRead = async (req: Request, res: Response<TReadTagsResponse[] | { message: string }>) => {
    try {
        const tags = await prisma.tag.findMany({
            select: {
                id: true,
                name: true
            }
        });

        res.json(tags);
    }
    catch (err) {
        console.log("Błąd pobierania tagów");
        console.log(err);
        res.status(500).json({ message: "Błąd pobierania tagów" });
    }
}

const tagsUpdate = async (req: Request<{id:string},{},TUpdateTagsRequest>, res: Response<{ message: string }>) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            res.status(400).send({ message: "Nie podano wszystkich danych" });
            return;
        }

        const tags = await prisma.tag.update({
            where: {
                id
            },
            data: {
                name
            }
        });

        res.json({ message: "Zaktualizowano tagi" });
    }
    catch (err) {
        console.log("Błąd aktualizacji tagów");
        console.log(err);
        res.status(500).json({ message: "Błąd aktualizacji tagów" });
    }
}

const tagsDelete = async (req: Request<{ id: string }>, res: Response<{ message: string }>) => {
    try {
        const { id } = req.params;

        const tags = await prisma.tag.delete({
            where: {
                id
            }
        });

        res.json({ message: "Usunięto tagi" });
    }
    catch (err) {
        console.log("Błąd usuwania tagów");
        console.log(err);
        res.status(500).json({ message: "Błąd usuwania tagów" });
    }
}

export {
    tagsCreate,
    tagsRead,
    tagsUpdate,
    tagsDelete
}
