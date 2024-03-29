import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";

import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use(bodyParser.json())

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello JaydenX",
  });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
        model:"text-davinci-003",
        prompt:`${prompt}`,
        temperature:0,
        max_tokens:3000,
        top_p:1,
        frequency_penalty:0.5,
        presence_penalty:0,

  });

    res.status(200).send({
        bot:response.data.choices[0].text
    })
  } catch (error) {
    res.status(500).send({error})
  }
});

app.listen(5000, ()=>{
    'Server is runing on port 5000'
})
