import express, { Request, Response } from "express";
import { prisma } from "../db";

const router = express.Router();

router.get("/sizes", async (req: Request, res: Response) => {
  try {
    const allSizes = await prisma.size.findMany();
    res.json(allSizes);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.get("/sizes/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const size = await prisma.size.findUnique({
      where: {
        id: id,
      },
    });
    res.json(size);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.post("/sizes", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const size = await prisma.size.create({
      data: {
        name: name,
      },
    });
    res.json(size);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.put("/sizes/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const size = await prisma.size.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
    res.json(size);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.delete("/sizes/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const size = await prisma.size.delete({
      where: {
        id: id,
      },
    });
    res.json(size);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
