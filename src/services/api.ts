import axios from "axios";

type getNewsDataProps = {
  query?: String
}

export const getNewsData = async ({query}:getNewsDataProps) => {
  const response = await axios.get(
   `http://servicodados.ibge.gov.br/api/v3/noticias${query && query}`
  );
  return response.data;
};
