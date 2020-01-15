import Professor from "../class/Professor";
import { EntitySchema } from "typeorm";

export default new EntitySchema({
  tableName: "professors",
  name: "professors",
  target: Professor,
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
    }
  }
});
