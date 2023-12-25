import Header from '../Header'
import Footer from '../Footer'
import { Link } from 'react-router-dom'


function Signin() {

    return (
        <>
            <Header name="< العودة" link="/"/>
            <div className='Sign-in'>
                <div className='Sign-in__inner'>
                    <div className='sign-in__inner__form col-lg-5 col-md-6 col-12'>
                        <h2>أهلا بعودتك !</h2>
                        <form>
                            <select>
                                <option disabled selected>الدور</option>
                                <option>الأول</option>
                                <option>الثاني</option>
                            </select>
                            <input type="email" placeholder='البريد الإلكتروني'/>
                            <input type="password" placeholder='كلمة السر'/>
                            <div className='rem'>
                                <div>
                                    <label htmlFor="rem">تذكرني</label>
                                    <input type="checkbox" name="remember" id="rem" />
                                </div>
                                <a href="">نسيت كلمة المرور؟</a>
                            </div>
                            <div className='sub'>
                                <button type='submit' className='btnbtn'> الدخول </button>
                                <div>
                                ليس لديك حساب ؟ <Link to='/signup'>انشـــئ حساب جديد</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default Signin