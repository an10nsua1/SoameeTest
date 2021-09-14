const express = require('express');
const port = 3002;
const app = express();
const routes = require('./routes/routes');
const cors = require('cors')

//Express preparation
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


routes(app);

// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
 
    console.log(`Server listening on port ${server.address().port}`);
});