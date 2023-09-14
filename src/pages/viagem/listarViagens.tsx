/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Button,
    Table,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { GET } from "../../data/client/httpclient";
import { API_ENDPOINTS } from "../../data/client/Endpoints";
import type { Viagem } from "../../models/Viagem";
import { HiOutlineEye } from "react-icons/hi";
import { useNavigate } from "react-router";


const ListarViagens = function () {
    const [viagens, setViagens] = useState<Viagem[]>([]);

    const getViagens = () => {
        GET(API_ENDPOINTS.LISTAR_VIAGENS, true)
            .then((res) => {
                setViagens(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getViagens()
    }, [])

    return (
        <div>
            <div className="mt-7 block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
                <div className="mb-1 w-full">
                    <div className="item-center mb-4 flex flex-col justify-center text-center">

                        <div className="">
                            <h1 className="text-left text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                                Viagens Cadastradas
                            </h1>

                        </div>


                    </div>



                </div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow">
                            <ViagensTable viagens={viagens} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};



const ViagensTable = function ({ viagens }: any) {
    const navigate = useNavigate()

    return (
        <Table className="divide-y divide-gray-200 dark:divide-gray-600 md:min-w-full">
            <Table.Head className=" w-fit bg-gray-100 dark:bg-gray-700">
                <Table.HeadCell>Código</Table.HeadCell>
                <Table.HeadCell>Destino</Table.HeadCell>
                <Table.HeadCell>Partida</Table.HeadCell>
                <Table.HeadCell>Prev. Chegada</Table.HeadCell>
                <Table.HeadCell>Passageiros</Table.HeadCell>

            </Table.Head>
            <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                {viagens.map((viagem: Viagem) =>
                    <Table.Row key={viagem.codigo_viagem}>
                        <Table.Cell>
                            {viagem.codigo_viagem}
                        </Table.Cell>

                        <Table.Cell>
                            {viagem.destino_viagem}
                        </Table.Cell>

                        <Table.Cell>
                            {viagem.saida}
                        </Table.Cell>

                        <Table.Cell>
                            {viagem.prev_chegada}
                        </Table.Cell>

                        <Table.Cell>

                            <Button color="success" onClick={() => {
                                navigate(viagem.codigo_viagem + "/detalhes")
                            }}>

                                <HiOutlineEye className="text-lg" />

                            </Button>


                        </Table.Cell>


                    </Table.Row>

                )}
            </Table.Body>
        </Table>
    );
};





export default ListarViagens;
