// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Platform,
//   ScrollView,
//   Pressable,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
//   Modal,
// } from 'react-native';
// import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

// import {AntDesign} from '@expo/vector-icons';
// import axios from 'axios';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import {useSelector} from 'react-redux';
// import ProductCard from '../components/ProductCard';
// import {FontAwesome} from '@expo/vector-icons';
// import Feather from 'react-native-vector-icons/Feather';

// const SearchPage = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const cart = useSelector((state) => state.cart.cart);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);
//   const [itemsPerPage, setItemsPerPage] = useState(4);
//   const [searchQuery, setSearchQuery] = useState(
//     route.params?.searchQuery || ''
//   );
//   const [activeFilter, setActiveFilter] = useState(null);

//   useEffect(() => {
//     if (route.params?.searchQuery) {
//       fetchSearchResults(route.params.searchQuery);
//     }
//   }, [route.params?.searchQuery]);

//   const handleSearch = () => {
//     fetchSearchResults(searchQuery);
//   };

//   const handleProductDetails = (item) => {
//     navigation.navigate('Info', {
//       id: item.productId,
//       category: item.category,
//       name: item.name,
//       price: item?.price,
//       image: item.image,
//       variation: item?.variation,
//       rewardPercentage: item?.rewardPercentage,
//       description: item?.description,
//       quantity: item?.quantity,
//       rewardPercentage: item?.rewardPercentage,
//       item: item,
//     });
//   };

//   const toggleFavorite = (item) => {
//     setProducts(
//       products.map((prod) => {
//         if (prod._id === item._id) {
//           return {
//             ...prod,
//             isFavorite: !prod.isFavorite,
//           };
//         }
//         return prod;
//       })
//     );
//   };

//   const fetchSearchResults = async () => {
//     try {
//       const response = await axios.get(
//         `https://backend-shopluandung.onrender.com/search/${searchQuery}`
//       );
//       setSearchResults(response.data);
//     } catch (error) {
//       console.error('Error searching for products:', error);
//     }
//   };

//   const handleLoadMore = () => {
//     setItemsPerPage(itemsPerPage + 4);
//   };

//   const displayedProducts = searchResults.slice(0, itemsPerPage);

//   const applyFilter = async (filter) => {
//     try {
//       let endpoint;
//       switch (filter) {
//         case 'name':
//           endpoint = `filterByName/${searchQuery}`;
//           break;
//         case 'priceLowToHigh':
//           endpoint = `filterByPriceLowToHigh/${searchQuery}`;
//           break;
//         case 'priceHighToLow':
//           endpoint = `filterByPriceHighToLow/${searchQuery}`;
//           break;
//         default:
//           setSearchResults(products);
//           return;
//       }

//       const response = await axios.get(
//         `https://backend-shopluandung.onrender.com/products/${endpoint}`
//       );
//       setSearchResults(response.data);
//       setActiveFilter(filter);
//     } catch (error) {
//       console.error(`Error filtering products by ${filter}:`, error);
//     }
//   };

//   const clearFilter = () => {
//     setSearchResults(products);
//     setActiveFilter(null);
//   };

//   const handleFilterByName = () => {
//     applyFilter('name');
//   };

//   const handleFilterByPriceLowToHigh = () => {
//     applyFilter('priceLowToHigh');
//   };

//   const handleFilterByPriceHighToLow = () => {
//     applyFilter('priceHighToLow');
//   };

