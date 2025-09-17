import express from "express";
import bodyParser from "body-parser";
import { Pool } from "pg";
import path from "path";
import { fileURLToPath } from "url";

//data bace connect
// const db = new pg.Client({
//   user: "postgres",
//   host: "localhost",
//   database: "world",
//   password: "Rohan@25",
//   port: 5432,
// });



const pool = new Pool({
  user: "helloejsapp",
  host: "dpg-d3543uur433s738gjdug-a.oregon-postgres.render.com",
  database: "helloejsapp",
  password: "6jBglwqG3C3VitJtE3rmJ8mz5ZcHceKx",
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});


pool.connect()
  .then(client => {
    console.log("Database connected");
    client.release();
  })
  .catch(err => {
    console.error("Database connection error", err.stack);
  });


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// db.connect();

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
    const result = await pool.query(query);
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
    await pool.query(query, [task]);
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
    await pool.query(query1, [id]);
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
    await pool.query(query2);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting Todo_list_backend", err.stack);
    res.status(500).send('Database error');
  }

});

//edit router
app.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { editedTask } = req.body;
  console.log(id);
  console.log(editedTask);
  try {
    const query = `
      UPDATE Todo_list_backend
      SET task = $1
      WHERE id = $2
    `;
    await pool.query(query, [editedTask, id]);
    // res.send('Todo_list_backend updated successfully!');
    res.redirect("/");
  } catch (err) {
    console.error("Error updating Todo_list_backend", err.stack);
    res.status(500).send('Database error');
  }
});



// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
