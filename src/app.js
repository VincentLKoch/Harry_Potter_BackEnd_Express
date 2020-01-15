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
  console.log("in ADD PROFESSOR, params: ", req.params);
  try {
    const { firstName, lastName, genre } = req.params;

    if (!["M", "F"].includes(genre)) {
      //if genre isn't M or F
      throw "bad params";
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
  console.log("in REMOVE PROFESSOR, params: ", req.params);
  try {
    const { id } = req.params;
    await Hogwarts.removeProfessor(id);
    res.status(204).end();
  } catch (error) {
    switch (error) {
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
    console.log("in ADD STUDENT, params: ", req.params);
    try {
      const { firstName, lastName, genre, idHouse } = req.params;

      if (
        !["M", "F"].includes(genre) ||
        !([1, 2, 3, 4].includes(parseInt(idHouse, 10)) || idHouse === undefined)
      ) {
        //if genre isn't M or F or if idHouse is defined but not 1 to 4
        throw "bad params";
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
  console.log("in REMOVE STUDENT, params: ", req.params);
  try {
    const { id } = req.params;
    await Hogwarts.removeStudent(id);
    res.status(204).end();
  } catch (error) {
    switch (error) {
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
  console.log("in REMOVE STUDENT, params: ", req.params);
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
  console.log("in END OF THE YEAR");
  try {
    const result = await Hogwarts.endOfTheYear();

    if (result.length === 0) {
      throw "No Points";
    }

    res
      .status(200)
      .set({ "Content-Type": "application/json" })
      .json(result)
      .end();
  } catch (error) {
    switch (error) {
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

// Get House Name And Id : (for init)
app.get("/getHouseNameAndId", async (req, res) => {
  console.log("in GET HOUSE NAME & ID");
  try {
    const result = await Hogwarts.getHouseNameAndId();
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
