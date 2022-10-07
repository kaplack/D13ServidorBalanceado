import mongoose from "mongoose";
import UserModel from "../models/user.js";

class ContenedorUser {
  constructor() {
    this.url =
      "mongodb+srv://ABurga:g5kNcaBKcEodAE83@cluster0.4upmc2o.mongodb.net/?retryWrites=true&w=majority";
  }

  connect() {
    const connect = mongoose.connect(
      this.url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("DB Connected");
      }
    );
  }
  save(userData) {
    this.connect();
    const userModel = new UserModel(userData);
    const userSaved = userModel.save();
    return userSaved;
  }

  async read() {
    const connect = await this.connect();

    let users = await UserModel.find({});
    return users;
  }
}

export default ContenedorUser;
