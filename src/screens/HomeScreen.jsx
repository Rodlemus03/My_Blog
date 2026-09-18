import '../styles/User.css'; 
import useNavigate from '../hooks/HOC/useNavigate';
import Swal from 'sweetalert2';
import { useAuth } from '../hooks/authProvider';


const User = () => {
    const { navigate } = useNavigate();
    const { user, logout } = useAuth()

    const handleLogout = async () => {
      await logout();
      Swal.fire({
          title: '¡Logout Exitoso!',
          text: 'Te has desconectado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
      }).then(() => {
          navigate('/login'); 
          window.location.href = '/?#/login'; 
      });
  };
  
    return (
      <div className="contenedor">

      <div id="overlay">
        <div className="image">
          <div className="trick">
  
          </div>
        </div>
        <ul className="text">{user.username}</ul>
      <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
        <div className="panel panel-default">
          <div className="panel-heading " role="tab" id="headingOne">
            <h4 className="panel-title ">
              <a role="button"  aria-expanded="" >
                <div className="title  btn btn-danger btn-outline btn-lg">{user.role}</div>
              </a>
            </h4>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading" role="tab" id="headingThree">
            <h4 className="panel-title">
              <a  role="button"  aria-expanded="false" >
                <div onClick={handleLogout} className="title btn btn-danger btn-outline btn-lg">LogOut</div>
              </a>
            </h4>
          </div>
          <div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
          </div>
        </div>
      </div>
            </div>
          </div>
        );
      };

export default User;
