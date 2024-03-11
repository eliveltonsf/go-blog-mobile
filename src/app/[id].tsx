import { Button } from "@/components/IconLabelButton";
import Loading from "@/components/Loading";
import { getNewsData } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Linking, Text, View } from "react-native";

export default function news() {
  const { id } = useLocalSearchParams();

  const [idNews, setIdNews] = useState("");
  const [idProduto, setIdProduto] = useState("");
  const [image, setImage] = useState<NewsImagens>();
  const [isLoading, setIsLoading] = useState(true);
  const [newsData, setNewsData] = useState<NewsItemProps>();

  const { mutate, data, isSuccess } = useMutation({
    mutationFn: (produtoId: string) =>
      getNewsData({
        query: `?idproduto=${produtoId}`,
      }),
  });

  useEffect(() => {
    const separateId = String(id).split("-");
    setIdNews(separateId[0]);
    mutate(separateId[1]);
  }, []);

  useEffect(() => {
    if (data) {
      const dataFilter: NewsItemProps[] = data?.items.filter(
        (news: NewsItemProps) => news.id === Number(idNews)
      );
      setNewsData(dataFilter[0]);
      const image: NewsImagens = JSON.parse(dataFilter[0].imagens);
      setImage(image);
    }
    newsData && setIsLoading(false);
  }, [data, newsData, idNews]);

  return (
    <View className="flex flex-1 justify-between items-center bg-background pt-14 p-4">
      {isLoading ? (
        <Loading />
      ) : (
        <View className="w-full h-auto flex-col gap-4 py-2">
          <Button onPress={() => router.back()}>
            <Button.LabelRight label="Voltar" iconName="arrow-back-ios" />
          </Button>

          <Text className="text-lg font-subtitle text-white">
            {newsData!.titulo}
          </Text>
          <Image
            className="w-full h-[15rem]"
            source={{
              uri: `https://agenciadenoticias.ibge.gov.br/${image?.image_intro}`,
            }}
          />
          <Text className="text-sm font-body text-gray-400">
            {newsData!.introducao}
          </Text>
          <View className="flex-row items-center gap-4">
            <Text
              className="font-body text-xs text-text"
              numberOfLines={2}
              lineBreakMode="tail"
            >
              {newsData!.tipo}
            </Text>

            <Text
              className="font-body text-xs text-text flex-1"
              numberOfLines={1}
              lineBreakMode="tail"
            >
              {newsData!.data_publicacao}
            </Text>
          </View>
          <Button onPress={() => Linking.openURL(newsData!.link)}>
            <Button.LabelLeft
              label="Ver notícia completa"
              iconName="arrow-forward-ios"
            />
          </Button>
        </View>
      )}
    </View>
  );
}
