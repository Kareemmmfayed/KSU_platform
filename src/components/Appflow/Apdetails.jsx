import Header from '../Header';
import Footer from '../Footer';
import Pdetailsin from './Pdetailsin';


function Apdetails() {

    return (
        <>
        <Header name="< العودة" link="/"/>
        <div className='Apdetails'>
            <Pdetailsin Signed = {false}/>
        <Footer />
        </div>
    </>
    )
}

export default Apdetails