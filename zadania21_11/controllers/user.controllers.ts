import { Request, Response } from 'express';

const userCreate = async (req: Request, res: Response) => 
{
    res.send("userCreate");

}
const userRead = async (req: Request, res: Response) =>
{
    res.send("userRead");
}
const userUpdate = async (req: Request, res: Response) =>
{
    res.send("userUpdate");
}
const userDelete = async (req: Request, res: Response) =>
{
    res.send("userDelete");
}
export { userCreate, userRead, userUpdate, userDelete }