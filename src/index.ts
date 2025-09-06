import { OpenAiClient } from './openai/openai';
import { TelegramClient } from './telegram/telegram';


export const mainApp = async (dryrun: boolean): Promise<void> => {
  const openAiClient: OpenAiClient = new OpenAiClient();
  const telegramClient: TelegramClient = new TelegramClient();

  const prompt = `
    Anna yhteenveto päivän merkittävimmistä uutisista suomeksi.
    Anna pelkät uutiset, älä tervehdi tai kirjoita alkuun kuvausta tai loppuun mitään jatkokysymystä.
    Älä käytä ranskalaisia viivoja, vaan kirjoita uutiset erillisinä riveinä.
    Tee jokaisen uutisen väliin tyhjä rivi.
    Korkeintaan 10 uutista.
    Älä lisää mitään otsikoita tai ryhmittelyitä, äläkä käytä emojeita.`;
  const message = (await openAiClient.getResponse(prompt)).output_text;

  if (!dryrun) {
    await telegramClient.sendMessage(message);
  }
  else {
    console.log("Dryrun, not sending a message to Telegram");
    console.log(message);
  }
};


export const handler = async (event: LambdaEvent): Promise<LambdaResponse> => {
  const dryrunMessageSending = event.source == 'dryrun' ? true : false;
  await mainApp(dryrunMessageSending);
  return {
    statusCode: 200,
    body: "OK"
  };
};

if (require.main == module) {
  void handler({source: 'dryrun'});
}

export interface LambdaEvent {
  source: string
}

export interface LambdaResponse {
  statusCode: number,
  body: string
}
