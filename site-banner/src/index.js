import express from "express"
import Redis from "ioredis"
import mongo from "mongoose"

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

const BANNER_KEY = "app:banner"

app.post("/banner", async (req,res) => {
    redis.set(BANNER_KEY, req.body.message || "Welcome to our app");
    res.json({success:true});
});

app.get("/banner",async(req,res)=>{
    const message = await redis.get(BANNER_KEY) || "welcome to our redis"
    res.json({message:message})
})

app.delete("/banner",async(req,res)=>{
    const message = await redis.del(BANNER_KEY)
    res.json({success:true})
})

app.get("/banner/exists",async(req,res)=>{
    const message = await redis.get(BANNER_KEY) 
    res.json({success:true})
})

app.listen(3000,(req,res)=>{
    console.log("running at port 3000")
})