import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {AntDesign} from '@expo/vector-icons';
import axios from 'axios';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import ProductCard from '../components/ProductCard';
import {FontAwesome} from '@expo/vector-icons';
import Feather from 'react-native-vector-icons/Feather';

const CategoryProduct = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [categoryQuery, setCategoryQuery] = useState(
    route.params?.categoryQuery || ''
  );
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (route.params?.categoryQuery) {
      fetchSearchResults(route.params.categoryQuery);
    }
    fetchCategoryName(categoryQuery);
  }, [route.params?.categoryQuery]);

  const handleSearch = () => {
    fetchSearchResults(categoryQuery);
  };
  // console.log('cate', categoryName, categoryQuery);
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

  const fetchCategoryName = async (categoryId) => {
    try {
      const response = await axios.get(
        `https://backend-shopluandung.onrender.com/categoryName/${categoryId}`
      );
      setCategoryName(response.data.categoryName);
      // console.log('cate name', categoryName);
    } catch (error) {
      console.error('Error fetching category name:', error);
    }
  };

  const fetchSearchResults = async () => {
    try {
      const response = await axios.get(
        `https://backend-shopluandung.onrender.com/category/${categoryQuery}`
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
                  // backgroundColor: 'white',
                  borderRadius: 3,
                  height: 38,
                  flex: 1,
                  paddingLeft: 10,
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}
                >
                  CATEGORY: {categoryName}
                </Text>
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
            </View>
          </View>

          {/* Product display */}
          <ScrollView>
            <View>
              <FlatList
                data={displayedProducts}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                  <ProductCard
                    item={item}
                    handleProductClick={handleProductDetails}
                  />
                )}
                showsVerticalScrollIndicator={false}
              />
            </View>
            {/* Load more button */}
            {searchResults.length > itemsPerPage && (
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
            )}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default CategoryProduct;

const styles = StyleSheet.create({
  // Your styles here
});
