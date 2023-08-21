import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Colors from "../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SelectUser = (props) => {
  const [visible, setVisible] = useState(props.userModalVisible);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(flase);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text style={styles.modalText}>Please Select User</Text>

              <TouchableOpacity
                color={Colors.accentColor}
                onPress={() => {
                  visible(false);
                }}
                style={styles.closeBtn}
              >
                <View style={styles.smallCloseContainer}>
                  <Text style={{ color: "white" }}></Text>
                  <MaterialCommunityIcons
                    name="close-circle"
                    size={24}
                    color={Colors.accentColor}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomColor: "black",
                borderBottomWidth: 1,
              }}
            />
            <Dropdown
              style={{
                backgroundColor: "white",
                borderBottomColor: "gray",
                borderBottomWidth: 0.5,
                marginTop: 20,
              }}
              containerStyle={styles.shadow}
              data={props.users}
              labelField="label"
              valueField="value"
              label="Dropdown"
              placeholder="Select User"
              onChange={(item) => {
                console.log(`in user select on change`);
                setVisible(false);
                props.callReceived(item.Name);
              }}
              // renderLeftIcon={() => (
              //     <Image style={styles.icon} source={require('./assets/account.png')} />
              // )}
              renderItem={(item) => (
                <View style={styles.item}>
                  <Text style={styles.textItem}>{item.Name}</Text>
                </View>
              )}
              textError="Error"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeBtn: {
    borderRadius: 5,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    marginTop: 22,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "70%",
    paddingTop: 10,
    alignItems: "center",
  },
  smallCloseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingTop: 0,
  },
  dropdown: {
    backgroundColor: "white",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginTop: 20,
  },
  icon: {
    marginRight: 5,
    width: 18,
    height: 18,
  },
  item: {
    paddingVertical: 17,
    paddingHorizontal: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
export default SelectUser;
