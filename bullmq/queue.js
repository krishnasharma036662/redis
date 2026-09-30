import { Queue } from "bullmq";
import { hostname } from "node:os";

const connection = {
    host:'localhost',
    port:6379
};

const emailQueue = new Queue('email',{connection})

module.exports = {
  connection,
  emailQueue
}