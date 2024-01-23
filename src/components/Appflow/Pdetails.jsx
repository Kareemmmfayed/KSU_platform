import Header from '../Header';
import Footer from '../Footer';
import Pdetailsin from './Pdetailsin';


function Pdetails() {

    return (
        <>
        <Header name="< العودة" link="/"/>
        <div className='Pdetails'>
            <Pdetailsin Signed = {true}/>
        <Footer />
        </div>
    </>
    )
}

export default Pdetails