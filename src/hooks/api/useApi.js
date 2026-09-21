import { useState, useEffect } from 'react';
import { fetchPosts, fetchPostById, createPost, deletePostById, updatePostById, Login, register, fetchUserById} from './api';

export const useApi = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const responseData = await fetchPosts();
                setData(responseData.data);
            } catch (error) {
                setError('Error de comunicación con el API. Por favor, inténtalo de nuevo más tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const fetchPost = async (postId) => {
        setLoading(true);
        try {
            const responseData = await fetchPostById(postId);
            return responseData.data;
        } catch (error) {
            setError('Error al obtener el post. Por favor, inténtalo de nuevo más tarde.');
        } finally {
            setLoading(false);
        }
    };
    const fetchUser = async (Id) => {
        setLoading(true);
        try {
            const responseData = await fetchUserById(Id);
            return responseData;
        } catch (error) {
            setError('Error al obtener el post. Por favor, inténtalo de nuevo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    const addPost = async (author_id,author_name,postData) => {
        setLoading(true);
        try {
            const { title, information, family, diet, funfact } = postData; 
            const responseData = await createPost(title, information,author_id, author_name , family, diet, funfact);
            setData([...data, responseData.data]);
        } catch (error) {
            setError('Error al crear el post. Por favor, inténtalo de nuevo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    const removePost = async (postId) => {
        setLoading(true);
        try {
            await deletePostById(postId);
            setData(data.filter(post => post.id !== postId)); // Eliminar el post de la lista actual
        } catch (error) {
            const message = error.status === 401
                ? 'Tu sesión no es válida o expiró. Inicia sesión nuevamente.'
                : error.status === 403
                    ? 'No tienes permiso para eliminar este post.'
                    : 'Error al eliminar el post. Por favor, inténtalo de nuevo más tarde.';

            setError(message);
            // Propagar el rechazo evita que la pantalla muestre un falso éxito.
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const updatePost = async (postId, updatedData) => {
        setLoading(true);
        try {
            const {  title, information, family, diet, funfact} = updatedData;
            const responseData = await updatePostById(postId, title, information, family, diet, funfact);
            setData(data.map(post => (post.id === postId ? responseData : post))); // Actualizar el post en la lista actual
        } catch (error) {
            const message = error.status === 401
                ? 'Tu sesión no es válida o expiró. Inicia sesión nuevamente.'
                : error.status === 403
                    ? 'No tienes permiso para modificar este post.'
                    : 'Error al actualizar el post. Por favor, inténtalo de nuevo más tarde.';

            setError(message);
            // Impide que el componente muestre éxito cuando PUT fue rechazado.
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const userLogin = async (login,username, password) => {
        setLoading(true);
        try {
            const response = await Login(login,username, password);
            return response;
        } catch (error) {
            const message = error.status
                ? error.message
                : 'Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.';
            setError(message);
            // La pantalla debe distinguir credenciales incorrectas (401) del límite (429).
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const addUser = async (username, password, email) => {
        setLoading(true);
        try {
            const response = await register(username, password, email);
            return response;
        } catch (error) {
            setError('Error al crear el usuario.');
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fetchPost, addPost, removePost, updatePost, userLogin, addUser,fetchUser };
};
