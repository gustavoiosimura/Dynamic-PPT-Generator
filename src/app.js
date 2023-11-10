const express = require('express');
const JSZip = require('jszip');

const app = express();
 
app.use(express.json({limit: '50mb'}));
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!')
})



app.post('/', async (req, res) => {
    const data = req.body;  

    // Decode the base64 string to a Buffer
    const pptxBuffer = Buffer.from(data.pptx, 'base64');

    // Creates a JSZip instance to work with the PowerPoint file
    const zip = new JSZip();
    await zip.loadAsync(pptxBuffer);

    // Find and replace #token# in all XML files inside the PPTX
    const files = zip.files;
    for (const file in files) {
        if (file.endsWith('.xml')) {
            const content = await files[file].async('string');
            let updatedContent = content.replace(/#token#/g, `my-var`); 
            zip.file(file, updatedContent);
    }

    // Generate the modified PPTX
    const modifiedPptxBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    // Encode the modified PPTX Buffer as a Base64 string
    const modifiedPptxBase64 = modifiedPptxBuffer.toString('base64');

    res.json({ message: 'Data received successfully', pptx: modifiedPptxBase64 });
});


app.listen(port, () => {
    console.log(`Dynamic PPT Generator listening at port ${port}`)
})