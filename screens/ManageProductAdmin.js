// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Pressable,
//   FlatList,
//   ScrollView,
//   TextInput,
// } from 'react-native';
// import axios from 'axios';
// import {useNavigation} from '@react-navigation/native';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import ProductCard from '../components/ProductCard';

// const ManageProductAdmin = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [originalProducts, setOriginalProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [itemsPerPage, setItemsPerPage] = useState(4);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(
//           'https://backend-shopluandung.onrender.com/products'
//         );
//         setProducts(response.data);
//         setOriginalProducts(response.data); // Save original products
//         setFilteredProducts(response.data); // Initialize filtered products with all products
//       } catch (error) {
//         console.error('Failed to fetch products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleLoadMore = () => {
//     setItemsPerPage((prevItemsPerPage) => prevItemsPerPage + 4);
//   };

//   const displayedProducts = filteredProducts.slice(0, itemsPerPage);
//   const hasMoreProducts = displayedProducts.length < filteredProducts.length;

//   const handleProductDetails = (item) => {
//     navigation.navigate('AdminProductDetail', {
//       _id: item._id,
//       category: item.category,
//       name: item.name,
//       price: item.price,
//       image: item.image,
//       rewardPercentage: item.rewardPercentage,
//       description: item.description,
//       quantity: item.quantity,
//     });
//   };

//   const handleSearch = () => {
//     const filtered = originalProducts.filter((product) =>
//       product.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredProducts(filtered);
//   };

//   const cancelSearch = () => {
//     setSearchQuery('');
//     setFilteredProducts(originalProducts);
//   };

//   return (
//     <>
//       <View style={{paddingTop: 50, paddingLeft: 10}}>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'flex-start',
//           }}
//         >
//           <Pressable
//             onPress={() => navigation.goBack()}
//             style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
//           >
//             <AntDesign name="arrowleft" size={24} color="black" />
//             <Text style={{textAlign: 'center', color: 'red'}}>
//               {' '}
//               Admin Panel
//             </Text>
//           </Pressable>
//           <Text style={styles.header}> Product Management</Text>
//         </View>
//         {/* Search input */}
//         <View style={styles.searchContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Search products..."
//             onChangeText={(text) => setSearchQuery(text)}
//             onSubmitEditing={handleSearch}
//             value={searchQuery}
//           />
//           {searchQuery !== '' && (
//             <Pressable style={styles.cancelButton} onPress={cancelSearch}>
//               <Text style={styles.cancelText}>Cancel</Text>
//             </Pressable>
//           )}
//           <Pressable style={styles.searchButton} onPress={handleSearch}>
//             <Text style={styles.searchText}>Search</Text>
//           </Pressable>
//         </View>
//         <ScrollView>
//           <View>
//             <FlatList
//               data={displayedProducts}
//               numColumns={2}
//               keyExtractor={(item) => item._id.toString()} // Use item._id as key
//               renderItem={({item}) => (
//                 <ProductCard
//                   item={item}
//                   handleProductClick={handleProductDetails}
//                 />
//               )}
//               showsVerticalScrollIndicator={false}
//             />
//           </View>
//           {/* Load more button */}
//           {hasMoreProducts && (
//             <View
//               style={{
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 paddingLeft: 10,
//               }}
//             >
//               <Pressable
//                 style={{
//                   backgroundColor: '#DAC0F7',
//                   color: '#FFFFFF',
//                   padding: 10,
//                   margin: 10,
//                   borderRadius: 5,
//                   height: 50,
//                   width: 120,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}
//                 onPress={handleLoadMore}
//               >
//                 <Text
//                   style={{
//                     color: 'black',
//                     alignItems: 'center',
//                     fontSize: 13,
//                     fontWeight: 'bold',
//                   }}
//                 >
//                   Load more
//                 </Text>
//               </Pressable>
//             </View>
//           )}
//         </ScrollView>
//       </View>
//     </>
//   );
// };

// export default ManageProductAdmin;

// const styles = StyleSheet.create({
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     padding: 10,
//     marginRight: 10,
//     // marginBottom: 10,
//     flex: 1,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   cancelButton: {
//     marginLeft: 10,
//     padding: 10,
//   },
//   cancelText: {
//     color: 'red',
//     fontWeight: 'bold',
//   },
//   searchButton: {
//     backgroundColor: '#DAC0F7',
//     padding: 10,
//     borderRadius: 5,
//   },
//   searchText: {
//     color: 'black',
//     fontWeight: 'bold',
//   },
// });
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import ProductCard from '../components/ProductCard';

const ManageProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'https://backend-shopluandung.onrender.com/products'
        );
        setProducts(response.data);
        setOriginalProducts(response.data); // Save original products
        setFilteredProducts(response.data); // Initialize filtered products with all products
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleLoadMore = () => {
    setItemsPerPage((prevItemsPerPage) => prevItemsPerPage + 4);
  };

  const displayedProducts = filteredProducts.slice(0, itemsPerPage);
  const hasMoreProducts = displayedProducts.length < filteredProducts.length;

  const handleProductDetails = (item) => {
    navigation.navigate('AdminProductDetail', {
      _id: item._id,
      category: item.category,
      name: item.name,
      price: item.price,
      image: item.image,
      rewardPercentage: item.rewardPercentage,
      description: item.description,
      quantity: item.quantity,
    });
  };

  const handleSearch = () => {
    const filtered = originalProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const cancelSearch = () => {
    setSearchQuery('');
    setFilteredProducts(originalProducts);
  };

  // console.log('product', _id);
  return (
    <>
      <View style={{paddingTop: 50, paddingLeft: 10}}>
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
              Admin Panel
            </Text>
          </Pressable>
          <Text style={styles.header}> Product Management</Text>
        </View>
        {/* Search input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search products..."
            onChangeText={(text) => setSearchQuery(text)}
            onSubmitEditing={handleSearch}
            value={searchQuery}
          />
          {searchQuery !== '' && (
            <Pressable style={styles.cancelButton} onPress={cancelSearch}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          )}
          <Pressable style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchText}>Search</Text>
          </Pressable>
        </View>
        <ScrollView>
          <View>
            <FlatList
              data={displayedProducts}
              numColumns={2}
              keyExtractor={(item) => item._id.toString()} // Use item._id as key
              renderItem={({item}) => (
                <ProductCard
                  item={item}
                  handleProductClick={handleProductDetails}
                  // handleDeleteProduct={handleDeleteProduct}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
          {/* Load more button */}
          {hasMoreProducts && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 10,
              }}
            >
              <Pressable
                style={{
                  backgroundColor: '#DAC0F7',
                  color: '#FFFFFF',
                  padding: 10,
                  margin: 10,
                  borderRadius: 5,
                  height: 50,
                  width: 120,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={handleLoadMore}
              >
                <Text
                  style={{
                    color: 'black',
                    alignItems: 'center',
                    fontSize: 13,
                    fontWeight: 'bold',
                  }}
                >
                  Load more
                </Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default ManageProductAdmin;

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    // marginBottom: 10,
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cancelButton: {
    marginLeft: 10,
    padding: 10,
  },
  cancelText: {
    color: 'red',
    fontWeight: 'bold',
  },
  searchButton: {
    backgroundColor: '#DAC0F7',
    padding: 10,
    borderRadius: 5,
  },
  searchText: {
    color: 'black',
    fontWeight: 'bold',
  },
});
