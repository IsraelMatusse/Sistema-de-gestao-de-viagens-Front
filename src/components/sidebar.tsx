import { Sidebar, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiHome,
  HiOutlineNewspaper,
  HiSearch,
  HiUserGroup,
  HiBookOpen,
  HiViewList,
  HiBookmark,
  HiUser,
  HiChartBar,
  HiOutlineMail,
  HiOutlineTable,
  HiPaperAirplane,
  HiOutlineUsers,
  HiViewGrid
} from "react-icons/hi";
import {
  SlGraduation
} from "react-icons/sl"
import {
  BiBuildings, BiUser
} from "react-icons/bi"
import {
  FaUserGraduate, FaStopwatch
} from "react-icons/fa"
import {

  AiOutlineFileAdd,
  AiOutlineFileDone,
  AiOutlineFileSearch
} from "react-icons/ai"
import {
  CgProfile
} from "react-icons/cg"
import { BsBook, BsHouses, BsPeopleFill } from "react-icons/bs"
import {
  GiFamilyHouse
} from "react-icons/gi"
import axios from "axios";
import { BASE_URL } from "../util/URL";
import { NavLink, useNavigate } from "react-router-dom";
import { atom, useAtom } from "jotai";
import type { SucursalFuncionario } from "../models/SucursalFuncionario";
import type { Role } from "../models/Role";
import { sucursalState } from "../atom/ApplicationStateAtoms";
import { Icon } from "@mui/material";
import {
  BsCalendar2Event
} from "react-icons/bs"
import { GET } from "../data/client/httpclient";
import { API_ENDPOINTS } from "../data/client/Endpoints";
import { Menu } from "@mantine/core";
import { IconLogout, IconUser } from "@tabler/icons-react";
import { userLogged } from "./navbar";

interface simpleUser {
  username: string
}

export const sessao = atom(false);

