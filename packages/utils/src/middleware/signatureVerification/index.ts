import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

interface VerifyRequestSignatureParams {
  req: NextApiRequest;
  headerName: string;
  secret: string;
  algorithm: string;
}

export const getRawBody = async (req: NextApiRequest): Promise<string> => {
  const buffers: Buffer[] = [];

  return new Promise((resolve, reject) => {
    req.on("data", (chunk) => {
      buffers.push(chunk);
    });

    req.on("end", () => {
      const body = Buffer.concat(buffers).toString("utf8");
      resolve(body);
    });

    req.on("error", (err) => {
      reject(err);
    });
  });
};

export const verifyRequestSignature = async ({
  req,
  headerName,
  secret,
  algorithm,
}: VerifyRequestSignatureParams): Promise<boolean> => {
  const signature = req.headers[headerName.toLowerCase()] as string | undefined;

  if (!signature) {
    throw new Error(`Signature not found in the "${headerName}" header.`);
  }

  const rawBody = await getRawBody(req);

  const hmac = crypto.createHmac(algorithm, secret);
  hmac.update(rawBody);
  const computedSignature = hmac.digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature, "hex"),
    Buffer.from(computedSignature, "hex"),
  );
};

export const withSignatureVerification = (
  headerName: string,
  envSecret: string,
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void,
) => {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      const isValid = await verifyRequestSignature({
        req,
        headerName,
        secret: envSecret,
        algorithm: "sha256",
      });

      if (!isValid) {
        return res.status(403).json({ error: "Invalid signature" });
      }

      return handler(req, res);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
};
