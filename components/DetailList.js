import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

import DetailItem from "./DetailItem";

const DetailList = (props) => {
  const renderDetailItem = (itemData, index) => {
    return (
      <DetailItem
        Product={itemData.item.Product}
        ColourExt={itemData.item.ColourExt}
        ColourInt={itemData.item.ColourInt}
        index={itemData.index + 1}
        Qty={itemData.item.Qty}
        QtyTotal={itemData.item.QtyTotal}
        Size1={itemData.item.Size1}
        SuppliedInFull={itemData.item.SuppliedInFull}
        Type={itemData.item.Type}
        key={itemData.index + 1}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        renderItem={(item, index) => renderDetailItem(item, index)}
        keyExtractor={(item, index) => {
          return index;
        }}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});

export default DetailList;
