import "./characterComponente.css";
import React from "react";
import { CharactersHooks } from "../hooks/CharacterHooks";
import { CharacterCard } from "./CharacterCard";


export const CharacterComponent: React.FC = () => {
    const {
    characters,
    error,
    isLoading,
    isFetching,
    fetchFromAPI,
    refetch,

    } = CharactersHooks();

    if (isLoading || isFetching) {
        return (
            <div className="loading-container">
                <div className="loading-spinner">
                    Loading...
                </div>
            </div>
        )
    }

    if (error) {
        console.error("Error fetching characters:", error);
        return (
            <div className="error-container">
                Error loading characters.
            </div>
        )
    }

    return (
        <div className="character-component">
            <div className="component-header">
                 <p className="component-subtitle">Explore el multiverso de Rik y Morty</p>
            </div>

            <div className="button-container">

                <button
                    onClick={async () => {
                        try {
                            await fetchFromAPI().unwrap();
                            refetch();
                        } catch (error) {
                            console.log("Error loading characters from API", error);
                        }
                    }}
                className="btn btn-fetch"
                disabled={isFetching}>
                    {isFetching ? "Loading..." : "Fetch Characters from API"}  
                </button>



                <button
                    onClick={() => refetch()}
                    className="btn btn-refresh"
                    disabled={isLoading}>
                        {isLoading ? "Refreshing..." : "Refresh Characters"}
                </button>
            </div>

            <div className="character-grid">
                {characters.map((char: any) =>(
                    <CharacterCard key={char.id} character={char} />
                ))}

            </div>
            {characters.length === 0 && (
            <div className="empty-state">
                <h3>No character </h3>
        
            </div>
            )}
        </div>
    );
};