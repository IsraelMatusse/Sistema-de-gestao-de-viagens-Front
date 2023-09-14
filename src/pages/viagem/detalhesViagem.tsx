import { TextField } from "@mui/material";
import { Button, Modal } from "flowbite-react";
import { FC, useState } from "react";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import * as Yup from "yup"
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

    const cadastroPassageiroSchema = Yup.object().shape({
        nome: Yup.string().required(),
    })


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
                    <Modal.Header className="mt-40 px-6 pb-0 pt-6">
                        <span className="sr-only">Cadastrar Passageiro</span>
                    </Modal.Header>
                    <Modal.Body className="px-6 pt-0 pb-6">
                        <div className="flex flex-col items-center gap-y-6 text-center">
                            {
                                /**
                                 * <form onSubmit={requisitarMatriculaAdd.handleSubmit}>
                                <h1 className="mb-3 text-center text-xl font-semibold dark:text-white md:text-3xl">
                                    Escolha a Instituição e o Curso
                                </h1>
                                <div className="flex flex-col gap-4">


                                    <TextField
                                        id="outlined-select-currency"
                                        size="small"
                                        select
                                        fullWidth
                                        onChange={(event) => {
                                            requisitarMatriculaAdd.setFieldValue("codigo_sucursal", event.target.value)
                                            getCursosSucursal(event.target.value);

                                        }}
                                        onBlur={requisitarMatriculaAdd.handleBlur}
                                        value={requisitarMatriculaAdd.values.codigo_sucursal}
                                        name="codigo_sucursal"
                                        label="Instituição pretendida"
                                    >
                                        {sucursaisSup.map((option: Sucursal) => (
                                            <MenuItem key={option.id} value={option.codigo_instituicao}>
                                                {option.designacao}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <TextField
                                        id="outlined-select-currency"
                                        size="small"
                                        select
                                        fullWidth
                                        onChange={(event) => {
                                            requisitarMatriculaAdd.setFieldValue("codigo_curso", event.target.value)
                                            getDisciplinasCurso(event.target.value);

                                        }}
                                        onBlur={requisitarMatriculaAdd.handleBlur}
                                        value={requisitarMatriculaAdd.values.codigo_curso}
                                        name="codigo_curso"
                                        label="Curso pretendido"
                                    >
                                        {cursosSucursal.map((option: Curso) => (
                                            <MenuItem key={option.codigo_curso} value={option.codigo_curso}>
                                                {option.designacao_curso}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                </div>
                                {requisitarMatriculaAdd.values.codigo_curso !== null && <div className="my-4">
                                    <Table className="divide-gray-200 dark:divide-gray-600 md:min-w-full divide-y">
                                        <Table.Head className=" w-fit bg-gray-100 dark:bg-gray-700">
                                            <Table.HeadCell>Disciplinas para Exames de Admissão</Table.HeadCell>
                                        </Table.Head>
                                        <Table.Body className="divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800 divide-y">
                                            {disciplinaAdmissao.map((disciplinaAdmissao: DisciplinaCurso) =>

                                                <Table.Row key={disciplinaAdmissao.disciplina_designacao} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                                                        {disciplinaAdmissao.disciplina_designacao}
                                                    </Table.Cell>
                                                </Table.Row>
                                            )}
                                        </Table.Body>
                                    </Table>

                                </div>}


                                <div className="flex flex-row gap-2 my-4">

                                    <TextField
                                        id="outlined-select-currency"
                                        size="small"
                                        select
                                        fullWidth
                                        onChange={requisitarMatriculaAdd.handleChange}
                                        onBlur={requisitarMatriculaAdd.handleBlur}
                                        value={requisitarMatriculaAdd.values.codigo_provincia_exame}
                                        error={requisitarMatriculaAdd.errors.codigo_provincia_exame && requisitarMatriculaAdd.touched.codigo_provincia_exame ? true : false}
                                        helperText={requisitarMatriculaAdd.errors.codigo_provincia_exame && requisitarMatriculaAdd.touched.codigo_provincia_exame && "Selecione a província para frequência!"}
                                        name="codigo_provincia_exame"
                                        label="Provincia para frequência"
                                    >
                                        {provincias.map((option: Provincia) => (
                                            <MenuItem key={option.id} value={option.codigo}>
                                                {option.designacao}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                </div>
                                <div className="flex justify-end align-bottom mt-10">
                                    <ButtonGroup
                                        variant="contained"
                                        aria-label="Disabled elevation buttons"
                                    >

                                        <LoadingButton disabled={!requisitarMatriculaAdd.isValid} type="submit" variant="contained" loading={requisitarMatriculaAdd.isSubmitting} endIcon={<HiOutlineClipboardCheck />} > Candidatar-se   </LoadingButton>
                                    </ButtonGroup>

                                </div>
                            </form>
                                 */
                            }
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
};



export default DetalhesViagem