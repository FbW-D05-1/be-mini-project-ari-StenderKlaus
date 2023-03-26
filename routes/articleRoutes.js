import express from "express";
import Articel from "../models/Article.js";

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

    await newArticle.save();
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Es ist ein Fehler aufgetreten" + err.message);
  }
});

router.get("/create", async (req, res) => {
  try {
    res.render("create");
  } catch (err) {
    console.error(err);
    res.send("Es ist ein Fehler aufgetreten" + err.message);
  }
});

router.get("/articles/:id", async (req, res) => {
  try {
    const article = await Articel.findById(req.params.id);
    res.render("singlepost", { article: article });
  } catch (err) {
    console.error(err);
    res.send("Es ist ein Fehler aufgetreten" + err.message);
  }
});

router.get("/articles/:id/edit", async (req, res) => {
  try {
    const article = await Articel.findById(req.params.id);
    res.render("edit", { article: article });
  } catch (err) {
    console.error(err);
    res.send("Es ist ein Fehler aufgetreten" + err.message);
  }
});

router.patch("/articles/:id/edit", async (req, res) => {
  const id = req.params.id;
  try {
    await Articel.updateOne({ _id: id }, { $set: req.body });
    res.redirect("/");
  } catch (err) {
    res.send("Es ist ein Fehler aufgetreten" + err.message);
    console.log(err);
  }
});

router.delete("/articles/:id/edit/delete", async (req, res) => {
  const id = req.params.id;
  try {
    await Articel.deleteOne({ _id: id });
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Es ist ein Fehler aufgetreten" + err.message);
  }
});

export default router;
