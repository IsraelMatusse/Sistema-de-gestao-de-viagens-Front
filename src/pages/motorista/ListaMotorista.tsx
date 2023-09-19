/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Table,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { GET } from "../../data/client/httpclient";
import { API_ENDPOINTS } from "../../data/client/Endpoints";
import { Motorista } from "../../models/Motorista";

const Motoristas = function () {
    const [motoristas, setMotoristas] = useState<Motorista[]>([]);

    const getMotorista = () => {
        GET(API_ENDPOINTS.LISTAR_MOTORISTAS, true)
            .then((res) => {
                setMotoristas(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getMotorista()
    }, [])

    return (
        <div>
            <div className="mt-7 block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
                <div className="mb-1 w-full">
                    <div className="item-center mb-4 flex flex-col justify-center text-center">

                        <div className="">
                            <h1 className="text-left text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                                Lista de Motoristas
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow">
                            <MotoristasTable motoristas={motoristas} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

const MotoristasTable = function ({ motoristas }: any) {


    return (
        <Table className="divide-y divide-gray-200 dark:divide-gray-600 md:min-w-full">
            <Table.Head className=" w-fit bg-gray-100 dark:bg-gray-700">
                <Table.HeadCell>Codigo</Table.HeadCell>   
                <Table.HeadCell>Nome</Table.HeadCell>
                <Table.HeadCell>Apelido</Table.HeadCell>
                <Table.HeadCell>Genero</Table.HeadCell>
                <Table.HeadCell>Provincia</Table.HeadCell>
                <Table.HeadCell>Ano de nascimento</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Numero de documento</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                {motoristas.map((motorista: Motorista) =>
                    <Table.Row key={motorista.id}>
                        <Table.Cell>
                            {motorista.codigo}
                        </Table.Cell>
                        <Table.Cell>
                            {motorista.nome}
                        </Table.Cell>

                        <Table.Cell>
                            {motorista.apelido}
                        </Table.Cell>

                        <Table.Cell>
                            {motorista.genero}
                        </Table.Cell>

                        <Table.Cell>
                            {motorista.provincia}
                        </Table.Cell>
                        <Table.Cell>
                            {motorista.anonascimento}
                        </Table.Cell>
                        <Table.Cell>
                            {motorista.email}
                        </Table.Cell>
                        <Table.Cell>
                            {motorista.numero_documento}
                        </Table.Cell>

                    </Table.Row>

                )}
            </Table.Body>
        </Table>
    );

};
export default Motoristas;
