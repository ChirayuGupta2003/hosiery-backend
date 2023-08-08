import express, { Request, Response } from "express";
import { prisma } from "../db";

const router = express.Router();

router.get("/works", async (req: Request, res: Response) => {
  const allWorks = await prisma.work.findMany();
  res.json(allWorks);
});

router.get("/works/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const work = await prisma.work.findUnique({
    where: {
      id: id,
    },
  });
  res.json(work);
});

router.post("/works", async (req: Request, res: Response) => {
  const { name } = req.body;
  const work = await prisma.work.create({
    data: {
      name: name,
    },
  });
  res.json(work);
});

router.put("/works/:id", async (req: Request, res: Response) => {
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
});

router.delete("/works/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const work = await prisma.work.delete({
    where: {
      id: id,
    },
  });
  res.json(work);
});

export default router;