//   return (
//     <>
//       <SafeAreaProvider>
//         <SafeAreaView
//           style={{
//             paddingTop: Platform.OS === 'android' ? 40 : 0,
//             flex: 1,
//             backgroundColor: 'white',
//           }}
//         >
//           {/* Header */}
//           <View>
//             {/* Search bar */}
//             <View
//               style={{
//                 backgroundColor: '#822DE2',
//                 padding: 10,
//                 flexDirection: 'row',
//                 alignItems: 'center',
//               }}
//             >
//               {/* Back button */}
//               <Pressable style={{}} onPress={() => navigation.goBack()}>
//                 <Feather name="arrow-left-circle" size={30} color="#DAC0F7" />
//               </Pressable>
//               {/* Search bar */}
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   marginHorizontal: 7,
//                   gap: 10,
//                   backgroundColor: 'white',
//                   borderRadius: 3,
//                   height: 38,
//                   flex: 1,
//                   paddingLeft: 10,
//                 }}
//               >
//                 <TextInput
//                   placeholder="Search"
//                   value={searchQuery}
//                   onChangeText={(txt) => setSearchQuery(txt)}
//                   style={{
//                     flex: 1,
//                     fontSize: 13,
//                     color: 'black',
//                   }}
//                 />
//                 <TouchableOpacity
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     marginHorizontal: 7,
//                     gap: 10,
//                     backgroundColor: 'white',
//                     borderRadius: 3,
//                     height: 38,
//                   }}
//                   onPress={handleSearch}
//                 >
//                   <AntDesign
//                     style={{paddingRight: 10}}
//                     name="search1"
//                     size={22}
//                     color="black"
//                   />
//                 </TouchableOpacity>
//               </View>
//               {/* Cart */}
//               <Pressable onPress={() => navigation.navigate('Cart')}>
//                 <FontAwesome name="shopping-bag" size={24} color="white" />
//               </Pressable>
//               {/* Cart count */}
//               <View
//                 style={{
//                   backgroundColor: 'white',
//                   width: 20,
//                   height: 20,
//                   borderRadius: 20 / 2,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   marginBottom: 20,
//                 }}
//               >
//                 <Text>{cart.length}</Text>
//               </View>
//               {/* Filter */}
//               <TouchableOpacity onPress={() => setModalVisible(true)}>
//                 <Feather name="filter" size={24} color="white" />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Product display */}
//           <ScrollView>
//             <View>
//               <FlatList
//                 data={displayedProducts}
//                 numColumns={2}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({item}) => (
//                   <ProductCard
//                     item={item}
//                     handleProductClick={handleProductDetails}
//                     toggleFavorite={toggleFavorite}
//                   />
//                 )}
//                 showsVerticalScrollIndicator={false}
//               />
//             </View>
//             {/* Load more button */}
//             {searchResults.length > itemsPerPage && (
//               <View
//                 style={{
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   paddingLeft: 10,
//                   paddingBottom: 20,
//                 }}
//               >
//                 <Pressable
//                   style={{
//                     backgroundColor: '#DAC0F7',
//                     padding: 10,
//                     margin: 10,
//                     borderRadius: 5,
//                     height: 50,
//                     width: 120,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}
//                   onPress={handleLoadMore}
//                 >
//                   <Text
//                     style={{
//                       color: 'black',
//                       fontSize: 13,
//                       fontWeight: 'bold',
//                     }}
//                   >
//                     Load more
//                   </Text>
//                 </Pressable>
//               </View>
//             )}
//           </ScrollView>
//         </SafeAreaView>
//       </SafeAreaProvider>
//       {/* Modal */}
//       <Modal
//         transparent={true}
//         animationType="slide"
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(false);
//         }}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Filter by:</Text>
//             <Pressable
//               onPress={() => {
//                 setModalVisible(false);
//                 clearFilter();
//               }}
//             >
//               <Text>Clear filter</Text>
//             </Pressable>
//             <Pressable style={styles.modalButton} onPress={handleFilterByName}>
//               <Text>Name</Text>
//             </Pressable>
//             <Pressable
//               style={styles.modalButton}
//               onPress={handleFilterByPriceLowToHigh}
//             >
//               <Text>Price (low to high)</Text>
//             </Pressable>
//             <Pressable
//               style={styles.modalButton}
//               onPress={handleFilterByPriceHighToLow}
//             >
//               <Text>Price (high to low)</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </>
//   );
// };

// export default SearchPage;

// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContainer: {
//     width: 300,
//     padding: 20,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   modalButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     marginVertical: 5,
//     borderRadius: 5,
//     backgroundColor: '#e0e0e0',
//     width: '100%',
//     alignItems: 'center',
//   },
// });

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {AntDesign} from '@expo/vector-icons';
import axios from 'axios';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import ProductCard from '../components/ProductCard';
import {FontAwesome} from '@expo/vector-icons';
import Feather from 'react-native-vector-icons/Feather';

const SearchPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  const [modalVisible, setModalVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [searchQuery, setSearchQuery] = useState(
    route.params?.searchQuery || ''
  );
  const [activeFilter, setActiveFilter] = useState(null);

  useEffect(() => {
    if (route.params?.searchQuery) {
      fetchSearchResults(route.params.searchQuery);
    }
  }, [route.params?.searchQuery]);

  const handleSearch = () => {
    fetchSearchResults(searchQuery);
  };

  const handleProductDetails = (item) => {
    navigation.navigate('Info', {
      id: item.productId,
      category: item.category,
      name: item.name,
      price: item?.price,
      image: item.image,
      variation: item?.variation,
      rewardPercentage: item?.rewardPercentage,
      description: item?.description,
      quantity: item?.quantity,
      rewardPercentage: item?.rewardPercentage,
      item: item,
    });
  };

  const toggleFavorite = (item) => {
    setProducts(
      products.map((prod) => {
        if (prod._id === item._id) {
          return {
            ...prod,
            isFavorite: !prod.isFavorite,
          };
        }
        return prod;
      })
    );
  };

  const fetchSearchResults = async () => {
    try {
      const response = await axios.get(
        `https://backend-shopluandung.onrender.com/search/${searchQuery}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching for products:', error);
    }
  };

  const handleLoadMore = () => {
    setItemsPerPage(itemsPerPage + 4);
  };

  const displayedProducts = searchResults.slice(0, itemsPerPage);

  const applyFilter = async (filter) => {
    try {
      let endpoint;
      switch (filter) {
        case 'name':
          endpoint = `filterByName/${searchQuery}`;
          break;
        case 'priceLowToHigh':
          endpoint = `filterByPriceLowToHigh/${searchQuery}`;
          break;
        case 'priceHighToLow':
          endpoint = `filterByPriceHighToLow/${searchQuery}`;
          break;
        default:
          setSearchResults(products);
          return;
      }

      const response = await axios.get(
        `https://backend-shopluandung.onrender.com/products/${endpoint}`
      );
      setSearchResults(response.data);
      setActiveFilter(filter);
    } catch (error) {
      console.error(`Error filtering products by ${filter}:`, error);
    }
  };

  const clearFilter = () => {
    setSearchResults(products);
    setActiveFilter(null);
  };

  const handleFilterByName = () => {
    applyFilter('name');
  };

  const handleFilterByPriceLowToHigh = () => {
    applyFilter('priceLowToHigh');
  };

  const handleFilterByPriceHighToLow = () => {
    applyFilter('priceHighToLow');
  };

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            paddingTop: Platform.OS === 'android' ? 40 : 0,
            flex: 1,
            backgroundColor: 'white',
          }}
        >
          {/* Header */}
          <View>
            {/* Search bar */}
            <View
              style={{
                backgroundColor: '#822DE2',
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {/* Back button */}
              <Pressable style={{}} onPress={() => navigation.goBack()}>
                <Feather name="arrow-left-circle" size={30} color="#DAC0F7" />
              </Pressable>
              {/* Search bar */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 7,
                  gap: 10,
                  backgroundColor: 'white',
                  borderRadius: 3,
                  height: 38,
                  flex: 1,
                  paddingLeft: 10,
                }}
              >
                <TextInput
                  placeholder="Search"
                  value={searchQuery}
                  onChangeText={(txt) => setSearchQuery(txt)}
                  style={{
                    flex: 1,
                    fontSize: 13,
                    color: 'black',
                  }}
                />
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 7,
                    gap: 10,
                    backgroundColor: 'white',
                    borderRadius: 3,
                    height: 38,
                  }}
                  onPress={handleSearch}
                >
                  <AntDesign
                    style={{paddingRight: 10}}
                    name="search1"
                    size={22}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              {/* Cart */}
              <Pressable onPress={() => navigation.navigate('Cart')}>
                <FontAwesome name="shopping-bag" size={24} color="white" />
              </Pressable>
              {/* Cart count */}
              <View
                style={{
                  backgroundColor: 'white',
                  width: 20,
                  height: 20,
                  borderRadius: 20 / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 20,
                }}
              >
                <Text>{cart.length}</Text>
              </View>
              {/* Filter */}
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Feather name="filter" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Product display */}
          <FlatList
            data={displayedProducts}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <ProductCard
                item={item}
                handleProductClick={handleProductDetails}
                toggleFavorite={toggleFavorite}
              />
            )}
            ListFooterComponent={
              searchResults.length > itemsPerPage && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: 10,
                    paddingBottom: 20,
                  }}
                >
                  <Pressable
                    style={{
                      backgroundColor: '#DAC0F7',
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
                        fontSize: 13,
                        fontWeight: 'bold',
                      }}
                    >
                      Load more
                    </Text>
                  </Pressable>
                </View>
              )
            }
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </SafeAreaProvider>
      {/* Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filter by:</Text>
            <Pressable
              onPress={() => {
                setModalVisible(false);
                clearFilter();
              }}
            >
              <Text>Clear filter</Text>
            </Pressable>
            <Pressable style={styles.modalButton} onPress={handleFilterByName}>
              <Text>Name</Text>
            </Pressable>
            <Pressable
              style={styles.modalButton}
              onPress={handleFilterByPriceLowToHigh}
            >
              <Text>Price (low to high)</Text>
            </Pressable>
            <Pressable
              style={styles.modalButton}
              onPress={handleFilterByPriceHighToLow}
            >
              <Text>Price (high to low)</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    width: '100%',
    alignItems: 'center',
  },
});
