const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/config/documentation.json');
const app = express();
const PORT = 3000;
const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "pokedex"
};
const authentification = require('./src/midleware/authentification.middleware');

app.use(express.json())
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
app.use('/api/pokemons', require('./src/routes/api/pokemons'));
app.use('/api/users', require('./src/routes/api/user'));

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});