import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";


import DefaultText from "./DefaultText";

const DetailItem = (props) => {
  const getColor = (inx) => {
    return inx % 2 == 0 ? "#f7f9ff" : "#e6eaf5";
  };
  return (
    <View
      style={{
        flexDirection: "column",
        width: "100%",
        borderBottomColor: "black",
        borderBottomWidth: 1,
        backgroundColor: getColor(props.index),
      }}
      key={props.index}
    >
      <View >
        <Text style={styles.product}>
          {props.index}- {props.Product}
        </Text>
      </View>
      <View style={styles.detail}>
      <View style={styles.ColourExt}>
          <Text>JobId:</Text>
        </View>
        <View style={styles.ColourInt} >
          <Text>    {props.ColourInt}</Text>
        </View>
        <View style={styles.ColourExt}>
          <Text>    {props.ColourExt}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
         
        >
          <View style={styles.type} >
            <Text>{props.index}</Text>
            {props.Type == 1 ? (
              <MaterialCommunityIcons name="ruler" size={24} color="black" />
            ) : props.Type == 2 ? (
              <MaterialCommunityIcons name="puzzle" size={24} color="black" />
            ) : props.Type == 4 ? (
              <MaterialCommunityIcons name="glass-cocktail" size={24} color="black" />
            ): (
              <MaterialCommunityIcons
                name="align-horizontal-left"
                size={24}
                color="black"
              />
            )}
          </View>

          <View style={styles.Qty} >
            <Text>
              {props.Qty}/{props.QtyTotal}x{props.Size1}mm x{props.Size2}mm
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailItem: {
    flexDirection: "column",
    width: "90%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  product: {
    flex: 1,
    fontWeight: "bold",
  },
  detail: {
    flexDirection: "column",
  },
  type: { paddingTop: -10, marginTop: -20 },

  ColourExt: { flex: 3 },
  ColourInt: { flex: 3 },
  Qty: { alignItems: "flex-end" },
});

export default DetailItem;
