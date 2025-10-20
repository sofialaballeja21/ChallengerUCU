import React, { useEffect } from "react";
import { useGetCharactersQuery,
        useFetchCharactersFromAPiMutation
    } from "../API/api";

export function CharactersHooks() {
  const { data: characters = [], error, isLoading , refetch} = useGetCharactersQuery();
  const [fetchFromAPI, { isLoading: isFetching}] = useFetchCharactersFromAPiMutation();



  useEffect(() => {
    const loadCharacter = async () => {
        try {
            await fetchFromAPI().unwrap();
            refetch();

        } catch (error) {
            console.log("Error loading characters from API", error);
        }

    };
    if (!characters || characters.length === 0) {
        loadCharacter();
    }

    },[]);


  return {
    characters: Array.isArray(characters) ? characters: [],
    error,
    isLoading,
    isFetching,
    fetchFromAPI,
    refetch,

  };
}
