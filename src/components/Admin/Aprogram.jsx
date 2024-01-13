import Header from '../Header'
import Footer from '../Footer'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import home from '../../assets/home.png'
import plus from '../../assets/plusb.png'
import trash from '../../assets/trash.png'
import checked from '../../assets/checked.png'
import notchecked from '../../assets/notchecked.png'
import print from '../../assets/print.png'

export default function Aprogram() {

    const programs = [
        ["دبلومة إدارة الأعمال", "2023-2024", "الصيفي", ["مقرر 1", "مقرر 2"]],
        ["دبلومة إدارة الأعمال", "2023-2024", "الصيفي", ["مقرر 1", "مقرر 2"]],
        ["دبلومة إدارة الأعمال", "2023-2024", "الصيفي", ["مقرر 1", "مقرر 2"]],
        ["دبلومة إدارة الأعمال", "2023-2024", "الصيفي", ["مقرر 1", "مقرر 2"]],
    ]

    
    const navigate = useNavigate();

    const navtohome = () => {
        navigate("/")
    }

    const [show, setShow] = useState(false)
    const [del, setDelete] = useState(false)
    const [cardStates, setCardStates] = useState(Array(programs.length).fill(false));

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

    const printInfo = () => {
        
    }

    return (
        <>
            <Header name="< العودة" link="/"/>
            <div className="Aprogram">
            <div className="Aprogram__in">
                    <div className="Aprogram__in__top">
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
                    <div className="Aprogram__in__body">
                        <div className="cards">
                        {
                            programs.map((emp, index) => (
                                <div className={del ? "card delete" : "card"} key={index}>
                                    <h2>البرنامج : {emp[0]}</h2>
                                    <p>العام الدراسي : {emp[1]}</p>
                                    <p>الربيعي : {emp[2]}</p>
                                    <ol>
                                        {emp[3].map((sub, index) => (
                                            <li key={index}>{sub}</li>
                                        ))}
                                    </ol>
                                    {del && (
                                        <button onClick={() => toggleCardState(index)}>
                                            <img src={cardStates[index] ? checked : notchecked} alt="circle" className='notcopy'/>
                                        </button>
                                    )}
                                    {!del && (
                                        <button onClick={printInfo}>
                                            <img src={print} alt="circle" className='copy'/>
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
                                <label htmlFor="name">اسم المقرر :</label>
                                <input type="text" id='name'/>
                            </div>
                            <div>
                                <label htmlFor="faculty">كود المقرر :</label>
                                <input type="text" id='faculty'/>
                            </div>
                            <div>
                                <label htmlFor="mail">عدد الساعات المعتمدة :</label>
                                <input type="text" id='mail'/>
                            </div>
                            <div>
                                <label htmlFor="password">مستوي المقرر :</label>
                                <input type="text" id='password'/>
                            </div>
                            <div>
                                <button className='btnbtn'>إضافة</button>
                            </div>
                        </form>
                    )}
                </div>
                <Footer/>
            </div>
        </>
    )
}
