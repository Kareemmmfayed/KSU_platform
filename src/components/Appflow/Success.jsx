import Header from '../Header'
import Footer from '../Footer'
import { Link } from 'react-router-dom'


function Success() {
    return (
        <>
        <Header name="< العودة" link="/"/>
        <div className="Success">
            <div className='Success__in'>
                <div className='Success__in__card'>
                    <h2>تم تقديم الطلب بنجاح</h2>
                    <p>سيتم مراجعة طلبك قريبا ، بالرجاء انتظار بريد بالتفاصيل</p>
                    <Link to='/'>
                        <button>العودة للرئيسية</button>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
        </>
    )
}

export default Success