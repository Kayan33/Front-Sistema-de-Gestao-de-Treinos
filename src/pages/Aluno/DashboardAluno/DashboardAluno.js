import "./DashboardAluno.css";

export default function DashboardAluno() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title-aluno">Dashboard do Aluno</h1>
        <p className="dashboard-subtitle">Acompanhe seu treino e progresso!</p>
      </header>

      <div className="dashboard-content">
        {/* Seção do Próximo Treino */}
        <section className="next-workout">
          <h2 className="section-title">Próximo Treino Agendado</h2>
          <div className="workout-info">
            <p>Data: <span className="highlight-text">18/02/2025</span></p>
            <p>Horário: <span className="highlight-text">08:00 AM</span></p>
          </div>
          <button className="btn btn-primary">Iniciar Treino</button>
        </section>

        {/* Seção de Atalhos */}
        <section className="shortcuts">
          <h2 className="section-title">Atalhos</h2>
          <div className="shortcut-buttons">
            <button className="btn btn-secondary">Histórico</button>
            <button className="btn btn-secondary">Chat com Personal</button>
            <button className="btn btn-secondary">Configurações</button>
          </div>
        </section>

        {/* Seção de Estatísticas */}
        <section className="statistics">
          <h2 className="section-title">Estatísticas de Progresso</h2>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: "75%" }}></div>
          </div>
          <p className="progress-text">75% do treino completado</p>
        </section>
      </div>
    </div>
  );
}
