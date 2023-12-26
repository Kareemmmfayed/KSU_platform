import Header from '../Header'
import Footer from '../Footer'
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
                        <input type="file" id="fileUpload" name="fileUpload" />
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
        </>
    )
}

export default Application