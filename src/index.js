const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const wordRoutes = require("./routes/wordRoutes");
const movieRoutes = require("./routes/movieRoutes");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const morgan = require("morgan");
const passport = require("passport");
require("./config/passport")(passport);

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(morgan("combined"));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

app.use("/api/words", wordRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/users", userRoutes);
connectDB();

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// const client = new MongoClient(process.env.MONGO_URI, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
