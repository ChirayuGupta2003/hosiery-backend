import express, { Request, Response } from "express";
import { prisma } from "../db";

const router = express.Router();

router.get("/styles", async (req: Request, res: Response) => {
  const allStyles = await prisma.style.findMany();
  res.json(allStyles);
});

router.get("/styles/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const style = await prisma.style.findUnique({
    where: {
      id: id,
    },
  });
  res.json(style);
});

router.post("/styles", async (req: Request, res: Response) => {
  const { name } = req.body;
  const style = await prisma.style.create({
    data: {
      name: name,
    },
  });
  res.json(style);
});

router.put("/styles/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const style = await prisma.style.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });
  res.json(style);
});

router.delete("/styles/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const style = await prisma.style.delete({
    where: {
      id: id,
    },
  });
  res.json(style);
});

export default router;
