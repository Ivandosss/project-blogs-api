const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

require('dotenv').config();

const PORT = process.env.PORT || 3000; 

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
