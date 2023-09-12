import { useFormik } from "formik";
import { useAtom } from "jotai";
import * as Yup from "yup";
import { usuarioOnlineSucursalCodigo } from "../../atom/ApplicationStateAtoms";
import { GET, POST } from "../../data/client/httpclient";
import { API_ENDPOINTS } from "../../data/client/Endpoints";
import { success_server_side } from "../../util/Notifications";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Rota } from "../../models/Rota";


export default function CadastrarViagem() {
    const [codigoAssociacao] = useAtom(usuarioOnlineSucursalCodigo);
    const [rotas, setRotas] = useState<Rota[]>([]);

    const cadastroViagemSchema = Yup.object().shape({
        destino_viagem: Yup.string().required("Este campo é obrigatório!!!"),
        saida: Yup.string().required("A viagem deve ter uma hora de partida"),
        prev_chegada: Yup.string().required("Defina a hora de chegada"),
        id_rota: Yup.number().required(),
        codigo_associacao: Yup.string().required("Selecione a associacao")
    })

    const cadastroViagemFormik = useFormik({
        initialValues: {
            destino_viagem: null,
            saida: null,
            prev_chegada: null,
            id_rota: null,
            codigo_associacao: codigoAssociacao,
        },
        validationSchema: cadastroViagemSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            cadastroViagemPost(values, setSubmitting, resetForm)
        }
    })

    const cadastroViagemPost = (values: any, setSubmitting: any, resetForm: any) => {
        POST(API_ENDPOINTS.CADASTRAR_VIAGEM, values, true)
            .then(() => {
                success_server_side("Viagem Cadastrada")
                setSubmitting(false);
                resetForm;
            })
            .catch((err) => {
                console.log(err);
                setSubmitting(false)
            })
    }

    const getRotas = () => {
        GET(API_ENDPOINTS.LISTAR_ROTAS, false)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getRotas()
    }, [])



    return (
        <main className="bg-gray-100">
            <div className="mt-7 block items-center justify-between rounded border-b border-gray-200 bg-white p-4">
                <div className="mb-1 w-full px-2">
                    <div className="mb-4">
                        <h1 className="text-center text-xl font-bold text-gray-900 md:text-left ">
                            Cadastrar Viagem
                        </h1>
                    </div>

                </div>
            </div>

            <div className=" mt-4 block items-center justify-between border-b border-gray-200 bg-white p-4">
                <div className="mt-7 flex w-full rounded p-4  ">
                    <form onSubmit={cadastroViagemFormik.handleSubmit} className="flex w-full flex-col gap-4 p-4 shadow">
                        <div className="">
                            <div className="flex w-full flex-col gap-4">
                                <TextField
                                    fullWidth
                                    size="small"
                                    onChange={cadastroViagemFormik.handleChange}
                                    onBlur={cadastroViagemFormik.handleBlur}
                                    value={cadastroViagemFormik.values.destino_viagem}
                                    error={cadastroViagemFormik.errors.destino_viagem && cadastroViagemFormik.touched.destino_viagem ? true : false}
                                    helperText={cadastroViagemFormik.errors.destino_viagem && cadastroViagemFormik.touched.destino_viagem && "Verifique o campo"}
                                    label="Destino"
                                    name="destino_viagem"
                                />

                                <TextField
                                    fullWidth
                                    size="small"
                                    onChange={cadastroViagemFormik.handleChange}
                                    onBlur={cadastroViagemFormik.handleBlur}
                                    value={cadastroViagemFormik.values.destino_viagem}
                                    error={cadastroViagemFormik.errors.destino_viagem && cadastroViagemFormik.touched.destino_viagem ? true : false}
                                    helperText={cadastroViagemFormik.errors.destino_viagem && cadastroViagemFormik.touched.destino_viagem && "Verifique o campo"}
                                    label="Destino"
                                    name="destino_viagem"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>

    )



}

