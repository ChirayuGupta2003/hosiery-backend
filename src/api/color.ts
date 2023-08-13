import express, { Request, Response } from "express";
import { prisma } from "../db";

const router = express.Router();

router.get("/colors", async (req: Request, res: Response) => {
  try {
    const allColors = await prisma.color.findMany();
    res.json(allColors);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.get("/colors/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const color = await prisma.color.findUnique({
      where: {
        id: id,
      },
    });
    res.json(color);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.post("/colors", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const color = await prisma.color.create({
      data: {
        name: name,
      },
    });
    res.json(color);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.put("/colors/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const color = await prisma.color.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
    res.json(color);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.delete("/colors/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const color = await prisma.color.delete({
      where: {
        id: id,
      },
    });
    res.json(color);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
