import House from "../class/House";
import { EntitySchema } from "typeorm";

export default new EntitySchema({
  tableName: "houses",
  name: "houses",
  target: House,
  columns: {
    id: {
      primary: true,
      generated: true,
      type: "int"
    },

    name: {
      type: "varchar",
      nullable: false
    }
  }
});
