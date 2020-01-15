import Student from "../class/Student";
import { EntitySchema } from "typeorm";

export default new EntitySchema({
  tableName: "students",
  name: "students",
  target: Student,
  columns: {
    id: {
      primary: true,
      generated: true,
      type: "int"
    },

    firstname: {
      type: "varchar",
      nullable: false
    },

    lastname: {
      type: "varchar",
      nullable: false
    },

    gender: {
      type: "char",
      nullable: false
    },

    id_house: {
      type: "int",
      nullable: false
    }
  }
});
