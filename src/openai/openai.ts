import { OpenAI } from 'openai';

export class OpenAiClient {
  private readonly client: OpenAI;

  public constructor () {
    this.client = new OpenAI();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getResponse = async (prompt: string) : Promise<any> => {
    return (await this.client.responses.create({
      model: "gpt-5",
      tools: [
        { type: "web_search" },
      ],
      input: prompt
    }));
  }
}
