import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";

const Home = ({ navigation }) => {
  const [auth, setAuth] = useState();

  useEffect(() => {
    setAuth(getAuth());

    if (!auth) {
      Alert.alert("Kamu belum login, silahkan login terlebih dahulu");
      navigation.replace("Login");
    }
  }, []);

  const handleLogout = () => {
    signOut(auth);
    Alert.alert("Kamu berhasil logout");
    navigation.replace("Login");
  };

  return (
    <View>
      <Text>Home</Text>
      {auth ? (
        <View>
          <Text>Kamu login dengan email : {auth.currentUser?.email}</Text>

          <Button title="Logout" onPress={() => handleLogout()}></Button>
        </View>
      ) : (
        <Button
          title="Login"
          onPress={() => navigation.navigate("Login")}
        ></Button>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
