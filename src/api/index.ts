import express, { Request, Response } from "express";
import { prisma } from "../db";
import * as yarnRouter from "./yarn";
import * as sizeRouter from "./size";
import * as workRouter from "./work";
import * as styleRouter from "./style";
import * as articleRouter from "./article";

const router = express.Router();

router.use("/", yarnRouter.default);
router.use("/", sizeRouter.default);
router.use("/", workRouter.default);
router.use("/", styleRouter.default);
router.use("/", articleRouter.default);

router.get("/get-all", async (req: Request, res: Response) => {
  const sizes = await prisma.size.findMany();
  const yarns = await prisma.yarn.findMany();
  const works = await prisma.work.findMany();
  const styles = await prisma.style.findMany();
  res.json({ sizes, yarns, works, styles });
});

export default router;
