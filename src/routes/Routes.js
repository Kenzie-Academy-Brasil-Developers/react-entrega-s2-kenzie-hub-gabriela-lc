import {Switch, Route} from "react-router-dom"
import Dashboard from "../pages/Dashboard/Dashboard"
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"

function Routes({setShowModal, setModalMessage, isLoged, setIsLoged}){

    return(

        <Switch>
            <Route exact path="/">
                <Login setShowModal={setShowModal} setModalMessage={setModalMessage} setIsLoged={setIsLoged}/>
            </Route>
            <Route exact path="/register">
                <Register setShowModal={setShowModal} setModalMessage={setModalMessage}/>
            </Route>
            <Route exact path="/dashboard">
                <Dashboard setShowModal={setShowModal} setModalMessage={setModalMessage} isLoged={isLoged} setIsLoged={setIsLoged}/>
            </Route>
        </Switch>
    )
}

export default Routes