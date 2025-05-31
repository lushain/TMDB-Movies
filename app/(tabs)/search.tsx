import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const search = () => {

	const [searchQuery, setsearchQuery] =useState('')

	const { 
		data: movies, 
		loading: moviesLoading, 
		error: moviesError,
		refetch: loadMovies,
		reset,
	} = useFetch(() => fetchMovies({
		query: searchQuery,
	}), false)

	useEffect(() => {

		const timeoutID = setTimeout(async () => {
			if(searchQuery.trim()){
				await loadMovies()
			}else{ 
				reset()
			}
		}, 500);

		return () => clearTimeout(timeoutID)

	}, [searchQuery])
		
	return (
		<View className="flex-1 bg-primary">
			<Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode='cover' />
			
			<FlatList data={movies} 
				renderItem={({ item }) => <MovieCard {...item} />} 
				keyExtractor={(item) => item.id.toString()}
				className='px-5'
				numColumns={3}
				columnWrapperStyle={{
					justifyContent: "center",
					gap: 16,
					marginVertical: 16
				}}
				contentContainerStyle={{
					paddingBottom: 100,
					paddingTop: 20
				}} 
				ListHeaderComponent={
					<>
					<View className="w-full flex-row justify-center mt-20 item-center">
						<Image source={icons.logo} className="w-122 h-10"/> 
					</View>
					<View className="my-5">
						<SearchBar 
							placeholder='Search Movie'
							value={searchQuery}
							onChangeText = {(text:string) => setsearchQuery(text)} />
					</View>

					{moviesLoading && (
						<ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
					)}

					{moviesError && (
						<Text className = "text-white">Error: {moviesError?.message} </Text>
					)} 
					
					{!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
						<Text className='text-xl text-white font-bold'>
							Search Results for{' '}
						<Text className="text-accent ">{searchQuery}</Text>
						</Text>

					)}

					</>}
					
				ListEmptyComponent = {
					!moviesLoading && !moviesError ? (
						<View className='mt-10 px-5 '>
							<Text className='text-center text-gray-500'>
								{searchQuery.trim() ? 'No movies Found' : 'Search for a Movie'}
							</Text>
						</View>

					) : null}
				
			/>
		</View>
		
	)
}

export default search