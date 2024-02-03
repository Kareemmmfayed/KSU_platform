/* eslint-disable react/prop-types */
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { useAuth } from '../services/AuthContext';
import pfp from '../assets/pfp.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Header(props) {

    const { isLoggedIn, logout } = useAuth();

    const [list, setList] = useState(false);

    const show = () => {
        setList(!list);
    }

    const navigate = useNavigate();

    const toAccount = () => {
        navigate("/account")
    }

    const toDip = () => {
        navigate("/diplomas")
    }

    const LogOut = () => {
        logout();
        navigate("/");
    }

    return (
        <div className="Header">
            <div className="Header__right">
                <div className="Header__right__logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="Header__right__text">
                    <h3>التقديم علي الدبلومات</h3>
                    <p>جامعة كفر الشيخ</p>
                </div>
            </div>
            <div className="Header__left">
                { isLoggedIn ? (
                    <div className='userName'>
                        <button onClick={show}>
                            <img src={pfp} alt="Profile picture" />
                            <p>إسم المستخدم</p>
                        </button>
                        {list && (
                            <ul>
                                <li>
                                    <button onClick={toDip}>الدبلومات السابقة</button>
                                </li>
                                <li>
                                    <button onClick={toAccount}>معلومات الحساب</button>
                                </li>
                                <li>
                                    <button className='red' onClick={LogOut}>تسجيل الخروج</button>
                                </li>
                            </ul>
                        )}
                    </div>
                ) : (
                    <Link to={props.link}>
                        <button className='btnbtn'> {props.name}</button>
                    </Link>
                )
                }
            </div>
        </div>
    )
}

export default Header