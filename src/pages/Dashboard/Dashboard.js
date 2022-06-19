import "./Dashboard.css"

import{useHistory} from "react-router-dom"
import TechsList from "../../components/TechsList/TechsList"
import { useState } from "react"
import DashboardModal from "../../components/DashboardModal/DashboardModal"

function Dashboard({setShowModal, setModalMessage, isLoged, setIsLoged}){

    const [showDashboardModal, setShowDashboardModal] = useState(false)
    const [techsList, setTechsList] = useState([])

    const history = useHistory()

    function logout(){
        localStorage.clear()
        setIsLoged(false)
        history.push("/")
    }

    let userID = localStorage.getItem("userID")

    const [name, setName] = useState("")
    const [modulo, setModulo] = useState("")


    return(
        <>
            {showDashboardModal && <DashboardModal setShowDashboardModal={setShowDashboardModal} techsList={techsList} setTechsList={setTechsList} setShowModal={setShowModal} setModalMessage={setModalMessage}/>}
            {isLoged? (
            <>
            <div className="navbar">
                    <div>
                        <img id="imgDashboard" src="./Logo.png" alt="Logo" />
                        <button onClick={logout}>Sair</button>
                    </div>
                </div><header className="headerDashboard">
                        <div>
                            <h1>Olá, {name}!</h1>
                            <p>{modulo}</p>
                        </div>
                    </header><main>
                        <div className="headerMain">
                            <h2>Tecnologias</h2>
                            <button onClick={() => setShowDashboardModal(true)}>+</button>
                        </div>
                        <TechsList techsList={techsList} setTechsList={setTechsList} userID={userID} setName={setName} setModulo={setModulo} />
                    </main>
                </>
            ):( 
                <div className="dashboardNaoLogado">
                    <h1>Você não pode acessar a Dashboard sem estar logado</h1>
                    <button onClick={logout}>Logar</button>
                </div>
            )}
        </>
    )
}

export default Dashboard