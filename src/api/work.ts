import express, { Request, Response } from "express";
import { prisma } from "../db";

const router = express.Router();

router.get("/works", async (req: Request, res: Response) => {
  try {
    const allWorks = await prisma.work.findMany();
    res.json(allWorks);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.get("/works/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const work = await prisma.work.findUnique({
      where: {
        id: id,
      },
    });
    res.json(work);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.post("/works", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const work = await prisma.work.create({
      data: {
        name: name,
      },
    });
    res.json(work);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.put("/works/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const work = await prisma.work.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
    res.json(work);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.delete("/works/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const work = await prisma.work.delete({
      where: {
        id: id,
      },
    });
    res.json(work);
  } catch (error) {
    res.send(error).status(500);
  }
});

export default router;
