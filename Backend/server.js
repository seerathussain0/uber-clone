const http  = require('http');
const app = require('./app');
const connectDB = require('./db/db.js');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });
