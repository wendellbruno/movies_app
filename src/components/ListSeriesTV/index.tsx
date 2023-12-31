import React from 'react';
import { View, FlatList, Text, SafeAreaView, Image } from "react-native";
import { useQuery } from "react-query";
import { getSeriesTvTopRated } from '../../services';
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {useRootesHook} from '../../hooks';

import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const ListSeriesTV: React.FC = () => {

    const {navigate} = useRootesHook();

    const { data } = useQuery({
        queryKey: ["SeriesTvTopRated"],
        queryFn: getSeriesTvTopRated,
      });

      return (
        <SafeAreaView 
        style={{flex:1}}>
        <View style={styles.container}>
          <View style={styles.containerList}>
            <FlatList
              data={data}
              ListHeaderComponent={() => (
                <View style={styles.containerHeader}>
                  <Ionicons
                    name="tv-outline"
                    style={styles.styledIcon}
                    />
                </View>
              )}
              showsVerticalScrollIndicator = {false}
              ItemSeparatorComponent={() => <View style={{marginBottom: 20}} />}
              renderItem={({ item }) => (
                <TouchableOpacity
                onPress={() => navigate('Detail', {data: item, type: 'tv'})}
                >
                <View style={styles.containerCard}>
                  <View style={styles.containerImgMovie}>
                  <Image 
                  style={styles.imgMovie}
                  source={{uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`}} />
                  </View>
                  <View style={styles.containerDetail}>
                    <Text style={styles.titleDetail}>
                      {item.name}
                    </Text>
                    <Text style={styles.subtileDetail}>
                      {item.first_air_date}
                    </Text>
                    
                  </View>
                  <View style={styles.containerAvarege}>
                  <Text>{item.vote_average.toFixed(1)}</Text>
                    <AntDesign name="star" />
                  </View>
                </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
                  </SafeAreaView>
      );
}
