import Header from './Header'
import AuthContext from '../context/AuthContext'
import { useContext, useState, useEffect } from 'react'

//import firebase
import { firestore } from '../firebase/firebase'
import toast, { Toaster } from 'react-hot-toast';

const alertSuccess = () => toast.success('Usuario editado exitosamente.');

const Profile = () => {

    const { user } = useContext(AuthContext);
    const [values, setValues] = useState({
        name: '',
        lastName: '',
        age: '',
        email: ''
    });
    const getUser = (email: any) => {
        firestore.collection("usuarios")
            .onSnapshot((query) => {
                query.forEach(doc => {
                    if (user?.id === doc.id) {
                        setValues({
                            name: doc.data().name,
                            lastName: doc.data().lastName,
                            age: doc.data().age,
                            email: doc.data().email
                        })
                    }
                });
            })
    }
    const capturarDatos = (e: any) => {
        //captura el nombre y valor 
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    const submit = (e: any) => {
        e.preventDefault();
        if (disabledInput.valueButton != 'editar') {
            pushFirebase();
            disabledInputs();
        } else {
            disabledInputs();
        }
    }
    const [disabledInput, setdisabledInput] = useState({
        valueButton: 'editar',
        disabled: true
    });

    const disabledInputs = () => {
        if (disabledInput.disabled == true) {
            setdisabledInput({ valueButton: 'guardar', disabled: false })
        } else {
            setdisabledInput({ valueButton: 'editar', disabled: true })
        }
    }
    const pushFirebase = async () => {

        await firestore.collection("usuarios")
            .doc(user?.id).update(values)
        alertSuccess()
    }
    useEffect(() => {
        getUser(user?.id);
    }, [])

    return (
        <>
            <Header />
            <div className='container-register'>
                <form onSubmit={submit} className='register'>
                    <div className='register-form'>
                        <h1>Profile</h1>
                        <label>nombre</label>
                        <input type="text" placeholder="nombre" name='name' value={values.name} onChange={capturarDatos} required disabled={disabledInput.disabled} />
                        <label>Apellidos</label>
                        <input type="text" placeholder="apellido" value={values.lastName} name='lastName' onChange={capturarDatos} required disabled={disabledInput.disabled} />
                        <label>Edad</label>
                        <input type="number" placeholder="edad" value={values.age} name='age' onChange={capturarDatos} required disabled={disabledInput.disabled} />
                        <label>Correo</label>
                        <input type="email" placeholder="correo@ejemplo.com" value={values.email} name='email' onChange={capturarDatos} required disabled />
                        <button type='submit' className='sing-up'>{disabledInput.valueButton}</button>
                    </div>
                </form>

            </div>
            <Toaster />
        </>
    )
}

export default Profile
