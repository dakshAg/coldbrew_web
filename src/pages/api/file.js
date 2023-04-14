import formidable from "formidable";
import fs from "fs";
import absoluteUrl from 'next-absolute-url'

export const config = {
  api: {
    bodyParser: false
  }
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    file_path = await saveFile(files.file);
    const { origin } = absoluteUrl(req)
    return res.status(201).send(`${origin}${file_path}`);
  });
};

const saveFile = async (file) => {
  const data = fs.readFileSync(file.path);
  file_path = `./public/${file.name}`
  fs.writeFileSync(file_path, data);
  await fs.unlinkSync(file.path);
  return file_path;
};

export default (req, res) => {
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? console.log("GET")
    : res.status(404).send("");
};
