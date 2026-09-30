import express  from "express"
import Redis from "ioredis"

const app = express()
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

app.use(express.json())

function otpKey(phone){
    return `otp:${phone}`
}

app.post('/otp',async (req,res)=>{
    const {phone} = req.body;
    const otp = Math.floor(100000 + Math.random()*900000).toString();

    await redis.set(otpKey(phone),otp,'EX',30)
    res.json({message:'OTP sent',otp})
})

app.post('/otp/verify',async (req,res)=>{
    const{phone,otp} = req.body;
    const saved = await redis.get(otpKey(phone));

    if(!saved){
        return res.status(400).json({message:"OTP expired or not found"});
    }

    if(saved !== otp){
            return res.status(400).json({message:"Invalid OTP"});
        }
    res.json({success:"verified"})
     await redis.del(otpKey(phone))
})

app.post('/otp/:phone/ttl', async(req,res)=>{
    const ttl=await redis.ttl(otpKey(req.params.phone))
    res.json({ttl:ttl})
})


app.listen(3000,(req,res)=>{
    console.log("running at port 3000")
})