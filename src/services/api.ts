import axios from "axios";

type getNewsDataProps = {
  query?: string
}

export const getNewsData = async ({query}:getNewsDataProps) => {
  const response = await axios.get(
    `https://servicodados.ibge.gov.br/api/v3/noticias${query && query}`,
   {
    headers: {
      'Content-Type': 'application/json',
    },
   }
  );
  return response.data;
};