const ExampleSidebar = function () {
  const [userRoles, setUserRoles] = useState<Role[]>([])
  const [user, setUser] = useState<simpleUser>();
  const [isUserLoggedIn, setIsUserLoggedIn] = useAtom(userLogged);
  const [funcionarioSucursais, setFuncionarioSucursais] = useState<SucursalFuncionario[]>([])
  const [loadingSucursal, setLoadingSucursal] = useState(true);

  const [sucursalChanged] = useAtom(sucursalState);

  const navigate = useNavigate()

  const getUserRoles = () => {
    GET(API_ENDPOINTS.USER_ROLES, true)
      .then((res) => {
        setUserRoles(res.data.data.funcoes)
        setUser(res.data.data.username)
        console.log(res)
      }).catch((err) => {
        const error = err.response.data;
        if (error.status_code === 401) {
          navigate("/")
        }
      });
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
        setLoadingSucursal(false)
      })
      .catch(() => {
        setLoadingSucursal(false)
      });
  }

  useEffect(() => {
    getFuncionarioSucursais()
  }, [sucursalChanged])

  useEffect(() => {
    getUserRoles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const logout = () => {
    localStorage.clear()
    navigate("/")
    setIsUserLoggedIn(0)
  }

  return (
    <div className="">
      <div className="hidden lg:flex">
        <Sidebar color="purple">
          <div className="flex h-full flex-col justify-between bg-teal-600 ">
            <div >
              <form className="pb-3 md:hidden">
                <TextInput
                  icon={HiSearch}
                  type="search"
                  placeholder="Search"
                  required
                  size={32}
                />
              </form>
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  {userRoles.map((roles) => (
                    roles.name === "ROLE_ADMIN" ?

                      <div key={roles.name} className="flex flex-col gap-1">
                        <NavLink to={"inicio"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                          <Icon component={HiHome} /> Início
                        </NavLink>

                        <Sidebar.Collapse
                          icon={HiPaperAirplane}
                          label="Terminais"
                        >
                        <NavLink to={"terminais/cadastrar"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiBookmark} /> Cadastrar Terminais
                          </NavLink>

                          <NavLink to={"Terminais"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiViewList} /> Listar Terminais
                          </NavLink>
                          </Sidebar.Collapse>

                        <Sidebar.Collapse
                          icon={HiUserGroup}
                          label="Associações"
                        >
                          <NavLink to={"associacoes/cadastrar-associacoes"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiBookmark} /> Cadastrar Associações
                          </NavLink>

                          <NavLink to={"associacoes"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiViewList} /> Listar Associações
                          </NavLink>
                
                        </Sidebar.Collapse>
                        <Sidebar.Collapse
                          icon={HiViewList}
                          label="Relatorios Gerais"
                        >
                             <NavLink to={"proprietarios"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiOutlineTable} /> Lista de todos Proprietarios
                          </NavLink>
                          <NavLink to={"motoristas"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiOutlineTable} /> Lista de Motoristas de todos motoristas
                          </NavLink>
                          <NavLink to={"passagens"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiOutlineTable} /> Lista  de todas viaturas
                          </NavLink>
                        </Sidebar.Collapse>
                          <NavLink to={"passagens"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiChartBar} /> Graficos
                          </NavLink>
                          <NavLink to={"passagens"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiUser} /> Perfil
                          </NavLink>
                          <NavLink to={"passagens"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiOutlineMail} /> Contacto
                          </NavLink>
                      </div> :
                      roles.name === "ROLE_ASSOCIACAO" ?
                        <div key={roles.name}>
                          <NavLink to={"inicio"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiHome} /> Início
                          </NavLink>

                          <Sidebar.Collapse
                          icon={HiPaperAirplane}
                          label="Viagens"
                        >
                          <NavLink to={"viagens/cadastrar-viagem"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiBookmark} /> Cadastrar Viagens
                          </NavLink>

                          <NavLink to={"viagens"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiViewList} /> Listar Viagens
                          </NavLink>
                        </Sidebar.Collapse>

                        <NavLink to={"viajantes"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiOutlineUsers} /> Lista de Passageiros
                          </NavLink>

                          <NavLink to={"passagens"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiOutlineTable} /> Tabelas de Relatorios
                          </NavLink>
                          <NavLink to={"passagens"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiChartBar} /> Graficos
                          </NavLink>
                          <NavLink to={"passagens"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiUser} /> Perfil
                          </NavLink>
                          <NavLink to={"passagens"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiOutlineMail} /> Contacto
                          </NavLink>
                          <div className="flex items-center gap-3 bg-primary-600">

                            <Menu shadow="md" width={200}>
                              {user?.username && <Menu.Target>
                                <div className="flex cursor-pointer items-center gap-3 rounded border px-3 py-2 hover:bg-gray-100">
                                  <span className=" lg:flex">{user.username || "email"}</span>
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
                        </div> :
                        roles.name === "ROLE_TERMINAL" ?
                          <div key={roles.name}>
                             
                        <NavLink to={"viajantes"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiOutlineUsers} /> Lista de Passageiros
                          </NavLink>
                          <Sidebar.Collapse
                          icon={HiViewList}
                          label="Fichas de cadastros"
                        >
                             <NavLink to={"proprietarios/cadastrar-proprietario"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiOutlineTable} /> Cadastro de Proprietarios de viaturas
                          </NavLink>
                          <NavLink to={"passagens"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiOutlineTable} /> Cadastro de Viaturas
                          </NavLink>
                          <NavLink to={"passagens"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiOutlineTable} /> Cadastro de Motoristas
                          </NavLink>
                        </Sidebar.Collapse>
                        <Sidebar.Collapse
                          icon={HiViewList}
                          label="Relatorios do terminal"
                        >
                             <NavLink to={"proprietarios"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiOutlineTable} /> Lista de Proprietarios
                          </NavLink>
                          <NavLink to={"motoristas"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiOutlineTable} /> Lista de Motoristas do terminal
                          </NavLink>
                          <NavLink to={"passagens"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiOutlineTable} /> Lista de Viaturas do terminal
                          </NavLink>
                        </Sidebar.Collapse>
                        <NavLink to={"viagens"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiViewGrid} /> Listar Viagens
                          </NavLink>

                          <NavLink to={"passagens"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiChartBar} /> Graficos
                          </NavLink>
                          <NavLink to={"passagens"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiUser} /> Perfil
                          </NavLink>
                          <NavLink to={"passagens"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiOutlineMail} /> Contacto
                          </NavLink>

                          </div> : null
                  ))}
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </div>
          </div>
        </Sidebar>
      </div >
      {/* Mobile */}
      <div>

      </div >
    </div >
  );
};

export default ExampleSidebar;
