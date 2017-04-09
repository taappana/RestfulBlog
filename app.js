const bodyParser    = require("body-parser"),
mongoose            = require("mongoose"),
express             = require("express"),
app                 = express();

// APP CONFIG    
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES
app.get("/", (req, res) => {
    res.redirect("/blogs"); 
});

// INDEX RUOTE
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err){
            console.log("ERROR!!!");
        }
            res.render("index", {blogs: blogs}); 
    })
});

// NEW ROUTE
app.get("/blogs/new", (req, res) => {
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", (req, res) => {
    Blog.create(req.body.blog, (err, newBlog) => {
        if(err){
            res.render("new");
        }
            res.redirect("/blogs");    
    });
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("SERVER IS RUNNING!"); 
});