import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";
import { useTheme } from "styled-components/native";

interface ISelector {
  selectedIndex: IndexPath,
  setSelectedIndex: React.Dispatch<React.SetStateAction<IndexPath>>
}

export const Selector = ({selectedIndex, setSelectedIndex}: ISelector): React.ReactElement => {
  const theme = useTheme()

  const data = [
    "Café",
    "Chá",
    "Cerveja",
    "Vinho",
    "Cachaça",
    "Vodka",
    "Gin",
    "Outra",
  ];

  const displayValue = data[selectedIndex.row];

  const renderOption = (title: string): React.ReactElement => (
    <SelectItem key={Math.random().toString()} title={title} />
  );

  return (
    <Layout style={styles.container} level="1">
      <Select
        value={displayValue}
        selectedIndex={selectedIndex}
        onSelect={(index) => {
          if(index instanceof IndexPath) {
            setSelectedIndex(index)
          }
          }
        }
        label="Tipo de bebida"
        size="large"
        placeholder="Tipo de bebida"
        style={{
          backgroundColor: theme.backgroundColor,
          marginBottom: 8,
        }}
      >
        {data.map(renderOption)}
      </Select>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "transparent",
    marginTop: 16,
  },
});
