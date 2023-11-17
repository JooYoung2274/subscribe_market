import axios from 'axios';
import OpenAI from 'openai';

const openAI = new OpenAI({
  apiKey: `${process.env.OPENAI_API_KEY}`,
});

export async function openAi(prompt: string) {
  const completion = await openAI.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'assistant', content: prompt }],
    max_tokens: 50,
    temperature: 0,
  });

  console.log(completion.choices[0].message);
}

export async function naverApi(query: string) {
  const config = {
    method: 'get',
    url: `https://openapi.naver.com/v1/search/shop.json?query=${query}&sort=asc`,
    headers: {
      'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
      'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
    },
  };

  return axios(config)
    .then(function (response) {
      return JSON.stringify(response.data);
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    });
}
