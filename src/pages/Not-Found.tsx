import notfound from '../assets/not-found.svg';

export default function NotFoundPage() {
    return (
        <div className="container404">
            <section className="content404">
                <h1>404</h1>
                <h2>A pagina procurada não existe.</h2>
                    <a className="btn" href="index.html">Volte ao Home</a>
                    <img src={notfound}  />
                        <a href="https://bootstrapmade.com/">Sistema de gestão de viagens</a>
            </section>
         </div>   

    )
}