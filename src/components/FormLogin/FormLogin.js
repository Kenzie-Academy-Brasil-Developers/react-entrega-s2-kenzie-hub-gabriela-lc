import "./FormLogin.css"

import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {useHistory} from "react-router-dom"
import axios from "axios"

function FormLogin({setShowModal, setModalMessage}){

    const formSchema = yup.object().shape({
        email: yup.string().required("Email obrigatório").email("Email não válido"),
        password: yup.string().required("Senha obrigatória")
    })

    const {register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(formSchema),
      })

    const history = useHistory()


    function handleForm(data){
        axios.post("https://kenziehub.herokuapp.com/sessions", data)
            .then((res) => {
                localStorage.setItem("token",res.data.token)
                localStorage.setItem("userID",res.data.user.id)
                history.push("/dashboard")
            })
            .catch((err) => {
                setShowModal(true)
                setModalMessage(err.response.data.message)
            })
    }

    return(
        <form id="loginForm" onSubmit={handleSubmit(handleForm)}>
            <label>Email</label>
            <input placeholder="Digite seu email" {...register("email")}/>
            <span>{errors.email?.message}</span>
            <label>Senha</label>
            <input placeholder="Digite sua senha" {...register("password")} type="password"/>
            <span>{errors.password?.message}</span>
            <button type="submit">Entrar</button>
        </form>
    )
}

export default FormLogin