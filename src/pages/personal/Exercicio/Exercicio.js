import { Await, data, useParams } from "react-router-dom";
import Header from "../../../components/personal/header/header";
import { CategoriaApi } from "../../../api/CategoriaApi";
import { useEffect, useState } from "react";

export default function Exercicio() {

    const[exercicio, setExercicio]= useState(null)

    const{categoria}=useParams()

   async function ConsultaUnica() {
      const resposta =  await CategoriaApi.consultaUnica(categoria)
          setExercicio(resposta.data)    
    }

    useEffect(()=>{
        ConsultaUnica()
    },[categoria])

    return(
        <div className="dashboard-personal-container">
            <Header/>
            <div className="container-aluno-unico">

           {exercicio ?
           (<div>
            <h1>{exercicio.categoria}</h1>
                <ul>
                    {exercicio.exercicios.map((item)=>(
                        <li key={item.id}>
                            {item.nome_exercicio}
                        </li>
                    ))}
                </ul>
            </div>
            ):(
                <p>ddd</p>
            )
        }

            </div>
        </div>
    )
}