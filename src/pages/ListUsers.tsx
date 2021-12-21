import Header from "./Header"
import { useState, useEffect } from 'react'
import { firestore } from '../firebase/firebase'

const ListUsers = () => {

    const [dataUsuarios, setDataUsuarios] = useState<any>([])

    const getUsers = () => {
        firestore.collection("usuarios")
            .onSnapshot((query) => {
                const docs: any = []
                query.forEach(doc => {
                    docs.push({ ...doc.data(), id: doc.id })
                });
                setDataUsuarios(docs)
            })
    }
    useEffect(() => {
        getUsers();
    }, [])
    return (
        <>
            <Header />
            <div className="container-list-users">

                <table>
                    <thead>
                        <tr>
                            <th scope="col">Nombres</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Edad</th>
                            <th scope="col">Numero de juegos</th>
                            <th scope="col">Correo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataUsuarios.map((item: any, id: number) => (
                                <tr key={id}>
                                    <td>{item.name}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.age}</td>
                                    <td>{item.games}</td>
                                    <td>{item.email}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {/*
                <ul>
                    {
                        dataUsuarios.map((item: any, id: number) => (
                            <li>                        
                                <div className="">
                                    <div className="">
                                        <p >Nombre: {item.name} <br />
                                        Apellido: {item.lastName} <br />
                                        Edad: {item.age} <br />
                                        Juegos: {item.games} <br />
                                        Correo: {item.email}</p> 
                                    </div>
                                </div>
                            </li>
                        ))

                    }
                </ul>
                */}
            </div>
        </>
    )
}

export default ListUsers
