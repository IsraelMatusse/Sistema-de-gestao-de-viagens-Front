import { useEffect, useState } from "react";
import { useDisclosure } from '@mantine/hooks';
import { Drawer } from '@mantine/core';
import axios from "axios";
import { BASE_URL } from "../util/URL";
import { Menu } from '@mantine/core';
import { IconLogout, IconUser } from '@tabler/icons-react';
import { atom, useAtom } from 'jotai'
import { useNavigate } from "react-router";
import { BiUser } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import type { SucursalFuncionario } from "../models/SucursalFuncionario";
import { sucursalLogo, sucursalState, usuarioOnlineSucursalCodigo } from "../atom/ApplicationStateAtoms";
import { MenuItem, TextField } from "@mui/material";

export const userLogged = atom(0)

interface simpleUser {
  email: string
}

const ExampleNavbar = function () {
  const [opened, { open, close }] = useDisclosure(false);
  const [user, setUser] = useState<simpleUser>();
  const [isUserLoggedIn, setIsUserLoggedIn] = useAtom(userLogged);
  const [funcionarioSucursais, setFuncionarioSucursais] = useState<SucursalFuncionario[]>([]);
  const [codigoSucursal, setCodigoSucursal] = useAtom(usuarioOnlineSucursalCodigo)
  const [sucursalLogotipo, setSucursalLogotipo] = useAtom(sucursalLogo)
  const [sucursalChanged] = useAtom(sucursalState);
  const navigate = useNavigate()

  const getMyProfile = () => {
    axios.get(`${BASE_URL}/usuarios/perfil`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    }).then((res) => {
      setUser(res.data.data)
    }).catch((err) => {
      //navigate("/")
      console.log(err)
    });
  }

  const logout = () => {
    localStorage.clear()
    //navigate("/")
    setIsUserLoggedIn(0)
  }

  const getFuncionarioSucursais = () => {
    axios
      .get(`${BASE_URL}/funcionarios/eu/sucursais`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res: any) => {
        setFuncionarioSucursais(res.data.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMyProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLoggedIn])

  useEffect(() => {
    getFuncionarioSucursais()
  }, [sucursalChanged])

  return (
    <nav className="w-full" >
      <div className="w-full">
        <div className="fixed top-0 z-20 flex w-full items-center justify-between bg-white px-4 py-6 shadow">
          <div className="flex items-center gap-3 md:gap-0">
            <div className="flex lg:hidden">
              <Drawer opened={opened} onClose={close} size="75%">
                {/* Drawer content */}
                <div className="mt-7 w-full flex-col">
                  {Object.keys(funcionarioSucursais).length !== 0 && <div className="w-full">
                    <TextField
                      id="outlined-select-currency"
                      size="small"
                      className="w-48"
                      select
                      onChange={(event) => {
                        setCodigoSucursal(event.target.value);
                        const logoArray = funcionarioSucursais.map(sucursal => sucursal.codigo_sucursal === event.target.value ? sucursal.logotipo : null)
                        setSucursalLogotipo(logoArray[0])
                      }}
                      name="sucursal_codigo"
                      label="Sucursal"
                    >
                      {funcionarioSucursais.map((option) => (
                        <MenuItem key={option.codigo_sucursal} value={option.codigo_sucursal}>
                          {option.nome_sucursal}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>}
                </div>
              </Drawer>
              <svg onClick={open} className="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M4 6l16 0"></path>
                <path d="M4 12l16 0"></path>
                <path d="M4 18l16 0"></path>
              </svg>
            </div>
            <NavLink to={"/"} className="hidden lg:flex">
              <img alt="logotipo" src={sucursalLogotipo ? sucursalLogotipo : "/images/logo.svg"} className="mr-3 rounded-full sm:h-8 sm:w-8" />
              <span className="self-center whitespace-nowrap text-2xl font-semibold ">
                FICA
              </span>
            </NavLink>
          </div>
          <NavLink to={"/"} className="flex items-center lg:hidden">
            <img alt="" src="/images/logo.svg" className="mr-3 h-6 sm:h-8" />
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              FICA
            </span>
          </NavLink>
          <div className="flex items-center gap-3">
            {Object.keys(funcionarioSucursais).length !== 0 && <div className="hidden md:flex">
              <TextField
                id="outlined-select-currency"
                size="small"
                className="w-48"
                select
                onChange={(event) => {
                  setCodigoSucursal(event.target.value);
                  const logoArray = funcionarioSucursais.map(sucursal => sucursal.codigo_sucursal === event.target.value ? sucursal.logotipo : null)
                  setSucursalLogotipo(logoArray[0])
                }}
                name="sucursal_codigo"
                label="Sucursal"
              >
                {funcionarioSucursais.map((option) => (
                  <MenuItem key={option.codigo_sucursal} value={option.codigo_sucursal}>
                    {option.nome_sucursal}
                  </MenuItem>
                ))}
              </TextField>
            </div>}
            <Menu shadow="md" width={200}>
              {user?.email && <Menu.Target>
                <div className="flex cursor-pointer items-center gap-3 rounded border px-3 py-2 hover:bg-gray-100">
                  <span className="hidden lg:flex">{user.email || "email"}</span>
                  <BiUser className="h-6 w-6" />
                </div>
              </Menu.Target>}
              <Menu.Dropdown>
                <Menu.Label>Usúario</Menu.Label>
                <Menu.Item icon={<IconUser size={14} />} onClick={() => navigate("meu-perfil")}>Perfil</Menu.Item>
                <Menu.Divider />
                <Menu.Item color="red" onClick={() => {
                  logout()
                }} icon={<IconLogout size={14} />}>Sair</Menu.Item>
              </Menu.Dropdown>
            </Menu>
            {/* <DarkThemeToggle /> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ExampleNavbar;
