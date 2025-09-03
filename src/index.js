import OpenAI from "openai";
const client = new OpenAI();

const response = await client.responses.create({
    model: "gpt-5",
    tools: [
        { type: "web_search" },
    ],
    input: "Kerro Ylen tärkeimmät uutiset tiivistetysti. Anna vastauksesi pelkästään JSON-tietorakenteena eikä mitään sen ulkopuolella."
});

console.log(response);
