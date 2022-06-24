import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import "./EditTechModal.css"
import { useEffect, useState } from 'react';

function EditTechModal({setShowEditTechModal,techsList,setTechsList, itemClickedId, userID}){
    const token = localStorage.getItem("token")

    const formSchema = yup.object().shape({
        title: yup.string().required("Nome obrigatório"),
      })


    const {register, handleSubmit, formState: { errors }} = useForm({
            resolver: yupResolver(formSchema)
        })

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

    function editTech(data){
        axios.put(`https://kenziehub.herokuapp.com/users/techs/${itemClickedId}`,data, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setTechsList([...techsList, res.data])

            })
            .catch((err) => {
                console.log(err);
                // setShowModal(true)
                // setModalMessage(err.response.data.message)
            })

    }

    return(
        <div className="containerEditTechModal">
            <div className="dashboardModal">
                <div className="headerModal">
                    <h3>Detalhes Tecnologia</h3>
                    <button onClick={() => setShowEditTechModal(false)}>X</button>
                </div>
                <form id='editTechForm' onSubmit={handleSubmit(editTech)}>
                    <label>Nome</label>
                    <input value={techClicked.title}/>
                    <span>{errors.title?.message}</span>
                    <label>Status</label>
                    <select value={techClicked.status}{...register("status")}>
                        <option>Iniciante</option>
                        <option>Intermediário</option>
                        <option>Avançado</option>
                    </select>
                    <span>{errors.status?.message}</span>
                    <div className='divButtons'>
                        <button id="editBtn" type='submit'>Editar Tecnologia</button>
                        <button id="exBtn">Excluir</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTechModal