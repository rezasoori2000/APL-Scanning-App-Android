import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Text, SafeAreaView } from "react-native";

import { Dropdown } from "react-native-element-dropdown";

const Login = ({ route, navigation }) => {
  const [users, setUsers] = useState([]);
  const [dropdown, setDropdown] = useState(null);
  const [param, setParam] = useState(route.params);
  const getListOfUsers = async () => {
    // var result = JSON.parse(await ApiGet("GetUserList"));
     var result = null;
    setUsers(result);
  };
  const userChanged = async (name) => {};

  const _renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.Name}</Text>
      </View>
    );
  };
  useEffect(() => {
    //   props.navigation.setOptions({
    //     headerShown: true,
    //     title: "Login",
    //     backgroundColor: Platform.OS === "android" ? Colors.primary : "",
    //   });
    //param.setUser("joon");
    //  if (users.length < 1) getListOfUsers();
  });
  return (
    <SafeAreaView style={styles.main}>
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.shadow}
        data={users}
        labelField="label"
        valueField="value"
        label="Dropdown"
        placeholder="Select User"
        value={dropdown}
        onChange={(item) => {
          userChanged(item.Name);
        }}
        // renderLeftIcon={() => (
        //     <Image style={styles.icon} source={require('./assets/account.png')} />
        // )}
        renderItem={(item) => _renderItem(item)}
        textError="Error"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginTop: 40,
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

export default Login;
