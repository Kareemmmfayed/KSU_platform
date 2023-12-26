import Header from '../Header'
import Footer from '../Footer'
import up from '../../assets/upload.png'
// import { Link } from 'react-router-dom'

function Application() {
    return (
        <>
        <Header name="< العودة" link="/"/>
        <div className='Application'>
            <div className='Application__inner'>
                <div className='Application__inner__form col-lg-5 col-md-6 col-12'>
                    <h2>إستمارة طلب التقديم</h2>
                    <form>
                        <div>
                            <label htmlFor="one">
                                <p>شهادة البكالوريوس</p>
                                <img src={up} alt="upload" />
                            </label>
                            <input type="file" id='one'/>
                        </div>
                        <div>
                            <label htmlFor="two">
                                <p>شهادة المؤهل / آخرى</p>
                                <img src={up} alt="upload" />
                            </label>
                            <input type="file" id='two'/>
                        </div>
                        <div>
                            <label htmlFor="three">
                                <p>السيرة الذاتية</p>
                                <img src={up} alt="upload" />
                            </label>
                            <input type="file" id='three'/>
                        </div>
                        <div>
                            <label htmlFor="four">
                                <p>الموقف من التجنيد</p>
                                <img src={up} alt="upload" />
                            </label>
                            <input type="file" id='four'/>
                        </div>
                        <select name="" id="">
                            <option disabled selected>الموقف من التجنيد</option>
                        </select>
                        <div>
                            <label htmlFor="five">
                                <p>بيان الموقف من التجنيد</p>
                                <img src={up} alt="upload" />
                            </label>
                            <input type="file" id='five'/>
                        </div>
                        <div>
                            <label htmlFor="six">
                                <p>البطاقة الشخصية</p>
                                <img src={up} alt="upload" />
                            </label>
                            <input type="file" id='six'/>
                        </div>
                        <div>
                            <label htmlFor="seven">
                                <p>إيصال الدفع</p>
                                <img src={up} alt="upload" />
                            </label>
                            <input type="file" id='seven'/>
                        </div>
                        <div className='btns'>
                            <button className='left'>حفظ</button>
                            <button className='right btnbtn'>إرسال</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
        </>
    )
}

export default Application