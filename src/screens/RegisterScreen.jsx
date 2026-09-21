import { useState } from 'react';
import { useApi } from "../hooks/api/useApi";
import useNavigate from "../hooks/HOC/useNavigate";
import LoadingScreen from './LoadingScreen';
import Swal from 'sweetalert2';
import '../styles/Login.css';

const Register = () => {
    const { addUser, loading } = useApi();
    const { navigate } = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await addUser(username, password,email);
            if (response?.status === 'success') {
                Swal.fire({
                    title: '¡Usuario ingresado!',
                    text: 'Ya puedes hacer login en el blog.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    navigate('/login');
                });
            } else {
                setErrorMessage('Error al registrar el usuario. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            setErrorMessage('Error al registrar el usuario. Por favor, inténtalo de nuevo más tarde.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
            <div className="login-container">
                <h2>Registrarse</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="flex-column">
                        <label>User </label></div>
                    <div className="inputForm">
                        <input type="text" id="username-register" placeholder="Nombre de usuario" value={username} required onChange={(e) => setUsername(e.target.value)} className="input" />
                    </div>

                    <div className="flex-column">
                        <label>Emali </label></div>
                    <div className="inputForm">
                    <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg"><g id="Layer_3" data-name="Layer 3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>
                        <input type="email" id="email-register" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)} className="input" />
                    </div>
                    <div className="flex-column">
                    <label>Password </label></div>
                    <div className="inputForm">
                        <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>
                        <input type="password" id="password-register" placeholder="Contraseña" value={password} required onChange={(e) => setPassword(e.target.value)} className="input" />
                    </div>
                    <button className="button-submit" type="submit" disabled={loading || isSubmitting}>Registrarse</button>
                    <p className="p">¿Ya tienes una cuenta?<br/><a href="/?#/login" onClick={() => navigate('/login')} className="linkClasses">Ingresar</a></p>
                </form>
                {loading && <LoadingScreen />}
                </div>
    );
};

export default Register;
