import express from "express";
import pg from "pg";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

app.get("/users",async (req,res) => {
    try{
      const result = await pool.query("SELECT * FROM users");
      res.json(result.rows);
    }catch(err){
        res.status(500).json({error:"Internal Server Error"});
    }
})

async function initDb(){
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    )`);
}

app.post("/users",async (req,res)=> {
    try{
        const result = await pool.query("INSERT INTO users (name) VALUES ($1) RETURNING *", [req.body.name]);
        res.json(result.rows[0]);
    }catch(err){
        res.status(500).json({error:"Internal Server Error"});  
    }
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

initDb().then(()=>{
    console.log("Database initialized");
}).catch((err)=>{
    console.error("Error initializing database:", err);
});