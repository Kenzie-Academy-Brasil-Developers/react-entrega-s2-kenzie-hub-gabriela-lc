import axios from 'axios';

import "./EditTechModal.css"
import { useEffect, useState } from 'react';

function EditTechModal({setShowEditTechModal, itemClickedId, userID}){
    const token = localStorage.getItem("token")

    const [techClicked, setTechClicked] = useState("")

        useEffect(() => {
            axios.get(`https://kenziehub.herokuapp.com/users/${userID}`)
                .then((res) => {
                    setTechClicked(res.data.techs.find((tech) => {
                        return tech.id === itemClickedId
                    }));
                })
                .catch((err) => console.log(err))
        },[])

    function editTech(e){
        e.preventDefault()
        axios.put(`https://kenziehub.herokuapp.com/users/techs/${itemClickedId}`,techClicked, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setShowEditTechModal(false)

            })
            .catch((err) => {
                console.log(err);
            })

    }

    function deleteTech(e){
        e.preventDefault()
        axios.delete(`https://kenziehub.herokuapp.com/users/techs/${itemClickedId}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setShowEditTechModal(false)
            })
            .catch((err) => console.log(err))
    }

    return(
        <div className="containerEditTechModal">
            <div className="dashboardModal">
                <div className="headerModal">
                    <h3>Detalhes Tecnologia</h3>
                    <button onClick={() => setShowEditTechModal(false)}>X</button>
                </div>
                <form id='editTechForm'>
                    <label>Nome</label>
                    <input placeholder={techClicked.title} disabled/>
                    <label>Status</label>
                    <select value={techClicked.status} onChange={(e) => setTechClicked({...techClicked, status: e.target.value})} >
                        <option value="Iniciante">Iniciante</option>
                        <option value="Intermediário">Intermediário</option>
                        <option value="Avançado">Avançado</option>
                    </select>
                    <div className='divButtons'>
                        <button onClick={(e) => editTech(e)} id="editBtn">Editar Tecnologia</button>
                        <button onClick={(e) => deleteTech(e)} id="exBtn">Excluir</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTechModal