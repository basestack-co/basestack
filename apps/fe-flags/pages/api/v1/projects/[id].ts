import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const test = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session) {
    res.status(200).json({
      headers: req.headers,
      session,
      content:
        "This is protected content. You can access this content because you are signed in.",
    });
  } else {
    res.status(400).json({
      error: "You must be sign in to view the protected content on this page.",
    });
  }
};

export default test;
