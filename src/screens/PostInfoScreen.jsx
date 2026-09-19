import { useState, useEffect } from 'react';
import { useApi } from '../hooks/api/useApi';
import useNavigate from '../hooks/HOC/useNavigate';
import Swal from 'sweetalert2';
import '../styles/Login.css';
import LoadingScreen from './LoadingScreen';


const Postdetail = () => {
    const postId = localStorage.getItem('postId');
    console.log("PostId: ",postId)
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { navigate } = useNavigate();
    const { fetchPost, removePost, updatePost } = useApi();
    const [updatedPostData, setUpdatedPostData] = useState({
        title: '',
        information: '',
        family: '',
        diet: '',
        funfact: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const responseData = await fetchPost(postId);
                console.log(responseData)
                setPost(responseData);

                const { title, information,family, diet, funfact } = responseData;
                if (title && information  && family && diet && funfact) {
                    setUpdatedPostData({ title, information, family, diet, funfact });
                } else {
                    setError('Datos incompletos del post');
                }
            } catch (error) {
                setError('Error al obtener el post. Por favor, inténtalo de nuevo más tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [postId]);

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: '¿Estás seguro de que deseas eliminar este post?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo'
        });
    
        if (result.isConfirmed) {
            try {
                await removePost(postId);
                Swal.fire('Eliminado', 'El post ha sido eliminado correctamente', 'success');
            } catch (error) {
                setError('Error al eliminar el post. Por favor, inténtalo de nuevo más tarde.');
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdatedPostData({ ...updatedPostData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            await updatePost(postId, updatedPostData);
            Swal.fire({
                title: '¡Post Actualizado!',
                text: 'El post se ha actualizado exitosamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                navigate('/');
            });
        } catch (error) {
            // Muestra, por ejemplo, que un 403 corresponde a falta de permisos.
            Swal.fire('No se pudo actualizar', error.message, 'error');
        }
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <LoadingScreen />
            </div>
        );    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!post) {
        return <div>No se encontró el post.</div>;
    }

    return (
        <><div className="login-container">
            <div className="row d-flex justify-content-center">
                <div className="card">
                    <h5 className="text-center mb-4">{post.title}</h5>
                    <form className="form-card">
                        <div className="row justify-content-between text-left">
                            <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Nombre<span className="text-danger"> *</span></label> <input type="text" name="title" value={updatedPostData.title} onChange={handleChange} required  /></div>
                            <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Familia<span className="text-danger"> *</span></label> <input type="text" name="family" value={updatedPostData.family} onChange={handleChange} required /></div>
                        </div>
                        <div className="row justify-content-between text-left">
                            <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Dieta<span className="text-danger"> *</span></label> <input type="text" name="diet" value={updatedPostData.diet} onChange={handleChange}/></div>
                            <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Funfact<span className="text-danger"> *</span></label> <input type="text" name="funfact" value={updatedPostData.funfact} onChange={handleChange} required /></div>
                        </div>
                        <div className="row justify-content-between text-left">
                            <div className="form-group col-12 flex-column d-flex"> <label className="form-control-label px-3">Descripción<span className="text-danger"> *</span></label> <textarea name="information" value={updatedPostData.information} onChange={handleChange} required placeholder="" /></div>
                        </div>
                        <br></br>
                        <div className="row justify-content-between text-left">
                            <div className="col">
                                <button type="button" className="btn btn-primary btn-block" onClick={handleDelete}>Eliminar</button>
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-primary btn-block" onClick={handleUpdate}>Actualizar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
            </>
    );
};

export default Postdetail;
