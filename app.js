import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import path from "path";
import { fileURLToPath } from "url"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let taskes=[];

// Routes
app.get('/', (req, res) => {
    res.render('index',{tasks:taskes});
});

//Add router


app.post("/add",(req,res)=>{
    const {task}= req.body;
    console.log(task);
    taskes.push(task);
    // res.render("index",{tasks:taskes})
    res.redirect("/");
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

