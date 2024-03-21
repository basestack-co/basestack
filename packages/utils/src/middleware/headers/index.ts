// Types
import type { NextApiRequest, NextApiResponse } from "next";

export const withHeaders = (
  requiredHeaders: string[],
  handler: (req: NextApiRequest, res: NextApiResponse) => void,
) => {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const missingHeaders: string[] = requiredHeaders.filter(
      (header) => !req.headers[header],
    );

    if (missingHeaders.length > 0) {
      return res.status(400).json({
        error: `Missing headers: ${missingHeaders.join(", ")}`,
      });
    }

    return handler(req, res);
  };
};
