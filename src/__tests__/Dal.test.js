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

  const testingCalledFun = (called, twoGetRepository = false) => {
    expect(createConnection).toHaveBeenCalledTimes(1);

    //Testing that only called function where called
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
  };

  //test Add :
  it.each([
    //Professor
    ["addProfessor", ["close", "getRepository", "save"]],
    //Student
    ["addStudent", ["close", "getRepository", "save"]]
  ])("Testing %s", async (testFunction, called) => {
    //Init different by functions
    await Dal[testFunction]({ dummy: "Yes" });

    testingCalledFun(called);

    //Testing called input
    expect(typeormMocked.save).toHaveBeenCalledWith({ dummy: "Yes" });
  });

  //test Remove :
  it.each([
    //Professor
    [
      "removeProfessor",
      ["close", "createQueryBuilder", "delete", "from", "where", "execute"]
    ],
    //Student
    [
      "removeStudent",
      ["close", "createQueryBuilder", "delete", "from", "where", "execute"]
    ]
  ])("Testing %s", async (testFunction, called) => {
    //Init different by functions
    typeormMocked.execute.mockResolvedValue({ affected: 1 });
    await Dal[testFunction](42);

    testingCalledFun(called);

    //Testing called input
    expect(typeormMocked.where).toHaveBeenCalledWith("id = :id", {
      id: 42
    });
  });

  it("Testing addPoints", async () => {
    const called = [
      "close",
      "getRepository",
      "save",
      "createQueryBuilder",
      "select",
      "where",
      "getRawOne"
    ];

    await Dal.addPoints({ id_house: "Yes" });

    testingCalledFun(called, true);

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
  });

  it("Testing endOfTheYear", async () => {
    const called = [
      "close",
      "getRepository",
      "createQueryBuilder",
      "select",
      "addSelect",
      "groupBy",
      "orderBy",
      "getRawMany",
      "query"
    ];

    await Dal.endOfTheYear();

    testingCalledFun(called, true);

    expect(typeormMocked.select).toHaveBeenCalledWith("id_house", "house");
    expect(typeormMocked.addSelect).toHaveBeenCalledWith(
      "SUM(`nb_points`)",
      "total"
    );
    expect(typeormMocked.groupBy).toHaveBeenCalledWith("id_house");
    expect(typeormMocked.orderBy).toHaveBeenCalledWith("total", "DESC");
    expect(typeormMocked.query).toHaveBeenCalledWith("TRUNCATE TABLE points");
  });

  it("Testing getHouseNameAndId", async () => {
    const called = ["close", "getRepository", "createQueryBuilder", "getMany"];

    await Dal.getHouseNameAndId();

    testingCalledFun(called);
  });
});
