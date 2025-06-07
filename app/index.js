import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router"; // import useRouter
import { Picker } from "@react-native-picker/picker";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Applicant");
  const router = useRouter(); // initialize router

  const handleLogin = () => {
    // Navigate based on role
    if (role === "Administrative Aide") {
      router.push("/admindashboard");
    } else if (role === "CPDO") {
      router.push("/CPDO/Dashboard");
       } else if (role === "Applicant") {
      router.push("/application");
    } else if (role === "Engineer/Architect") {
      router.push("/Engr/Dashboard");
    } else {
      // Default or Applicant or others: you can add a route or alert
      alert("Please select a valid role or add navigation for Applicant.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Left Side */}
      <View style={styles.leftContainer}>
        <Image source={require("../assets/citylogo.png")} style={styles.logo} />
        <Text style={styles.title}>BOPEMS</Text>
      </View>

      {/* Right Side */}
      <View style={styles.rightContainer}>
        <View style={styles.loginBox}>
          <Text style={styles.rolesTitle}>Login as</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={role}
              style={styles.picker}
              onValueChange={(itemValue) => setRole(itemValue)}
            >
              <Picker.Item label="Applicant" value="Applicant" />
              <Picker.Item label="Administrative Aide" value="Administrative Aide" />
              <Picker.Item label="Engineer/Architect" value="Engineer/Architect" />
              <Picker.Item label="CPDO" value="CPDO" />
            </Picker>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#aaa"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#aaa"
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#f7f9fc",
  },
  leftContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#eee",
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
    letterSpacing: 1,
  },
  rightContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  loginBox: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  rolesTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
    overflow: "hidden",
  },
  picker: {
    height: Platform.OS === "ios" ? 180 : 50,
    width: "100%",
  },
  input: {
    height: 48,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  loginButton: {
    marginTop: 24,
    backgroundColor: "#3b82f6", // blue-500
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
