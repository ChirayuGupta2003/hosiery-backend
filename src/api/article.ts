import express, { Request, Response, NextFunction } from "express";
import { prisma } from "../db";

const router = express.Router();

router.get(
  "/articles",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const articles = await prisma.article.findMany();
      res.json(articles);
    } catch (error) {
      res.send(error).status(500);
    }
  }
);

router.get(
  "/articles/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const article = await prisma.article.findUnique({
        where: {
          id: id,
        },
      });
      res.json(article);
    } catch (error) {
      next();
    }
  }
);

router.post("/articles", async (req: Request, res: Response) => {
  try {
    const { yarnId, styleId, workId, sizeId, stock, articleNumber, image } =
      req.body;

    const art = await prisma.article.findFirst({
      where: { articleNumber: articleNumber },
    });
    console.log(art);

    if (art) {
      return res
        .send({ message: "Article number already exists", success: false })
        .status(400);
    }

    const article = await prisma.article.create({
      data: {
        yarnId: yarnId,
        styleId: styleId,
        workId: workId,
        sizeId: sizeId,
        stock: stock,
        articleNumber: articleNumber,
        image: image,
      },
    });
    res.json({ article, success: true });
  } catch (error) {
    res.send(error).status(500);
  }
});

router.put("/articles/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { yarnId, styleId, workId, sizeId, stock, articleNumber } = req.body;
    const article = await prisma.article.update({
      where: {
        id: id,
      },
      data: {
        yarnId: yarnId,
        styleId: styleId,
        workId: workId,
        sizeId: sizeId,

        stock: stock,
        articleNumber: articleNumber,
      },
    });
    res.json(article);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.delete("/articles/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const article = await prisma.article.delete({
      where: {
        id: id,
      },
    });
    res.json(article);
  } catch (error) {
    res.send(error).status(500);
  }
});

export default router;
