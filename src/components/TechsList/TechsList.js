import axios from "axios"
import { useEffect} from "react"

import "./TechsList.css"

function TechsList({techsList, setTechsList, userID, setName, setModulo, showEditTechModal, setShowEditTechModal, setItemClickedId}){


    useEffect(() => {
        axios.get(`https://kenziehub.herokuapp.com/users/${userID}`)
            .then((res) => {
                setTechsList(res.data.techs)
                setName(res.data.name)
                setModulo(res.data.course_module)
            })
            .catch((err) => console.log(err))
    },[,showEditTechModal])

    function handleClick(e){
        setShowEditTechModal(true)
        setItemClickedId(e.target.id)
    }


    return(
        <ul className="techsList">
            {techsList?.map((tech) => (
                <li onClick={(e) => handleClick(e)} id={tech.id} key={tech.id}>
                    <h3>{tech.title}</h3>
                    <p>{tech.status}</p>
                </li>
            ))}
        </ul>
    )
}

export default TechsList