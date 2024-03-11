const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());

app.use('/api/citations', require('./src/routes/api/citations'));

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});