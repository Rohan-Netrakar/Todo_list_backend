import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import path from "path";
import { fileURLToPath } from "url";

//data bace connect
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Bhoomika@22",
  port: 5432,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

db.connect();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//let taskes = [];

// Routes
app.get("/", async (req, res) => {
  try {
    const query = `
      SELECT id, task
      FROM Todo_list_backend 
      ORDER BY id ASC
    `;
    const result = await db.query(query);
    res.render("index", { tasks: result.rows });
  } catch (err) {
    console.error("Error retrieving Todo_list_backends", err.stack);
    res.status(500).send("Database error");
  }
  
});

//Add router
app.post("/add", async (req, res) => {
  const { task } = req.body;
  console.log(task);

  //taskes.push(task);
  // res.render("index",{tasks:taskes})
  //res.redirect("/");

  try {
    const query = `
      INSERT INTO Todo_list_backend (task)
      VALUES ($1)
    `;
    await db.query(query, [task]);
    //res.send(`${task} added successfully!`);
    res.redirect("/");
  } catch (err) {
    console.error("Error inserting Todo_list_backend", err.stack);
    res.status(500).send("Database error");
  }
  
});

//Delete router  "/delete/:id"
app.post("/delete/:id",async (req, res) => {
//   taskes.shift();
//   res.redirect("/");
const id = req.params.id;
console.log(id);
  try {
    const query1 = `
      DELETE FROM Todo_list_backend 
      WHERE id = $1
    `;
    await db.query(query1, [id]);
    //res.send('Todo_list_backend deleted successfully!');

    const query2 = `
      WITH reordered AS (
        SELECT id, ROW_NUMBER() OVER (ORDER BY id) AS new_id
        FROM Todo_list_backend
      )
      UPDATE Todo_list_backend t
      SET id = r.new_id
      FROM reordered r
      WHERE t.id = r.id;
    `;
    await db.query(query2);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting Todo_list_backend", err.stack);
    res.status(500).send('Database error');
  }

});

app.post("/edit", (req, res) => {});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
