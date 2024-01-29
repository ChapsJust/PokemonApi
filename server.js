// Description: Api pokemon
const dotenv = require("dotenv");
const morgan = require("morgan");
const express = require('express');
const app = express();
dotenv.config();
const port = process.env.PORT;
const routes = require("./.src/routes/pokemon");

app.use(morgan("dev"));
app.use(express.json());

app.use('/api/pokemons', routes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


