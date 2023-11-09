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
    const sizes = prisma.size.findMany();
    const yarns = prisma.yarn.findMany();
    const works = prisma.work.findMany();
    const styles = prisma.style.findMany();
    // const articles = prisma.article.findMany();
    const colors = prisma.color.findMany();

    let results = await Promise.all([
      sizes,
      yarns,
      works,
      styles,
      // articles,
      colors,
    ]);

    let resultsObj = {
      sizes: results[0],
      yarns: results[1],
      works: results[2],
      styles: results[3],
      // articles: results[4],
      colors: results[4],
    };

    res.json(resultsObj).status(200);
  } catch (error) {
    res.send(error).status(500);
  }
});

export default router;
