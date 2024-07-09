import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CategoryItem = ({item, handleCategoryClick}) => {
  return (
    <View style={{height: 63, width: 63, paddingTop: 7}}>
      <Pressable
        style={{}}
        onPress={() => {
          console.log('Category ID:', item._id);
          handleCategoryClick(item);
        }}
      >
        <Image
          source={{uri: item?.image}}
          style={{
            height: 40,
            width: 40,
            borderRadius: 40 / 2,
          }}
        />
        {/* <View style={{height: 20, width: 40, flex: 'wrap'}}> */}
        <View style={{height: 20, width: 40}}>
          <Text style={{fontSize: 10}}>{item.name}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({});
