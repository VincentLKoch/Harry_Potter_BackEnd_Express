import Dal from "./Dal";
//import class:
import Points from "./class/Points";
import Student from "./class/Student";
import Professor from "./class/Professor";

export default {
  addProfessor: async (firstName, lastName, genre) => {
    try {
      return await Dal.addProfessor(
        new Professor(null, firstName, lastName, genre)
      );
    } catch (err) {
      throw err;
    }
  },

  removeProfessor: async id => {
    try {
      return await Dal.removeProfessor(id);
    } catch (err) {
      throw err;
    }
  },

  addStudent: async (firstName, lastName, genre, idHouse) => {
    try {
      return await Dal.addStudent(
        new Student(null, firstName, lastName, genre, idHouse)
      );
    } catch (err) {
      throw err;
    }
  },

  removeStudent: async id => {
    try {
      return await Dal.removeStudent(id);
    } catch (err) {
      throw err;
    }
  },

  addPoints: async (nb_points, id_professor, id_house) => {
    try {
      return await Dal.addPoints(
        new Points(null, nb_points, id_professor, id_house)
      );
    } catch (err) {
      throw err;
    }
  },

  endOfTheYear: async () => {
    try {
      return await Dal.endOfTheYear();
    } catch (err) {
      throw err;
    }
  },

  getHouseNameAndId: async () => {
    try {
      return await Dal.getHouseNameAndId();
    } catch (err) {
      throw err;
    }
  }
};
