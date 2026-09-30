import express from "express"
import Redis from "ioredis"

const app = express();
app.use(express.json())

app.post("/welcome-email",async (req,res)=>{
    const job = emailQueue.add("send-welcome-email",
        {
            to: req.body.to,
            name: req.body.name || "Learner",
        },
        {
            attempts:3,
            backoff:{
                type:"exponential",
                delay:1000
            }
        }
    )
})

app.listen(3000,()=>{
    console.log("running on port 3000")
})