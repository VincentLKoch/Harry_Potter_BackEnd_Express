import Dal from "./dal";
//import class:
import Points from "./class/Points";
import Student from "./class/Student";
import Professor from "./class/Professor";

export default class Hogwarts {
  //TODO Class => arrow function
  constructor() {
    this.dal = new Dal();
  }

  async addProfessor(firstName, lastName, genre) {
    try {
      return await this.dal.addProfessor(
        new Professor(null, firstName, lastName, genre)
      );
    } catch (err) {
      throw err;
    }
  }

  async removeProfessor(id) {
    try {
      return await this.dal.removeProfessor(id);
    } catch (err) {
      throw err;
    }
  }

  async addStudent(firstName, lastName, genre, idHouse) {
    try {
      return await this.dal.addStudent(
        new Student(null, firstName, lastName, genre, idHouse)
      );
    } catch (err) {
      throw err;
    }
  }

  async removeStudent(id) {
    try {
      return await this.dal.removeStudent(id);
    } catch (err) {
      throw err;
    }
  }

  async addPoints(nb_points, id_professor, id_house) {
    try {
      return await this.dal.addPoints(
        new Points(null, nb_points, id_professor, id_house)
      );
    } catch (err) {
      throw err;
    }
  }

  async endOfTheYear() {
    try {
      return await this.dal.endOfTheYear();
    } catch (err) {
      throw err;
    }
  }

  async getHouseNameAndId() {
    try {
      return await this.dal.getHouseNameAndId();
    } catch (err) {
      throw err;
    }
  }
}
