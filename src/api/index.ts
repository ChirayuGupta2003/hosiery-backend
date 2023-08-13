import express, { Request, Response } from "express";
import { prisma } from "../db";
import * as yarnRouter from "./yarn";
import * as sizeRouter from "./size";
import * as workRouter from "./work";
import * as styleRouter from "./style";
import * as articleRouter from "./article";
import * as colorRouter from "./color";

const router = express.Router();

router.use("/", yarnRouter.default);
router.use("/", sizeRouter.default);
router.use("/", workRouter.default);
router.use("/", styleRouter.default);
router.use("/", articleRouter.default);
router.use("/", colorRouter.default);

router.get("/get-all", async (req: Request, res: Response) => {
  try {
    const sizes = await prisma.size.findMany();
    const yarns = await prisma.yarn.findMany();
    const works = await prisma.work.findMany();
    const styles = await prisma.style.findMany();
    const articles = await prisma.article.findMany();
    const colors = await prisma.color.findMany();
    res.json({ sizes, yarns, works, styles, articles, colors });
  } catch (error) {
    res.send(error).status(500);
  }
});

export default router;
