import "./Modal.css"


function Modal({setShowModal, modalMessage}){

    return(
        <div className="containerModal">
            <div className="modal">
                <h3>Atenção!</h3>
                <p>{modalMessage}</p>
                <button onClick={() => setShowModal(false) }>X</button>
            </div>
        </div>
    )
}

export default Modal