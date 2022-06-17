import {useHistory} from "react-router-dom"
import FormLogin from "../../components/FormLogin/FormLogin";

import "./Login.css"

function Login({setShowModal, setModalMessage}){

    const history = useHistory()

    return(
        <>
            <img id="imgLogin" src="./Logo.png" alt="Logo"/>
            <div className="conteinerLogin">
                <h2>Login</h2>
                <FormLogin setShowModal={setShowModal} setModalMessage={setModalMessage}/>
                <div className="divRedCadastro">
                    <p>Ainda não possui uma conta?</p>
                    <button onClick={() => history.push("/register")}>Cadastre-se</button>
                </div>
            </div>
        </>
    )
}

export default Login