import Points from "../class/Points";
import { EntitySchema } from "typeorm";

export default new EntitySchema({
  tableName: "points",
  name: "points",
  target: Points,
  columns: {
    id: {
      primary: true,
      generated: true,
      type: "int"
    },

    nb_points: {
      type: "int",
      nullable: false
    },

    id_professor: {
      type: "int",
      nullable: false
    },

    id_house: {
      type: "int",
      nullable: false
    }
  }
});
