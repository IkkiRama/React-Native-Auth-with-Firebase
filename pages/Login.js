import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  const reset = () => {
    // Reset the state of our inputs after logging in or out
    setEmail("");
    setPassword("");
  };

  const validation = () => {
    if (!email || !password) {
      Alert.alert("Mohon isi semua data");
      return false;
    }

    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Mohon isi password dengan benar");
      return false;
    }

    if (!email.includes("@")) {
      Alert.alert("Harap memasukan email yang benar");
      return false;
    }

    if (password.length <= 8) {
      Alert.alert("Mohon isi password minimal 8 huruf");
      return false;
    }

    return true;
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        Alert.alert("Kamu sudah login");
        navigation.replace("Home");
      }
    });
  }, []);

  const handleLogin = () => {
    if (validation()) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          reset();
          Alert.alert("Kamu berhasil login");
          return navigation.replace("Home");
        })
        .catch((error) => alert(error.message));
    }
  };
  const handleRegister = () => {
    if (validation()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          reset();
          Alert.alert("Kamu berhasil mendaftar");
          navigation.replace("Home");
        })
        .catch((error) => {
          if (error.message == "Firebase: Error (auth/email-already-in-use).") {
            Alert.alert("Email sudah digunakan!");
          } else {
            console.log(error.message);
            Alert.alert(error.message);
          }
        });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        ></TextInput>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
        ></TextInput>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={() => handleRegister()}
        >
          <Text style={[styles.buttonText, styles.buttonOutlineText]}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#e4e4e7",
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  buttonContainer: {
    width: "60%",
  },
  button: {
    padding: 15,
    backgroundColor: "#0175F4",
    alignItems: "center",
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "transparent",
    elevation: 2,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  buttonOutline: {
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderColor: "#0175F4",
    borderWidth: 1,
  },
  buttonOutlineText: {
    color: "#0175F4",
  },
});
