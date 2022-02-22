import { Client } from "faunadb";

export const faunta = new Client({
  secret: process.env.FAUNADB_KEY,
});
