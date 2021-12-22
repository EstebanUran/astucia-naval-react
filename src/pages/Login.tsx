import React, { useState } from 'react'
import AuthContext from '../context/AuthContext'
import { useContext } from 'react'
import { firestore, auth } from '../firebase/firebase';
import { useHistory } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast';

const alertError = () => toast.error('Usuario incorrecto.');

const Login = () => {

    const { setUser } = useContext(AuthContext);
    const history = useHistory();
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const capturarDatos = (e: any) => {
        //captura el nombre y valor 
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const submit = (e: any) => {
        e.preventDefault()
        loginEmailPassword(values)

    }
    const loginEmailPassword = async (values: any) => {
        auth.
            signInWithEmailAndPassword(values.email, values.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential?.user;
                // ...
                getUser(user?.email);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                alertError()
            });
    }

    const getUser = (email: any) => {
        firestore.collection("usuarios")
            .onSnapshot((query) => {
                query.forEach(doc => {
                    if (email === doc.data().email) {

                        setUser({
                            id: doc.id
                        });
                        history.push('/game');

                    }
                });
            })
    }

    const register = () => history.push('/register');
    const [typeInput, setTypeInput] = useState("password")
    const changeType = () => {
        if (typeInput == "password") {
            setTypeInput("text")
        } else {
            setTypeInput("password")
        }
    }
    return (
        <>
            <div className='container-login'>
                <form onSubmit={submit} className="login">
                    <div className="login-form">
                        <h1>Iniciar sesión</h1>
                        <div className="form-control">
                            <label>Correo</label>
                            <input type="email" placeholder="correo@ejemplo.com" name='email' onChange={capturarDatos} required />
                        </div>
                        <div className="form-control">
                            <label >Contraseña</label>
                            <span className='eye' onClick={changeType}>
                                {
                                    typeInput == "password" ? <AiFillEye /> : <AiFillEyeInvisible />
                                }
                            </span>
                            <input type={typeInput} placeholder="**********" name='password' onChange={capturarDatos} required />
                        </div>
                        <div className='register'>
                            <a onClick={register} >Registrarse</a>
                        </div>
                        <input type='submit' value="Entrar" className='sing-in' />
                    </div>
                </form>
            </div>
            <Toaster />

        </>
    )
}

export default Login
