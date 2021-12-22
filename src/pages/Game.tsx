import React, { useState, useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import { useContext } from 'react'
import Header from './Header'
import { firestore } from '../firebase/firebase'
import toast, { Toaster } from 'react-hot-toast';

const alertSuccess = () => toast.success('Felicitaciones, ganaste!');
const alertError = () => toast.error('Posicion incorrecta.');

const Game = () => {

  const [tablero, setTablero] = useState<string[][]>([
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '']
  ]);
  const { user } = useContext(AuthContext);
  var arrayPosiconesBarcos: any = [];
  const [posBarcos, setPosBarcos] = useState<any>([])
  const [totalBarcos, setTotalBarcos] = useState(0)
  const [posicion, setPosicion] = useState<String>()
  let barco = ['F', 'F', 'F', 'F'];
  const [values, setValues] = useState({
    name: '',
    lastName: '',
    age: '',
    email: '',
    games: 0
  });


  const llenaTablero = () => {

    let totalBarcos = 0;
    while (totalBarcos < 5) {
      let axisRandom = Math.floor(Math.random() * (2 - 0) + 0)
      let i = posicionRandom();
      let j = posicionRandom();

      if (axisRandom === 0) {
        if (ponerBarcoHorizontal(i, j)) {
          totalBarcos++;
        }
      } else {
        if (ponerBarcoVertical(i, j)) {
          totalBarcos++;
        }
      }
    }
    setPosBarcos([...arrayPosiconesBarcos])
  }

  const ponerBarcoVertical = (i: number, j: number) => {
    let puso = false;
    const array = [];
    if (tablero[i][j] === '') {
      let aux = [...tablero];
      if (i + 3 < tablero.length) {
        if (aux[i + 1][j] === '' && aux[i + 2][j] === '' && aux[i + 3][j] === '') {
          puso = true;
          for (let inde = 0; inde < barco.length; inde++) {
            aux[i][j] = barco[inde].toString();
            array.push([i, j])
            i++;
            setTablero([...aux]);
          }
          arrayPosiconesBarcos.push(array)
        }
      }
    }
    return puso;
  }
  const ponerBarcoHorizontal = (i: number, j: number) => {
    let puso = false;
    const array = [];
    if (tablero[i][j] === '') {
      let aux = [...tablero];
      if (j + 3 < tablero.length) {
        if (aux[i][j + 1] === '' && aux[i][j + 2] === '' && aux[i][j + 3] === '') {
          puso = true;
          for (let inde = 0; inde < barco.length; inde++) {
            aux[i][j] = barco[inde].toString();
            array.push([i, j])
            j++;
            setTablero([...aux]);
          }
          arrayPosiconesBarcos.push(array)
        }
      }
    }
    return puso;
  }

  const capturarPosicion = (e: any) => {
    e.preventDefault();
    let posI = Number(obtenerPosI(posicion?.charAt(0)));
    let posJ = Number(posicion?.charAt(1) + "" + posicion?.charAt(2)) - 1
    if (posJ >= 0 && posJ <= 9 && posI >= 0 && posI <= 9) {
      validar(posI, posJ);
    } else {
      alertError()
    }
    e.target.reset()
  }
  const validar = (i: number, j: number) => {
    const aux2 = [...tablero]
    const auxBarcos = [...posBarcos]
    if (tablero[i][j] === '') {
      aux2[i][j] = "✖️"
      setTablero([...aux2])
    } if (tablero[i][j] === 'F') {
      aux2[i][j] = "⭕";

      for (let indexI = 0; indexI < auxBarcos.length; indexI++) {
        for (let indexJ = 0; indexJ < auxBarcos[indexI].length; indexJ++) {
          if (auxBarcos[indexI][indexJ][0] === i && auxBarcos[indexI][indexJ][1] === j) {
            auxBarcos[indexI].splice(indexJ, 1)
          }
          if (auxBarcos[indexI].length === 0) {
            setTotalBarcos(totalBarcos + 1)
          }
        }
      }

      setTablero([...aux2])
    }
  }
  useEffect(() => {
    getUser(user?.id)
    if (totalBarcos === 5) {
      alertSuccess()
      values.games = values.games + 1;
      pushFirebase()
    }
  }, [totalBarcos])

  useEffect(() => {
    llenaTablero()
  }, [])
  const pushFirebase = async () => {

    await firestore.collection("usuarios")
      .doc(user?.id).update(values)
  }

  const getUser = (email: any) => {
    firestore.collection("usuarios")
      .onSnapshot((query) => {
        query.forEach(doc => {
          if (user?.id === doc.id) {
            setValues({
              name: doc.data().name,
              lastName: doc.data().lastName,
              age: doc.data().age,
              email: doc.data().email,
              games: doc.data().games
            })
          }
        });
      })
  }
  const obtenerPosI = (posI: any) => {
    String(posI)
    let pos;
    switch (posI) {
      case 'A': case 'a': pos = 0; break;
      case 'B': case 'b': pos = 1; break;
      case 'C': case 'c': pos = 2; break;
      case 'D': case 'd': pos = 3; break;
      case 'E': case 'e': pos = 4; break;
      case 'F': case 'f': pos = 5; break;
      case 'G': case 'g': pos = 6; break;
      case 'H': case 'h': pos = 7; break;
      case 'I': case 'i': pos = 8; break;
      case 'J': case 'j': pos = 9; break;
      default: alertError()
        break;
    }
    return pos;
  }
  const limpiar = () => {

    let aux = [...tablero];

    for (let i = 0; i < tablero.length; i++) {
      for (let j = 0; j < tablero[i].length; j++) {
        aux[i][j] = "";
      }
    }
    setTablero([...aux]);
    setTotalBarcos(0);
    llenaTablero();
  }

  const posicionRandom = () => {
    return Math.floor(Math.random() * Math.floor(10));
  }

  return (
    <>
      <Header />
      <div className='game-container'>
        <div className='total'>
          <form onSubmit={capturarPosicion} className='container-posicion'>
          <p><b>Barcos destruidos: {totalBarcos}</b></p>
            <p><b>Ingrese la coordenada: </b></p>
            <input type="text" placeholder='Coordenada' onChange={(e) => setPosicion(e.target.value)} /> <br />
            <div className='container-buttons'>
              <button type='submit'>Ejecutar</button>
              <button type='button' onClick={limpiar}>Limpiar</button>
            </div>
          </form>
        </div>
        <div className='container'>
          <div className='container-tablero'>
            <div className='container-numeros-tablero'>
              <b>1</b><b>2</b><b>3</b><b>4</b><b>5</b><b>6</b><b>7</b><b>8</b><b>9</b><b>10</b>
            </div>
            <div className='container-letras-tablero'>
              <b>A</b><b>B</b><b>C</b><b>D</b><b>E</b><b>F</b><b>G</b><b>H</b><b>I</b><b>J</b>
            </div>
            <div className='tablero'>
              {
                tablero.map((camposI, i) => (
                  camposI.map((camposJ, j) => (
                    <>
                      <div className='posicion'>
                        <button key={j} className='barco'>{camposJ === 'F' ? '' : camposJ}</button>
                      </div>
                    </>
                  ))
                ))
              }
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  )
}

export default Game