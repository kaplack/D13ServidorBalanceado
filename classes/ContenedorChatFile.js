import fs from "fs";
import { denormalize, normalize, schema } from "normalizr";

class ContenedorChat {
  constructor(textJson) {
    this.textJson = textJson;
    this.authorSchema = new schema.Entity("authors");
    this.msgSchema = new schema.Entity("mensaje", {
      author: this.authorSchema,
    });
    this.data = [];
    try {
      this.read();
    } catch (error) {
      this.write();
    }
  }

  read() {
    const dataOr = JSON.parse(fs.readFileSync(this.textJson));
    this.data = denormalize(dataOr.result, [this.msgSchema], dataOr.entities);
  }

  write() {
    fs.writeFileSync("./public/db/db.json", JSON.stringify(this.data));
  }

  save(obj) {
    obj["id"] = this.data.length + 1;
    //console.log(this.data);
    this.data.push(obj);
    this.write();
  }

  getByID(id) {
    return this.data.find((obj) => obj.id == id);
  }

  getAll() {
    return this.data;
  }

  deleteByID(id) {
    const idx = this.data.findIndex((obj) => obj.id == id);
    this.data.splice(idx, 1);
    this.write();
  }

  deleteAll() {
    this.data = [];
    this.write();
  }
  normalizarChat() {
    fs.readFile("./public/db/db.json", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      let json = JSON.parse(data);
      const dataNormalized = normalize(json, [this.msgSchema]);
      console.log(dataNormalized);

      fs.writeFile(
        "./public/db/dbNormalized.json",
        JSON.stringify(dataNormalized),
        (err) => {
          console.log(err);
        }
      );

      const dbOriginal = fs.statSync("./public/db/db.json").size;
      const dbResult = fs.statSync("./public/db/dbNormalized.json").size;
      const result = (dbResult / dbOriginal) * 100;

      console.log(`el archivo original se reduce en ${100 - result}% `);
    });
  }
}

export default ContenedorChat;
