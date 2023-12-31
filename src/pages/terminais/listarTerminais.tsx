/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Table,
} from "flowbite-react";
import { useEffect, useState } from "react";
import type { Terminal } from "../../models/Terminal";
import { GET } from "../../data/client/httpclient";
import { API_ENDPOINTS } from "../../data/client/Endpoints";


const Terminais = function () {
    const [terminais, setTerminais] = useState<Terminal[]>([]);

    const getTerminais = () => {
        GET(API_ENDPOINTS.LISTAR_TERMINAIS, true)
            .then((res) => {
                setTerminais(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getTerminais()
    }, [])

    return (
        <div>
            <div className="mt-7 block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
                <div className="mb-1 w-full">
                    <div className="item-center mb-4 flex flex-col justify-center text-center">

                        <div className="">
                            <h1 className="text-left text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                               Terminais cadastradas
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow">
                            <TerminaisTable terminais={terminais} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};



const TerminaisTable = function ({ terminais }: any) {


    return (
        <Table className="divide-y divide-gray-200 dark:divide-gray-600 md:min-w-full">
            <Table.Head className=" w-fit bg-gray-100 dark:bg-gray-700">
                <Table.HeadCell>Código</Table.HeadCell>
                <Table.HeadCell>Designação</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Celular</Table.HeadCell>
                <Table.HeadCell>Provincia</Table.HeadCell>
                <Table.HeadCell>Distrito</Table.HeadCell>

            </Table.Head>
            <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                {terminais.map((terminal: Terminal) =>
                    <Table.Row key={terminal.id}>
                        <Table.Cell>
                            {terminal.codigo}
                        </Table.Cell>

                        <Table.Cell>
                            {terminal.designacao}
                        </Table.Cell>

                        <Table.Cell>
                            {terminal.email}
                        </Table.Cell>

                        <Table.Cell>
                            {terminal.contacto}
                        </Table.Cell>
                        <Table.Cell>
                            {terminal.provincia}
                        </Table.Cell>
                        <Table.Cell>
                            {terminal.distrito}
                        </Table.Cell>
                    </Table.Row>

                )}
            </Table.Body>
        </Table>
    );
};





export default Terminais;
