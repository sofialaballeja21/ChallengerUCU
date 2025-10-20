import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  originname?: string;
  originURL?: string;
  locationname?: string;
  locationURL?: string;
  image: string;
  episode: string[];
}


// Se crea el servicio API utilizando RTK Query
export const RickandMortyApi = createApi({
    reducerPath: 'RickandMortyApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/'}),

    

    endpoints: (builder) => ({
        getCharacters: builder.query<any[], void>({
            query: () => '/character',
        }),

        //Carga los personajes desde la API externa
        fetchCharactersFromAPi: builder.mutation<any, void>({
            query: () => ({
                url: '/character/fetch',
                method: 'GET',
            })
        }),
        getCharacterById: builder.query<any, number> ({
            query: (id) => `/character/${id}`,
        }),

        createCharacter: builder.mutation<any, Partial<any>>({
            query: (newCharacter) => ({
                url: '/character',
                method: 'POST',
                body: newCharacter, 
            })
        }),

        updateCharacter: builder.mutation<any, {id: number, data: Partial<any>}>({
            query: ({id, data}) => ({
                url: `/character/${id}`,
                method: 'PUT',
                body: data,
            })
        }),

        deleteCharacter: builder.mutation<any, number>({
            query: (id) => ({
                url: `/character/${id}`,
                method: 'DELETE',
            }),

    }),

    })
})

export const { useGetCharactersQuery,
               useFetchCharactersFromAPiMutation,
               useGetCharacterByIdQuery,
               useCreateCharacterMutation,
               useUpdateCharacterMutation,
               useDeleteCharacterMutation,
           } = RickandMortyApi;