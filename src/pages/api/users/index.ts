import { NextApiRequest, NextApiResponse } from "next";

const users = (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: "Marco" },
    { id: 2, name: "Thiago" },
    { id: 3, name: "Ana" },
  ];

  return response.json(users);
};

export default users;
