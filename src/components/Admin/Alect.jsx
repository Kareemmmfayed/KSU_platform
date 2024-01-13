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


function Alect() {

    const employees = [
        ["محمد سمير عادل شاكر", "M0hamedgg0@gmail.com", "8tyRkO8j"],
        ["محمد سمير عادل شاكر", "M0hamedgg0@gmail.com", "8tyRkO8j"],
        ["محمد سمير عادل شاكر", "M0hamedgg0@gmail.com", "8tyRkO8j"],
        ["محمد سمير عادل شاكر", "M0hamedgg0@gmail.com", "8tyRkO8j"],
        ["محمد سمير عادل شاكر", "M0hamedgg0@gmail.com", "8tyRkO8j"],
        ["محمد سمير عادل شاكر", "M0hamedgg0@gmail.com", "8tyRkO8j"],
        ["محمد سمير عادل شاكر", "M0hamedgg0@gmail.com", "8tyRkO8j"],
        ["محمد سمير عادل شاكر", "M0hamedgg0@gmail.com", "8tyRkO8j"],
        ["محمد سمير عادل شاكر", "M0hamedgg0@gmail.com", "8tyRkO8j"],
    ]

    const navigate = useNavigate();

    const navtohome = () => {
        navigate("/")
    }

    const [show, setShow] = useState(false)
    const [del, setDelete] = useState(false)
    const [cardStates, setCardStates] = useState(Array(employees.length).fill(false));

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
            <div className="Alect">
            <div className="Alect__in">
                    <div className="Alect__in__top">
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
                    <div className="Alect__in__body">
                        <div className="cards">
                        {
                            employees.map((emp, index) => (
                                <div className={del ? "card delete" : "card"} key={index}>
                                    <h2>الدكتور : {emp[0]}</h2>
                                    <p>البريد الإلكتروني : {emp[1]}</p>
                                    <p>كلمة المرور : {emp[2]}</p>
                                    {del && (
                                        <button onClick={() => toggleCardState(index)}>
                                            <img src={cardStates[index] ? checked : notchecked} alt="circle" className='notcopy'/>
                                        </button>
                                    )}
                                    {!del && (
                                        <button onClick={() => copycontent(`الاسم: ${emp[0]}\nالبريد الإلكتروني: ${emp[1]}\nكلمة المرور: ${emp[2]}`)}>
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
                                <label htmlFor="name">اسم المحاضر :</label>
                                <input type="text" id='name'/>
                            </div>
                            <div>
                                <label htmlFor="faculty">الكلية الخاصة بالمحاضر :</label>
                                <input type="text" id='faculty'/>
                            </div>
                            <div>
                                <label htmlFor="mail">البريد الالكتروني :</label>
                                <input type="text" id='mail'/>
                            </div>
                            <div>
                                <label htmlFor="password">كلمة المرور :</label>
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

export default Alect