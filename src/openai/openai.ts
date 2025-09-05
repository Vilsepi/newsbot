import { OpenAI } from 'openai';

export class OpenAiClient {
  private readonly client: OpenAI;

  public constructor () {
    this.client = new OpenAI();
  }

  public getResponse = async (prompt: string) : Promise<OpenAI.Responses.Response> => {
    return (await this.client.responses.create({
      model: "gpt-5",
      tools: [
        { type: "web_search" },
      ],
      input: prompt
    }));
  }
}
