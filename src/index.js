const express = require('express');
require('./db/mongoose');
const bookmarkRouter = require('./routers/bookmark');
const tagRouter = require('./routers/tag');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(bookmarkRouter);
app.use(tagRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});