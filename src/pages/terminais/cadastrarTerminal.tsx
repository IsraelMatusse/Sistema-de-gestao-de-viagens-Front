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
import type { Provincias } from "../../models/Provincias";
import { Distrito } from "../../models/Distrito";



const CadastrarTerminal = function () {
    const [provincias, setProvincias] = useState<Provincias[]>([]);
    const [distrito, setDistrito] = useState<Distrito[]>([])
    const [rotas, setRotas] = useState<Rota[]>([]);

    const cadastrarTerminalSchema = Yup.object().shape({
        designacao: Yup.string().required(),
        msisdn: Yup.string().matches(PHONEREGEX, "Número Inválido"),
        email: Yup.string().email().required(),
        nuit: Yup.number().min(9, "O NUIT deve ter 9 dígitos").max(9, "O NUIT deve ter 9 dígitos"),
        codigo_provincia: Yup.number().required(),
        codigo_distrito: Yup.number().required(),
    })

    const cadastrarTerminalFormik = useFormik({
        initialValues: {
            designacao: null,
            msisdn: null,
            email: null,
            nuit: null,
            codigo_provincia: null,
            codigo_distrito: null,
        }, validationSchema: cadastrarTerminalSchema,
        onSubmit(values, { setSubmitting, resetForm }) {
            cadastrarTerminalPost(values, setSubmitting, resetForm);
        },

    })

    const cadastrarTerminalPost = (values: any, SetSubmitting: any, ResetForm: any) => {
        POST(API_ENDPOINTS.CADASTRAR_TERMINAL, values, true)
            .then(() => {
                success_server_side("Terminal Cadastrada!")
                SetSubmitting(false)
                ResetForm
            })
            .catch((err) => {
                SetSubmitting(false)
                error_client_side(err.response.data.data)
                console.log(err)
            })
    }

    const getProvincias = () => {
        GET(API_ENDPOINTS.LISTAR_PROVINCIAS, true)
            .then((res) => {
                setProvincias(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const getDistritos = (codigo_provincia: any) => {
        GET(API_ENDPOINTS.LISTAR_DISTRITOS_DA_PROVINCIA(codigo_provincia), true)
            .then((res) => {
                setDistrito(res.data.data)
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
        getProvincias()
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
                        <form onSubmit={cadastrarTerminalFormik.handleSubmit} className="flex w-full flex-col gap-5">
                            <div className="">
                                <div className="flex w-full flex-col gap-4">
                                    <TextField
                                        size="small"
                                        onChange={cadastrarTerminalFormik.handleChange}
                                        onBlur={cadastrarTerminalFormik.handleBlur}
                                        value={cadastrarTerminalFormik.values.designacao}
                                        error={cadastrarTerminalFormik.errors.designacao && cadastrarTerminalFormik.touched.designacao ? true : false}
                                        helperText={cadastrarTerminalFormik.errors.designacao && cadastrarTerminalFormik.touched.designacao && "Coloque uma designação válida"}
                                        name="designacao"
                                        fullWidth
                                        label="Designação"
                                    />

                                    <TextField
                                        size="small"
                                        onChange={cadastrarTerminalFormik.handleChange}
                                        onBlur={cadastrarTerminalFormik.handleBlur}
                                        value={cadastrarTerminalFormik.values.nuit}
                                        error={cadastrarTerminalFormik.errors.nuit && cadastrarTerminalFormik.touched.nuit ? true : false}
                                        helperText={cadastrarTerminalFormik.errors.nuit && cadastrarTerminalFormik.touched.nuit && "Coloque uma Número de Licença válido"}
                                        name="nuit"
                                        fullWidth
                                        label="NUIT"
                                    />

                                    <TextField
                                        id="outlined-select-currency"
                                        size="small"
                                        select
                                        fullWidth
                                        onChange={(e) => {
                                            getDistritos(e.target.value)
                                            cadastrarTerminalFormik.setFieldValue("codigo_provincia", e.target.value)
                                        }}
                                        onBlur={cadastrarTerminalFormik.handleBlur}
                                        value={cadastrarTerminalFormik.values.codigo_provincia}
                                        error={cadastrarTerminalFormik.errors.codigo_provincia && cadastrarTerminalFormik.touched.codigo_provincia ? true : false}
                                        helperText={cadastrarTerminalFormik.errors.codigo_provincia && cadastrarTerminalFormik.touched.codigo_provincia && "Seleccione a Província"}
                                        name="codigo_provincia"
                                        label="Província"
                                    >
                                        {provincias.map((option) => (
                                            <MenuItem key={option.codigo} value={option.codigo}>
                                                {option.designacao}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <TextField
                                        id="outlined-select-currency"
                                        size="small"
                                        select
                                        fullWidth
                                        onChange={cadastrarTerminalFormik.handleChange}
                                        onBlur={cadastrarTerminalFormik.handleBlur}
                                        value={cadastrarTerminalFormik.values.codigo_distrito}
                                        error={cadastrarTerminalFormik.errors.codigo_distrito && cadastrarTerminalFormik.touched.codigo_distrito ? true : false}
                                        helperText={cadastrarTerminalFormik.errors.codigo_distrito && cadastrarTerminalFormik.touched.codigo_distrito && "Seleccione o Distrito!"}
                                        name="codigo_distrito"
                                        label="Distrito"
                                    >
                                        {distrito.map((option) => (
                                            <MenuItem key={option.codigo} value={option.codigo}>
                                                {option.designacao}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <div className="flex flex-row gap-4">
                                        <div className="flex basis-2/4">

                                        </div>

                                        <div className="flex basis-2/4">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                                                <DatePicker

                                                    label="Data de Validade"
                                                    format="DD-MM-YYYY"
                                                    slotProps={{ textField: { size: 'small' } }}
                                                    onChange={(newValue: any) => {
                                                        const dataValidade = newValue.$d.toISOString();
                                                        cadastrarTerminalFormik.setFieldValue("data_validade", dataValidade)
                                                    }} />

                                            </LocalizationProvider>
                                        </div>



                                    </div>

                                    <TextField
                                        size="small"
                                        onChange={cadastrarTerminalFormik.handleChange}
                                        onBlur={cadastrarTerminalFormik.handleBlur}
                                        value={cadastrarTerminalFormik.values.email_associacao}
                                        error={cadastrarTerminalFormik.errors.email_associacao && cadastrarTerminalFormik.touched.email_associacao ? true : false}
                                        helperText={cadastrarTerminalFormik.errors.email_associacao && cadastrarTerminalFormik.touched.email_associacao && "Coloque um e-mail válido"}
                                        name="email_associacao"
                                        fullWidth
                                        label="E-mail da Associação"
                                    />

                                    <TextField
                                        size="small"
                                        onChange={cadastrarTerminalFormik.handleChange}
                                        onBlur={cadastrarTerminalFormik.handleBlur}
                                        value={cadastrarTerminalFormik.values.msisdn}
                                        error={cadastrarTerminalFormik.errors.msisdn && cadastrarTerminalFormik.touched.msisdn ? true : false}
                                        helperText={cadastrarTerminalFormik.errors.msisdn && cadastrarTerminalFormik.touched.msisdn && "Coloque uma contacto válido"}
                                        name="msisdn"
                                        fullWidth
                                        label="Número de Telefone"
                                    />

                                    <Autocomplete
                                        size="small"
                                        multiple
                                        onChange={(event, values) => {
                                            cadastrarTerminalFormik.setFieldValue("rotas", values)
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
                            <LoadingButton type="submit" variant="contained" loading={cadastrarTerminalFormik.isSubmitting} disableElevation={true} disabled={!cadastrarTerminalFormik.isValid}>
                                Cadastrar Associação
                            </LoadingButton>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default CadastrarTerminal