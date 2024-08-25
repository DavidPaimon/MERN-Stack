import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/usersApiSlice";

const Profile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassworde] = useState('');

    const {userInfo} = useSelector(state => state.auth)

    const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation()

    useEffect(() => {
        setUsername(userInfo.username);
        setEmail(userInfo.email);

    }, [userInfo.email, userInfo.username]);

    const dispatch = useDispatch();
    
    return (
    <div className="container mx-auto p-4 mt-[10rem]">
        <div className="flex justify-center align-center md:flex md:space-x-4">
            <div className="md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">
                Actualizar perfil
            </h2>

            <form>
                <div className="mb-4">
                    <label className="block text-white mb-2">Nombre</label>
                    <input
                      type="text"
                      placeholder="Ingresa tu nombre."
                      className="form-input p-4 rounded-sm w-full"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-white mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="Ingresa tu email."
                      className="form-input p-4 rounded-sm w-full"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-white mb-2">Password</label>
                    <input
                      type="password"
                      placeholder="Ingresa tu contraseña."
                      className="form-input p-4 rounded-sm w-full"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-white mb-2">Confirmación de contraseña</label>
                    <input
                      type="password"
                      placeholder="Ingresa nuevamente tu contraseña."
                      className="form-input p-4 rounded-sm w-full"
                      value={confirmPassword}
                      onChange={e => setConfirmPassworde(e.target.value)}
                    />
                </div>

              <div className="flex justify-between">
                <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
                >
                  Update
                </button>

                <Link to='/users-orders' className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
                >
                  My Orders
                </Link>
                
              </div>

            </form>
            </div>
        </div>
    </div>
  );
};

export default Profile;