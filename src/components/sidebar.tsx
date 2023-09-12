import { Sidebar, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiHome,
  HiOutlineNewspaper,
  HiSearch,
  HiUserGroup,
} from "react-icons/hi";
import {
  SlGraduation
} from "react-icons/sl"
import {
  BiBuildings
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


export const sessao = atom(false);

const ExampleSidebar = function () {
  const [userRoles, setUserRoles] = useState<Role[]>([])
  const [funcionarioSucursais, setFuncionarioSucursais] = useState<SucursalFuncionario[]>([])
  const [loadingSucursal, setLoadingSucursal] = useState(true);

  const [sucursalChanged] = useAtom(sucursalState);

  const navigate = useNavigate()

  const getUserRoles = () => {
    GET(API_ENDPOINTS.USER_ROLES, true)
      .then((res) => {
        setUserRoles(res.data.data.funcoes)
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

                        <NavLink to={"terminais"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                          <Icon component={HiHome} /> Terminais
                        </NavLink>

                        <Sidebar.Collapse
                          icon={HiUserGroup}
                          label="Associações"
                        >
                          <NavLink to={"associacoes/cadastrar-associacoes"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiHome} /> Cadastrar Associações
                          </NavLink>

                          <NavLink to={"associacoes"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiHome} /> Listar Associações
                          </NavLink>

                        </Sidebar.Collapse>
                      </div> :
                      roles.name === "ROLE_ASSOCIACAO" ?
                        <div key={roles.name}>
                          <NavLink to={"inicio"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiHome} /> Início
                          </NavLink>

                          <NavLink to={"viagens"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiHome} /> Viagens
                          </NavLink>

                          <NavLink to={"passagens"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                            <Icon component={HiHome} /> Passageiros
                          </NavLink>
                        </div> :
                        roles.name === "ROLE_TERMINAL" ?
                          <div key={roles.name}>

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
