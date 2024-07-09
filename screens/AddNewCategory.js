import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Pressable,
  Text,
  Image,
} from 'react-native';
import axios from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';
import {Platform} from 'react-native';

const AddNewCategory = () => {
  const [name, setName] = useState('');
  const [rewardPercentage, setRewardPercentage] = useState('');
  const navigation = useNavigation();
  const [selectedImages, setSelectedImages] = useState([]);

  const uploadImages = async (images, path) => {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append('file', {
        name: image.uri.split('/').pop(),
        type: 'image/jpg',
        uri:
          Platform.OS === 'android'
            ? image.uri
            : image.uri.replace('file://', ''),
      });
      console.log('data', formData);
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

    return response.data.urls;
  };
  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //   allowsEditing: true,
      // allowsMultipleSelection: true, // Allows selecting multiple images
      selectionLimit: 1, // Limits how many images will be selected
      quality: 1, // Image quality (from 0 to 1)
    });

    if (!result.cancelled) {
      setSelectedImages(result.assets);
    }
  };
  const requestAddCategory = async () => {
    try {
      const imageUrls = await uploadImages(selectedImages);
      console.log('imageUrls', imageUrls);
      const response = await axios.post(
        'https://backend-shopluandung.onrender.com/create-categories',
        {
          name: name,
          rewardPercentage: rewardPercentage,
          imageUrls: imageUrls,
        }
      );

      console.log('category added successfully', response.data);
      Alert.alert('Category added successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding category', error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            paddingBottom: 20,
            borderRadius: 25,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
          <Text style={{textAlign: 'center', color: 'red'}}> go back</Text>
        </Pressable>
      </View>
      <Text style={{fontSize: 22, fontWeight: 'bold'}}>ADD NEW CATEGORY</Text>
      <TextInput
        style={styles.input}
        placeholder="Category Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Reward Percentage"
        keyboardType="numeric"
        value={rewardPercentage}
        onChangeText={setRewardPercentage}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
      />
      <Button title="Create Category" onPress={handleSubmit} /> */}
      <Text style={styles.label}>Image</Text>

      <Button
        title="Pick an image from camera roll"
        onPress={handlePickImage}
      />
      {selectedImages.length > 0 && (
        <View style={styles.imageRow}>
          {selectedImages.map((image, index) => (
            <Image
              key={index}
              source={{uri: image.uri}}
              // style={{width: 200, height: 200}}
              style={styles.image}
            />
          ))}
        </View>
      )}
      <Button title="Add Category" onPress={requestAddCategory} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    // justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows images to wrap to the next line if they don't fit
    // justifyContent: 'center', // Centers the images in the row
    alignItems: 'center', // Aligns images vertically in the center
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    margin: 5, // Adds space between images
    borderRadius: 0, // Adds rounded corners to images
    borderWidth: 1,
    borderColor: '#ddd', // Adds a border with a light color
    backgroundColor: '#f8f8f8', // Adds a background color to the images
  },
});

export default AddNewCategory;
