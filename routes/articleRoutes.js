import express from "express";
import Articel from "../models/Article.js";
import bodyParser from "body-parser";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const articles = await Articel.find().sort({ date: -1 });
    res.render("Homepage", { articles: articles });
  } catch (err) {
    console.error(err);
    res.send("Es ist ein Fehler aufgetreten" + err.message);
  }
});

router.post("/create", async (req, res) => {
  const { title, author, content, tags } = req.body;

  try {
    const newArticle = new Articel({
      title,
      author,
      content,
      tags,
    });

    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (err) {
    console.error(err);
    res.status(500).send("Es ist ein Fehler aufgetreten" + err.message);
  }
});

router.get("/create/show", async (req, res) => {
  try {
    res.render("create");
  } catch (err) {
    console.error(err);
    res.send("Es ist ein Fehler aufgetreten" + err.message);
  }
});

export default router;
