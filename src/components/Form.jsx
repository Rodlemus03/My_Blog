import { useApi } from '../hooks/api/useApi';
import useNavigate from '../hooks/HOC/useNavigate';
import { useAuth } from '../hooks/authProvider';
import Swal from 'sweetalert2';
import { useState } from 'react';
import '../styles/Form.css'
import LoadingScreen from '../screens/LoadingScreen';


const MyFormComponent = () => {
    const { navigate } = useNavigate();
    const { user } = useAuth()
    const initialState = {
        title: '',
        information: '',
        family: '',
        diet: '',
        funfact: '',

    };
    const { addPost, loading, error } = useApi();
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addPost(user.id, user.username, formData);
            setFormData(initialState); 
            Swal.fire({
                title: '¡Post Agregado!',
                text: 'El post se ha agregado exitosamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                navigate('/');
            });
        } catch (error) {
            console.error('Error al crear el post:', error);
        }
    };
    if (loading) {
        return (
            <div className="loading-screen">
                <LoadingScreen />
            </div>
        );
    }
    return (
        <div className="login-container">
             <div className="row d-flex justify-content-center">
             <div className="card">
                        <h5 className="text-center mb-4">Ingrese los la nueva información</h5>
                        {loading && <p>Cargando...</p>}
                        {error && <p>Error: {error}</p>}
                        <form className="form-card" onSubmit={handleSubmit}>
                            <div className="row justify-content-between text-left">
                                <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Nombre<span className="text-danger"> *</span></label> <input type="text" name="title" value={formData.title} onChange={handleChange} required  placeholder="Delfin Rosado" /></div>
                                <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Familia<span className="text-danger"> *</span></label> <input type="text" name="family" value={formData.family} onChange={handleChange} required placeholder="Delfinea"/></div>
                            </div>
                            <div className="row justify-content-between text-left">
                                <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Dieta<span className="text-danger"> *</span></label> <input type="text" name="diet" value={formData.diet} onChange={handleChange} required  placeholder="peces pequeños como el arenque, el bacalao o la macarela"/></div>
                                <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Funfact<span className="text-danger"> *</span></label> <input type="text" name="funfact" value={formData.funfact} onChange={handleChange} required placeholder="Ej: A los delfines les gusta drogarse con peces globo" /></div>
                            </div>
                            <div className="row justify-content-between text-left">
                                <div className="form-group col-12 flex-column d-flex"> <label className="form-control-label px-3">Descripción<span className="text-danger"> *</span></label> <textarea name="information" value={formData.information} onChange={handleChange} required placeholder="" /></div>
                            </div>
                            <br></br>
                            <div className="row justify-content-center">
                                <div> <button type="submit" className="btn-block btn-primary">Crear Post</button> </div>
                            </div>
                        </form>
                </div>
            </div>
        </div>
        
    );
};
export default MyFormComponent;
