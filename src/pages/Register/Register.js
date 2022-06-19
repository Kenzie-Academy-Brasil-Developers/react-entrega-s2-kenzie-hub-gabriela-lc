import FormRegister from "../../components/FormRegister/FormRegister"
import "./Register.css"

import {useHistory} from "react-router-dom"

function Register({setShowModal, setModalMessage}){

    const history = useHistory()

    return(
        <>
            {/* {showModal && <Modal getShowModal={getShowModal} modalMessage={modalMessage}/>} */}
            <header id="headerCadastro">
              <img src="./Logo.png" alt="Logo"/>
              <button onClick={() => history.push("/")}>Voltar</button>
            </header>
            <div className="conteinerCadastro">
                <h2>Crie sua conta</h2>
                <p>Rapido e grátis, vamos nessa!</p>
                <FormRegister setShowModal={setShowModal} setModalMessage={setModalMessage}/>                
            </div>
        </>
    )
}

export default Register