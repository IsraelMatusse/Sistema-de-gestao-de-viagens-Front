/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from "@mantine/core";
import axios from "axios";
import { Card } from "flowbite-react";
import { Formik } from "formik";
import type { FC } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { BASE_URL } from "../../util/URL";
import { error_server_side, success_server_side } from "../../util/Notifications";
import { TextField } from "@mui/material";

const SignUpPage: FC = function () {

  const navigate = useNavigate()

  const schema = Yup.object().shape({
    username: Yup.string().email("O email inserido não é válido!").required("O email é obrigatório!"),
    password: Yup.string().required("A senha é obrigatória!"),
    confimPassword: Yup.string().required("A confirmação da senha é obrigatória!").oneOf([Yup.ref('password')], 'A senhas devem ser iguais!')
  });

  const logon = (values: any, setSubmitting: any) => {
    axios.post(`${BASE_URL}/auth/registrar`, values).then(() => {
      setSubmitting(false)
      success_server_side("A sua conta foi criada com sucesso! Continue com o login.")
      navigate("/")
    }).catch((err) => {
      setSubmitting(false)
      console.log(err)
      error_server_side("Ocorreu um erro, por favor tente novamente!")
    })
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-7 lg:gap-y-6">
      <Card
        horizontal
        imgSrc="/images/authentication/create-account.jpg"
        imgAlt=""
        className="w-full md:max-w-screen-lg md:[&>*]:w-full md:[&>*]:p-16 [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0"
      >
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
          Criar uma nova conta
        </h1>
        <Formik
          initialValues={{
            username: null,
            password: null,
            confimPassword: null
          }}
          onSubmit={(values, { setSubmitting }) => {
            logon(values, setSubmitting);
          }}
          validationSchema={schema}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            errors,
            touched,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="mb-4 flex flex-col gap-y-3">
                <TextField
                  size="small"
                  id="username"
                  name="username"
                  placeholder="nome@empresa.com"
                  type="email"
                  label="Email"
                  error={errors.username && touched.username ? true : false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.username && touched.username && <span>{errors.username}</span>}
                />
              </div>
              <div className="mb-4 flex flex-col gap-y-3">
                <TextField
                  size="small"
                  id="password"
                  name="password"
                  type="password"
                  label="Senha"
                  error={errors.password && touched.password ? true : false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.password && touched.password && <span>{errors.password}</span>}
                />
              </div>
              <div className="mb-6 flex flex-col gap-y-3">
                <TextField
                  size="small"
                  id="confimPassword"
                  name="confimPassword"
                  type="password"
                  label="Confirmação da Senha"
                  error={errors.confimPassword && touched.confimPassword ? true : false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.confimPassword && touched.confimPassword && <span>{errors.confimPassword}</span>}
                />
              </div>
              <div className="mb-7">
                <Button disabled={errors.username || errors.password ? true : false} type="submit" className="w-full bg-primary-500" loading={isSubmitting ? true : false}>
                  Criar Conta
                </Button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Já possui uma conta?&nbsp;
                <a href="/" className="text-primary-600 dark:text-primary-200">
                  Entrar
                </a>
              </p>
            </form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default SignUpPage;
