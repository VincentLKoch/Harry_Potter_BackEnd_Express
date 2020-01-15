import Dal from "../Dal";
import { createConnection } from "typeorm";

jest.mock("typeorm");

describe("Data Access Layer tests", () => {
  //Init:
  let typeormMocked;

  beforeEach(() => {
    typeormMocked = {
      //All functions from typeorm used in dal :
      getRepository: jest.fn().mockReturnThis(typeormMocked),

      save: jest.fn().mockReturnThis(typeormMocked),
      execute: jest.fn().mockReturnThis(typeormMocked),
      delete: jest.fn().mockReturnThis(typeormMocked),
      query: jest.fn().mockReturnThis(typeormMocked),

      createQueryBuilder: jest.fn().mockReturnThis(typeormMocked),

      select: jest.fn().mockReturnThis(typeormMocked),
      addSelect: jest.fn().mockReturnThis(typeormMocked),

      from: jest.fn().mockReturnThis(typeormMocked),
      where: jest.fn().mockReturnThis(typeormMocked),

      groupBy: jest.fn().mockReturnThis(typeormMocked),
      orderBy: jest.fn().mockReturnThis(typeormMocked),

      getRawOne: jest.fn().mockReturnThis(typeormMocked),
      getRawMany: jest.fn().mockReturnThis(typeormMocked),
      getMany: jest.fn().mockReturnThis(typeormMocked),

      close: jest.fn().mockReturnThis(typeormMocked)
    };

    createConnection.mockResolvedValue(typeormMocked);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it.each([
    //Professor
    ["addProfessor", ["close", "getRepository", "save"]],
    [
      "removeProfessor",
      ["close", "createQueryBuilder", "delete", "from", "where", "execute"]
    ],

    //Student
    ["addStudent", ["close", "getRepository", "save"]],
    [
      "removeStudent",
      ["close", "createQueryBuilder", "delete", "from", "where", "execute"]
    ],

    // Add Points
    [
      "addPoints",
      [
        "close",
        "getRepository",
        "save",
        "createQueryBuilder",
        "select",
        "where",
        "getRawOne"
      ],
      true
    ],

    [
      "endOfTheYear",
      [
        "close",
        "getRepository",
        "createQueryBuilder",
        "select",
        "addSelect",
        "groupBy",
        "orderBy",
        "getRawMany",
        "query"
      ],
      true
    ],

    [
      "getHouseNameAndId",
      ["close", "getRepository", "createQueryBuilder", "getMany"]
    ]
  ])("Testing %s", async (testFunction, called, twoGetRepository = false) => {
    //Init different by functions
    switch (testFunction) {
      case "addProfessor":
      case "addStudent":
        await Dal[testFunction]({ dummy: "Yes" });
        break;

      case "removeProfessor":
      case "removeStudent":
        typeormMocked.execute.mockResolvedValue({ affected: 1 });
        await Dal[testFunction](42);
        break;

      case "addPoints":
        await Dal[testFunction]({ id_house: "Yes" });
        break;

      case "endOfTheYear":
      case "getHouseNameAndId":
        await Dal[testFunction]();
        break;
    }

    expect(createConnection).toHaveBeenCalledTimes(1);

    //Testing number of call of all functions
    for (let key in typeormMocked) {
      if (called.includes(key)) {
        if (twoGetRepository && key === "getRepository") {
          expect(typeormMocked[key]).toHaveBeenCalledTimes(2);
        } else {
          expect(typeormMocked[key]).toHaveBeenCalledTimes(1);
        }
      } else {
        expect(typeormMocked[key]).toHaveBeenCalledTimes(0);
      }
    }

    //Testing called input
    switch (testFunction) {
      case "addProfessor":
      case "addStudent":
        expect(typeormMocked.save).toHaveBeenCalledWith({ dummy: "Yes" });
        break;

      case "removeProfessor":
      case "removeStudent":
        expect(typeormMocked.where).toHaveBeenCalledWith("id = :id", {
          id: 42
        });
        break;

      case "addPoints":
        expect(typeormMocked.save).toHaveBeenCalledWith({ id_house: "Yes" });
        expect(typeormMocked.select).toHaveBeenCalledWith(
          "SUM(`nb_points`)",
          "total"
        );
        expect(typeormMocked.where).toHaveBeenCalledWith(
          "entryPoints.id_house = :houseID",
          {
            houseID: "Yes"
          }
        );
        break;

      case "endOfTheYear":
        expect(typeormMocked.select).toHaveBeenCalledWith("id_house", "house");
        expect(typeormMocked.addSelect).toHaveBeenCalledWith(
          "SUM(`nb_points`)",
          "total"
        );
        expect(typeormMocked.groupBy).toHaveBeenCalledWith("id_house");
        expect(typeormMocked.orderBy).toHaveBeenCalledWith("total", "DESC");
        expect(typeormMocked.query).toHaveBeenCalledWith(
          "TRUNCATE TABLE points"
        );
        break;

      case "getHouseNameAndId":
        //no special call to test
        break;

      default:
        //force Error
        expect(true).toBeFalsy();
    }
  });
});
