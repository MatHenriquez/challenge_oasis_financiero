const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const UserModel = require("../models/users.model");
const cors = require("cors");

const app = express();

const dbname = "MyUsers";

const password = "GGd3ddc0lc5mAkbf";

const uri = `mongodb+srv://matiashenriquezdev:${password}@cluster0.2fvecel.mongodb.net/?retryWrites=true&w=majority`;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Cors para poder acceder a la api desde el front.
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

  next();
});

// MongoDB connection
const connection = () =>
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/users", async (req, res) => { //Ruta para obtener todos los usuarios.
  try {
    await connection();
    const allUsers = await UserModel.find();
    console.log(allUsers);
    res.send(allUsers);
  } catch (error) {
    console.log(error);
  }
});

app.post("/users", async (req, res) => {
  try {
    await connection(); // Conexión a la base de datos
    const { firstName, lastName, email } = req.body; // Obtener los datos del usuario del cuerpo de la solicitud

    // Crear una instancia del modelo User con los datos proporcionados
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
    });

    // Guardar el nuevo usuario en la base de datos
    const savedUser = await newUser.save();

    res.status(201).json(savedUser); // Responder con el usuario guardado en la respuesta
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al crear el usuario." });
  }
});

module.exports = app;
