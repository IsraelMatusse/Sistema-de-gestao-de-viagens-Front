import { ButtonGroup, MenuItem, TextField } from "@mui/material";
import { Button, Modal, Table } from "flowbite-react";
import { FC, useEffect, useState } from "react";
import { HiOutlineClipboardCheck, HiOutlineDocumentAdd } from "react-icons/hi";
import * as Yup from "yup";
import { PHONEREGEX } from "../../util/PhoneRegex";
import { useFormik } from "formik";
import { GET, POST } from "../../data/client/httpclient";
import { API_ENDPOINTS } from "../../data/client/Endpoints";
import { error_client_side, success_server_side } from "../../util/Notifications";
import { LoadingButton } from "@mui/lab";
import { Genero } from "../../models/Genero";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TipoDocumento } from "../../models/TipoDocumento";
import { Provincias } from "../../models/Provincias";
import { Distrito } from "../../models/Distrito";
import { useParams } from "react-router";
import LoadingScreen from "../../components/loadingScreen";
import { Viagem } from "../../models/Viagem";
import { Viajante } from "../../models/Viajante";

const DetalhesViagem = function () {
    const [loading, setLoading] = useState(true)
    const { codigo } = useParams();
    const [detalhesViagem, setDetalhesViagem] = useState<Viagem>();
    const [viajantes, setViajantes] = useState<Viajante[]>([]);

    const getDetalhesViagem = (codigo_viagem) => {
        GET(API_ENDPOINTS.DETALHES_DA_VIAGEM(codigo_viagem), true)
            .then((res) => {
                setDetalhesViagem(res.data.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getViajantes = (codigo_viagem) => {
        GET(API_ENDPOINTS.VIAJANTES_DA_VIAGEM(codigo_viagem), true)
            .then((res) => {
                setViajantes(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getDetalhesViagem(codigo);
        getViajantes(codigo)
    }, [codigo])




    return (
        <div>
            <div className="relative z-10 mt-7 block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
                <div className="mb-1 w-full">
                    <div className="mb-4">
                        <h1 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                            Detalhes da Viagem:
                        </h1>
                        <div className="m-auto mt-10 grid grid-cols-1 items-end  ">
                            <div className="">
                                <p><span className="font-semibold">Destino: </span> <span className=" italic"> {detalhesViagem?.destino_viagem} </span></p>
                                <p><span className="font-semibold">Partida: </span> <span className=" italic"> {detalhesViagem?.saida} </span></p>
                                <p><span className="font-semibold">Previsão de chegada: </span> <span className=" italic"> {detalhesViagem?.prev_chegada} </span> </p>

                            </div>


                        </div>
                    </div>
                    <div className="flex justify-start">

                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <PassageiroModal />
                        </div>

                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow">

                            {!loading ? <PassageirosTable viajantes={viajantes} /> : <LoadingScreen />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const PassageiroModal: FC = function () {
    const [isOpen, setOpen] = useState(false);
    const [generos, setGeneros] = useState<Genero[]>([])
    const [tipoDocumento, setTipoDocumento] = useState<TipoDocumento[]>([])
    const [provincia, setProvincia] = useState<Provincias[]>([])
    const [distrito, setDistrito] = useState<Distrito[]>([])

    const { codigo } = useParams()


    const cadastroPassageiroSchema = Yup.object().shape({
        nome: Yup.string().required(""),
        bairro: Yup.string().required(""),
        codigo_distrito: Yup.string().required(""),
        codigo_provincia: Yup.string().required(""),
        data_nascimento: Yup.string().required(""),
        data_validade: Yup.string().required(""),
        apelido: Yup.string().required(""),
        email: Yup.string().email().required(""),
        numero_documento: Yup.string().required(""),
        id_genero: Yup.number().required(""),
        msisdn: Yup.string().matches(PHONEREGEX, ""),
        id_tipo_documento: Yup.number().required(""),
        designacao: Yup.string().required(""),
        peso: Yup.number().required(""),
        codigo_viagem: Yup.string().required(""),
        contacto_emergencia:Yup.string().matches(PHONEREGEX, "")
    })

    const cadastroPassageiroFormik = useFormik({
        initialValues: {
            nome: null, //
            apelido: null,//
            data_nascimento: null,//
            bairro: null,//
            email: null,//
            codigo_provincia: null,//
            codigo_distrito: null,//
            numero_documento: null,//
            id_genero: null,//
            msisdn: null,//
            id_tipo_documento: null,//
            data_validade: null,//
            designacao: null,//
            peso: null,//
            codigo_viagem: codigo,//
            contacto_emergencia:null//
        }, validationSchema: cadastroPassageiroSchema,
        onSubmit(values, { setSubmitting, resetForm }) {
            cadastroPassageiroPost(values, setSubmitting, resetForm)
            console.log("yuu")
        },
    })

    const cadastroPassageiroPost = (values: any, SetSubmitting: any, resetForm: any) => {

        POST(API_ENDPOINTS.CADASTRAR_PASSAGEIRO_VIAGEM, values, true)
            .then(() => {
                success_server_side("Passageiro Cadastrado")
                resetForm
                SetSubmitting(false)
            })
            .catch((err) => {
                SetSubmitting(false)
                error_client_side(err.response.data.data)
                console.log(err)
            })
    }

    const getGeneros = () => {
        GET(API_ENDPOINTS.LISTAR_GENEROS, true)
            .then((res) => {
                setGeneros(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getTipoDocumento = () => {
        GET(API_ENDPOINTS.TIPO_DOCUMENTO, true)
            .then((res) => {
                setTipoDocumento(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getProvicia = () => {
        GET(API_ENDPOINTS.LISTAR_PROVINCIAS, true)
            .then((res) => {
                setProvincia(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getDistrito = (codigo_provincia: any) => {
        GET(API_ENDPOINTS.LISTAR_DISTRITOS_DA_PROVINCIA(codigo_provincia), true)
            .then((res) => {
                setDistrito(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    useEffect(() => {
        getGeneros()
        getTipoDocumento()
        getProvicia()

    }, [isOpen])

    useEffect(() => {
        cadastroPassageiroFormik.setFieldValue("codigo_viagem", codigo)
    }, [codigo])

    return (
        <>
            <Button color="primary" onClick={() => setOpen(true)}>
                <div className="flex items-center gap-x-2">
                    <HiOutlineDocumentAdd className="text-lg" />
                    Cadastrar Passageiro
                </div>
            </Button>

            <div >
                <Modal onClose={() => setOpen(false)} show={isOpen} size="xl" >
                    <Modal.Header className="mt-40 px-4 pb-0 pt-6">
                        <span className="sr-only">Cadastrar Passageiro</span>
                    </Modal.Header>
                    <Modal.Body className="px-4 pb-6 pt-0">
                        <div className="flex flex-col items-center gap-y-6 text-center">

                            <form onSubmit={cadastroPassageiroFormik.handleSubmit}>
                                <h1 className="mb-3 text-center text-xl font-semibold dark:text-white md:text-3xl">
                                    Cadastrar
                                </h1>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-row gap-4">

                                        <div className="flex basis-2/4">
                                            <TextField
                                                id="outlined-select-currency"
                                                size="small"
                                                fullWidth
                                                onChange={cadastroPassageiroFormik.handleChange}
                                                onBlur={cadastroPassageiroFormik.handleBlur}
                                                value={cadastroPassageiroFormik.values.nome}
                                                error={cadastroPassageiroFormik.errors.nome && cadastroPassageiroFormik.touched.nome ? true : false}
                                                helperText={cadastroPassageiroFormik.errors.nome && cadastroPassageiroFormik.touched.nome && "Introduza o seu nome"}
                                                name="nome"
                                                label="Nome"

                                            />
                                        </div>

                                        <div className="flex basis-2/4">
                                            <TextField
                                                id="outlined-select-currency"
                                                size="small"
                                                fullWidth
                                                onChange={cadastroPassageiroFormik.handleChange}
                                                onBlur={cadastroPassageiroFormik.handleBlur}
                                                value={cadastroPassageiroFormik.values.apelido}
                                                error={cadastroPassageiroFormik.errors.apelido && cadastroPassageiroFormik.touched.apelido ? true : false}
                                                helperText={cadastroPassageiroFormik.errors.apelido && cadastroPassageiroFormik.touched.apelido && "Introduza o seu apelido"}
                                                name="apelido"
                                                label="Apelido"

                                            />
                                        </div>

                                    </div>

                                    <div className="flex flex-row gap-4">

                                        <div className="flex basis-2/4">
                                            <TextField
                                                id="outlined-select-currency"
                                                size="small"
                                                select
                                                fullWidth
                                                onChange={cadastroPassageiroFormik.handleChange}
                                                onBlur={cadastroPassageiroFormik.handleBlur}
                                                value={cadastroPassageiroFormik.values.id_genero}
                                                error={cadastroPassageiroFormik.errors.id_genero && cadastroPassageiroFormik.touched.id_genero ? true : false}
                                                helperText={cadastroPassageiroFormik.errors.id_genero && cadastroPassageiroFormik.touched.id_genero && "Selecione o género"}
                                                name="id_genero"
                                                label="Genero"
                                            >
                                                {generos.map((option: Genero) => (
                                                    <MenuItem key={option.id} value={option.id}>
                                                        {option.designacao}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>

                                        <div className="flex basis-2/4">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                                                <DatePicker

                                                    label="Data de Nascimento"
                                                    format="DD-MM-YYYY"
                                                    slotProps={{ textField: { size: 'small' } }}
                                                    onChange={(newValue: any) => {
                                                        const data_nascimento = newValue.$d.toISOString();
                                                        cadastroPassageiroFormik.setFieldValue("data_nascimento", data_nascimento)
                                                    }}
                                                />

                                            </LocalizationProvider>
                                        </div>

                                    </div>


                                    <div className="flex flex-row gap-4">
                                        <div className="flex basis-1/4">
                                            <TextField
                                                select
                                                id="outlined-select-currency"
                                                size="small"
                                                fullWidth
                                                onChange={cadastroPassageiroFormik.handleChange}
                                                onBlur={cadastroPassageiroFormik.handleBlur}
                                                value={cadastroPassageiroFormik.values.id_tipo_documento}
                                                error={cadastroPassageiroFormik.errors.id_tipo_documento && cadastroPassageiroFormik.touched.id_tipo_documento ? true : false}
                                                helperText={cadastroPassageiroFormik.errors.id_tipo_documento && cadastroPassageiroFormik.touched.id_tipo_documento && "Selecione o tipo de documento "}
                                                name="id_tipo_documento"
                                                label="Tipo de Documento"
                                            >
                                                {tipoDocumento.map((option: TipoDocumento) => (
                                                    <MenuItem key={option.id} value={option.id}>
                                                        {option.abreviatura}
                                                    </MenuItem>
                                                ))}

                                            </TextField>

                                        </div>

                                        <div className="flex basis-2/4">
                                            <TextField

                                                id="outlined-select-currency"
                                                size="small"
                                                fullWidth
                                                onChange={cadastroPassageiroFormik.handleChange}
                                                onBlur={cadastroPassageiroFormik.handleBlur}
                                                value={cadastroPassageiroFormik.values.numero_documento}
                                                error={cadastroPassageiroFormik.errors.numero_documento && cadastroPassageiroFormik.touched.numero_documento ? true : false}
                                                helperText={cadastroPassageiroFormik.errors.numero_documento && cadastroPassageiroFormik.touched.numero_documento && "Insira o número do documento"}
                                                name="numero_documento"
                                                label="Número do Documento"
                                            />
                                        </div>

                                        <div className="flex">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                                                <DatePicker

                                                    label="Data de Validade"
                                                    format="DD-MM-YYYY"
                                                    slotProps={{ textField: { size: 'small' } }}
                                                    onChange={(newValue: any) => {
                                                        const data_validade = newValue.$d.toISOString();
                                                        cadastroPassageiroFormik.setFieldValue("data_validade", data_validade)
                                                    }}
                                                />

                                            </LocalizationProvider>
                                        </div>

                                    </div>



                                    <div className="flex flex-row gap-4">
                                        <div className="flex basis-1/4">
                                            <TextField
                                                select
                                                id="outlined-select-currency"
                                                size="small"
                                                fullWidth
                                                onChange={(e) => {
                                                    getDistrito(e.target.value)
                                                    cadastroPassageiroFormik.setFieldValue("codigo_provincia", e.target.value)
                                                }}
                                                onBlur={cadastroPassageiroFormik.handleBlur}
                                                value={cadastroPassageiroFormik.values.codigo_provincia}
                                                error={cadastroPassageiroFormik.errors.codigo_provincia && cadastroPassageiroFormik.touched.codigo_provincia ? true : false}
                                                helperText={cadastroPassageiroFormik.errors.codigo_provincia && cadastroPassageiroFormik.touched.codigo_provincia && "Insira o codigo da provincia"}
                                                name="codigo_provincia"
                                                label="Província de Residência"
                                            >
                                                {provincia.map((option: Provincias) => (
                                                    <MenuItem key={option.codigo} value={option.codigo}>
                                                        {option.sigla}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>

                                        <div className="flex basis-2/4">
                                            <TextField
                                                select
                                                id="outlined-select-currency"
                                                size="small"
                                                fullWidth
                                                onChange={cadastroPassageiroFormik.handleChange}
                                                onBlur={cadastroPassageiroFormik.handleBlur}
                                                value={cadastroPassageiroFormik.values.codigo_distrito}
                                                error={cadastroPassageiroFormik.errors.codigo_distrito && cadastroPassageiroFormik.touched.codigo_distrito ? true : false}
                                                helperText={cadastroPassageiroFormik.errors.codigo_distrito && cadastroPassageiroFormik.touched.codigo_distrito && "Insira o codigo da provincia"}
                                                name="codigo_distrito"
                                                label="Distrito de Residência"
                                            >
                                                {distrito.map((option: Distrito) => (
                                                    <MenuItem key={option.codigo} value={option.codigo}>
                                                        {option.designacao}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>

                                        <div className="flex ">
                                            <TextField
                                                id="outlined-select-currency"
                                                size="small"
                                                fullWidth
                                                onChange={cadastroPassageiroFormik.handleChange}
                                                onBlur={cadastroPassageiroFormik.handleBlur}
                                                value={cadastroPassageiroFormik.values.bairro}
                                                error={cadastroPassageiroFormik.errors.bairro && cadastroPassageiroFormik.touched.bairro ? true : false}
                                                helperText={cadastroPassageiroFormik.errors.bairro && cadastroPassageiroFormik.touched.bairro && "Insira o bairro"}
                                                name="bairro"
                                                label="Bairro de Residência"
                                            />
                                        </div>
                                    </div>



                                    <div className="flex flex-row gap-4">
                                        <div className="flex basis-2/4">
                                            <TextField

                                                id="outlined-select-currency"
                                                size="small"
                                                fullWidth
                                                onChange={cadastroPassageiroFormik.handleChange}
                                                onBlur={cadastroPassageiroFormik.handleBlur}
                                                value={cadastroPassageiroFormik.values.peso}
                                                error={cadastroPassageiroFormik.errors.peso && cadastroPassageiroFormik.touched.peso ? true : false}
                                                helperText={cadastroPassageiroFormik.errors.peso && cadastroPassageiroFormik.touched.peso && "Insira o peso da carga"}
                                                name="peso"
                                                label="Peso da Carga"
                                            />
                                        </div>

                                        <div className="flex basis-2/4">
                                            <TextField
                                                id="outlined-select-currency"
                                                size="small"
                                                fullWidth
                                                onChange={cadastroPassageiroFormik.handleChange}
                                                onBlur={cadastroPassageiroFormik.handleBlur}
                                                value={cadastroPassageiroFormik.values.designacao}
                                                error={cadastroPassageiroFormik.errors.designacao && cadastroPassageiroFormik.touched.designacao ? true : false}
                                                helperText={cadastroPassageiroFormik.errors.designacao && cadastroPassageiroFormik.touched.designacao && "Insira a designação da carga"}
                                                name="designacao"
                                                label="Designação da carga"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-row gap-4">

                                        <div className="flex basis-2/4">
                                            <TextField
                                                id="outlined-select-currency"
                                                size="small"
                                                fullWidth
                                                onChange={cadastroPassageiroFormik.handleChange}
                                                onBlur={cadastroPassageiroFormik.handleBlur}
                                                value={cadastroPassageiroFormik.values.msisdn}
                                                error={cadastroPassageiroFormik.errors.msisdn && cadastroPassageiroFormik.touched.msisdn ? true : false}
                                                helperText={cadastroPassageiroFormik.errors.msisdn && cadastroPassageiroFormik.touched.msisdn && "Insira o número de celular"}
                                                name="msisdn"
                                                label="Celular"
                                            />
                                        </div>

                                        <div className="flex basis-2/4">
                                            <TextField
                                                size="small"
                                                onChange={cadastroPassageiroFormik.handleChange}
                                                onBlur={cadastroPassageiroFormik.handleBlur}
                                                value={cadastroPassageiroFormik.values.email}
                                                error={cadastroPassageiroFormik.errors.email && cadastroPassageiroFormik.touched.email ? true : false}
                                                helperText={cadastroPassageiroFormik.errors.email && cadastroPassageiroFormik.touched.email && "Coloque um e-mail válido"}
                                                name="email"
                                                fullWidth
                                                label="E-mail"
                                            />
                                        </div>

                                        <div className="flex basis-2/4">
                                            <TextField
                                                size="small"
                                                onChange={cadastroPassageiroFormik.handleChange}
                                                onBlur={cadastroPassageiroFormik.handleBlur}
                                                value={cadastroPassageiroFormik.values.contacto_emergencia}
                                                error={cadastroPassageiroFormik.errors.contacto_emergencia && cadastroPassageiroFormik.touched.email ? true : false}
                                                helperText={cadastroPassageiroFormik.errors.contacto_emergencia && cadastroPassageiroFormik.touched.email && "Introsuza um contacto valido"}
                                                name="contacto_emergencia"
                                                fullWidth
                                                label="Contacto de Emergencia"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-10 flex justify-end align-bottom">
                                        <ButtonGroup
                                            variant="contained"
                                            aria-label="Disabled elevation buttons"
                                        >

                                            <LoadingButton disabled={!cadastroPassageiroFormik.isValid} type="submit" variant="contained" loading={cadastroPassageiroFormik.isSubmitting} endIcon={<HiOutlineClipboardCheck />} > Cadastrar  </LoadingButton>
                                        </ButtonGroup>

                                    </div>

                                </div>
                            </form>


                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
};

const PassageirosTable: FC = function ({ viajantes }) {

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
    )

}



export default DetalhesViagem