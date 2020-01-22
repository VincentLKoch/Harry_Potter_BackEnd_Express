import Dal from "./Dal";
//import class:
import Points from "./class/Points";
import Student from "./class/Student";
import Professor from "./class/Professor";

export default {
  addProfessor: async (firstName, lastName, genre) => {
    return await Dal.addProfessor(
      new Professor(null, firstName, lastName, genre)
    );
  },

  removeProfessor: async id => {
    return await Dal.removeProfessor(id);
  },

  addStudent: async (firstName, lastName, genre, idHouse) => {
    return await Dal.addStudent(
      new Student(null, firstName, lastName, genre, idHouse)
    );
  },

  removeStudent: async id => {
    return await Dal.removeStudent(id);
  },

  addPoints: async (nb_points, id_professor, id_house) => {
    return await Dal.addPoints(
      new Points(null, nb_points, id_professor, id_house)
    );
  },

  endOfTheYear: async () => {
    return await Dal.endOfTheYear();
  },

  getHouseNameAndId: async () => {
    return await Dal.getHouseNameAndId();
  }
};
