import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { firebaseNow, firestore, auth } from '../firebase/firebase';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast';

const alertError = () => toast.error('Usuario incorrecto.');


const Register = () => {

    const history = useHistory();
    const [values, setValues] = useState({
        name: '',
        lastName: '',
        age: '',
        email: '',
        password: '',
        games: 0,
        time: firebaseNow
    });

    const capturarDatos = (e: any) => {
        //captura el nombre y valor 

        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }
    const submit = (e: any) => {
        e.preventDefault()
        registerEmailPassword(values)
    }

    const registerEmailPassword = async (values: any) => {
        auth.createUserWithEmailAndPassword(values.email, values.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                firestore.collection("usuarios")
                    .doc().set(values)
                history.push('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorCode)
                console.log(errorMessage)
                alertError()
            });

    }
    const [typeInput, setTypeInput] = useState("password")
    const changeType = () => {
        if (typeInput === "password") {
            setTypeInput("text")
        } else {
            setTypeInput("password")
        }
    }
    return (

        <div className='container-register'>
            <form onSubmit={submit} className='register'>
                <Toaster />
                <div className='register-form'>
                    <h1>Register</h1>
                    <div className="form-control">
                        <label>nombre</label>
                        <input type="text" placeholder="nombre" name='name' onChange={capturarDatos} required />
                    </div>
                    <div className="form-control">
                        <label>Apellidos</label>
                        <input type="text" placeholder="apellido" name='lastName' onChange={capturarDatos} required />
                    </div>
                    <div className="form-control">
                        <label>Edad</label>
                        <input type="number" placeholder="edad" name='age' onChange={capturarDatos} required />
                    </div>
                    <div className="form-control">
                        <label>Correo</label>
                        <input type="email" placeholder="correo@ejemplo.com" name='email' onChange={capturarDatos} required />
                    </div>
                    <div className="form-control">
                        <label>Contrase??a</label>
                        <span className='eye' onClick={changeType}>
                            {
                                typeInput === "password" ? <AiFillEye /> : <AiFillEyeInvisible />
                            }
                        </span>
                        <input type={typeInput} placeholder="**********" name='password' onChange={capturarDatos} required />
                    </div>
                    <button type='submit' className='sing-up'>Registrar</button>
                </div>

            </form>

        </div>

    )
}

export default Register
