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



const CadastrarProprietario = function () {
    const [provincias, setProvincias] = useState<Provincias[]>([]);
    const [distrito, setDistrito] = useState<Distrito[]>([]);
    


    const cadastrarProprietarioSchema = Yup.object().shape({
        nome: Yup.string().required(),
        msisdn: Yup.string().matches(PHONEREGEX, "Número Inválido"),
        nuit: Yup.number(),
        codigo_provincia: Yup.number().required(),
        codigo_distrito: Yup.number().required(),
        designacao_provincia:Yup.string().required(),
        numero_documento:Yup.string().required(),
        designacao_tipo_proprietario:Yup.string().required(),
        data_validade:Yup.date().required(),
        codigo_tipo_proprietario:Yup.string().required(),
        id_tipo_documento:Yup.number().required()
    })

    const cadastrarProprietarioFormik = useFormik({
        initialValues: {
            nome: null,
            msisdn: null,
            email: null,
            nuit: null,
            codigo_provincia: null,
            codigo_distrito: null,
            numero_documento:null,
            id_genero:null,
            msidsn:null,
            data_validade:null,
            codigo_tipo_proprietario:null,
            id_tipo_documento:null
        }, validationSchema: cadastrarProprietarioSchema,
        onSubmit(values, { setSubmitting, resetForm }) {
            cadastrarTerminalPost(values, setSubmitting, resetForm);
        },

    })

    const cadastrarTerminalPost = (values: any, SetSubmitting: any, ResetForm: any) => {
        POST(API_ENDPOINTS.CADASTRAR_TERMINAL, values, true)
            .then(() => {
                success_server_side("Proprietario Cadastrado!")
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

    return (
        <div>
            <div className="mt-7 block items-center justify-between border-b border-gray-200 bg-white p-4">
                <div className="mb-1 w-full px-2">
                    <div className="mb-4">
                        <h1 className="text-xl font-semibold text-gray-900  sm:text-2xl">
                            Adicionar Proprietario
                        </h1>
                    </div>
                    <div className="mt-7 flex w-full">
                        <form onSubmit={cadastrarProprietarioFormik.handleSubmit} className="flex w-full flex-col gap-5">
                            <div className="">
                                <div className="flex w-full flex-col gap-4">
                                    <TextField
                                        size="small"
                                        onChange={cadastrarProprietarioFormik.handleChange}
                                        onBlur={cadastrarProprietarioFormik.handleBlur}
                                        value={cadastrarProprietarioFormik.values.nome}
                                        error={cadastrarProprietarioFormik.errors.nome && cadastrarProprietarioFormik.touched.nome ? true : false}
                                        helperText={cadastrarProprietarioFormik.errors.nome && cadastrarProprietarioFormik.touched.nome && "Coloque um nome valido"}
                                        name="Nome"
                                        fullWidth
                                        label="Nome"
                                    />

                                    <TextField
                                        size="small"
                                        onChange={cadastrarProprietarioFormik.handleChange}
                                        onBlur={cadastrarProprietarioFormik.handleBlur}
                                        value={cadastrarProprietarioFormik.values.nuit}
                                        error={cadastrarProprietarioFormik.errors.nuit && cadastrarProprietarioFormik.touched.nuit ? true : false}
                                        helperText={cadastrarProprietarioFormik.errors.nuit && cadastrarProprietarioFormik.touched.nuit && "Coloque um NUIT valido"}
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
                                            cadastrarProprietarioFormik.setFieldValue("codigo_provincia", e.target.value)
                                        }}
                                        onBlur={cadastrarProprietarioFormik.handleBlur}
                                        value={cadastrarProprietarioFormik.values.codigo_provincia}
                                        error={cadastrarProprietarioFormik.errors.codigo_provincia && cadastrarProprietarioFormik.touched.codigo_provincia ? true : false}
                                        helperText={cadastrarProprietarioFormik.errors.codigo_provincia && cadastrarProprietarioFormik.touched.codigo_provincia && "Seleccione a Província"}
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
                                        onChange={cadastrarProprietarioFormik.handleChange}
                                        onBlur={cadastrarProprietarioFormik.handleBlur}
                                        value={cadastrarProprietarioFormik.values.codigo_distrito}
                                        error={cadastrarProprietarioFormik.errors.codigo_distrito && cadastrarProprietarioFormik.touched.codigo_distrito ? true : false}
                                        helperText={cadastrarProprietarioFormik.errors.codigo_distrito && cadastrarProprietarioFormik.touched.codigo_distrito && "Seleccione o Distrito!"}
                                        name="codigo_distrito"
                                        label="Distrito"
                                    >
                                        {distrito.map((option) => (
                                            <MenuItem key={option.codigo} value={option.codigo}>
                                                {option.designacao}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <TextField
                                        size="small"
                                        onChange={cadastrarProprietarioFormik.handleChange}
                                        onBlur={cadastrarProprietarioFormik.handleBlur}
                                        value={cadastrarProprietarioFormik.values.email}
                                        error={cadastrarProprietarioFormik.errors.email && cadastrarProprietarioFormik.touched.email ? true : false}
                                        helperText={cadastrarProprietarioFormik.errors.email && cadastrarProprietarioFormik.touched.email && "Coloque um contacto válido"}
                                        name="Contacto"
                                        fullWidth
                                        label="Contacto do proprietario"
                                    />

                                    <TextField
                                        size="small"
                                        onChange={cadastrarProprietarioFormik.handleChange}
                                        onBlur={cadastrarProprietarioFormik.handleBlur}
                                        value={cadastrarProprietarioFormik.values.msisdn}
                                        error={cadastrarProprietarioFormik.errors.msisdn && cadastrarProprietarioFormik.touched.msisdn ? true : false}
                                        helperText={cadastrarProprietarioFormik.errors.msisdn && cadastrarProprietarioFormik.touched.msisdn && "Coloque um numero de documento"}
                                        name="numero_documento"
                                        fullWidth
                                        label="Número de documento"
                                    />
                                
                                </div>
                            </div>
                            <LoadingButton type="submit" variant="contained" loading={cadastrarProprietarioFormik.isSubmitting} disableElevation={true} disabled={!cadastrarProprietarioFormik.isValid}>
                                Cadastrar Proprietario
                            </LoadingButton>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default CadastrarProprietario;