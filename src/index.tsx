/* eslint-disable no-unused-vars */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import theme from "./flowbite-theme";
import { Flowbite } from "flowbite-react";
import Layout from "./pages/Layout";
import LoginPage from "./pages/authentication/LoginPage";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { blue } from "@mui/material/colors";
import Home from "./pages/home/home";
import NotFoundPage from "./pages/Not-Found";
import CadastrarViagem from "./pages/viagem/CadastrarViagem";
import CadastrarAssociacao from "./pages/associacoes/cadastrarAssociacao";
import Associacoes from "./pages/associacoes/listarAssociacao";
import CadastrarTerminal from "./pages/terminais/cadastrarTerminal";
import ListarViagens from "./pages/viagem/listarViagens";
import DetalhesViagem from "./pages/viagem/detalhesViagem";
import Terminais from "./pages/terminais/listarTerminais";
import Viajantes from "./pages/viajantes/ListarViajante";
import Proprietarios from "./pages/proprietario/ListarProprietario";
import CadastrarProprietario from "./pages/proprietario/CadastrarProprietario";
import Motoristas from "./pages/motorista/ListaMotorista";


const container = document.getElementById("root");

if (!container) {
  throw new Error("React root element doesn't exist!");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/esqueci-senha",
    element: <ForgotPassword />
  },
  {
    path: "/sgv",
    element: <Layout />,
    children: [
      {
        path: "inicio",
        element: <Home />
      },
      {
        path: "viagens",
        element: <ListarViagens />
      },
      {
        path: "viagens/cadastrar-viagem",
        element: <CadastrarViagem />
      },
      {
        path: "viagens/:codigo/detalhes",
        element: <DetalhesViagem />
      },
      {
        path: "associacoes/cadastrar-associacoes",
        element: <CadastrarAssociacao />
      },
      {
        path: "associacoes",
        element: <Associacoes />
      },
      {
        path: "terminais/cadastrar",
        element: <CadastrarTerminal />
      },
      {
        path: "terminais",
        element: <Terminais />
      },
      {
        path: "viajantes",
        element: <Viajantes />
      },
      {
        path: "proprietarios",
        element: <Proprietarios />
      },
      {
        path: "proprietarios/cadastrar-proprietario",
        element: <CadastrarProprietario />
      },
      {
        path: "motoristas",
        element: <Motoristas />
      },
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const root = createRoot(container);

const themeMUI = createTheme({
  status: {
    danger: blue[500],
  },

});

root.render(
  <StrictMode>
    <Flowbite theme={{ theme }}>
      <ThemeProvider theme={themeMUI}>
        <RouterProvider router={router} />
      </ThemeProvider>
      <ToastContainer />
    </Flowbite>
  </StrictMode>
);
