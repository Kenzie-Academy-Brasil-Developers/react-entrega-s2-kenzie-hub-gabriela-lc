import "./FormRegister.css"

import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios"

function FormRegister({setShowModal, setModalMessage}){

    const formSchema = yup.object().shape({
        name: yup.string().required("Nome obrigatório"),
        email: yup.string().required("Email obrigatório").email("Email não válido"),
        password: yup.string().required("Senha obrigatória")
                    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                    "Senha deve conter pelo menos uma letra maiúscula, um letra minúscula, um número e um caractere especial"),
        confirmPassword: yup.string().required("Senha obrigatória").oneOf([yup.ref("password")],"Senhas não são iguais"),
        bio: yup.string().required("Bio obrigatória"),
        contact: yup.string().required("Contato obrigatório")
    })

    const {register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(formSchema),
      })

    function handleForm(data){
        console.log(data);

        axios.post("https://kenziehub.herokuapp.com/users", data)
            .then((res) => {
                console.log(res);
                setShowModal(true)
                setModalMessage("Conta criada com sucesso")
            })
            .catch((err) => {
                console.log(err);
                setShowModal(true)
                setModalMessage("Ops! Algo deu errado")

            })

    }

    return(
        <form id="registerForm" onSubmit={handleSubmit(handleForm)}>
            <label>Nome</label>
            <input placeholder="Digite aqui seu nome" {...register("name")}/>
            <span>{errors.name?.message}</span>
            <label>Email</label>
            <input placeholder="Digite aqui seu email" {...register("email")}/>
            <span>{errors.email?.message}</span>
            <label>Senha</label>
            <input placeholder="Digite aqui sua senha" {...register("password")} type="password"/>
            <span>{errors.password?.message}</span>
            <label>Confirmar senha</label>
            <input placeholder="Digite aqui sua senha novamente" {...register("confirmPassword")} type="password"/>
            <span>{errors.confirmPassword?.message}</span>
            <label>Bio</label>
            <input placeholder="Fale sobre você" {...register("bio")}/>
            <span>{errors.bio?.message}</span>
            <label>Contato</label>
            <input placeholder="Opção de contato" {...register("contact")}/>
            <span>{errors.contact?.message}</span>
            <label>Selecionar módulo</label>
            <select {...register("course_module")}>
                <option>Primeiro módulo (Introdução ao Frontend)</option>
                <option>Segundo módulo (Frontend Avançado)</option>
                <option>Terceiro módulo (Introdução ao Backend)</option>
                <option>Quarto módulo (Backend Avançado)</option>
            </select>
            <span>{errors.course_module?.message}</span>
            <button type="submit">Cadastrar</button>
        </form>
    )
}

export default FormRegister