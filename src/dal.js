import { createConnection } from "typeorm";

//import Class:
import House from "./class/House";
import Points from "./class/Points";
import Professor from "./class/Professor";
import Student from "./class/Student";

//Import Schema:
import houseSchema from "./entity/houseSchema";
import pointsSchema from "./entity/pointsSchema";
import professorSchema from "./entity/professorSchema";
import studentSchema from "./entity/studentSchema";

const connect = async () => {
  try {
    return await createConnection({
      type: "mysql",
      host: "0.0.0.0",
      port: 3306,
      username: "root",
      password: "root",
      database: "db_harrypotter",
      entities: [houseSchema, pointsSchema, professorSchema, studentSchema]
    });
  } catch (err) {
    console.error("Unable to connect");
    throw err;
  }
};

export default {
  addProfessor: async newProfessor => {
    let connection;
    try {
      connection = await connect();
      return await connection.getRepository(Professor).save(newProfessor);
    } finally {
      await connection.close();
    }
  },

  removeProfessor: async id => {
    let connection;
    try {
      connection = await connect();

      const { affected } = await connection
        .createQueryBuilder()
        .delete()
        .from(Professor)
        .where("id = :id", { id })
        .execute();

      if (affected === 0 || !affected) {
        throw new Error("Not found");
      }
      return;
    } finally {
      await connection.close();
    }
  },

  getAllProfessor: async () => {
    let connection;
    try {
      connection = await connect();
      return await connection
        .getRepository(Professor)
        .createQueryBuilder("")
        .getMany();
    } finally {
      await connection.close();
    }
  },

  addStudent: async newStudent => {
    let connection;
    try {
      connection = await connect();
      return await connection.getRepository(Student).save(newStudent);
    } finally {
      await connection.close();
    }
  },

  removeStudent: async id => {
    let connection;
    try {
      connection = await connect();
      const { affected } = await connection
        .createQueryBuilder()
        .delete()
        .from(Student)
        .where("id = :id", { id })
        .execute();

      if (affected === 0 || !affected) {
        throw new Error("Not found");
      }
      return;
    } finally {
      await connection.close();
    }
  },

  getAllStudent: async () => {
    let connection;
    try {
      connection = await connect();
      return await connection
        .getRepository(Student)
        .createQueryBuilder("")
        .getMany();
    } finally {
      await connection.close();
    }
  },

  addPoints: async newPoints => {
    let connection;
    try {
      connection = await connect();
      await connection.getRepository(Points).save(newPoints);

      //Get new sum of points for this house :
      return await connection
        .getRepository(Points)
        .createQueryBuilder("entryPoints")
        .select("SUM(`nb_points`)", "total")
        .where("entryPoints.id_house = :houseID", {
          houseID: newPoints.id_house
        })
        .getRawOne();
    } finally {
      await connection.close();
    }
  },

  getPoints: async id => {
    console.log("in getPoints, id: ", id);
    let connection;
    try {
      connection = await connect();
      return await connection
        .getRepository(Points)
        .createQueryBuilder("entryPoints")
        .select("SUM(`nb_points`)", "total")
        .where("entryPoints.id_house = :houseID", {
          houseID: id
        })
        .getRawOne();
    } finally {
      await connection.close();
    }
  },

  endOfTheYear: async () => {
    let connection;
    try {
      connection = await connect();

      const result = await connection
        .getRepository(Points)
        .createQueryBuilder("entryPoints")
        .select("id_house", "house")
        .addSelect("SUM(`nb_points`)", "total")
        .groupBy("id_house")
        .orderBy("total", "DESC")
        .getRawMany();

      //Clear this year points now that we got the result
      await connection.getRepository(Points).query("TRUNCATE TABLE points");
      return result;
    } finally {
      await connection.close();
    }
  },

  //For store init in front
  getHouseNameAndId: async () => {
    let connection;
    try {
      connection = await connect();

      return await connection
        .getRepository(House)
        .createQueryBuilder("")
        .getMany();
    } finally {
      await connection.close();
    }
  }
};
