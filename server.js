require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const pool = require("./config/database");
const blogRoutes = require("./routes/blogRoutes");
const app = express();
const migrate = require('./migrate');

const testConnection = async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("✓ Database connected at:", result.rows[0].now);
  } catch (err) {
    console.error("✗ Database connection failed:", err.message);
    throw err;
  }
};

//register view engine
app.set("view engine", "ejs");

//middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

const PORT = process.env.PORT || 3000;

// Start server with migration
const startServer = async () => {
  try {
    await testConnection();
    await migrate();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();