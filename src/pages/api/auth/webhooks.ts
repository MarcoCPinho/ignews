import { NextApiRequest, NextApiResponse } from "next";

export const webhooks = (req:NextApiRequest, res:NextApiResponse) => {
  console.log('evento recebido')

  res.status(200).json({ ok:true })
}