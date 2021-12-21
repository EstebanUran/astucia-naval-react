import { IoGameController } from "react-icons/io5";
import { FaUserAlt, FaListUl } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { useHistory } from "react-router-dom";
import AuthContext from '../context/AuthContext'
import { useContext } from 'react'

const Header = () => {
    const history = useHistory();
    const { setUser } = useContext(AuthContext);

    const toGame = () => history.push('/game')
    const toProfile = () => history.push('/profile')
    const toUsers = () => history.push('/users')
    const toExit = () => {
        setUser({
            id:''
        });
        history.push('/login')
    }

    return (
        <div className="container-header">
            <div className="navigation">
                <ul>
                    <li onClick={toGame}>
                        <a>
                            <span className="icon"><IoGameController /></span>
                            <span className="title">Game</span>
                        </a>
                    </li>
                    <li onClick={toProfile}>
                        <a>
                            <span className="icon"><FaUserAlt /></span>
                            <span className="title">Profile</span>
                        </a>
                    </li>
                    <li onClick={toUsers}>
                        <a>
                            <span className="icon"><FaListUl /></span>
                            <span className="title">Users</span>
                        </a>
                    </li>
                    <li onClick={toExit}>
                        <a>
                            <span className="icon"><ImExit /></span>
                            <span className="title">Exit</span>
                        </a>
                    </li>

                </ul>
            </div>
        </div>
    )
}

export default Header
