import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const addpoint = "https://v2.jokeapi.dev/joke";

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("index.ejs", { content: "(Set parameters and click 'Send Request' above)" });
});

app.get("/submit", async (req, res) => {
    let category = [];

    if (req.query.category === "Custom" && req.query.categoryName) {
        category.push(req.query.categoryName);
    } else {
        category.push("Any");
    }

    const format = req.query.format || "json"; // Default to 'json' if format is not specified
    const lang = req.query.language || "en";   // Default to 'en' (English) if language is not specified
    const jokeType = req.query.jokeType || "single";
    const contains = req.query.searchString||"";
    const range = Array.isArray(req.query.range)? req.query.range.join("-") : "0-1367";
    const amount = req.query.amount || 1;

    try {
        const response = await axios.get(`${addpoint}/${category.join(",")}?format=${format}&lang=${lang}&type=${jokeType}&contains=${contains}&range=${range}&amount=${amount}`);
        const result = JSON.stringify(response.data, null, 2);
        res.render("index.ejs", { content: result });
        
        console.log(`${addpoint}/${category.join(",")}?format=${format}&lang=${lang}&type=${jokeType}&contains=${contains}&range=${range}&amount=${amount}`);
    } catch (error) {
        const errorMsg = `Error fetching joke: ${error.response ? error.response.data.message : error.message}`;
        res.render("index.ejs", { content: errorMsg });
    }
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
