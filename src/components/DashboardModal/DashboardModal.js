import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import "./DashboardModal.css"

function DashboardModal({setShowDashboardModal, techsList, setTechsList, setShowModal, setModalMessage}){

    const token = localStorage.getItem("token")

    const formSchema = yup.object().shape({
        title: yup.string().required("Nome obrigatório"),
      })


    const {register, handleSubmit, formState: { errors }} = useForm({
            resolver: yupResolver(formSchema)
        })

    function addTech(data){
        axios.post("https://kenziehub.herokuapp.com/users/techs",data, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setTechsList([...techsList, res.data])
                setShowDashboardModal(false)

            })
            .catch((err) => {
                setShowModal(true)
                setModalMessage(err.response.data.message)
            })

    }

    return(
        <div className="containerDashboardModal">
            <div className="dashboardModal">
                <div className="headerModal">
                    <h3>Cadastrar Tecnologia</h3>
                    <button onClick={() => setShowDashboardModal(false)}>X</button>
                </div>
                <form id='addTechForm' onSubmit={handleSubmit(addTech)}>
                    <label>Nome</label>
                    <input placeholder="Digite o nome da tecnologia" {...register("title")}/>
                    <span>{errors.title?.message}</span>
                    <label>Selecionar status</label>
                    <select {...register("status")}>
                        <option>Iniciante</option>
                        <option>Intermediário</option>
                        <option>Avançado</option>
                    </select>
                    <span>{errors.status?.message}</span>
                    <button type='submit'>Cadastrar Tecnologia</button>
                </form>
            </div>
        </div>
    )
}

export default DashboardModal