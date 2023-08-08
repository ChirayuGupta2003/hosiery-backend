import express, { Request, Response } from "express";
import { prisma } from "../db";

const router = express.Router();

router.get("/styles", async (req: Request, res: Response) => {
  try {
    const allStyles = await prisma.style.findMany();
    res.json(allStyles);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.get("/styles/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const style = await prisma.style.findUnique({
      where: {
        id: id,
      },
    });
    res.json(style);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.post("/styles", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const style = await prisma.style.create({
      data: {
        name: name,
      },
    });
    res.json(style);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.put("/styles/:id", async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    res.send(error).status(500);
  }
});

router.delete("/styles/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const style = await prisma.style.delete({
      where: {
        id: id,
      },
    });
    res.json(style);
  } catch (error) {
    res.send(error).status(500);
  }
});

export default router;
