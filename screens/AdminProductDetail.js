// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Button,
//   ScrollView,
//   Pressable,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
// import {Platform} from 'react-native';
// import {useDispatch} from 'react-redux';
// // import {updateProduct} from '../redux/ProductReducer'; // This action should be created in your Redux setup
// import {useNavigation} from '@react-navigation/native';
// import {updateProduct} from '../redux/ProductActions';
// import {AntDesign, Feather} from '@expo/vector-icons';
// import axios from 'axios';
// import {useRoute} from '@react-navigation/native';
// import {Dimensions} from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import {Alert} from 'react-native';
// const screenWidth = Dimensions.get('window').width;

// const AdminProductDetail = () => {
//   const route = useRoute();
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const {width} = Dimensions.get('window');
//   const height = (width * 100) / 100;
//   const {
//     _id: productId,
//     name: initialName,
//     price: initialPrice,
//     description: initialDescription,
//     rewardPercentage: initialRewardPercentage,
//     quantity: initialQuantity,
//     // images: initialImages = '',
//   } = route.params;
//   // console.log(route.params);
//   console.log(productId);
//   // console.log('Route Params:', route.params);
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [name, setName] = useState(initialName);
//   const [price, setPrice] = useState(initialPrice.toString());
//   const [description, setDescription] = useState(initialDescription);
//   const [rewardPercentage, setRewardPercentage] = useState(
//     initialRewardPercentage.toString()
//   );
//   const [quantity, setQuantity] = useState(initialQuantity.toString());
//   const [images, setImages] = useState(route.params?.image);

//   const handleUpdateProduct = async () => {
//     const imageUrls = await uploadImages(selectedImages);
//     const updatedProduct = {
//       name,
//       price: parseFloat(price),
//       description,
//       rewardPercentage: parseFloat(rewardPercentage),
//       quantity: parseInt(quantity, 10),
//       image: images.concat(imageUrls),
//     };

//     try {
//       console.log('Updating product with ID:', productId);
//       console.log('Updated product data:', updatedProduct);

//       // const response = await axios.put(
//       //   `https://backend-shopluandung.onrender.com/products/${productId}`,
//       //   updatedProduct
//       // );
//       const response = await axios.put(
//         `https://backend-shopluandung.onrender.com/products/${productId}`,
//         updatedProduct
//       );
//       if (response.status === 200) {
//         console.log('Product updated successfully');
//         navigation.goBack();
//       } else {
//         console.error('Failed to update product', response.data);
//       }
//     } catch (error) {
//       console.error(
//         'Error updating product:',
//         error.response ? error.response.data : error.message
//       );
//     }
//   };
//   const handleRemoveProduct = async () => {
//     try {
//       const response = await axios.delete(
//         `https://backend-shopluandung.onrender.com/products/${productId}`
//       );
//       if (response.status === 200) {
//         console.log('Product removed successfully');
//         navigation.goBack();
//       } else {
//         console.error('Failed to remove product', response.data);
//       }
//     } catch (error) {
//       console.error(
//         'Error removing product:',
//         error.response ? error.response.data : error.message
//       );
//     }
//   };
//   const confirmRemoveProduct = () => {
//     Alert.alert(
//       'Confirm Delete',
//       'Are you sure you want to delete this product?',
//       [
//         {
//           text: 'Cancel',
//           onPress: () => console.log('Cancel Pressed'),
//           style: 'cancel',
//         },
//         {
//           text: 'Delete',
//           onPress: handleRemoveProduct,
//           style: 'destructive',
//         },
//       ],
//       {cancelable: true}
//     );
//   };

//   const handleRemoveImage = (index) => {
//     const newImages = images.filter((_, i) => i !== index);
//     setImages(newImages);
//   };
//   const uploadImages = async (images, path) => {
//     const formData = new FormData();
//     images.forEach((image, index) => {
//       formData.append('file', {
//         name: image.uri.split('/').pop(),
//         type: 'image/jpg',
//         uri:
//           Platform.OS === 'android'
//             ? image.uri
//             : image.uri.replace('file://', ''),
//       });
//     });
//     const response = await axios.post(
//       'https://backend-shopluandung.onrender.com/file/multiple',
//       formData,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       }
//     );

