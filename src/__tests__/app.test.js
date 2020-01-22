import request from "supertest";
import app from "../app";
import Hogwarts from "../Hogwarts";

describe("app tests", () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Professor tests", () => {
    describe("Add Professor tests", () => {
      test("Should Work", async () => {
        Hogwarts.addProfessor = jest
          .fn()
          .mockReturnValue({ result: "Working" });

        try {
          await request(app)
            .get("/addProfessor/Mister&MV&M")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect(response => {
              expect(response.body).toEqual({ result: "Working" });
            });
        } catch (err) {
          expect(err).toBeNull();
        }
        expect(Hogwarts.addProfessor).toHaveBeenCalledTimes(1);
        expect(Hogwarts.addProfessor).toHaveBeenCalledWith("Mister", "MV", "M");
      });

      test("Bad Parameters error", async () => {
        Hogwarts.addProfessor = jest
          .fn()
          .mockReturnValue({ result: "Working" });

        try {
          await request(app)
            .get("/addProfessor/Mister&MV&A")
            .expect(400);
        } catch (err) {
          expect(err).toBeNull();
        }
        expect(Hogwarts.addProfessor).toHaveBeenCalledTimes(0);
      });

      test("test Error response", async () => {
        Hogwarts.addProfessor = jest.fn().mockImplementation(() => {
          throw new Error("");
        });
        try {
          await request(app)
            .get("/addProfessor/Mister&MV&M")
            .expect(400);
        } catch (err) {
          expect(err).toBeNull();
        }
        expect(Hogwarts.addProfessor).toHaveBeenCalledTimes(1);
      });
    });

    describe("Remove Professor tests", () => {
      test("Should Work", async () => {
        Hogwarts.removeProfessor = jest.fn();
        try {
          await request(app)
            .delete("/removeProfessor/12")
            .expect(204);
        } catch (err) {
          expect(err).toBeNull();
        }
        expect(Hogwarts.removeProfessor).toHaveBeenCalledTimes(1);
        expect(Hogwarts.removeProfessor).toHaveBeenCalledWith("12");
      });

      test("Professor dont exist", async () => {
        Hogwarts.removeProfessor = jest.fn().mockImplementation(() => {
          throw new Error("Not found");
        });
        try {
          await request(app)
            .delete("/removeProfessor/12")
            .expect(404);
        } catch (err) {
          expect(err).toBeNull();
        }
        expect(Hogwarts.removeProfessor).toHaveBeenCalledTimes(1);
        expect(Hogwarts.removeProfessor).toHaveBeenCalledWith("12");
      });

      test("test Error response", async () => {
        Hogwarts.removeProfessor = jest.fn().mockImplementation(() => {
          throw new Error("");
        });
        try {
          await request(app)
            .delete("/removeProfessor/12")
            .expect(400);
        } catch (err) {
          expect(err).toBeNull();
        }
        expect(Hogwarts.removeProfessor).toHaveBeenCalledTimes(1);
        expect(Hogwarts.removeProfessor).toHaveBeenCalledWith("12");
      });
    });
  });

  describe("Student tests", () => {
    describe("Add Student tests", () => {
      test("Should Work", async () => {
        Hogwarts.addStudent = jest.fn().mockReturnValue({ result: "Working" });

        try {
          await request(app)
            .get("/addStudent/Henry&PotDeBeurre&M&1")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect(response => {
              expect(response.body).toEqual({ result: "Working" });
            });
        } catch (err) {
          expect(err).toBeNull();
        }
        expect(Hogwarts.addStudent).toHaveBeenCalledTimes(1);
        expect(Hogwarts.addStudent).toHaveBeenCalledWith(
          "Henry",
          "PotDeBeurre",
          "M",
          1
        );
      });

      it.each([
        ["M", "12"],
        ["F", "-5"],
        ["AttackHelicopter", "1"],
        ,
        ["AttackHelicopter", "4"]
      ])(
        "test with genre : %s, and houseId : %s",
        async (paramGenre, paramHouse) => {
          Hogwarts.addStudent = jest
            .fn()
            .mockReturnValue({ result: "Working" });

          try {
            await request(app)
              .get(
                "/addStudent/Henry&PotDeBeurre&" + paramGenre + "&" + paramHouse
              )
              .expect(400);
          } catch (err) {
            expect(err).toBeNull();
          }
          expect(Hogwarts.addStudent).toHaveBeenCalledTimes(0);
        }
      );
    });

    describe("Remove Student tests", () => {
      test("Should Work", async () => {
        Hogwarts.removeStudent = jest.fn();
        try {
          await request(app)
            .delete("/removeStudent/12")
            .expect(204);
        } catch (err) {
          expect(err).toBeNull();
        }
        expect(Hogwarts.removeStudent).toHaveBeenCalledTimes(1);
        expect(Hogwarts.removeStudent).toHaveBeenCalledWith("12");
      });

      test("Student dont exist", async () => {
        Hogwarts.removeStudent = jest.fn().mockImplementation(() => {
          throw new Error("Not found");
        });
        try {
          await request(app)
            .delete("/removeStudent/12")
            .expect(404);
        } catch (err) {
          expect(err).toBeNull();
        }
        expect(Hogwarts.removeStudent).toHaveBeenCalledTimes(1);
        expect(Hogwarts.removeStudent).toHaveBeenCalledWith("12");
      });

      test("test Error response", async () => {
        Hogwarts.removeStudent = jest.fn().mockImplementation(() => {
          throw new Error("");
        });
        try {
          await request(app)
            .delete("/removeStudent/12")
            .expect(400);
        } catch (err) {
          expect(err).toBeNull();
        }
        expect(Hogwarts.removeStudent).toHaveBeenCalledTimes(1);
        expect(Hogwarts.removeStudent).toHaveBeenCalledWith("12");
      });
    });
  });

  describe("addPoints tests", () => {
    it.each(["15", "-12", "0"])(
      "Should Work, add %s point",
      async testPoints => {
        Hogwarts.addPoints = jest.fn().mockReturnValue({ result: "Working" });
        try {
          await request(app)
            .post("/addPoints/" + testPoints + "&12&1")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect(response => {
              expect(response.body).toEqual({
                added: testPoints,
                result: "Working"
              });
            });
        } catch (err) {
          expect(err).toBeNull();
        }
        expect(Hogwarts.addPoints).toHaveBeenCalledTimes(1);
        expect(Hogwarts.addPoints).toHaveBeenCalledWith(testPoints, "12", "1");
      }
    );

    test("test Error response", async () => {
      Hogwarts.addPoints = jest.fn().mockImplementation(() => {
        throw new Error("Not found");
      });

      try {
        await request(app)
          .post("/addPoints/15&12&1")
          .expect(400);
      } catch (err) {
        expect(err).toBeNull();
      }
      expect(Hogwarts.addPoints).toHaveBeenCalledTimes(1);
      expect(Hogwarts.addPoints).toHaveBeenCalledWith("15", "12", "1");
    });
  });

  describe("endOfTheYear tests", () => {
    test("Should Work", async () => {
      Hogwarts.endOfTheYear = jest.fn().mockReturnValue(["Working"]);
      try {
        await request(app)
          .get("/endOfTheYear")
          .expect(200)
          .expect("Content-Type", /json/)
          .expect(response => {
            expect(response.body).toEqual(["Working"]);
          });
      } catch (err) {
        expect(err).toBeNull();
      }
      expect(Hogwarts.endOfTheYear).toHaveBeenCalledTimes(1);
    });

    test("Empty result", async () => {
      Hogwarts.endOfTheYear = jest.fn().mockReturnValue([]);
      try {
        await request(app)
          .get("/endOfTheYear")
          .expect(404);
      } catch (err) {
        expect(err).toBeNull();
      }
      expect(Hogwarts.endOfTheYear).toHaveBeenCalledTimes(1);
    });

    test("test Error response", async () => {
      Hogwarts.endOfTheYear = jest.fn().mockImplementation(() => {
        throw new Error("");
      });
      try {
        await request(app)
          .get("/endOfTheYear")
          .expect(400);
      } catch (err) {
        expect(err).toBeNull();
      }
      expect(Hogwarts.endOfTheYear).toHaveBeenCalledTimes(1);
    });
  });

  describe("getHouseNameAndId tests", () => {
    test("Should Work", async () => {
      Hogwarts.getHouseNameAndId = jest
        .fn()
        .mockReturnValue({ testresult: "Working" });
      try {
        await request(app)
          .get("/getHouseNameAndId")
          .expect(200)
          .expect("Content-Type", /json/)
          .expect(response => {
            expect(response.body).toEqual({ testresult: "Working" });
          });
      } catch (err) {
        expect(err).toBeNull();
      }
      expect(Hogwarts.getHouseNameAndId).toHaveBeenCalledTimes(1);
    });

    test("test Error response", async () => {
      Hogwarts.getHouseNameAndId = jest.fn().mockImplementation(() => {
        throw new Error("");
      });
      try {
        await request(app)
          .get("/getHouseNameAndId")
          .expect(400);
      } catch (err) {
        expect(err).toBeNull();
      }
      expect(Hogwarts.getHouseNameAndId).toHaveBeenCalledTimes(1);
    });
  });
});
