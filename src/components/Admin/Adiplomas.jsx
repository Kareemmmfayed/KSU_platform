import Header from '../Header'
import Footer from '../Footer'
import home from '../../assets/home.png'
import plus from '../../assets/plusb.png'
import trash from '../../assets/trash.png'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import notchecked from '../../assets/notchecked.png'
import checked from '../../assets/checked.png'


function Adiplomas() {

    const diplomas = [["دبلومة كذا", "كلية التجارة"],
    ["دبلومة كذا", "كلية التجارة"],
    ["دبلومة كذا", "كلية التجارة"]
    ]

    const navigate = useNavigate();

    const navtohome = () => {
        navigate("/")
    }

    const [show, setShow] = useState(false)
    const [del, setDelete] = useState(false)
    const [cardStates, setCardStates] = useState(Array(diplomas.length).fill(false));

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
            <div className="Adiplomas">
                <div className="Adiplomas__in">
                    <div className="Adiplomas__in__top">
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
                    <div className="Adiplomas__in__body">
                        <div className="cards">
                        {
                            diplomas.map((diploma, index) => (
                                <div className={del ? "card delete" : "card"} key={index}>
                                    <h2>{diploma[0]}</h2>
                                    <p>{diploma[1]}</p>
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
                                <label htmlFor="name">اسم البرنامج الدراسي :</label>
                                <input type="text" id='name'/>
                            </div>
                            <div>
                                <label htmlFor="faculty">الكلية الخاصة بالبرنامج :</label>
                                <input type="text" id='faculty'/>
                            </div>
                            <div>
                                <label htmlFor="intro">مقدمة عن البرنامج :</label>
                                <input type="text" id='intro' className='special'/>
                            </div>
                            <div>
                                <label htmlFor="req">متطلبات القبول بالبرنامج :</label>
                                <input type="text" id='req' className='special'/>
                            </div>
                            <div>
                                <label htmlFor="time">مدة البرنامج :</label>
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

export default Adiplomas
