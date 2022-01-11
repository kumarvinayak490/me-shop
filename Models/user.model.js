const db=require('../data/database');

class User {
  constructor(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
  }

  static async findUserById(id) {
    const user = await db.getDb().collection("user").findOne({ _id: id },{projection:{password:0}});
    return user;
  }

  static async findUser(email) {
    const user = await db.getDb().collection("user").findOne({ email: email });
    return user;
  }

  async save() {
    const result = await db.getDb().collection("user").insertOne({
      name: this.name,
      password: this.password,
      email: this.email,
    });
  }
}


module.exports=User;