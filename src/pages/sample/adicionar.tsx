/* eslint-disable tailwindcss/no-custom-classname */
import {
    Breadcrumb,
} from "flowbite-react";
import {
    HiHome,
} from "react-icons/hi";
import { Chip, Divider, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { Group, Text, useMantineTheme, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from "axios";
import { BASE_URL } from "../../util/URL";
import { success_server_side } from "../../util/Notifications";

interface Provincia {
    id: number,
    nome: string,
}

interface Distrito {
    id: number,
    nome: string,
}


export default function AddSample() {
    const theme = useMantineTheme();
    const [provincias, setProvincias] = useState<Provincia[]>([]);
    const [distritos, setDistritos] = useState<Distrito[]>([]);


    // HANDLE DUPLICATES
    const [designacaoDup, setDesignacaoDup] = useState(false)
    const [siglaDup, setSiglaDup] = useState(false)
    const [emailDup, setEmailDup] = useState(false)
    const [webisteDup, setWebisteDup] = useState(false)


    const duplicatedFields = {
        designacao: "Já existe um sucursal com essa designação",
        sigla: "Já existe um sucursal com essa designação",
        email: "Já existe um sucursal com essa designação",
        website: "Já existe um sucursal com essa designação",
        nuit: "Já existe um sucursal com essa designação",
        titulo: "Já existe um sucursal com essa designação",
    }

    const adicionarSucursal = (values: any, setIsSubmitting: any, resetForm: any) => {
        axios.post(`${BASE_URL}/sucursais/adicionar`, values, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                "Content-Type": "multipart/form-data"
            }
        }).then(() => {
            setIsSubmitting(false)
            setWebisteDup(false);
            setSiglaDup(false);
            setDesignacaoDup(false);
            setEmailDup(false);
            resetForm()
            success_server_side("Sucursal adicionada com sucesso!")
        }).catch((err) => {
            const response = err.response.data;
            console.log(response)
            if (response.data.website) {
                setWebisteDup(true);
            }
            if (response.data.sigla) {
                setSiglaDup(true);
            }
            if (response.data.designacao) {
                setDesignacaoDup(true);
            }
            if (response.data.email) {
                setEmailDup(true);
            }
            setIsSubmitting(false)
        });
    }

    const schema = Yup.object().shape({
        designacao: Yup.string().required("A designacao da sucursal não pode ser nula!"),
        nuit: Yup.string().required("O nuit da sucursal não pode ser nulo!").min(9, 'O nuit deve ter pelo menos 9 dígitos')
            .max(9, 'O nuit deve ter no máximo 9 dígitos'),
        email: Yup.string().email("O email inserido não é válido!").required("O email da sucursal não pode ser nulo!"),
        website: Yup.string().notRequired(),
        endereco: Yup.string().required("O endereço da sucursal não pode ser nulo!"),
        titulo: Yup.string().required("O titulo da sucursal não pode ser nulo!"),
        sigla: Yup.string().required("A sigla da sucursal não pode ser nula!"),
        banner: Yup.mixed().test('is-image', 'O arquivo deve ser uma imagem.', (value: any) => {
            if (!value) return true; // do not fail if value is not provided
            return value?.type?.startsWith('image/');
        }).notRequired(),
        logotipoFile: Yup.mixed().test('is-image', 'O arquivo do logotipo deve ser uma imagem.', (value: any) => {
            if (!value) return true; // do not fail if value is not provided
            return value?.type?.startsWith('image/');
        }).notRequired(),
        idNivelEnsinoFK: Yup.object().shape({
            id: Yup.number().required(""),
        }),
        idRamoActividadeFK: Yup.object().shape({
            id: Yup.number().required(""),
        }),
        idSectorFK: Yup.object().shape({
            id: Yup.number().required(""),
        }),
        idProvinciaFK: Yup.object().shape({
            id: Yup.number().required(""),
        }),
        idDistritoFK: Yup.object().shape({
            id: Yup.number().required(""),
        }),
        idTipoSucursalFK: Yup.object().shape({
            id: Yup.number().required(""),
        }),
        idTipoEntidadeLegalFK: Yup.object().shape({
            id: Yup.number().required(""),
        }),
    });

    const formik = useFormik({
        initialValues: {
            designacao: null,
            nuit: null,
            email: null,
            website: null,
            endereco: null,
            titulo: null,
            sigla: null,
            banner: null,
            logotipoFile: null,
            idNivelEnsinoFK: {
                id: null
            },
            idRamoActividadeFK: {
                id: null
            },
            idSectorFK: {
                id: null
            },
            idProvinciaFK: {
                id: null
            },
            idDistritoFK: {
                id: null
            },
            idTipoSucursalFK: {
                id: null
            },
            idTipoEntidadeLegalFK: {
                id: null
            }
        },
        validationSchema: schema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            adicionarSucursal(values, setSubmitting, resetForm);
        },
    });




    return (
        <div>
            <div className="block items-center justify-between border-b border-gray-200 bg-white p-4">
                <div className="mb-1 w-full px-2">
                    <div className="mb-4">
                        <Breadcrumb className="mb-4">
                            <Breadcrumb.Item href="#">
                                <div className="flex items-center gap-x-3">
                                    <HiHome className="text-xl" />
                                    <span className="">Bem-Vindo</span>
                                </div>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <h1 className="text-xl font-semibold text-gray-900  sm:text-2xl">
                            Candidatar-se
                        </h1>
                        <p className="my-2 text-sm">Preencha a sua canditura para qualquer instituição de ensino.</p>
                    </div>
                    <div className="">
                        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
                            <Divider>
                                <Chip label="Designação e Nomenclatura" />
                            </Divider>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                                <div className="md:col-span-2">
                                    <TextField onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.designacao} error={formik.errors.designacao && formik.touched.designacao ? true : designacaoDup ? true : false}
                                        helperText={formik.errors.designacao && formik.touched.designacao ? formik.errors.designacao : designacaoDup ? duplicatedFields.designacao : null}
                                        name="designacao" fullWidth label="Designação" />
                                </div>
                                <div className="col-span-1">
                                    <TextField onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.sigla} error={formik.errors.sigla && formik.touched.sigla ? true : siglaDup ? true : false}
                                        helperText={formik.errors.sigla && formik.touched.sigla ? formik.errors.sigla : siglaDup ? duplicatedFields.sigla : null} type="sigla" name="sigla" fullWidth label="Sigla" />
                                </div>
                            </div>
                            <Divider>
                                <Chip label="Dados de Localização" />
                            </Divider>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                                <div>
                                    <TextField onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        value={formik.values.endereco} error={formik.errors.endereco && formik.touched.endereco ? true : false}
                                        helperText={formik.errors.endereco && formik.touched.endereco ? formik.errors.endereco : null} name="endereco" fullWidth label="Endereço" />
                                </div>
                                <div>
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        fullWidth
                                        error={formik.errors.idDistritoFK?.id && formik.touched.idDistritoFK?.id ? true : false}
                                        helperText={formik.errors.idDistritoFK?.id && formik.touched.idDistritoFK?.id ? formik.errors.idDistritoFK.id : "Seleccione a Provincia"}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.idProvinciaFK.id}
                                        name="idProvinciaFK"
                                        label="Provincia"
                                        defaultValue=""
                                    >
                                        {provincias.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.nome}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div>
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        fullWidth
                                        error={formik.errors.idDistritoFK?.id && formik.touched.idDistritoFK?.id ? true : false}
                                        helperText={formik.errors.idDistritoFK?.id && formik.touched.idDistritoFK?.id ? formik.errors.idDistritoFK.id : "Seleccione o distrito"}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.idDistritoFK.id}
                                        name="idDistritoFK"
                                        label="Distrito"
                                        defaultValue=""
                                    >
                                        {distritos.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.nome}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </div>
                            <Divider>
                                <Chip label="Contactos" />
                            </Divider>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <TextField onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        value={formik.values.email} error={formik.errors.email && formik.touched.email ? true : emailDup ? true : false}
                                        helperText={formik.errors.email && formik.touched.email ? formik.errors.email : emailDup ? duplicatedFields.email : null} type="email" name="email" fullWidth label="Email" />
                                </div>
                                <div>
                                    <TextField onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        value={formik.values.website} error={formik.errors.website && formik.touched.website ? true : webisteDup ? true : false}
                                        helperText={formik.errors.website && formik.touched.website ? formik.errors.website : webisteDup ? duplicatedFields.website : null} name="website" fullWidth label="Website" />
                                </div>
                                <div className="flex gap-2">
                                    <TextField error={false}
                                        helperText={""} name="contacto" fullWidth label="Contacto" />
                                </div>
                            </div>
                            <Divider>
                                <Chip label="Logotipos" />
                            </Divider>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
                                <div>
                                    <Dropzone
                                        onDrop={(files) => formik.setFieldValue("logotipoFile", files[0], true)}
                                        onReject={(files) => console.log('rejected files', files)}
                                        maxSize={3 * 1024 ** 2}
                                        maxFiles={1}
                                        accept={IMAGE_MIME_TYPE}
                                        loading={false}
                                    >
                                        <Group position="center" spacing="xl" style={{ minHeight: rem(220), pointerEvents: 'none' }}>
                                            <Dropzone.Accept>
                                                <IconUpload
                                                    size="3.2rem"
                                                    stroke={1.5}
                                                    color={'dark'}
                                                />
                                            </Dropzone.Accept>
                                            <Dropzone.Reject>
                                                <IconX
                                                    size="3.2rem"
                                                    stroke={1.5}
                                                    color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                                                />
                                            </Dropzone.Reject>
                                            <Dropzone.Idle>
                                                <IconPhoto size="3.2rem" stroke={1.5} />
                                            </Dropzone.Idle>

                                            <div>
                                                <Text size="xl" inline>
                                                    Arraste o logotipo para aqui ou clique aqui para adicionar                                                </Text>
                                                <Text size="sm" color="dimmed" inline mt={7}>
                                                    Adicione o logotipo da sua sucursal, o ficheiro tem um limite de 5mb
                                                </Text>
                                            </div>
                                        </Group>
                                    </Dropzone>
                                </div>
                            </div>
                            {/* Save to database */}
                            {/* <div className="my-1">
                                <span className="text-red-500">Por favor verifique os campos: Já existe uma sucursal com os elementos repetidos!</span>
                            </div> */}
                            <LoadingButton type="submit" onClick={formik.submitForm} variant="contained" loading={false} disabled={false} >Adicionar</LoadingButton>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}