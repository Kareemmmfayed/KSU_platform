import Header from '../Header'
import Footer from '../Footer'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import home from '../../assets/home.png'
import plus from '../../assets/plusb.png'
import trash from '../../assets/trash.png'
import checked from '../../assets/checked.png'
import notchecked from '../../assets/notchecked.png'
import copy from '../../assets/copy.png'

function Asubjects() {

    const subjects = [
        ["تحليل إحصائي", "ECON25", "4", "المستوي الأول"],
        ["تحليل إحصائي", "ECON25", "4", "المستوي الأول"],
        ["تحليل إحصائي", "ECON25", "4", "المستوي الأول"],
    ]

    
    const navigate = useNavigate();

    const navtohome = () => {
        navigate("/")
    }

    const [show, setShow] = useState(false)
    const [del, setDelete] = useState(false)
    const [cardStates, setCardStates] = useState(Array(subjects.length).fill(false));

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

    const copycontent = (content) => {
        navigator.clipboard.writeText(content)
    }


    return (
        <>
            <Header name="< العودة" link="/"/>
            <div className="Asubjects">
            <div className="Asubjects__in">
                    <div className="Asubjects__in__top">
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
                    <div className="Asubjects__in__body">
                        <div className="cards">
                        {
                            subjects.map((emp, index) => (
                                <div className={del ? "card delete" : "card"} key={index}>
                                    <h2>إسم المقرر : {emp[0]}</h2>
                                    <p>كود المقرر : {emp[1]}</p>
                                    <p>عدد الساعات المعتمدة : {emp[2]}</p>
                                    <p>{emp[3]}</p>
                                    {del && (
                                        <button onClick={() => toggleCardState(index)}>
                                            <img src={cardStates[index] ? checked : notchecked} alt="circle" className='notcopy'/>
                                        </button>
                                    )}
                                    {!del && (
                                        <button onClick={() => copycontent(`إسم المقرر: ${emp[0]}\nكود المقرر: ${emp[1]}\nعدد الساعات المعتمدة: ${emp[2]}\n${emp[3]}`)}>
                                            <img src={copy} alt="circle" className='copy'/>
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

export default Asubjects