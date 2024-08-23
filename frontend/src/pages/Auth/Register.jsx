import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";

const Register = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

        const dispatch = useDispatch()
        const navigate = useNavigate()

        const [register, {isLoading}] = useRegisterMutation()
        const {userInfo} = useSelector(state => state.auth)

        const {search} = useLocation()
        const sp = new URLSearchParams(search)
        const redirect = sp.get('redirect') || '/'

        useEffect(() => {
            if (userInfo) {
                navigate(redirect)
                
            }
        }, [navigate, redirect, userInfo]);

    return (
    <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem}">
            <h1 className="text-2xl font-semibold mb-4">
                Register
            </h1>

            <form onSubmit={submitHandler} className="container w-[40rem]">
                <div className="my-[2rem]">
                    <label htmlFor="name" className="block text-sm font-medium text-white">
                        Nombre
                    </label>
                    <input 
                        type="text" 
                        id='name' 
                        className="mt-1 p-2 border rounded w-full"
                        placeholder="¿Cómo quiere ser llamado?"
                        value={username}
                        onChange={e => setUserName(e.target.value)}
                    />
                </div>
                <div className="my-[2rem]">
                    <label htmlFor="email" className="block text-sm font-medium text-white">
                        Correo electrónico
                    </label>
                    <input 
                        type="email" 
                        id='email' 
                        className="mt-1 p-2 border rounded w-full"
                        placeholder="example@gmail.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="my-[2rem]">
                    <label htmlFor="password" className="block text-sm font-medium text-white">
                        Contraseña
                    </label>
                    <input 
                        type="password" 
                        id='password' 
                        className="mt-1 p-2 border rounded w-full"
                        placeholder="Digite su contraseña: "
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="my-[2rem]">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
                        Confirme su contraseña
                    </label>
                    <input 
                        type="password" 
                        id='confirmPassword' 
                        className="mt-1 p-2 border rounded w-full"
                        placeholder="Confirme su contraseña"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button
                 disabled={isLoading} 
                 type="submit" 
                 className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
                 >
                    {isLoading ? "Registrando datos..." : "Registrar"}
                </button>

                {isLoading && <Loader />}
            </form>

        <div className="mt-4">
            <p className="text-white">
                ¿Ya tienes una cuenta? {" "}
                <Link to={redirect ? `/login/redirect=${redirect}` : '/login'} className="text-pink-500 hover:underline">
                  Inicia sesión
                </Link>
            </p>
            
        </div>

        </div>
    </section>
    )
};

export default Register;