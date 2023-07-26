/* eslint-disable jsx-a11y/anchor-is-valid */
import { Card } from "flowbite-react";
import { Formik } from "formik"
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { error_client_side } from "../../util/Notifications"
import { Button } from '@mantine/core';
import { IconLogin } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { userLogged } from "../../components/navbar";
import { TextField } from "@mui/material";
import { POST } from "../../data/client/http-client";
import { API_ENDPOINTS } from "../../data/client/endpoint";
import jwt_decode from "jwt-decode";

const LoginPage = function () {
  const [isUserLogged, setIsUserLogged] = useAtom(userLogged)

  const navigate = useNavigate()

  const schema = Yup.object().shape({
    username: Yup.string().email("O email inserido não é válido!").required("O email é obrigatório!"),
    password: Yup.string().required("A senha é obrigatória!")
  });

  const login = (values: any, setSubmitting: any) => {
    POST(API_ENDPOINTS.LOGIN, values, false)
      .then((res) => {
        setSubmitting(false)
        const token: string = res.data.data.access_token
        const decoded: any = jwt_decode(token);

        if (decoded.roles[0].authority == 'ROLE_ADMIN') {
          localStorage.setItem('token', token);
          setIsUserLogged(isUserLogged + 1)
          navigate("sgv/inicio")
        } else if (decoded.roles[0].authority == 'ROLE_TERMINAL') {
          localStorage.setItem('token', token);
          setIsUserLogged(isUserLogged + 1)
          navigate("sgv/inicio")
        }

        else {
          error_client_side("Esta conta não pode acessar essa plataforma")
        }
      }).catch((err) => {
        error_client_side("Credênciais invalidas")
        console.log(err)
        setSubmitting(false)
      })


  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center px-6 py-5">
        <Card
          horizontal
          imgSrc="/images/authentication/login.jpg"
          imgAlt=""
          className="w-full md:max-w-screen-lg md:[&>*]:w-full md:[&>*]:p-16 [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 "
        >
          <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
            Entrar
          </h1>
          <Formik
            initialValues={{
              username: null,
              password: null
            }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
              login(values, setSubmitting)
            }}
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
                    label="Email"
                    placeholder="nome@exemplo.com"
                    type="email"
                    error={errors.username && touched.username ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.username && touched.username && <span>{errors.username}</span>}
                  />
                </div>
                <div className="mb-6 flex flex-col gap-y-3">
                  <TextField
                    size="small"
                    id="password"
                    name="password"
                    type="password"
                    label="Senha"
                    className="focus:border focus:ring-2"
                    error={errors.password && touched.password ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.password && touched.password && <span>{errors.password}</span>}
                  />
                </div>
                <div className="mb-6 flex items-center justify-between">

                  <a
                    href="/esqueci-senha"
                    className="w-1/2 text-sm text-primary-600 dark:text-primary-300"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
                <div className="mb-6">
                  <Button disabled={errors.username || errors.password ? true : false} loading={isSubmitting ? true : false} type="submit" className="w-full bg-primary-500" leftIcon={<IconLogin size="1rem" />} >
                    Entrar
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
