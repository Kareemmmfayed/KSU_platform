/* eslint-disable react/prop-types */

function Diploma(props) {
    return (
        <div className="Diploma">
            <div className="cards">
            {
                props.diplomas.map((diploma, index) => (
                    <div className="card" key={index}>
                        <h2>{diploma[0]}</h2>
                        <p>{diploma[1]}</p>
                        {props.show && 
                            <>
                                <p>{diploma[2]}</p>
                                <p>{diploma[3]}</p>
                            </>
                        }
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default Diploma;

