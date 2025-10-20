import "./characterCard.css";
import React from "react";
import { Character } from "../API/api";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
    return (
        <div className="character-card" key={character.id}>

       
        
            <div className="character-image-container">
                <img
                    src={character.image}
                    alt={character.name}
                    className="character-image"
                    onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/300x300/4B5563/FFFFFF?text=No+Image';
                    }}
                ></img> 

                <div className={`status-badge status-${character.status.toLowerCase()}`}>
                    {character.status}
                </div>
            </div>
            

    
            <div className= "character-content">
                <div className="character-name">
                    {character.name}
                </div>

                <div className="character-detail">
                    <div className="detail-item">
                        <span className="detail-lebel">Gender:</span>
                        <span className="detail-value"> {character.gender}</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-lebel">Specie:</span>
                        <span className="detail-value"> {character.species}</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-lebel">Origin:</span>
                        <span className="detail-value"> Origen: {character.origin || "Unknown"}</span>
                    </div>
                </div>
            </div>
        </div> 
    );
};