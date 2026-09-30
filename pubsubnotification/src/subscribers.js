import Redis from "ioredis"
import { channel } from "node:diagnostics_channel";

const subscriber = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

subscriber.subscribe("notificatios",(err)=>{
    if(err){
        console.error("Failed to subscribe: %s",err.message)
        return;
    }
    console.log("subscribed successfully")
})

subscriber.on("message",(channel,message)=>{
    console.log("Received on",channel,":",JSON.parse(message))
})