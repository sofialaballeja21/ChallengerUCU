import "./characterForm.css"
import React from "react";
import useCharacterForm from "../hooks/useCharacterForm";


export const CharacterForm: React.FC = () => {
    const { 
        register, 
        handleSubmit, 
        onSubmit, 
        onDelete, 
        message, 
        actionType, 
        isSubmitting,
        watchId,
        clearForm,
        errors
    } = useCharacterForm();

    const currentId = watchId; 

    return (
        <div className="form-container">
            
            {message && (
                <div className={`notification ${actionType}`}>
                    {message}
                    <button 
                        className="notification-close"
                        onClick={clearForm}
                    >
                        limpiar
                    </button>
                </div>
            )}
            
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="character-form"
            >
                <h2 className="form-title">Character Form</h2>

                <div className="form-group">
                    <label>ID (solo para editar/eliminar)</label>
                    <input 
                        type="number"
                        {...register("id")} 
                        placeholder="Ej: 100"
                        className="form-input"
                    />
                    <small className="input-help">
                        Deja vacío para crear nuevo personaje
                    </small>
                </div>

                <div className="form-group">
                    <label>Nombre *</label> 
                    <input 
                        type="text"
                        {...register("name", { required: true })} 
                        placeholder="Nombre del personaje"
                        className="form-input"
                    />
                    {errors.name && <span className="error-message">El nombre es requerido</span>}
                </div>

                <div className="form-group">
                    <label>Especie *</label>
                    <input
                        type="text"
                        {...register("species", { required: true })}
                        placeholder="Human, Alien..."
                        className="form-input"
                    />
                    {errors.species && <span className="error-message">La especie es requerida</span>}
                </div>

                <div className="form-group">
                    <label>Estado *</label>
                    <select
                        {...register("status", { required: true })}
                        className="form-input"
                    >
                        <option value="">Seleccionar estado</option>
                        <option value="Alive">Alive</option>
                        <option value="Dead">Dead</option>
                        <option value="Unknown">Unknown</option>
                    </select>
                    {errors.status && <span className="error-message">El estado es requerido</span>}
                </div>

                <div className="form-group">
                    <label>Género</label>
                    <select
                        {...register("gender")}
                        className="form-input"
                    >
                        <option value="">Seleccionar género</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Genderless">Genderless</option>
                        <option value="Unknown">Unknown</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Origen</label>
                    <input
                        type="text"
                        {...register("originname")}
                        placeholder="Planeta o dimensión"
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label>Imagen (URL)</label>
                    <input
                        type="url"
                        {...register("image")}
                        placeholder="https://ejemplo.com/imagen.jpg"
                        className="form-input"
                    />
                </div>

                <div className="form-buttons">
                    <button 
                        type="submit" 
                        className="btn save-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Guardando...' : currentId ? 'Actualizar' : 'Crear'}
                    </button>
                    
                    <button 
                        type="button" 
                        className="btn delete-btn" 
                        onClick={() => {
                            
                            if (currentId) {
                                if (window.confirm(`¿Estás seguro de que quieres eliminar el personaje ID: ${currentId}?`)) {
                                    onDelete(currentId);
                                }
                            } else {
                                alert('Ingresa un ID para eliminar');
                            }
                        }}
                        disabled={isSubmitting || !currentId}
                    >
                        {isSubmitting ? 'Eliminando...' : 'Eliminar'}
                    </button>
                </div>

                
                <div className="form-info">
                    {currentId && (
                        <p className="edit-warning">
                            Los cambios se aplicarán al personaje existente
                        </p>
                    )}
                </div>
            </form>
        </div>  
    );
};