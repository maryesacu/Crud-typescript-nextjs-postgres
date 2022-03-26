import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  console.log(req)
  switch (method) {
    case "GET":
      try {
        const query = "SELECT * FROM tasks";
        const response = await conn.query(query);
        return res.json(response.rows);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    case "POST":
      try {
        const { title, description, price, ingredients } = body;

        const query =
          "INSERT INTO tasks(title, description, price, ingredients) VALUES ($1, $2, $3, $4) RETURNING *";
        const values = [title, description, price, ingredients];

        const response = await conn.query(query, values);

        return res.json(response.rows[0]);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(400).json({ message: "Method are not supported" });
  }
}
