import { Sidebar, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiHome,
  HiOutlineNewspaper,
  HiSearch,
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


export const sessao = atom(false);

const ExampleSidebar = function () {
  const [userRoles, setUserRoles] = useState<Role[]>([])
  const [funcionarioSucursais, setFuncionarioSucursais] = useState<SucursalFuncionario[]>([])
  const [loadingSucursal, setLoadingSucursal] = useState(true);

  const [sucursalChanged] = useAtom(sucursalState);

  const navigate = useNavigate()

  const getUserRoles = () => {
    axios.get(`${BASE_URL}/usuarios/perfil`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }).then((res) => {
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
    <div>
      <div className="hidden lg:flex ">
        <Sidebar aria-label="Sidebar with multi-level dropdown example" >
          <div className="flex h-full flex-col justify-between ">
            <div>
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
                  <NavLink to={"inicio"} className={({ isActive }) => isActive ? "flex items-center gap-4 p-2 text-base bg-gray-100 dark:bg-gray-700 rounded" : "flex items-center gap-4 p-2 text-base text-gray-700 hover:bg-gray-100 rounded"}>
                    <Icon component={HiHome} /> Início
                  </NavLink>

                
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </div>
      </div>
    </Sidebar>
      </div >
  {/* Mobile */ }
  <div>

      </div >
    </div >
  );
};

export default ExampleSidebar;
