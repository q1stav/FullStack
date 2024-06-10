const express = require("express");
const chalk = require("chalk");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { register, login, getMe } = require("./controllers/userController");
const { feedbackSend,feedbackGet}=require("./controllers/feedBackController")
const {vacancySend}=require("./controllers/vacancyController")
const { loginValidation } = require("./validations/auth");
const { feedbackValidation } = require("./validations/feedbackValidation");
const cors = require("cors");
const checkAuth = require("./utils/checkAuth");

const port = 3001;
const app = express();

app.set("views", "pages");
app.set("view engine", "ejs");

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/auth/register", loginValidation, register);

app.post("/auth/login", login);

app.get("/auth/me", checkAuth, getMe);



app.post("/feedback/send", feedbackValidation ,feedbackSend)

app.get("/feedback/get",feedbackGet)



app.post("vacancy/send",vacancyValidation,vacancySend)


// // console.log(req.body);
// // res.json({'message':'Form Submited'})

// // app.get("/login", async (req, res) => {
// //   res.render("login", {
// //     title: "Express App",
// //     error: undefined,
// //   });
// // });

// // app.get("/register", async (req, res) => {
// //   res.render("register", {
// //     title: "Express App",
// //     error: undefined,
// //   });
// // });
// // app.post("/login", async (req, res) => {
// //   try {
// //     const token = await loginUser(req.body.email, req.body.password);
// //     res.cookie("token", token, { httpOnly: true });
// //     res.redirect("/");
// //   } catch (e) {
// //     res.render("login", {
// //       title: "Express App",
// //       error: e.message,
// //     });
// //   }
// // });

// // app.post("/register", async (req, res) => {
// //   try {
// //     await addUser(req.body.email, req.body.password);
// //     res.redirect("/login");
// //   } catch (e) {
// //     if (e.code === 11000) {
// //       res.render("register", {
// //         title: "Express App",
// //         error: "Email is alredy registered",
// //       });
// //       return;
// //     }
// //     res.render("register", {
// //       title: "Express App",
// //       error: e.message,
// //     });
// //   }
// // });

// // app.get("/logout", async (req, res) => {
// //   res.cookie("token", "", { httpOnly: true });
// //   res.redirect("/login");
// // });

// app.use(auth);

// app.get("/getNotes", async (req, res) => {
//   res.render("index", {
//     title: "Express App",
//     notes: await getNotes(),
//     userEmail: req.user.email,
//     created: false,
//     error: false,
//   });
// });

// app.post("/", async (req, res) => {
//   try {
//     await addNode(req.body.title, req.user.email);
//     res.render("index", {
//       title: "Express App",
//       notes: await getNotes(),
//       userEmail: req.user.email,
//       created: true,
//       error: false,
//     });
//   } catch (e) {
//     console.log("Creation error:", e);
//     res.render("index", {
//       title: "Express App",
//       notes: await getNotes(),
//       userEmail: req.user.email,
//       created: false,
//       error: true,
//     });
//   }
// });

// app.delete("/:id", async (req, res) => {
//   try {
//     await removeNote(req.params.id);
//     res.render("index", {
//       title: "Express App",
//       notes: await getNotes(),
//       userEmail: req.user.email,
//       created: false,
//       error: false,
//     });
//   } catch (e) {
//     res.render("index", {
//       title: "Express App",
//       notes: await getNotes(),
//       userEmail: req.user.email,
//       created: false,
//       error: e.message,
//     });
//   }
// });

// app.put("/:id", async (req, res) => {
//   try {
//     await editNote(req.params.id, req.body.title);
//     res.render("index", {
//       title: "Express App",
//       notes: await getNotes(),
//       userEmail: req.user.email,
//       created: false,
//     });
//   } catch (e) {
//     res.render("index", {
//       title: "Express App",
//       notes: await getNotes(),
//       userEmail: req.user.email,
//       created: false,
//       error: e.message,
//     });
//   }
// });

mongoose
  .connect(
    "mongodb+srv://kmi76236:Qwewerty123@cluster0.qbdzbou.mongodb.net/restaurant?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(chalk.green(`Server has been started on port ${port}...`));
    });
  });
