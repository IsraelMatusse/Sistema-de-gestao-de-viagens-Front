import { useFormik } from "formik";
import { useAtom } from "jotai";
import * as Yup from "yup";
import { usuarioOnlineAssociacaoCodigo } from "../../atom/ApplicationStateAtoms";
import { GET, POST } from "../../data/client/httpclient";
import { API_ENDPOINTS } from "../../data/client/Endpoints";
import { success_server_side } from "../../util/Notifications";
import { MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Rota } from "../../models/Rota";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { LoadingButton } from "@mui/lab";
import { Viatura } from "../../models/Viatura";
import { Motorista } from "../../models/Motorista";

export default function CadastrarViagem() {
    const [codigoAssociacao] = useAtom(usuarioOnlineAssociacaoCodigo);
    const [rotas, setRotas] = useState<Rota[]>([]);
    const [viaturas, setViaturas] = useState<Viatura[]>([]);
    const [motoristas, setMotoristas] = useState<Motorista[]>([]);

    const cadastroViagemSchema = Yup.object().shape({
        codigo_viatura: Yup.string().required("Este campo é obrigatório"),
        destino_viagem: Yup.string().required("Este campo é obrigatório!!!"),
        saida: Yup.string().required("A viagem deve ter uma hora de partida"),
        prev_chegada: Yup.string().required("Defina a hora de chegada"),
        id_rota: Yup.number().required(),
        codigo_motorista: Yup.string().required("Selecione o motorista"),
    })

    const cadastroViagemFormik = useFormik({
        initialValues: {
            codigo_motorista: null,
            codigo_viatura: null,
            destino_viagem: null,
            saida: null,
            prev_chegada: null,
            id_rota: null,
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


    const toISOLocal = (d, field) => {
        const z = n => ('0' + n).slice(-2);
        const zz = n => ('00' + n).slice(-3);
        let off = d.getTimezoneOffset();
        const sign = off > 0 ? '-' : '+';
        off = Math.abs(off);

        const dataFormatada = d.getFullYear() + '-'
            + z(d.getMonth() + 1) + '-' +
            z(d.getDate()) + 'T' +
            z(d.getHours()) + ':' +
            z(d.getMinutes()) + ':' +
            z(d.getSeconds()) + '.' +
            zz(d.getMilliseconds()) +
            sign + z(off / 60 | 0) + ':' + z(off % 60);

        const diaSelected = dataFormatada.split("T")[0]
        const horaSelected = dataFormatada.split("T")[1]?.split(".")[0]

        const saida = diaSelected + " " + horaSelected

        if (field === "saida") {
            cadastroViagemFormik.setFieldValue("saida", saida)
        } else {
            cadastroViagemFormik.setFieldValue("prev_chegada", saida)
        }

    }

    useEffect(() => {
        getViaturasAssociacao(codigoAssociacao)
       
    }, [codigoAssociacao])

    const getViaturasAssociacao = (codigo_associacao) => {
        GET(API_ENDPOINTS.ASSOCIACAO_VIATURA(codigo_associacao), true)
            .then((res) => {
                setViaturas(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getRotas = () => {
        GET(API_ENDPOINTS.LISTAR_ROTAS, false)
            .then((res) => {
                setRotas(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getMotoristas = () => {
        GET(API_ENDPOINTS.LISTAR_MOTORISTAS, true)
            .then((res) => {
                setMotoristas(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getRotas()
        getMotoristas()
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


                                <LocalizationProvider dateAdapter={AdapterDayjs}>



                                    <DateTimeField
                                        label="Previsão de Saida"
                                        format="DD-MM-YYYY HH:mm"
                                        //ampm={false}
                                        slotProps={{ textField: { size: 'small' } }}
                                        onChange={(newValue: any) => {
                                            toISOLocal(newValue.$d, "saida")
                                            //console.log(newValue.toISOString())
                                            //const prevChegada = newValue.$d.toISOString();
                                            // cadastroViagemFormik.setFieldValue("prev_chegada", prevChegada)
                                        }}

                                    />

                                </LocalizationProvider>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>



                                    <DateTimeField

                                        label="Previsão de Chegada"
                                        format="DD-MM-YYYY HH:mm"
                                        slotProps={{ textField: { size: 'small' } }}
                                        onChange={(newValue: any) => {
                                            toISOLocal(newValue.$d, "prev_chegada")
                                            //console.log(newValue.toISOString())
                                            //const prevChegada = newValue.$d.toISOString();
                                            // cadastroViagemFormik.setFieldValue("prev_chegada", prevChegada)
                                        }}

                                    />


                                </LocalizationProvider>


                                <TextField
                                    select
                                    fullWidth
                                    size="small"
                                    onChange={cadastroViagemFormik.handleChange}
                                    onBlur={cadastroViagemFormik.handleBlur}
                                    value={cadastroViagemFormik.values.id_rota}
                                    error={cadastroViagemFormik.errors.id_rota && cadastroViagemFormik.touched.id_rota ? true : false}
                                    helperText={cadastroViagemFormik.errors.id_rota && cadastroViagemFormik.touched.id_rota && "Verifique o campo"}
                                    label="Rota"
                                    name="id_rota"
                                >
                                    {rotas.map((rota: Rota) =>
                                        <MenuItem key={rota.id} value={rota.id}>
                                            {rota.nomerota}
                                        </MenuItem>
                                    )}

                                </TextField>

                                <TextField
                                    select
                                    fullWidth
                                    size="small"
                                    onChange={cadastroViagemFormik.handleChange}
                                    onBlur={cadastroViagemFormik.handleBlur}
                                    value={cadastroViagemFormik.values.codigo_motorista}
                                    error={cadastroViagemFormik.errors.codigo_motorista && cadastroViagemFormik.touched.codigo_motorista ? true : false}
                                    helperText={cadastroViagemFormik.errors.codigo_motorista && cadastroViagemFormik.touched.codigo_motorista && "Selecione o Motorista"}
                                    label="Motorista"
                                    name="codigo_motorista"
                                >
                                    {motoristas.map((motorista: Motorista) =>
                                        <MenuItem key={motorista.codigo} value={motorista.codigo}>
                                            {motorista.nome} {motorista.apelido}
                                        </MenuItem>
                                    )}

                                </TextField>

                                <TextField
                                    select
                                    fullWidth
                                    size="small"
                                    onChange={cadastroViagemFormik.handleChange}
                                    onBlur={cadastroViagemFormik.handleBlur}
                                    value={cadastroViagemFormik.values.codigo_viatura}
                                    error={cadastroViagemFormik.errors.codigo_viatura && cadastroViagemFormik.touched.codigo_viatura ? true : false}
                                    helperText={cadastroViagemFormik.errors.codigo_viatura && cadastroViagemFormik.touched.codigo_viatura && "Verifique o campo"}
                                    label="Viatura"
                                    name="codigo_viatura"
                                >
                                    {viaturas.map((viaturas: Viatura) =>
                                        <MenuItem key={viaturas.nome_proprietario} value={viaturas.codigo}>
                                            {viaturas.modelo}  - {viaturas.matricula}
                                        </MenuItem>
                                    )}

                                </TextField>

                                <LoadingButton type="submit" variant="contained" loading={cadastroViagemFormik.isSubmitting} disableElevation={true} disabled={!cadastroViagemFormik.isValid}>
                                    Cadastrar Viagem
                                </LoadingButton>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>

    )



}

