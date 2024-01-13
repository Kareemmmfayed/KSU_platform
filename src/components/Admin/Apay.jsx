import Header from '../Header'
import Footer from '../Footer'
import home from '../../assets/home.png'
import plus from '../../assets/plusb.png'
import trash from '../../assets/trash.png'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import notchecked from '../../assets/notchecked.png'
import checked from '../../assets/checked.png'

function Apay() {

    
    const payments = ["القسط الأول", "القسط الأول", "القسط الأول"]
        
        const navigate = useNavigate();
    
        const navtohome = () => {
            navigate("/")
        }
    
        const [show, setShow] = useState(false)
        const [del, setDelete] = useState(false)
        const [cardStates, setCardStates] = useState(Array(payments.length).fill(false));
    
        const toggleCardState = (index) => {
            setCardStates((prevStates) => {
                const newStates = [...prevStates];
                newStates[index] = !newStates[index];
                return newStates;
            });
        };
        
    
    
        const addItem = () => {
            setShow(true)
        }
    
        const sub = () => {
    
        }
    
        const dele = () => {
            setDelete(true)
        }
    return (
        <>
            <Header name="< العودة" link="/"/>
            <div className="Apay">
                <div className="Apay__in">
                    <div className="Apay__in__top">
                        <button onClick={navtohome}>
                            <img src={home} alt="home" />
                        </button>
                        <button onClick={addItem}>
                            <img src={plus} alt="plus" />
                        </button>
                        <button onClick={dele}>
                            <img src={trash} alt="trash" />
                        </button>
                    </div>
                    <div className="Apay__in__body">
                        <div className="cards">
                        {
                            payments.map((diploma, index) => (
                                <div className={del ? "card delete" : "card"} key={index}>
                                    <p>{diploma}</p>
                                    {del && (
                                        <button onClick={() => toggleCardState(index)}>
                                            <img src={cardStates[index] ? checked : notchecked} alt="circle" />
                                        </button>
                                    )}
                                </div>
                            ))
                        }
                        </div>
                    </div>
                    { show && (
                        <form onSubmit={sub}>
                            <div>
                                <label htmlFor="name">العام الدراسي :</label>
                                <input type="text" id='name'/>
                            </div>
                            <div>
                                <label htmlFor="time">ملاحظات :</label>
                                <input type="text" id='time' className='special'/>
                            </div>
                            <div>
                                <button type='submit' className='btnbtn'>إضافة</button>
                            </div>
                        </form>
                    )}
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Apay