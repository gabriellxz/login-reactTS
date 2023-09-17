import { useState } from "react"
import { FormType } from "../models/form"
import api from "../config/axiosConfig"
import { useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export default function useCadastro() {

    const validationSchema = yup.object({
        name: yup.string().required("Preencha o nome.").min(3, "Nome deve conter no mínimo 5 caracteres."),
        password: yup.string().required("Preencha a senha.").min(6, "Senha deve conter no mínimo 6 caracteres."),
        email: yup.string().required("Preencha o email.").min(5, "Email deve conter no mínimo 5 caracteres."),
        cpf: yup.string().required("Preencha o CPF.").min(11, "CPF deve conter no mínimo 11 caracteres.").max(11, "CPF deve conter no máximo 11 caracteres.")
    })

    const { register, handleSubmit, formState: { errors } } = useForm<FormType>({
        resolver: yupResolver(validationSchema)
    })

    const navigate = useNavigate()

    const [status, setStatus] = useState({
        type: "",
        message: ""
    })

    async function handlePostCad(data: FormType) {

        const headers = {
            "Content-Type": "application/json"
        }

        await api.post('/cadastro', data, { headers })
            .then((response) => {
                setStatus({
                    type: "sucesso",
                    message: response.data.msg
                })
                navigate("/")
            }).catch((error) => {
                if (error.response) {
                    setStatus({
                        type: "error",
                        message: error.response.data.msg
                    })
                    if (error.response) {
                        setStatus({
                            type: "error",
                            message: error.response.data.default.error.msg
                        })
                    }
                } else {
                    setStatus({
                        type: "error",
                        message: "Erro: tente mais tarde..."
                    })
                }
            })
    }

    return {
        status,
        handlePostCad,
        register,
        handleSubmit,
        formState: { errors }
    }
}