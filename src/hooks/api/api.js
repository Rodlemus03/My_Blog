//const API_URL = 'https://cetaceans-blog-api.vercel.app';
const API_URL = 'http://127.0.0.1:3000'; // Cambia esto a la URL de tu API

export const fetchPosts = async () => {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
        throw new Error('Error al obtener los datos del API');
    }
    return response.json();
};

export const fetchPostById = async (id) => {
    const response = await fetch(`${API_URL}/post/${id}`);
    if (!response.ok) {
        throw new Error('Error al obtener el post del API');
    }
    return response.json();
};
export const fetchUserById = async (id) => {
    const response = await fetch(`${API_URL}/user/${id}`);
    if (!response.ok) {
        throw new Error('Error al obtener el usuario del API');
    }
    return response.json();
};

export const createPost = async (title, information, author_id, author_name, family, diet, funfact) => {
    const response = await fetch(`${API_URL}/post`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, information, author_id, author_name, family, diet, funfact })
    });
    if (!response.ok) {
        throw new Error('Error al crear el post en el API');
    }
    return response.json();
};

export const deletePostById = async (id) => {
    const response = await fetch(`${API_URL}/post/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    });
    if (!response.ok) {
        // Se conserva el status para que la interfaz distinga permisos de otros fallos.
        const error = new Error('Error al eliminar el post del API');
        error.status = response.status;
        throw error;
    }
    return response.status === 204 ? null : response.json();
};

export const updatePostById = async (id, title, information, family, diet, funfact) => {
    const response = await fetch(`${API_URL}/post/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, information, family, diet, funfact })
    });
    if (!response.ok) {
        const error = new Error('Error al actualizar el post en el API');
        error.status = response.status;
        throw error;
    }
    return response.json();
};

export const Login = async (login,username, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    const responseData = await response.json();
    if (response.ok) {
        login({
          username: responseData.username,
          role: responseData.role,
          id: responseData.id,
        })
    } else {
        // 401 significa credenciales inválidas; 429 es el límite de intentos.
        const message = response.status === 401
            ? 'Usuario o contraseña incorrectos.'
            : response.status === 429
                ? responseData.message || 'Demasiados intentos. Inténtalo de nuevo más tarde.'
                : 'Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.';
        const error = new Error(message);
        error.status = response.status;
        throw error;
    }
    return response;
};

export const register = async (username, password, email) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password }),
    });
    if (!response.ok) {
        throw new Error('Error al crear el post en el API');
    }
    return response.json();
};
