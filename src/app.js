import express from "express";
import bodyParser from "body-parser";
import Hogwarts from "./Hogwarts";

const app = express();

// Setup :
app.use(bodyParser.json());
app.use(function(_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Add Professor :
app.get("/addProfessor/:firstName&:lastName&:genre", async (req, res) => {
  const dateTime = new Date();
  console.log(
    dateTime.getHours(),
    ":",
    dateTime.getMinutes(),
    ":",
    dateTime.getSeconds(),
    "in ADD PROFESSOR, params: ",
    req.params
  );
  try {
    const { firstName, lastName, genre } = req.params;

    if (!["M", "F"].includes(genre)) {
      //if genre isn't M or F
      throw new Error("bad params");
    }

    const result = await Hogwarts.addProfessor(firstName, lastName, genre);
    res
      .status(200)
      .set({ "Content-Type": "application/json" })
      .json(result)
      .end();
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
});

// Remove Professor :
app.delete("/removeProfessor/:id", async (req, res) => {
  const dateTime = new Date();
  console.log(
    dateTime.getHours(),
    ":",
    dateTime.getMinutes(),
    ":",
    dateTime.getSeconds(),
    "in REMOVE PROFESSOR, params: ",
    req.params
  );
  try {
    const { id } = req.params;
    await Hogwarts.removeProfessor(id);
    res.status(204).end();
  } catch (error) {
    switch (error.message) {
      case "Not found":
        res.status(404).end();
        break;

      default:
        console.log(error); //only log unknows error
        res.status(400).end();
        break;
    }
  }
});

// Add Student :
app.get(
  "/addStudent/:firstName&:lastName&:genre&:idHouse?",
  async (req, res) => {
    const dateTime = new Date();
    console.log(
      dateTime.getHours(),
      ":",
      dateTime.getMinutes(),
      ":",
      dateTime.getSeconds(),
      "in ADD STUDENT, params: ",
      req.params
    );
    try {
      const { firstName, lastName, genre, idHouse } = req.params;

      if (
        !["M", "F"].includes(genre) ||
        !([1, 2, 3, 4].includes(parseInt(idHouse, 10)) || idHouse === undefined)
      ) {
        //if genre isn't M or F or if idHouse is defined but not 1 to 4
        throw new Error("bad params");
      }

      //Sorting Hat:
      const idHouse2 =
        idHouse !== undefined
          ? parseInt(idHouse, 10)
          : Math.floor(Math.random() * 4) + 1;

      const result = await Hogwarts.addStudent(
        firstName,
        lastName,
        genre,
        idHouse2
      );

      res
        .status(200)
        .set({ "Content-Type": "application/json" })
        .json(result)
        .end();
    } catch (error) {
      console.log(error);
      res.status(400).end();
    }
  }
);

// Remove Student :
app.delete("/removeStudent/:id", async (req, res) => {
  const dateTime = new Date();
  console.log(
    dateTime.getHours(),
    ":",
    dateTime.getMinutes(),
    ":",
    dateTime.getSeconds(),
    "in REMOVE STUDENT, params: ",
    req.params
  );
  try {
    const { id } = req.params;
    await Hogwarts.removeStudent(id);
    res.status(204).end();
  } catch (error) {
    switch (error.message) {
      case "Not found":
        res.status(404).end();
        break;

      default:
        console.log(error);
        res.status(400).end();
        break;
    }
  }
});

// Add Points :
app.post("/addPoints/:nb_points&:id_professor&:id_house", async (req, res) => {
  const dateTime = new Date();
  console.log(
    dateTime.getHours(),
    ":",
    dateTime.getMinutes(),
    ":",
    dateTime.getSeconds(),
    "in ADD POINTS, params: ",
    req.params
  );
  try {
    const { nb_points, id_professor, id_house } = req.params;
    const result = await Hogwarts.addPoints(nb_points, id_professor, id_house);

    res
      .status(200)
      .set({ "Content-Type": "application/json" })
      .json({ added: nb_points, ...result })
      .end();
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
});

// End of the Year :
app.get("/endOfTheYear", async (req, res) => {
  const dateTime = new Date();
  console.log(
    dateTime.getHours(),
    ":",
    dateTime.getMinutes(),
    ":",
    dateTime.getSeconds(),
    "in END OF THE YEAR"
  );
  try {
    const result = await Hogwarts.endOfTheYear();

    if (result.length === 0) {
      throw new Error("No Points");
    }

    res
      .status(200)
      .set({ "Content-Type": "application/json" })
      .json(result)
      .end();
  } catch (error) {
    switch (error.message) {
      case "No Points":
        res.status(404).end();
        break;

      default:
        console.log(error);
        res.status(400).end();
        break;
    }
  }
});

// get Init Data :
app.get("/getInitData", async (req, res) => {
  const dateTime = new Date();
  console.log(
    dateTime.getHours(),
    ":",
    dateTime.getMinutes(),
    ":",
    dateTime.getSeconds(),
    "in GET HOUSE NAME & ID"
  );

  try {
    const result = await Hogwarts.getInitData();
    res
      .status(200)
      .set({ "Content-Type": "application/json" })
      .json(result)
      .end();
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
});

export default app;
