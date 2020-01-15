export default class Professor {
  constructor(id, firstname, lastname, gender) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.gender = gender;
    /* this = { ...this, id, firstname, lastname, gender }; */
  }
}
