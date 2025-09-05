import { OpenAiClient } from './openai/openai';
import { TelegramClient } from './telegram/telegram';


export const mainApp = async (dryrun: boolean): Promise<void> => {
  const openAiClient: OpenAiClient = new OpenAiClient();
  const telegramClient: TelegramClient = new TelegramClient();

  const prompt = "Anna yhteenveto päivän merkittävimmistä uutisista suomeksi.";
  const message = (await openAiClient.getResponse(prompt)).output_text;
  console.log(message);

  if (!dryrun) {
    await telegramClient.sendMessage(message);
  }
  else {
    console.log("Dryrun, not sending a message to Telegram");
  }
};


export const handler = async (event: LambdaEvent): Promise<LambdaResponse> => {
  console.log(JSON.stringify(event));
  const dryrunMessageSending = event.source == 'local-dryrun' ? true : false;
  await mainApp(dryrunMessageSending);
  return {
    statusCode: 200,
    body: "OK"
  };
};

if (require.main == module) {
  void handler({source: 'local-dryrun'});
}

export interface LambdaEvent {
  source: string
}

export interface LambdaResponse {
  statusCode: number,
  body: string
}
