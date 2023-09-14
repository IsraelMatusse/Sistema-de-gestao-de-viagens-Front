import { ButtonGroup, MenuItem, TextField } from "@mui/material";
import { Button, Modal } from "flowbite-react";
import { FC, useEffect, useState } from "react";
import { HiOutlineClipboardCheck, HiOutlineDocumentAdd } from "react-icons/hi";
import * as Yup from "yup";
import { PHONEREGEX } from "../../util/PhoneRegex";
import { useFormik } from "formik";
import { GET } from "../../data/client/httpclient";
import { API_ENDPOINTS } from "../../data/client/Endpoints";
import { error_client_side, success_server_side } from "../../util/Notifications";
import { LoadingButton } from "@mui/lab";
import { Genero } from "../../models/Genero";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DetalhesViagem = function () {

    return (
        <>
            <div className="relative z-10 mt-7 block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
                <div className="mb-1 w-full">
                    <div className="mb-4">
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                            Detalhes da Viagem
                        </h1>
                    </div>
                    <div className="sm:flex">

                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <PassageiroModal />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

const PassageiroModal: FC = function () {
    const [isOpen, setOpen] = useState(false);

    const [generos, setGeneros] = useState<Genero[]>([])

    const cadastroPassageiroSchema = Yup.object().shape({
        nome: Yup.string().required(),
        apelido: Yup.string().required(),
        data_nascimento: Yup.string().required(),
        bairro: Yup.string().required(),
        email: Yup.string().email().required(),
        codigo_provincia: Yup.string().required(),
        codigo_distrito: Yup.string().required(),
        numero_documento: Yup.string().required(),
        id_genero: Yup.number().required(),
        msisdn: Yup.string().matches(PHONEREGEX),
        id_tipo_documento: Yup.number().required(),
        data_validade: Yup.string().required(),
        designacao: Yup.string().required(),
        peso: Yup.number().required(),
        codigo_viagem: Yup.string().required(),
    })

    const cadastroPassageiroFormik = useFormik({
        initialValues: {
            nome: null,
            apelido: null,
            data_nascimento: null,
            bairro: null,
            email: null,
            codigo_provincia: null,
            codigo_distrito: null,
            numero_documento: null,
            id_genero: null,
            msisdn: null,
            id_tipo_documento: null,
            data_validade: null,
            designacao: null,
            peso: null,
            codigo_viagem: null,
        }, validationSchema: cadastroPassageiroSchema,
        onSubmit(values, { setSubmitting, resetForm }) {
            cadastroPassageiroPost(values, setSubmitting, resetForm)
        },
    })

    const cadastroPassageiroPost = (values, SetSubmitting, resetForm) => {
        GET(API_ENDPOINTS.CADASTRAR_PASSAGEIRO_VIAGEM, values)
            .then(() => {
                success_server_side("Passageiro Cadastrado")
                resetForm
                SetSubmitting(false)
            })
            .catch((err) => {
                SetSubmitting(false)
                error_client_side(err.response.data.data)
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


    useEffect(() => {
        getGeneros()
    }, [isOpen])
    return (
        <>
            <Button color="primary" onClick={() => setOpen(true)}>
                <div className="flex items-center gap-x-2">
                    <HiOutlineDocumentAdd className="text-lg" />
                    Cadastrar Passageiro
                </div>
            </Button>

            <div >
                <Modal onClose={() => setOpen(false)} show={isOpen} size="md" >
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




                                    <div className="mt-10 flex justify-end align-bottom">
                                        <ButtonGroup
                                            variant="contained"
                                            aria-label="Disabled elevation buttons"
                                        >

                                            <LoadingButton disabled={!cadastroPassageiroFormik.isValid} type="submit" variant="contained" loading={cadastroPassageiroFormik.isSubmitting} endIcon={<HiOutlineClipboardCheck />} > Candidatar-se   </LoadingButton>
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



export default DetalhesViagem