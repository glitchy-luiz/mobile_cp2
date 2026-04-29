import { useEffect, useState } from "react";
import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { View, Text, TextInput, Button, Alert, FlatList } from "react-native";
import {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from "../firebase/productService";

export default function HomeScreen({ navigation, route }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [barcode, setBarcode] = useState("");
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);

  async function loadProducts() {
    try {
      const productList = await getProducts();
      setProducts(productList);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os produtos.");
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (route.params?.scannedBarcode) {
      setBarcode(String(route.params.scannedBarcode));
      if (route.params?.currentName) setName(route.params.currentName);
      if (route.params?.currentPrice) setPrice(route.params.currentPrice);
    }
  }, [route.params?.scannedBarcode]);

  function clearForm() {
    setName("");
    setPrice("");
    setBarcode("");
    setEditingProductId(null);
  }

  async function handleSaveProduct() {
    const numericPrice = parseFloat(price);

    if (!name.trim() || isNaN(numericPrice) || numericPrice <= 0) {
      Alert.alert(
        "Atenção",
        "Por favor, insira um nome e um preço numérico válido."
      );
      return;
    }

    const productData = {
      name: name.trim(),
      price: numericPrice,
      barcode: barcode ? String(barcode).trim() : "",
    };

    try {
      if (editingProductId) {
        await updateProduct(editingProductId, productData);
        Alert.alert("Sucesso", "Produto atualizado com sucesso!");
      } else {
        await createProduct(productData);
        Alert.alert("Sucesso", "Produto cadastrado com sucesso!");
      }

      clearForm();
      await loadProducts();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível salvar o produto.");
    }
  }

  function handleEditProduct(product) {
    setName(product.name || "");
    setPrice(product.price || "");
    setBarcode(product.barcode || "");
    setEditingProductId(product.id);
  }

  function handleCancelEdit() {
    clearForm();
  }

  async function handleDeleteProduct(productId) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(productId);

      if (editingProductId === productId) {
        clearForm();
      }

      Alert.alert("Sucesso", "Produto excluído com sucesso!");
      await loadProducts();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível excluir o produto.");
    }
  }

  function handleOpenScanner() {
    navigation.navigate("BarcodeScanner", {
      currentName: name,
      currentPrice: price,
    });
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, padding: 16 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ flex: 1, padding: 20 }}>
          <Text style={{ fontSize: 24, marginTop: 40, marginBottom: 20 }}>
            Bem-vindo!
          </Text>

          <View style={{ marginBottom: 20 }}>
            <Button title="Ler código de barras" onPress={handleOpenScanner} />
          </View>

          <TextInput
            placeholder="Nome do produto"
            value={name}
            onChangeText={setName}
            style={{
              borderWidth: 1,
              marginBottom: 10,
              padding: 10,
              borderRadius: 5,
            }}
          />

          <TextInput
            placeholder="Preço"
            value={price}
            onChangeText={(text) => setPrice(text.replace(/[^0-9.]/g, ""))}
            keyboardType="numeric"
            style={{
              borderWidth: 1,
              marginBottom: 10,
              padding: 10,
              borderRadius: 5,
            }}
          />

          <TextInput
            placeholder="Código de barras"
            value={barcode}
            onChangeText={setBarcode}
            style={{
              borderWidth: 1,
              marginBottom: 20,
              padding: 10,
              borderRadius: 5,
            }}
          />

          <Button
            title={editingProductId ? "Atualizar produto" : "Cadastrar produto"}
            onPress={handleSaveProduct}
          />

          {editingProductId && (
            <View style={{ marginTop: 10 }}>
              <Button title="Cancelar edição" onPress={handleCancelEdit} />
            </View>
          )}

          <Text style={{ fontSize: 20, marginTop: 30, marginBottom: 10 }}>
            Produtos cadastrados
          </Text>

          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text>Nenhum produto cadastrado.</Text>}
            renderItem={({ item }) => (
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  padding: 10,
                  marginBottom: 10,
                }}
              >
                <Text>Nome: {item.name}</Text>
                <Text>Preço: {item.price}</Text>
                <Text>Código de barras: {item.barcode || "Não informado"}</Text>

                <View style={{ marginTop: 10 }}>
                  <Button
                    title="Editar"
                    onPress={() => handleEditProduct(item)}
                  />
                </View>

                <View style={{ marginTop: 10 }}>
                  <Button
                    title="Excluir"
                    onPress={() => handleDeleteProduct(item.id)}
                  />
                </View>
              </View>
            )}
          />

          <View style={{ marginTop: 20 }}>
            <Button title="Sair" onPress={() => navigation.navigate("Login")} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
