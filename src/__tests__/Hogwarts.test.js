import Hogwarts from "../Hogwarts";
import Dal from "../Dal";

describe("Hogwarts Tests", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe("Professor tests", () => {
    test("addProfessor", async () => {
      Dal.addProfessor = jest.fn().mockReturnValue({ return: "Incroyable" });

      const result = await Hogwarts.addProfessor("Mister", "MV", "M");

      expect(result).toEqual({ return: "Incroyable" });
      expect(Dal.addProfessor).toHaveBeenCalledTimes(1);
      expect(Dal.addProfessor).toHaveBeenCalledWith({
        id: null,
        firstname: "Mister",
        lastname: "MV",
        gender: "M"
      });
    });

    test("addProfessor Throw", async () => {
      Dal.addProfessor = jest.fn().mockImplementation(() => {
        throw new Error("Toto");
      });
      try {
        await Hogwarts.addProfessor("Mister", "MV", "M");
      } catch (error) {
        expect(error).toStrictEqual(new Error("Toto"));
      }
      expect(Dal.addProfessor).toHaveBeenCalledTimes(1);
      expect(Dal.addProfessor).toHaveBeenCalledWith({
        id: null,
        firstname: "Mister",
        lastname: "MV",
        gender: "M"
      });
    });

    test("removeProfessor ", async () => {
      Dal.removeProfessor = jest.fn().mockReturnValue({ return: "Incroyable" });

      const result = await Hogwarts.removeProfessor(42);

      expect(result).toEqual({ return: "Incroyable" });
      expect(Dal.removeProfessor).toHaveBeenCalledTimes(1);
      expect(Dal.removeProfessor).toHaveBeenCalledWith(42);
    });

    test("removeProfessor Throw", async () => {
      Dal.removeProfessor = jest.fn().mockImplementation(() => {
        throw new Error("Toto");
      });
      try {
        await Hogwarts.removeProfessor(42);
      } catch (error) {
        expect(error).toStrictEqual(new Error("Toto"));
      }
      expect(Dal.removeProfessor).toHaveBeenCalledTimes(1);
      expect(Dal.removeProfessor).toHaveBeenCalledWith(42);
    });
  });

  describe("Student tests", () => {
    test("addStudent", async () => {
      Dal.addStudent = jest.fn().mockReturnValue({ return: "Incroyable" });

      const result = await Hogwarts.addStudent("Henry", "PotDeBeurre", "M", 1);

      expect(result).toEqual({ return: "Incroyable" });
      expect(Dal.addStudent).toHaveBeenCalledTimes(1);
      expect(Dal.addStudent).toHaveBeenCalledWith({
        id: null,
        firstname: "Henry",
        lastname: "PotDeBeurre",
        gender: "M",
        id_house: 1
      });
    });

    test("addStudent Throw", async () => {
      Dal.addStudent = jest.fn().mockImplementation(() => {
        throw new Error("Toto");
      });
      try {
        await Hogwarts.addStudent("Henry", "PotDeBeurre", "M", 1);
      } catch (error) {
        expect(error).toStrictEqual(new Error("Toto"));
      }
      expect(Dal.addStudent).toHaveBeenCalledTimes(1);
      expect(Dal.addStudent).toHaveBeenCalledWith({
        id: null,
        firstname: "Henry",
        lastname: "PotDeBeurre",
        gender: "M",
        id_house: 1
      });
    });

    test("removeStudent ", async () => {
      Dal.removeStudent = jest.fn().mockReturnValue({ return: "Incroyable" });

      const result = await Hogwarts.removeStudent(42);

      expect(result).toEqual({ return: "Incroyable" });
      expect(Dal.removeStudent).toHaveBeenCalledTimes(1);
      expect(Dal.removeStudent).toHaveBeenCalledWith(42);
    });

    test("removeStudent Throw", async () => {
      Dal.removeStudent = jest.fn().mockImplementation(() => {
        throw new Error("Toto");
      });
      try {
        await Hogwarts.removeStudent(42);
      } catch (error) {
        expect(error).toStrictEqual(new Error("Toto"));
      }
      expect(Dal.removeStudent).toHaveBeenCalledTimes(1);
      expect(Dal.removeStudent).toHaveBeenCalledWith(42);
    });
  });

  describe("addPoints tests", () => {
    test("addPoints", async () => {
      Dal.addPoints = jest.fn().mockReturnValue({ return: "Incroyable" });
      const result = await Hogwarts.addPoints(10, 1, 1);
      expect(result).toEqual({ return: "Incroyable" });
      expect(Dal.addPoints).toHaveBeenCalledTimes(1);
      expect(Dal.addPoints).toHaveBeenCalledWith({
        id: null,
        id_house: 1,
        id_professor: 1,
        nb_points: 10
      });
    });

    test("addPoints Throw", async () => {
      Dal.addPoints = jest.fn().mockImplementation(() => {
        throw new Error("Toto");
      });
      try {
        await Hogwarts.addPoints(10, 1, 1);
      } catch (error) {
        expect(error).toStrictEqual(new Error("Toto"));
      }
      expect(Dal.addPoints).toHaveBeenCalledTimes(1);
      expect(Dal.addPoints).toHaveBeenCalledWith({
        id: null,
        id_house: 1,
        id_professor: 1,
        nb_points: 10
      });
    });
  });

  describe("endOfTheYear tests", () => {
    test("endOfTheYear", async () => {
      Dal.endOfTheYear = jest.fn().mockReturnValue({ return: "Incroyable" });
      const result = await Hogwarts.endOfTheYear();
      expect(result).toEqual({ return: "Incroyable" });
      expect(Dal.endOfTheYear).toHaveBeenCalledTimes(1);
    });

    test("endOfTheYear Throw", async () => {
      Dal.endOfTheYear = jest.fn().mockImplementation(() => {
        throw new Error("Toto");
      });
      try {
        await Hogwarts.endOfTheYear();
      } catch (error) {
        expect(error).toStrictEqual(new Error("Toto"));
      }
      expect(Dal.endOfTheYear).toHaveBeenCalledTimes(1);
    });
  });

  describe("getHouseNameAndId tests", () => {
    test("getHouseNameAndId", async () => {
      Dal.getHouseNameAndId = jest
        .fn()
        .mockReturnValue({ return: "Incroyable" });
      const result = await Hogwarts.getHouseNameAndId();
      expect(result).toEqual({ return: "Incroyable" });
      expect(Dal.getHouseNameAndId).toHaveBeenCalledTimes(1);
    });

    test("getHouseNameAndId Throw", async () => {
      Dal.getHouseNameAndId = jest.fn().mockImplementation(() => {
        throw new Error("Toto");
      });
      try {
        await Hogwarts.getHouseNameAndId();
      } catch (error) {
        expect(error).toStrictEqual(new Error("Toto"));
      }
      expect(Dal.getHouseNameAndId).toHaveBeenCalledTimes(1);
    });
  });
});
