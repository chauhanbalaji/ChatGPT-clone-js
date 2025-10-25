import express from 'express';
import cors from 'cors';
import { generate } from './chatbot.js';
import 'dotenv/config';


const app = express();

const PORT =  3001;
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to ChatDpt!');
});

// async function generate(message) {
//     return `You said: ${message}`;
// }

app.post('/chat', async(req, res) => {
    const {message, threadId} = req.body;


     if (message || !threadId) {
         res.status(400).json({ message: 'All field are requried '})
         return;
     }
    // console.log('Message',message);

    const result = await generate(message, threadId); 
    
    res.json({message: result});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});