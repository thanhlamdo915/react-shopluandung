import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Pressable,
  Platform,
  Alert,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import AntDesign from '@expo/vector-icons/AntDesign';

const UpdateCategoryScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {
    _id: categoryId,
    name: initialName,
    rewardPercentage: initialRewardPercentage,
    image: initialImage,
  } = route.params;

  const [name, setName] = useState(initialName);
  const [rewardPercentage, setRewardPercentage] = useState(
    initialRewardPercentage.toString()
  );
  const [image, setImage] = useState(initialImage);

  const handleUpdateCategory = async () => {
    try {
      const imageUrl = image ? await uploadImage(image) : initialImage;
      const updatedCategory = {
        name,
        rewardPercentage: parseFloat(rewardPercentage),
        image: imageUrl,
      };

      const response = await axios.put(
        `https://backend-shopluandung.onrender.com/categories/${categoryId}`,
        updatedCategory
      );
      if (response.status === 200) {
        Alert.alert('Success', 'Category updated successfully', [
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);
      } else {
        console.error('Failed to update category', response.data);
      }
    } catch (error) {
      console.error(
        'Error updating category:',
        error.response ? error.response.data : error.message
      );
    }
  };

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append('file', {
      name: image.uri.split('/').pop(),
      type: 'image/jpg',
      uri:
        Platform.OS === 'android'
          ? image.uri
          : image.uri.replace('file://', ''),
    });
    const response = await axios.post(
      'https://backend-shopluandung.onrender.com/file/multiple',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data.urls[0];
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Pressable
            onPress={() => navigation.goBack()}
            style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
            <Text style={{textAlign: 'center', color: 'red'}}>
              {' '}
              Admin Dashboard
            </Text>
          </Pressable>
          <Text style={styles.header}>Category Management</Text>
        </View>
        <View>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Category Name"
          />

          <Text style={styles.label}>Reward Percentage</Text>
          <TextInput
            style={styles.input}
            value={rewardPercentage}
            onChangeText={setRewardPercentage}
            placeholder="Reward Percentage"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Image</Text>
          <TouchableOpacity onPress={handlePickImage}>
            <Text style={styles.pickImage}>Pick an image</Text>
          </TouchableOpacity>
          {image && (
            <View>
              <Image source={{uri: image}} style={styles.image} />
              <Button title="Remove Image" onPress={handleRemoveImage} />
            </View>
          )}

          <Button title="Update Category" onPress={handleUpdateCategory} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  pickImage: {
    color: 'blue',
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default UpdateCategoryScreen;
