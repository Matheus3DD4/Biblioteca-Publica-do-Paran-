import React, { useState, useEffect } from 'react'
import { StyleSheet, TextInput, KeyboardAvoidingView, View, Image, TouchableOpacity, Text, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Home from '../Home';

export default function Login() {
  const navigation = useNavigation();

  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }))
  const [opacity] = useState(new Animated.Value(0))
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 30,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
      })
    ]).start();
  }, [])

  const validateFields = () => {
    let isValid = true;

    if (username === "") {
      setUsernameError("O campo Usuário é obrigatório.");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (password === "") {
      setPasswordError("O campo Senha é obrigatório.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleLogin = () => {
    if (validateFields()) {
      if (username === "admin" && password === "admin") {
        navigation.navigate("HomeTabs");
      } else {
        setLoginError("Usuário ou senha incorretos.");
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Image
          style={{ width: 200, height: 200 }}
          source={require('../../assets/bibliotecalogo.png')}
        />
      </View>

      <Animated.View style={[styles.containerInput, { opacity: opacity, transform: [{ translateY: offset.y }] }]}>
        <TextInput
          style={styles.input}
          placeholder='Usuário'
          autoCorrect={false}
          onChangeText={(text) => {
            setUsername(text);
            setUsernameError("");
            setLoginError("");
          }}
        />
        {usernameError !== "" && <Text style={styles.errorText}>{usernameError}</Text>}

        <TextInput
          style={styles.input}
          placeholder='Senha'
          autoCorrect={false}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError("");
            setLoginError("");
          }}
          secureTextEntry
        />
        {passwordError !== "" && <Text style={styles.errorText}>{passwordError}</Text>}

        {loginError !== "" && <Text style={styles.errorText}>{loginError}</Text>}

        <TouchableOpacity
          style={styles.btnSubmit}
          onPress={handleLogin}
        >
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnRegister}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.registerText}>Criar Conta</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange'
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
  },
  containerInput: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%'
  },
  input: {
    backgroundColor: 'white',
    width: '90%',
    marginBottom: 15,
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  btnSubmit: {
    backgroundColor: '#35AAFF',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  submitText: {
    color: '#FFF',
    fontSize: 18,
  },
  btnRegister: {
    marginTop: 10,
  },
  registerText: {
    color: '#fff'
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
});
