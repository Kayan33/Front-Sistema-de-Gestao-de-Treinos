// PaginaPrincipal.js
import "./PaginaPrincipal.css";
import { Link } from "react-router-dom";

export default function PaginaPrincipal() {
    return (
        <div className="container">
            <header className="header">
                <h1>Sistema para Personal Trainers</h1>
                <p>Gerencie seus treinos e acompanhe seu progresso de forma eficiente</p>
            </header>
            
            <main className="main-content">
                <section className="section intro">
                    <h2>O que é o sistema?</h2>
                    <p>
                        Nosso sistema foi criado para facilitar a gestão de treinos e acompanhamento de alunos.
                        Personal trainers podem organizar treinos, acompanhar progresso e gerenciar sua agenda de forma eficiente.
                    </p>
                </section>
                
                <section className="section area">
                    <h2>Área do Aluno</h2>
                    <p>
                        Os alunos podem acessar seus treinos, visualizar planos personalizados e acompanhar seu progresso.
                    </p>
                    <Link to="/login/aluno" className="button aluno">Acessar Área do Aluno</Link>
                </section>
                
                <section className="section area">
                    <h2>Área do Personal Trainer</h2>
                    <p>
                        Personal trainers têm acesso a ferramentas para criar treinos personalizados, gerenciar alunos e acompanhar seu desempenho.
                    </p>
                    <Link to="/login/personal" className="button personal">Acessar Área do Personal</Link>
                </section>
            </main>
        </div>
    );
}