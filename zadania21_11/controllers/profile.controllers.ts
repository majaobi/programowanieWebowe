import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { TCreateProfileRequest, TCreateProfileResponse, TReadProfileResponse, TUpdateProfileRequest } from "../types/profile.types";

const prisma = new PrismaClient();

const profileCreate = async (req: Request<TCreateProfileRequest>, res: Response<TCreateProfileResponse | { message: string }>) => {
    try {
        const { id, bio } = req.body;


        if (!bio) {
            res.status(400).send({ message: "Nie podano wszystkich danych" });
            return;
        }

        const profile = await prisma.profile.create({
            data: {
                bio,
                user: {
                    connect : {
                        id
                    }
                }
            }
        });

        const result = {
            id: profile.id,
            bio: profile.bio
        }

        res.json(result);
    }
    catch (err) {
        console.log("Błąd dodawania profilu");
        console.log(err);
        res.status(500).json({ message: "Błąd dodawania profilu" });
    }

}

const profileRead = async (req: Request, res: Response<TReadProfileResponse[] | { message: string }>) => {
    try {
        const profiles = await prisma.profile.findMany({
            select: {
                id: true,
                bio: true
            }
        });

        res.json(profiles);
    }
    catch (err) {
        console.log("Błąd pobierania profili");
        console.log(err);
        res.status(500).json({ message: "Błąd pobierania profili" });
    }
}


const profileUpdate = async (req: Request<{id:string}, {}, TUpdateProfileRequest>, res: Response<{ message: string }>) => {
    try {
        const { id } = req.params;
        const { bio } = req.body;

        if (!bio) {
            res.status(400).send({ message: "Nie podano wszystkich danych" });
            return;
        }

        const profile = await prisma.profile.update({
            where: {
                id: id
            },
            data: {
                bio
            }
        });

        res.json({ message: "Zaktualizowano profil" });
    }
    catch (err) {
        console.log("Błąd aktualizacji profilu");
        console.log(err);
        res.status(500).json({ message: "Błąd aktualizacji profilu" });
    }
}

const profileDelete = async (req: Request, res: Response<{ message: string }>) => {
    try {
        const { id } = req.params;

        const profile = await prisma.profile.delete({
            where: {
                id: id
            }
        });

        res.json({ message: "Usunięto profil" });
    }
    catch (err) {
        console.log("Błąd usuwania profilu");
        console.log(err);
        res.status(500).json({ message: "Błąd usuwania profilu" });
    }
}

export { profileCreate, profileRead, profileUpdate, profileDelete };
