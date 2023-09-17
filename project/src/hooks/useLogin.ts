import { useState } from "react"
import api from "../config/axiosConfig"
import { useNavigate } from "react-router-dom"
import LoginModel from "../models/loginModel"
import { set, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export default function useLogin() {

    const validationSchema = yup.object({
        password: yup.string().required("Preencha a senha."),
        email: yup.string().required("Preencha o email.").email()
    })

    const { register, handleSubmit, formState: { errors } } = useForm<LoginModel>({
        resolver: yupResolver(validationSchema)
    })

    const navigate = useNavigate()

    const [status, setStatus] = useState({
        type: "",
        message: ""
    })


    async function handlePostLogin(data: LoginModel) {

        const headers = {
            "Content-Type": "application/json"
        }

        await api.post('/Login', data, { headers })
        .then((response) => {
            setStatus({
            type: "sucesso",
            message: response.data.msg
            })
            navigate("/dash")
        }).catch((error) => {
            if(error.response) {
                setStatus({
                    type: "error",
                    message: error.response.data.default.error.msg
                })
            } else {
                console.log("Erro: tente mais tarde...")
            }
        })
    }

    return {
        status,
        handlePostLogin,
        register,
        handleSubmit,
        validationSchema,
        formState: { errors }
    }
}