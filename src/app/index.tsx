import CardNews from "@/components/Card";
import FiltroModal from "@/components/FilterModal";
import IconButton from "@/components/IconButton";
import { Button } from "@/components/IconLabelButton";
import { Input } from "@/components/Input";
import { getNewsData } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FlatList, Linking, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Home({ navigation }: any) {
  const [page, setPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterValues, setFilterValues] = useState<FilterDataProps>({
    tipo: "noticia",
  });

  const [formData, setFormData] = useState<FilterDataProps>(
    {} as FilterDataProps
  );

  const { mutate, data, isSuccess } = useMutation({
    mutationFn: ({ page, busca, tipo }: FilterDataProps) =>
      getNewsData({
        query: `?qtd=10&page=${page}${busca ? `&busca=${busca}` : ""}${
          tipo ? `&tipo=${tipo}` : ""
        }`,
      }),
  });

  useEffect(() => {
    mutate({ page: page, busca: formData.busca, tipo: filterValues.tipo });
  }, [mutate, formData, page, filterValues]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FilterDataProps>();

  const handlePressLink = (link: string) => {
    const url = link;
    Linking.openURL(url);
  };

  const handlePressNews = (href: string) => {
    const url = href;
    router.navigate(url);
  };

  const onSubmit = (data: FilterDataProps) => {
    setFormData({
      ...formData,
      busca: data.busca,
    });
  };

  const applyFilters = (filters: FilterDataProps) => {
    setFilterValues(filters);
    // Aqui você pode atualizar os dados com base nos filtros aplicados
    console.log("Filtros aplicados:", filters);
  };

  return (
    <View className="flex-1 bg-background pt-14 px-4">
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input>
            <Input.Field
              placeholder="Buscar notícia"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
            <IconButton iconName="search" onPress={handleSubmit(onSubmit)} />
          </Input>
        )}
        name="busca"
      />

      {formData.busca ? (
        <Button
          onPress={() => {
            setFormData({});
            setValue("busca", "");
            setPage(1);
          }}
        >
          <Button.LabelLeftEnd
            label="Limpar busca"
            iconName="cleaning-services"
          />
        </Button>
      ) : (
        <Button onPress={() => setModalVisible(true)}>
          <Button.LabelLeftEnd label="Filtro" iconName="filter-alt" />
        </Button>
      )}

      {data && (
        <FlatList
          data={data?.items}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) =>
            item.produto_id === 0 ? (
              <TouchableOpacity onPress={() => handlePressLink(item.link)}>
                <CardNews data={item} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  handlePressNews(`/${item.id}-${item.produto_id}`)
                }
              >
                <CardNews data={item} />
              </TouchableOpacity>
            )
          }
        />
      )}
      {data && (
        <View className="flex h-16 flex-row justify-between items-center">
          {data.previousPage !== 0 && (
            <Button onPress={() => setPage(data.previousPage)}>
              <Button.LabelRight label="Anterior" iconName="arrow-back-ios" />
            </Button>
          )}
          {data.previousPage <= data.totalPages && (
            <Button onPress={() => setPage(data.nextPage)}>
              <Button.LabelLeftEnd
                label="Próxima"
                iconName="arrow-forward-ios"
              />
            </Button>
          )}
        </View>
      )}
      <FiltroModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onApply={applyFilters}
      />
    </View>
  );
}
