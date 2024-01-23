/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

function Diploma(props) {

    const navigate = useNavigate();

    const toPro = () => {
        navigate("/programs/Adetails")
    }

    return (
        <div className="Diploma">
            <div className="cards">
            {
                props.diplomas.map((diploma, index) => (
                    <div className="card" key={index}>
                        <button onClick={toPro}>
                            <h2>{diploma[0]}</h2>
                            <p>{diploma[1]}</p>
                            {props.show && 
                                <>
                                    <p>{diploma[2]}</p>
                                    <p>{diploma[3]}</p>
                                </>
                            }
                        </button>
                </div>
                ))
            }
            </div>
        </div>
    )
}

export default Diploma;

