import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Home = ({ navigation }) => {
  // const [auth, setAuth] = useState();

  const auth = getAuth();
  // const cekUser = () => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (!user) {
  //       navigation.replace("Login");
  //       Alert.alert("Kamu belum login, silahkan login terlebih dahulu");
  //     }
  //   });
  // };

  // cekUser();

  useEffect(() => {
    if (auth.currentUser == null) {
      Alert.alert("Kamu belum login, silahkan login terlebih dahulu");
      navigation.replace("Login");
    }
  }, []);

  const handleLogout = () => {
    signOut(auth);
    navigation.replace("Login");
    Alert.alert("Kamu berhasil logout");
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
