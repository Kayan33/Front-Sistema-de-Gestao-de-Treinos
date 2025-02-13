import'./popupVideio.css';

const PopupVideio = ({
  isOpen,
  togglePopup,
  exercicio
}) =>{
    return(
        isOpen && (
            <div className="popup-overlay" onClick={togglePopup}>
              <div className="popup-content-video" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={togglePopup}>
                  &times;
                </button>
      
                <div className="cadastrar-aluno-container ">

                  {exercicio.map((item)=>(
                   

                  <iframe src={`https://www.youtube.com/embed/${item.URL_video}`}
                  className="exercicio-video"
                  title={item.nome_exercicio}></iframe>
                  ))}
                </div>
              </div>
            </div>
          )
    )
}

export default PopupVideio
