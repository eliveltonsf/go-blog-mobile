import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

export default function CardNews({ data }: DataItemProps) {
  const [image, setImage] = useState<NewsImagens>();

  useEffect(() => {
    const image: NewsImagens = JSON.parse(data.imagens);
    setImage(image);
  }, []);

  return (
    <View className="w-full h-auto flex-row gap-4 py-2 border-b border-b-primary">
      <Image
        width={100}
        source={{
          uri: `https://agenciadenoticias.ibge.gov.br/${image?.image_intro}`,
        }}
      />

      <View className="flex-1 gap-1">
        <Text
          className="text-sm font-subtitle text-white"
          numberOfLines={3}
          lineBreakMode="tail"
        >
          {data.titulo}
        </Text>

        <Text
          className="text-xs font-body text-gray-400"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {data.introducao}
        </Text>

        <View className="flex-row items-center gap-4">
          <Text
            className="font-body text-xs text-text"
            numberOfLines={2}
            lineBreakMode="tail"
          >
            {data.tipo}
          </Text>

          <Text
            className=" font-body text-xs text-text flex-1"
            numberOfLines={1}
            lineBreakMode="tail"
          >
            {data.data_publicacao}
          </Text>
        </View>
      </View>
    </View>
  );
}
