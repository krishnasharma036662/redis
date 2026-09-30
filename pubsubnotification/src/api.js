import express from "express"

import Redis from "ioredis"

const app = express();
app.use(express.json());

const subscriber = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

app.post("/notification",async (req,res)=>{
    const payload ={
        title:req.body.title || "Default Title",
        createdAt: new Date().toISOString(),
    };
    const recievers = await publisher.publish(
        "notifications",
        JSON.stingify(payload),
    )
    res.json({message:`Notification sent to ${recievers} subscribers`});
})
app.listen(3000,(req,res)=>{
    console.log("running at port 3000")
})