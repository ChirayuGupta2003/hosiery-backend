import express, { Request, Response } from "express";
import { prisma } from "../db";

const router = express.Router();

router.get("/yarns", async (req: Request, res: Response) => {
  const allYarns = await prisma.yarn.findMany();
  res.json(allYarns);
});

router.get("/yarns/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const yarn = await prisma.yarn.findUnique({
    where: {
      id: id,
    },
  });
  res.json(yarn);
});

router.post("/yarns", async (req: Request, res: Response) => {
  const { name } = req.body;
  const yarn = await prisma.yarn.create({
    data: {
      name: name,
    },
  });
  res.json(yarn);
});

router.put("/yarns/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const yarn = await prisma.yarn.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });
  res.json(yarn);
});

router.delete("/yarn/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const yarn = await prisma.yarn.delete({
    where: {
      id: id,
    },
  });
  res.json(yarn);
});

export default router;
