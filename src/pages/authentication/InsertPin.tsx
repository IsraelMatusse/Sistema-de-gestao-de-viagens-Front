/* eslint-disable jsx-a11y/anchor-is-valid */
import { TextField } from "@mui/material";
import { Button, Card } from "flowbite-react";
import type { FC } from "react";
import { useFormik } from "formik"
import * as Yup from "yup";

const InsertPin: FC = function () {

    const schema = Yup.object().shape({
        username: Yup.string().email("O email inserido não é válido!").required("O email é obrigatório!"),
        password: Yup.string().required("A senha é obrigatória!")
    });

    const formik = useFormik({
        initialValues: {
            username: null,
        },
        validationSchema: schema,
        onSubmit: (values) => {
            console.log(values)
        },
    });

    return (
        <div className="flex flex-col items-center justify-center px-6 py-7 lg:gap-y-6">
            <Card
                horizontal
                imgSrc=""
                imgAlt=""
                className="w-full md:max-w-screen-lg md:[&>*]:w-full md:[&>*]:p-16 [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 lg:[&>img]:block"
            >
                <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
                    Esqueceu a senha
                </h1>
                <p className="text-sm text-gray-400">Para recuperar a sua senha insira o seu email. Nós enviaremos um pin com 4 digitos para o seu email.</p>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4 flex flex-col gap-y-3">
                        <TextField
                            id="username"
                            name="username"
                            size="small"
                            placeholder="nome@empresa.com"
                            type="email"
                            label="Email"
                            error={formik.errors.username && formik.touched.username ? true : false}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText={formik.errors.username && formik.touched.username && formik.errors.username}
                        />
                    </div>
                    <div className="mb-7">
                        <Button type="submit" className="w-full">
                            Recuperar
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default InsertPin;
