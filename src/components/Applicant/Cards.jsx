/* eslint-disable react/prop-types */

function Cards(props) {
    return (
        <div className="bg-white h-[450px] text-black rounded-xl cardi">
            <div className="h-56 rounded-t-xl">
                <img src={props.img} alt="profile picture" className="w-100"/>
            </div>
            <div className="flex flex-col justify-center item-center gap-4 p-4">
                <p>{props.name}</p>
                <p>{props.title}</p>
                <p>{props.info}</p>
                <div className="links">
                    <a href={props.flink}>
                        <img src={props.flogo} alt="link" />
                    </a>
                    {
                        props.llogo && (
                            <a href={props.llink}>
                                <img src={props.llogo} alt="link" />
                            </a>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Cards