import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import apiClient from "../services/apiClient"; 
import { setAccessToken, setUser } from "../services/auth"; 

const { width } = Dimensions.get("window");
const isMobile = width < 768;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); 
  const router = useRouter();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError("email and password are required");
      return;
    }

    setLoading(true);
    setError(null); 

    try {
      console.log(email, password);
      const response = await apiClient.post("/user/login", { email, password });

      if (response.data.success) {
        const token = response.data.accessToken;
        const user = response.data.user;
        console.log("access tokennnnnn",response.data.accessToken)
        await setAccessToken(token);
        await setUser(user);

        router.replace('/(tabs)/hotels');
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(
        Array.isArray(err?.response?.data?.errors?.details) &&
          err?.response?.data?.errors?.details[0]?.message
          ? err?.response?.data?.errors?.details[0]?.message
          : err?.response?.data?.errors?.message ||
              "something went wrong please try again later"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Login to continue</Text>
        <TextInput
          style={[
            styles.input,
            isMobile ? styles.mobileInput : styles.desktopInput,
          ]}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[
            styles.input,
            isMobile ? styles.mobileInput : styles.desktopInput,
          ]}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Don't have an account? <Text style={styles.linkText}>Sign Up</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 15,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    color: "#333",
    fontSize: 16,
  },
  mobileInput: {
    width: "100%",
  },
  desktopInput: {
    width: "100%",
  },
  button: {
    backgroundColor: "#5fa35f",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  linkText: {
    color: "#2575fc",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginVertical: 10,
    textAlign: "center",
  },
});
