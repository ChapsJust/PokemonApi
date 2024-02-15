// Description: Api pokemon
const dotenv = require("dotenv");
const morgan = require("morgan");
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const app = express();
dotenv.config();
const port = process.env.PORT;
<<<<<<< HEAD
const routes = require("./.src/routes/pokemon");
const swaggerDocument = require("./.src/config/documentation.json");

const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Demo API"
};
=======
const routes = require("./src/routes/pokemon");
>>>>>>> 5bc1c4782c9d0e368d0319eaf8f0160f9d20546e

app.use(morgan("dev"));
app.use(express.json());

app.use('/api/pokemons', routes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




