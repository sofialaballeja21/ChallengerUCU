import { useForm} from "react-hook-form";
import { useState } from "react";
import { Character } from "../API/api";
import { CharactersHooks } from "./CharacterHooks";
import { useCreateCharacterMutation, useDeleteCharacterMutation, useUpdateCharacterMutation } from "../API/api";




export default function useCharacterForm(selectedId?: number) {
    const {register, handleSubmit, reset, setValue, watch, formState: {errors}} = useForm<Partial<Character>>()

    const [createCharacter, { isLoading: isCreating }] = useCreateCharacterMutation();
    const [updateCharacter, { isLoading: isUpdating }] = useUpdateCharacterMutation();
    const [deleteCharacter, { isLoading: isDeleting }] = useDeleteCharacterMutation();;
    const { refetch } = CharactersHooks();

    const [message, setMessage] = useState<string>("");
    const [actionType, setActionType] = useState<'created' | 'updated' | 'deleted' | null>(null);



    const onSubmit = async (data: Partial<Character>) => {
        const formattedData = {
            ...data,
            originname: data.originname,
            originURL: data.originURL,
            locationname: data.locationname,
            locationURL: data.locationURL,
            
        };

        try {
            if (data.id) {
            const id = Number(data.id);
            const { id: _, ...cleanData } = formattedData; 
            await updateCharacter({ id, data: cleanData }).unwrap();
                setActionType('updated');
                setMessage('Character actualizado correctamente');
            } else {
                const {id, ...createData} = formattedData;

                await createCharacter(createData).unwrap();

                setActionType('created');
                setMessage('Character creado correctamente');
                reset();
            }
            
        } catch (error) {
            console.log("message: Error guardandocharacter", error)
            setMessage('Error guardando character');
            
        }
    };

    const onDelete = async (id: number) => {
        try {
            await deleteCharacter(id).unwrap();
            setActionType('deleted');
            setMessage('Character eliminado exitosamente');
            reset();
        } catch (error) {
            console.log("Error deleting character", error)
            setMessage('Error eliminado character');
            
        }
    };

    const loadCharacterData = (character: Partial<Character>) => {
        Object.entries(character).forEach(([key, value]) => {
            setValue(key as keyof Character, value);
        });
    };

    const clearForm = () => {
        reset();
        setMessage('');
        setActionType(null);
    };
    
        return {
        register,
        handleSubmit,
        onSubmit,
        onDelete,
        loadCharacterData,
        clearForm,
        message,
        actionType,
        isSubmitting: isCreating || isUpdating || isDeleting,
        errors,
        watchId: watch('id')
    };
    
}