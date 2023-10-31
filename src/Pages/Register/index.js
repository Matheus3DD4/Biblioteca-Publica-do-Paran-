import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [termsError, setTermsError] = useState('');

  const users = []; // Array simulando um banco de dados

  const handleRegister = () => {
    setFullNameError(fullName === '' ? 'Campo obrigatório' : '');
    setEmailError(email === '' ? 'Campo obrigatório' : '');
    setUsernameError(username === '' ? 'Campo obrigatório' : '');
    setPasswordError(password === '' ? 'Campo obrigatório' : '');
    setConfirmPasswordError(confirmPassword === '' ? 'Campo obrigatório' : '');
    setTermsError(!agreeTerms ? 'Você deve concordar com os termos de uso' : '');

    if (fullName !== '' && email !== '' && username !== '' && password !== '' && confirmPassword !== '' && agreeTerms) {
      if (password !== confirmPassword) {
        setPasswordError('As senhas não correspondem');
        setConfirmPasswordError('As senhas não correspondem');
        return;
      }

      // Verifica se o username já está em uso
      if (users.some(user => user.username === username)) {
        setUsernameError('Nome de usuário já está em uso');
        return;
      }

      // Simulação de registro (adiciona o usuário ao array)
      users.push({
        fullName,
        email,
        username,
        password,
      });

      setSuccessMessage('Cadastrado com sucesso!');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        onChangeText={setFullName}
        value={fullName}
      />
      {fullNameError !== '' && <Text style={styles.errorText}>{fullNameError}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
      {emailError !== '' && <Text style={styles.errorText}>{emailError}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        onChangeText={setUsername}
        value={username}
      />
      {usernameError !== '' && <Text style={styles.errorText}>{usernameError}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      {passwordError !== '' && <Text style={styles.errorText}>{passwordError}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry
      />
      {confirmPasswordError !== '' && <Text style={styles.errorText}>{confirmPasswordError}</Text>}

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setAgreeTerms(!agreeTerms)}
        >
          {agreeTerms && <Text>✓</Text>}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Concordo com os termos de uso</Text>
      </View>
      {termsError !== '' && <Text style={[styles.errorText, { marginLeft: 25 }]}>{termsError}</Text>}

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      {successMessage !== '' && <Text style={styles.successText}>{successMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor:'#fff'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 25,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    backgroundColor:'#fff'
    
  },
  checkboxLabel: {
    fontSize: 16,
    color:'#fff'
  },
  registerButton: {
    backgroundColor: '#35AAFF',
    width: '80%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  successText: {
    color: 'green',
    marginTop: 10,
  },
});
