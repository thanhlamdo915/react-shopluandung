import {StyleSheet, Text, View, Pressable, FlatList} from 'react-native';
import React from 'react';

import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import CategoryAdmin from '../components/CategoryAdmin';
const ManageCategoriesAdmin = () => {
  const [category, setCategory] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          'https://backend-shopluandung.onrender.com/categories'
        );
        result = response.data;
        setCategory(result);
        // console.log('Categories:', response.data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };
    fetchCategory();
  }, []);
  const handleCategoryPage = (item) => {
    navigation.navigate('UpdateCategoryScreen', {
      _id: item._id,
      name: item.name,
      rewardPercentage: item.rewardPercentage,
      image: item.image,
    });
  };

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
            <Text style={{textAlign: 'center', color: 'red'}}> go back</Text>
          </Pressable>
          <Text style={styles.header}>Category Management</Text>
        </View>
        <View>
          {/* <Text>ManageCategoriesAdmin</Text> */}
          <View>
            <FlatList
              vertical={true}
              // numColumns={Math.ceil(category.length / 2)}
              // numColumns={numColumns}
              data={category}
              renderItem={({item}) => (
                <CategoryAdmin
                  item={item}
                  handleCategoryClick={handleCategoryPage}
                />
              )}
              style={{marginLeft: 10}}
            ></FlatList>
          </View>
        </View>
      </View>
    </>
  );
};

export default ManageCategoriesAdmin;

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
