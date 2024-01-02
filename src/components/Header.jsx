/* eslint-disable react/prop-types */
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { useAuth } from '../services/AuthContext';
import pfp from '../assets/pfp.png'


function Header(props) {

    const { isAuthenticated } = useAuth();

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
                { isAuthenticated ? (
                    <div className='userName'>
                        <img src={pfp} alt="Profile picture" />
                        <p>إسم المستخدم</p>
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