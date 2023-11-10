const express = require('express'); 

const app = express();
  
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!')
})



app.post('/', async (req, res) => {

    

    res.json({ message: 'Data received successfully', receivedData: data });
});


app.listen(port, () => {
    console.log(`Dynamic PPT Generator listening at port ${port}`)
})