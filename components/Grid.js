import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import GridItem from "./GridItem";


export default function Example(props) {

  return (

    <FlatGrid
      itemDimension={230}
      data={props.listData[0].Items}
      style={styles.gridView}
      staticDimension={400}
    //   fixed
      spacing={10}
      renderItem={({ item }) => (

        <GridItem
          Product={item.Product}
          ColourExt={item.ColourExt}
          ColourInt={item.ColourInt}
          index={item.index + 1}
          Qty={item.Qty}
          QtyTotal={item.QtyTotal}
          Size1={item.Size1}
          SuppliedInFull={item.SuppliedInFull}
          Type={item.Type}
          key={item.index + 1}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
});
