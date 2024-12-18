// const { name } = require("ejs");
// const express = require("express");
// const app = express();
// app.set("view engine" , "ejs");
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// let users = [];
// app.get("/",(req,res)=>{
//     res.render("RegForm")
// })

// app.post("/register",(req,res)=>{
//     const{name , email , password} = req.body
//     users.push({
//         name:name,
//         email:email,
//         password:password
//         })

//     console.log(name);
//     console.log(email);
    
//     res.send("Working")
//     console.log(req.body);

    
// })
// app.get('/show',(req,res)=>{
//     res.render("showRecords", {users})
    
// })

// const port = 3000;
// app.listen(port,()=>{
//     console.log(`App is listening on port ${port}`);
    
// })



const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = [];

// Registration route
app.get("/", (req, res) => {
    res.render("RegForm");
});

// Registration handler
app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send("Please fill in all fields");
    }

    const user = { name, email, password };
    users.push(user);
    res.redirect("/show");
});

// Show users route
app.get("/show", (req, res) => {
    res.render("showRecords", { users });
});

// Edit user route
app.get("/edit/:index", (req, res) => {
    const index = req.params.index;
    const user = users[index];
    res.render("editUser ", { user, index });
});

// Update user route
app.post("/update/:index", (req, res) => {
    const index = req.params.index;
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send("Please fill in all fields");
    }

    users[index] = { name, email, password };
    res.redirect("/show");
});

// Delete user route
app.post("/delete/:index", (req, res) => {
    const index = req.params.index;
    users.splice(index, 1);
    res.redirect("/show");
});

// Start the server
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});




                                      


