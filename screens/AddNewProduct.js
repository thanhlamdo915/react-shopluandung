import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {AntDesign} from '@expo/vector-icons';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import {Button, Image, Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
const AddProductScreen = ({navigation}) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [rewardPercentage, setRewardPercentage] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          'https://backend-shopluandung.onrender.com/categories'
        );
        const result = response.data;
        setCategories(result);
        if (result.length > 0) {
          setCategory(result[0]._id); // Set default category
          setRewardPercentage(result[0].rewardPercentage.toString());
        }
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    fetchCategory();
  }, []);

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

  const requestAddProduct = async () => {
    try {
      const imageUrls = await uploadImages(selectedImages);
      const response = await axios.post(
        'https://backend-shopluandung.onrender.com/add-product',
        {
          category: category,
          name: name,
          quantity: quantity,
          price: price,
          description: description,
          rewardPercentage: rewardPercentage,
          imageUrls: imageUrls,
        }
      );

      console.log('Product added successfully', response.data);
    } catch (error) {
      console.error('Error adding product', error);
    }
  };

  const handleCategoryChange = (selectedCategoryId) => {
    const selectedCategory = categories.find(
      (category) => category._id === selectedCategoryId
    );
    if (selectedCategory) {
      setCategory(selectedCategoryId);
      setRewardPercentage(selectedCategory.rewardPercentage.toString());
    }
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //   allowsEditing: true,
      allowsMultipleSelection: true, // Allows selecting multiple images
      selectionLimit: 6, // Limits how many images will be selected
      quality: 1, // Image quality (from 0 to 1)
    });

    if (!result.canceled) {
      setSelectedImages(result.assets);
    }
  };
  // console.log('si', selectedImages[1]);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.all}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>ADD NEW PRODUCT</Text>
        <ScrollView style={styles.container}>
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
              <Text style={{textAlign: 'center', color: 'red'}}>
                {' '}
                Admin Dashboard
              </Text>
            </Pressable>
          </View>
          <Text style={styles.label}>Category</Text>
          <RNPickerSelect
            onValueChange={(value) => handleCategoryChange(value)}
            items={categories.map((cat) => ({
              label: cat.name,
              value: cat._id,
            }))}
            value={category}
            style={pickerSelectStyles}
            placeholder={{
              label: 'Select a category...',
              value: null,
            }}
          />
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Product Name"
          />
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            placeholder="Quantity"
            keyboardType="numeric"
          />
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Price"
            keyboardType="numeric"
          />
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.inputdescription}
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            multiline
          />
          <Text style={styles.label}>Reward Percentage</Text>
          <TextInput
            style={styles.input}
            value={rewardPercentage}
            onChangeText={setRewardPercentage}
            placeholder="Reward Percentage"
            keyboardType="numeric"
            editable={false}
          />
          <Text style={styles.label}>Image</Text>

          <Button
            title="Pick an image from camera roll"
            onPress={handlePickImage}
          />
          {selectedImages.length >= 0 && (
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
          <Button title="Add Product" onPress={requestAddProduct} />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  all: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  inputdescription: {
    height: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  picker: {
    height: 50,
    marginBottom: 16,
  },
  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows images to wrap to the next line if they don't fit
    // justifyContent: 'center', // Centers the images in the row
    alignItems: 'center', // Aligns images vertically in the center
    padding: 10,
  },
  image: {
    width: 59,
    height: 59,
    margin: 5, // Adds space between images
    borderRadius: 0, // Adds rounded corners to images
    borderWidth: 1,
    borderColor: '#ddd', // Adds a border with a light color
    backgroundColor: '#f8f8f8', // Adds a background color to the images
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 16,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 16,
  },
});

export default AddProductScreen;
