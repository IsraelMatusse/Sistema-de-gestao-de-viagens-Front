import gif from '../../assets/educatin.gif';

export default function Home() {
    return (
        <div className="px-4 pt-6 mt-4">
            <div className="rounded-lg bg-white p-4 shadow sm:p-6 xl:p-8">
                <div className="mb-4 relative z-10 mt-4 flex items-center justify-between">
                    <div className="shrink-0">
                        <span className="text-2xl font-bold leading-none text-gray-900  sm:text-3xl">
                            Bem-Vindo Ao Sistema de gestao de Viagens
                        </span>
                    </div>
                </div>
            </div>

            <div className="my-2 max-h-80 rounded-lg bg-white p-4 shadow sm:p-6 xl:p-8">
                <div className="mb-4  grid  place-items-center">
                    <div className="h-72 shrink-0">
                        <img src={gif} alt='education' className='h-72' />
                    </div>
                </div>
            </div>

        </div>

    )
}