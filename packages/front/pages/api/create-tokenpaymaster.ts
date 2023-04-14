import type { NextApiRequest, NextApiResponse } from "next";

type SubmittedRecord = {
  token_symbol: string;
  eth_per_token: string;
};

type ResponseData = {
  message: string;
  posted: SubmittedRecord;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | string>,
) {
  switch (req.method) {
    // case 'GET' : {
    //     return res.status(200).json({ message: 'GET', posted: entries as any });
    // }

    case "POST": {
      const newPaymaster: SubmittedRecord = req.body;
      if (!newPaymaster) {
        return res.status(400).end("Missing application form.");
      }
      console.log(newPaymaster);
      const { token_symbol, eth_per_token } = newPaymaster;

      if (!(token_symbol && eth_per_token)) {
        return res.status(400).end("Missing required fields.");
      }
      console.log("New submission: ", newPaymaster);
      return res.status(201).json({
        message: "POST",
        posted: newPaymaster,
      });
    }
    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed. `);
    }
  }
}
