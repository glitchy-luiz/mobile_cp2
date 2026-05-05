# CP React Native (Expo) - Luiz Souza

Este projeto foi desenvolvido em aula com o objetivo de ensinar os conceitos fundamentais de **React Native com Expo**, focando em:

* Criação de projeto
* Organização de pastas
* Construção de telas
* Navegação entre telas
* Componentização básica

---

# 🎯 Objetivo

Construir uma aplicação simples contendo:

* Tela de Login
* Tela de Cadastro
* Tela de Recuperação de Senha
* Tela Home
* Navegação entre telas (Stack)

## Melhorias imlementadas na cp
* Formatação campo price
* Permanecia de dados pós leitor de barr code
* ajuste do teclado mobile
* ajuste do scroll em telas pequenas

> ⚠️ Este projeto NÃO possui backend.
> O foco é **layout + navegação**.

---

# 🧱 Tecnologias utilizadas

* React Native
* Expo (SDK 54)
* React Navigation

---

# 🚀 Como executar o projeto

## 1. Clonar o repositório

```bash
https://github.com/LuizCamilo-Mobile/FIAP-Project-Mobile-Example.git
```

## 2. Acessar a pasta

```bash
cd fiap-auth-app
```

## 3. Instalar dependências

```bash
npm install
```

## 4. Rodar o projeto

```bash
npx expo start
```

---

# 📦 Instalação manual (caso necessário)

Se precisar recriar o projeto do zero:

```bash
npx create-expo-app fiap-auth-app --template blank@54
```

Instalar navegação:

```bash
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install react-native-screens@4.16.0 --save-exact
npx expo install react-native-safe-area-context
```

---

# 📁 Estrutura do projeto

```text
src/
  components/
  navigation/
    AppNavigator.js
  screens/
    LoginScreen.js
    RegisterScreen.js
    ForgotPasswordScreen.js
    HomeScreen.js
```

---

# 🧭 Fluxo de navegação

* Login → Home
* Login → Cadastro
* Login → Esqueci minha senha
* Cadastro → Voltar
* Esqueci senha → Voltar
* Home → Login

---

# 📸 Telas do app

* Login
* Cadastro
* Recuperação de senha
* Home

---

# 🧠 Conceitos abordados

* `View`, `Text`, `TextInput`, `Button`
* `TouchableOpacity`
* `StyleSheet`
* Navegação com Stack
* Props e navegação (`navigation.navigate`)
* Organização de projeto
* Componentização básica

---

# 🛠️ Problemas comuns

## Erro: "expected dynamic type 'boolean', but had type 'string'"

Solução aplicada:

* Fixar versão:

```bash
npm install react-native-screens@4.16.0 --save-exact
```

---


# 👨‍🏫 Autor

Projeto utilizado em aula — 
Luiz Fernando de Aragão Souza RM555561

---
