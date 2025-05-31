import { icons } from '@/constants/icons'
import { Link } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 2,

        elevation: 2,
    }
})

const MovieCard = ({ id, poster_path, title, vote_average, release_date, original_language }: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild className='mb-5'>
        <TouchableOpacity className="w-[30%]">
            <Image
                source = {{
                    uri: poster_path
                        ? `https://image.tmdb.org/t/p/w500${poster_path}`
                        : "https://placehold.co/600x400/1a1a1a/ffffff.png"
                }}
                className="w-full h-52 rounded-lg"
                resizeMode='cover'
            />
            <View className="flex-row items-center justify-start gap-x-1 mt-[-20px]" style={styles.shadow}>
                <Image source={icons.star} className="size-4" />
                <Text className='text-white text-s uppercase'>{Math.round(vote_average/2)}</Text>
            </View>
            <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>{title}</Text>

            <View className="flex-row items-center justify-between">
                <Text className='text-xs text-light-300 font-medium mt-1'>{release_date?.split('-')[0]}</Text>
                <Text className="text-xs font-medium text-light-300 uppercase">
                    {original_language}
                </Text>
            </View>
        </TouchableOpacity>
    </Link>
  )
}

export default MovieCard