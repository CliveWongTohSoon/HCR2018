const express = require('express');
const app = express();

app.use(express.static('dist'));

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
