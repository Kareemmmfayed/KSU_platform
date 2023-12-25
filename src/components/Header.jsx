/* eslint-disable react/prop-types */
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'


function Header(props) {
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
                <Link to={props.link}>
                    <button className='btnbtn'> {props.name}</button>
                </Link>
            </div>
        </div>
    )
}

export default Header