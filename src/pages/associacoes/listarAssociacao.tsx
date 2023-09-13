/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Table,
} from "flowbite-react";
import { useEffect, useState } from "react";
import type { Associacao } from "../../models/Associacao";
import { GET } from "../../data/client/httpclient";
import { API_ENDPOINTS } from "../../data/client/Endpoints";


const Associacoes = function () {
    const [associacoes, setAssociacoes] = useState<Associacao[]>([]);

    const getAssociacoes = () => {
        GET(API_ENDPOINTS.LISTAR_ASSOCIACOES, true)
            .then((res) => {
                setAssociacoes(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getAssociacoes()
    }, [])

    return (
        <div>
            <div className="mt-7 block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
                <div className="mb-1 w-full">
                    <div className="item-center mb-4 flex flex-col justify-center text-center">

                        <div className="">
                            <h1 className="text-left text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                                Associações Cadastradas
                            </h1>

                        </div>


                    </div>



                </div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow">
                            <AssociacoesTable associacoes={associacoes} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};



const AssociacoesTable = function ({ associacoes }: any) {


    return (
        <Table className="divide-y divide-gray-200 dark:divide-gray-600 md:min-w-full">
            <Table.Head className=" w-fit bg-gray-100 dark:bg-gray-700">
                <Table.HeadCell>Código</Table.HeadCell>
                <Table.HeadCell>Designação</Table.HeadCell>
                <Table.HeadCell>T. Licença</Table.HeadCell>
                <Table.HeadCell>Celular</Table.HeadCell>
                <Table.HeadCell>E-mail</Table.HeadCell>

            </Table.Head>
            <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                {associacoes.map((associacao: Associacao) =>
                    <Table.Row key={associacao.id}>
                        <Table.Cell>
                            {associacao.codigo}
                        </Table.Cell>

                        <Table.Cell>
                            {associacao.designacao}
                        </Table.Cell>

                        <Table.Cell>
                            {associacao.designacao_licenca}
                        </Table.Cell>

                        <Table.Cell>
                            {associacao.msisdn}
                        </Table.Cell>
                        <Table.Cell>
                            {associacao.email}
                        </Table.Cell>
                    </Table.Row>

                )}
            </Table.Body>
        </Table>
    );
};





export default Associacoes;
