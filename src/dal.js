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

export default class Dal {
  //TODO Class => arrow function
  async connect() {
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
  }

  async addProfessor(newProfessor) {
    let connection;
    try {
      connection = await this.connect();
      return await connection.getRepository(Professor).save(newProfessor);
    } catch (err) {
      throw err;
    } finally {
      await connection.close();
    }
  }

  async removeProfessor(id) {
    let connection;
    try {
      connection = await this.connect();
      const result = await connection.getRepository(Professor).remove({ id });

      if (result.affected === 0 || !result.affected) {
        throw "Not found";
      }
      return;
    } catch (err) {
      throw err;
    } finally {
      await connection.close();
    }
  }

  async addStudent(newStudent) {
    let connection;
    try {
      connection = await this.connect();
      return await connection.getRepository(Student).save(newStudent);
    } catch (err) {
      throw err;
    } finally {
      await connection.close();
    }
  }

  async removeStudent(id) {
    let connection;
    try {
      connection = await this.connect();
      const result = await connection.getRepository(Student).remove({ id });

      if (result.affected === 0 || !result.affected) {
        throw "Not found";
      }
      return;
    } catch (err) {
      throw err;
    } finally {
      await connection.close();
    }
  }

  async addPoints(newPoints) {
    let connection;
    try {
      connection = await this.connect();
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
    } catch (err) {
      throw err;
    } finally {
      await connection.close();
    }
  }

  async endOfTheYear() {
    let connection;
    try {
      connection = await this.connect();

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
    } catch (err) {
      throw err;
    } finally {
      await connection.close();
    }
  }

  //For store init in front
  async getHouseNameAndId() {
    let connection;
    try {
      connection = await this.connect();

      return await connection
        .getRepository(House)
        .createQueryBuilder("")
        .getMany();
    } catch (err) {
      throw err;
    } finally {
      await connection.close();
    }
  }
}
