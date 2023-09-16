import { LoadingButton } from "@mui/lab"
import { Autocomplete, MenuItem, TextField } from "@mui/material"
import { useFormik } from "formik";
import * as Yup from "yup";
import { GET, POST } from "../../data/client/httpclient";
import { API_ENDPOINTS } from "../../data/client/Endpoints";
import { error_client_side, success_server_side } from "../../util/Notifications";
import { useEffect, useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { TipoLicenca } from "../../models/TipoLicenca";
import type { Rota } from "../../models/Rota";
import { PHONEREGEX } from "../../util/PhoneRegex";



const CadastrarAssociacao = function () {
    const [tiposLicenca, setTiposLicenca] = useState<TipoLicenca[]>([]);
    const [rotas, setRotas] = useState<Rota[]>([]);

    const cadastroAssociacaoSchema = Yup.object().shape({
        designacao: Yup.string().required(),
        msisdn: Yup.string().matches(PHONEREGEX, "Número inválido"),
        numero_licenca: Yup.string().required(),
        data_validade: Yup.date().required(),
        tipo_licenca: Yup.string().required(),
        email_associacao: Yup.string().email().required(),
        rotas: Yup.array()
    })

    const cadastrarAssociacaoFormik = useFormik({
        initialValues: {
            designacao: null,
            msisdn: null,
            numero_licenca: null,
            data_validade: null,
            tipo_licenca: null,
            email_associacao: null,
            rotas: []
        }, validationSchema: cadastroAssociacaoSchema,
        onSubmit(values, { setSubmitting, resetForm }) {
            cadastrarAssociacaoPost(values, setSubmitting, resetForm);
        },

    })

    const cadastrarAssociacaoPost = (values: any, SetSubmitting: any, ResetForm: any) => {
        POST(API_ENDPOINTS.CADASTRAR_ASSOCIACAO, values, true)
            .then(() => {
                success_server_side("Associacao Cadastrada!")
                SetSubmitting(false)
                ResetForm
            })
            .catch((err) => {
                SetSubmitting(false)
                error_client_side(err.response.data.data)
                console.log(err)
            })
    }

    const getTiposLicenca = () => {
        GET(API_ENDPOINTS.LISTAR_TIPOS_LICENCA, true)
            .then((res) => {
                setTiposLicenca(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getRotas = () => {
        GET(API_ENDPOINTS.LISTAR_ROTAS, true)
            .then((res) => {
                setRotas(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    useEffect(() => {
        getTiposLicenca()
        getRotas()
    }, [])

    return (
        <div>
            <div className="mt-7 block items-center justify-between border-b border-gray-200 bg-white p-4">
                <div className="mb-1 w-full px-2">
                    <div className="mb-4">
                        <h1 className="text-xl font-semibold text-gray-900  sm:text-2xl">
                            Adicionar Associação
                        </h1>
                    </div>
                    <div className="mt-7 flex w-full">
                        <form onSubmit={cadastrarAssociacaoFormik.handleSubmit} className="flex w-full flex-col gap-5">
                            <div className="">
                                <div className="flex w-full flex-col gap-4">
                                    <TextField
                                        size="small"
                                        onChange={cadastrarAssociacaoFormik.handleChange}
                                        onBlur={cadastrarAssociacaoFormik.handleBlur}
                                        value={cadastrarAssociacaoFormik.values.designacao}
                                        error={cadastrarAssociacaoFormik.errors.designacao && cadastrarAssociacaoFormik.touched.designacao ? true : false}
                                        helperText={cadastrarAssociacaoFormik.errors.designacao && cadastrarAssociacaoFormik.touched.designacao && "Coloque uma designação válida"}
                                        name="designacao"
                                        fullWidth
                                        label="Designação da Associação"
                                    />

                                    <TextField
                                        id="outlined-select-currency"
                                        size="small"
                                        select
                                        fullWidth
                                        onChange={cadastrarAssociacaoFormik.handleChange}
                                        onBlur={cadastrarAssociacaoFormik.handleBlur}
                                        value={cadastrarAssociacaoFormik.values.tipo_licenca}
                                        error={cadastrarAssociacaoFormik.errors.tipo_licenca && cadastrarAssociacaoFormik.touched.tipo_licenca ? true : false}
                                        helperText={cadastrarAssociacaoFormik.errors.tipo_licenca && cadastrarAssociacaoFormik.touched.tipo_licenca && "Seleccione a sucural!"}
                                        name="tipo_licenca"
                                        label="Tipo de Licença"
                                    >
                                        {tiposLicenca.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.designacao}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <div className="flex flex-row gap-4">
                                        <div className="flex basis-2/4">
                                            <TextField
                                                size="small"
                                                onChange={cadastrarAssociacaoFormik.handleChange}
                                                onBlur={cadastrarAssociacaoFormik.handleBlur}
                                                value={cadastrarAssociacaoFormik.values.numero_licenca}
                                                error={cadastrarAssociacaoFormik.errors.numero_licenca && cadastrarAssociacaoFormik.touched.numero_licenca ? true : false}
                                                helperText={cadastrarAssociacaoFormik.errors.numero_licenca && cadastrarAssociacaoFormik.touched.numero_licenca && "Coloque uma Número de Licença válido"}
                                                name="numero_licenca"
                                                fullWidth
                                                label="Número Licença"
                                            />
                                        </div>

                                        <div className="flex basis-2/4">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                                                <DatePicker

                                                    label="Data de Validade"
                                                    format="DD-MM-YYYY"
                                                    slotProps={{ textField: { size: 'small' } }}
                                                    onChange={(newValue: any) => {
                                                        const dataValidade = newValue.$d.toISOString();
                                                        cadastrarAssociacaoFormik.setFieldValue("data_validade", dataValidade)
                                                    }} />

                                            </LocalizationProvider>
                                        </div>



                                    </div>

                                    <TextField
                                        size="small"
                                        onChange={cadastrarAssociacaoFormik.handleChange}
                                        onBlur={cadastrarAssociacaoFormik.handleBlur}
                                        value={cadastrarAssociacaoFormik.values.email_associacao}
                                        error={cadastrarAssociacaoFormik.errors.email_associacao && cadastrarAssociacaoFormik.touched.email_associacao ? true : false}
                                        helperText={cadastrarAssociacaoFormik.errors.email_associacao && cadastrarAssociacaoFormik.touched.email_associacao && "Coloque um e-mail válido"}
                                        name="email_associacao"
                                        fullWidth
                                        label="E-mail da Associação"
                                    />

                                    <TextField
                                        size="small"
                                        onChange={cadastrarAssociacaoFormik.handleChange}
                                        onBlur={cadastrarAssociacaoFormik.handleBlur}
                                        value={cadastrarAssociacaoFormik.values.msisdn}
                                        error={cadastrarAssociacaoFormik.errors.msisdn && cadastrarAssociacaoFormik.touched.msisdn ? true : false}
                                        helperText={cadastrarAssociacaoFormik.errors.msisdn && cadastrarAssociacaoFormik.touched.msisdn && "Coloque uma contacto válido"}
                                        name="msisdn"
                                        fullWidth
                                        label="Número de Telefone"
                                    />

                                    <Autocomplete
                                        size="small"
                                        multiple
                                        onChange={(event, values) => {
                                            cadastrarAssociacaoFormik.setFieldValue("rotas", values)
                                        }}
                                        id="tags-outlined"
                                        options={rotas.map((option: Rota) => option.nomerota)}
                                        //getOptionLabel={(option) => option.nomerota}
                                        filterSelectedOptions
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Rotas"
                                                placeholder="Selecione as Rotas"
                                            />
                                        )}
                                    />

                                </div>
                            </div>
                            <LoadingButton type="submit" variant="contained" loading={cadastrarAssociacaoFormik.isSubmitting} disableElevation={true} disabled={!cadastrarAssociacaoFormik.isValid}>
                                Cadastrar Associação
                            </LoadingButton>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default CadastrarAssociacao