//     return response.data.urls;
//   };
//   const handlePickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       //   allowsEditing: true,
//       allowsMultipleSelection: true, // Allows selecting multiple images
//       selectionLimit: 6, // Limits how many images will be selected
//       quality: 1, // Image quality (from 0 to 1)
//     });

//     if (!result.canceled) {
//       setSelectedImages(result.assets);
//     }
//   };
//   // console.log(imageUrls);
//   return (
//     <>
//       <SafeAreaProvider>
//         <SafeAreaView style={styles.all}>
//           <ScrollView style={styles.container}>
//             <Pressable
//               onPress={() => navigation.goBack()}
//               style={{
//                 paddingBottom: 20,
//                 borderRadius: 25,
//                 flex: 1,
//                 flexDirection: 'row',
//                 alignItems: 'center',
//               }}
//             >
//               <AntDesign name="arrowleft" size={24} color="black" />
//               <Text style={{textAlign: 'center', color: 'red'}}> go back</Text>
//             </Pressable>

//             <Text style={styles.label}>Name</Text>
//             <TextInput
//               style={styles.input}
//               value={name}
//               onChangeText={setName}
//               placeholder="Product Name"
//             />

//             <Text style={styles.label}>Quantity</Text>
//             <TextInput
//               style={styles.input}
//               value={quantity}
//               onChangeText={setQuantity}
//               placeholder="Quantity"
//               keyboardType="numeric"
//             />

//             <Text style={styles.label}>Price</Text>
//             <TextInput
//               style={styles.input}
//               value={price}
//               onChangeText={setPrice}
//               placeholder="Price"
//               keyboardType="numeric"
//             />

//             <Text style={styles.label}>Reward Percentage</Text>
//             <TextInput
//               style={styles.input}
//               value={rewardPercentage}
//               onChangeText={setRewardPercentage}
//               placeholder="Reward Percentage"
//               keyboardType="numeric"
//             />

//             <Text style={styles.label}>Description</Text>
//             <TextInput
//               style={styles.inputDescription}
//               value={description}
//               onChangeText={setDescription}
//               placeholder="Description"
//               multiline
//             />
//             <View>
//               <Text style={styles.label}>Images</Text>

//               <Button title="Upload new image" onPress={handlePickImage} />

//               <View style={styles.imageContainer}>
//                 {images.map((images, index) => (
//                   <View key={index} style={styles.imageWrapper}>
//                     <Image source={{uri: images}} style={styles.image} />
//                     <TouchableOpacity
//                       onPress={() => handleRemoveImage(index)}
//                       style={styles.removeButton}
//                     >
//                       <Text style={styles.removeButtonText}>Remove</Text>
//                     </TouchableOpacity>
//                   </View>
//                 ))}
//               </View>

//               {selectedImages.length > 0 && (
//                 <View style={styles.imageRow}>
//                   {selectedImages.map((image, index) => (
//                     <Image
//                       key={index}
//                       source={{uri: image.uri}}
//                       // style={{width: 200, height: 200}}
//                       style={styles.image}
//                     />
//                   ))}
//                 </View>
//               )}
//             </View>

//             {/* <TextInput
//             style={styles.input}
//             value={images.join(',')}
//             onChangeText={(text) =>
//               setImages(
//                 text
//                   .split(',')
//                   .map((img) => img.trim())
//                   .filter((img) => img)
//               )
//             }
//             placeholder="Images"
//           /> */}
//           </ScrollView>
//           <Button title="Update Product" onPress={handleUpdateProduct} />
//           <Button
//             title="Remove Product"
//             onPress={confirmRemoveProduct}
//             color="red"
//           />
//         </SafeAreaView>
//       </SafeAreaProvider>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   all: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   inputContainer: {
//     marginBottom: 12,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//     padding: 8,
//   },
//   inputDescription: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//     padding: 8,
//     marginBottom: 16,
//     height: 400,
//   },
//   imageContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     // justifyContent: 'space-between',
//   },
//   imageWrapper: {
//     // position: 'relative',
//     marginBottom: 16,
//     // width: '48%',
//   },
//   image: {
//     width: 80,
//     height: 80,
//     borderRadius: 4,
//   },
//   removeButton: {
//     position: 'absolute',
//     top: 4,
//     right: 4,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     borderRadius: 4,
//     padding: 4,
//   },
//   removeButtonText: {
//     color: '#fff',
//     fontSize: 12,
//   },
//   imageRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap', // Allows images to wrap to the next line if they don't fit
//     // justifyContent: 'center', // Centers the images in the row
//     alignItems: 'center', // Aligns images vertically in the center
//     // padding: 10,
//   },
// });
// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     fontSize: 16,
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 4,
//     color: 'black',
//     paddingRight: 30, // to ensure the text is never behind the icon
//     marginBottom: 16,
//   },
//   inputAndroid: {
//     fontSize: 16,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     borderWidth: 0.5,
//     borderColor: 'purple',
//     borderRadius: 8,
//     color: 'black',
//     paddingRight: 30, // to ensure the text is never behind the icon
//     marginBottom: 16,
//   },
// });

