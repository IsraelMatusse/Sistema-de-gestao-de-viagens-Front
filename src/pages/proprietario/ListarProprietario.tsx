/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Table,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { GET } from "../../data/client/httpclient";
import { API_ENDPOINTS } from "../../data/client/Endpoints";
import { Viajante } from "../../models/Viajante";
import { proprietario } from "../../models/Proprietario";

const Proprietarios = function () {
    const [proprietarios, setProprietarios] = useState<proprietario[]>([]);

    const getProprietarios = () => {
        GET(API_ENDPOINTS.LISTAR_PROPRIETARIO, true)
            .then((res) => {
                setProprietarios(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getProprietarios()
    }, [])

    return (
        <div>
            <div className="mt-7 block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
                <div className="mb-1 w-full">
                    <div className="item-center mb-4 flex flex-col justify-center text-center">

                        <div className="">
                            <h1 className="text-left text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                                Lista de Proprietarios
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow">
                            <ProprietariosTable proprietarios={proprietarios} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

const ProprietariosTable = function ({ proprietarios }: any) {


    return (
        <Table className="divide-y divide-gray-200 dark:divide-gray-600 md:min-w-full">
            <Table.Head className=" w-fit bg-gray-100 dark:bg-gray-700">
                <Table.HeadCell>Codigo</Table.HeadCell>   
                <Table.HeadCell>Nome</Table.HeadCell>
                <Table.HeadCell>Nuit</Table.HeadCell>
                <Table.HeadCell>Tipo de proprietario</Table.HeadCell>
                <Table.HeadCell>Ano de criacao</Table.HeadCell>
                <Table.HeadCell>Numero de documento</Table.HeadCell>
                <Table.HeadCell>Contacto</Table.HeadCell>

            </Table.Head>
            <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                {proprietarios.map((proprietario: proprietario) =>
                    <Table.Row key={proprietario.id}>
                        <Table.Cell>
                            {proprietario.codigo}
                        </Table.Cell>
                        <Table.Cell>
                            {proprietario.nome}
                        </Table.Cell>

                        <Table.Cell>
                            {proprietario.nuit}
                        </Table.Cell>

                        <Table.Cell>
                            {proprietario.designacao_tipo_proprietario}
                        </Table.Cell>

                        <Table.Cell>
                            {proprietario.anocriacao}
                        </Table.Cell>
                        <Table.Cell>
                            {proprietario.numero_documento}
                        </Table.Cell>
                        <Table.Cell>
                            {proprietario.msidsn}
                        </Table.Cell>

                    </Table.Row>

                )}
            </Table.Body>
        </Table>
    );

};






export default Proprietarios;
