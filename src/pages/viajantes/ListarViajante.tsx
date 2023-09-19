/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Table,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { GET } from "../../data/client/httpclient";
import { API_ENDPOINTS } from "../../data/client/Endpoints";
import { Viajante } from "../../models/Viajante";

const Viajantes = function () {
    const [viajantes, setViajantes] = useState<Viajante[]>([]);

    const getViajantes = () => {
        GET(API_ENDPOINTS.LISTAR_VIAJANTES, true)
            .then((res) => {
                setViajantes(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getViajantes()
    }, [])

    return (
        <div>
            <div className="mt-7 block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
                <div className="mb-1 w-full">
                    <div className="item-center mb-4 flex flex-col justify-center text-center">

                        <div className="">
                            <h1 className="text-left text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                                Lista de passageiros
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow">
                            <ViajantesTable viajantes={viajantes} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

const ViajantesTable = function ({ viajantes }: any) {


    return (
        <Table className="divide-y divide-gray-200 dark:divide-gray-600 md:min-w-full">
            <Table.Head className=" w-fit bg-gray-100 dark:bg-gray-700">
                <Table.HeadCell>Nome</Table.HeadCell>
                <Table.HeadCell>Apelido</Table.HeadCell>
                <Table.HeadCell>Data de Nascimento</Table.HeadCell>
                <Table.HeadCell>E-mail</Table.HeadCell>
                <Table.HeadCell>Contacto</Table.HeadCell>
                <Table.HeadCell>Contacto de emergencia</Table.HeadCell>

            </Table.Head>
            <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                {viajantes.map((viajante: Viajante) =>
                    <Table.Row key={viajante.id}>
                        <Table.Cell>
                            {viajante.nome}
                        </Table.Cell>

                        <Table.Cell>
                            {viajante.apelido}
                        </Table.Cell>

                        <Table.Cell>
                            {viajante.data_nasicmento}
                        </Table.Cell>

                        <Table.Cell>
                            {viajante.email}
                        </Table.Cell>
                        <Table.Cell>
                            {viajante.contacto}
                        </Table.Cell>
                        <Table.Cell>
                            {viajante.contacto_emergencia}
                        </Table.Cell>

                    </Table.Row>

                )}
            </Table.Body>
        </Table>
    );

};






export default Viajantes;
