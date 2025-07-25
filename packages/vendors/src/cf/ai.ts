export enum TextGenerationModel {
  LLAMA_3_8B_INSTRUCT = "@cf/meta/llama-3-8b-instruct",
}

export const CLOUDFLARE_AI_API_URL = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run`;
export const CLOUDFLARE_AI_GATEWAY_API_URL = `https://gateway.ai.cloudflare.com/v1/${process.env.CLOUDFLARE_ACCOUNT_ID}/basestack-ai/workers-ai`;

const checkSpam = (data: string) => [
  {
    role: "system",
    content: "You are a Spam Checker AI.",
  },
  {
    role: "user",
    content: `instructions: Checks all texts within the data structure for SPAM content. notes: Don't explain, just return the result. data: ${data}. result: Return with the following format in JSON: {isSpam: true | false}`,
  },
];

export const instructions = {
  checkSpam,
};

export interface ClientAIResponse {
  result: { response: string };
  success: boolean;
  errors: Array<any>;
  messages: Array<any>;
}

export interface ClientAIConfig {
  model: TextGenerationModel;
  messages: Array<Record<string, any>>;
  url?: string;
}

export const cfAiClient = async ({
  url = CLOUDFLARE_AI_GATEWAY_API_URL,
  model,
  messages,
}: ClientAIConfig): Promise<ClientAIResponse> => {
  try {
    const response = await fetch(`${url}/${model}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      },
      body: JSON.stringify({
        messages,
      }),
    });

    return response.json();
  } catch {
    throw new Error("Error calling Cloudflare AI");
  }
};