// export default AdminProductDetail;

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import {AntDesign} from '@expo/vector-icons';

const AdminProductDetail = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    _id: productId,
    name: initialName,
    price: initialPrice,
    description: initialDescription,
    rewardPercentage: initialRewardPercentage,
    quantity: initialQuantity,
    image: initialImage,
  } = route.params;

  const [selectedImages, setSelectedImages] = useState([]);
  const [name, setName] = useState(initialName);
  const [price, setPrice] = useState(initialPrice.toString());
  const [description, setDescription] = useState(initialDescription);
  const [rewardPercentage, setRewardPercentage] = useState(
    initialRewardPercentage.toString()
  );
  const [quantity, setQuantity] = useState(initialQuantity.toString());
  const [images, setImages] = useState(initialImage);

  const handleUpdateProduct = async () => {
    const imageUrls = await uploadImages(selectedImages);
    const updatedProduct = {
      name,
      price: parseFloat(price),
      description,
      rewardPercentage: parseFloat(rewardPercentage),
      quantity: parseInt(quantity, 10),
      image: images.concat(imageUrls),
    };

    try {
      console.log('Updating product with ID:', productId);
      console.log('Updated product data:', updatedProduct);

      const response = await axios.put(
        `https://backend-shopluandung.onrender.com/products/${productId}`,
        updatedProduct
      );
      if (response.status === 200) {
        Alert.alert('Success', 'Product updated successfully', [
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);
      } else {
        console.error('Failed to update product', response.data);
      }
    } catch (error) {
      console.error(
        'Error updating product:',
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleRemoveProduct = async () => {
    try {
      const response = await axios.delete(
        `https://backend-shopluandung.onrender.com/products/${productId}`
      );
      if (response.status === 200) {
        Alert.alert('Success', 'Product removed successfully', [
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);
      } else {
        console.error('Failed to remove product', response.data);
      }
    } catch (error) {
      console.error(
        'Error removing product:',
        error.response ? error.response.data : error.message
      );
    }
  };

  const confirmRemoveProduct = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: handleRemoveProduct,
          style: 'destructive',
        },
      ],
      {cancelable: true}
    );
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const uploadImages = async (images) => {
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

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 6,
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImages(result.assets);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.all}>
        <ScrollView style={styles.container}>
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

          <Text style={styles.label}>Reward Percentage</Text>
          <TextInput
            style={styles.input}
            value={rewardPercentage}
            onChangeText={setRewardPercentage}
            placeholder="Reward Percentage"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.inputDescription}
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            multiline
          />
          <View>
            <Text style={styles.label}>Images</Text>

            <Button title="Upload new image" onPress={handlePickImage} />

            <View style={styles.imageContainer}>
              {images.map((img, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{uri: img}} style={styles.image} />
                  <TouchableOpacity
                    onPress={() => handleRemoveImage(index)}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {selectedImages.length > 0 && (
              <View style={styles.imageRow}>
                {selectedImages.map((image, index) => (
                  <Image
                    key={index}
                    source={{uri: image.uri}}
                    style={styles.image}
                  />
                ))}
              </View>
            )}
          </View>
        </ScrollView>
        <Button title="Update Product" onPress={handleUpdateProduct} />
        <Button
          title="Remove Product"
          onPress={confirmRemoveProduct}
          color="red"
        />
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
  inputContainer: {
    marginBottom: 12,
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
  },
  inputDescription: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    height: 400,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    marginBottom: 16,
    marginRight: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 4,
    padding: 4,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
});

export default AdminProductDetail;
