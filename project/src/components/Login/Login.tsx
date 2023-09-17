import './style.css'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'

export default function Login() {

    const { handlePostLogin, handleSubmit, register, formState: { errors }, status } = useLogin()

    return (
        <>
            <section className="section-form">
                <p className='message-error'>
                    {status.type === "error" ? <span>{status.message}</span> : ""}
                </p>
                <h1>Login</h1>
                <form className="form" onSubmit={handleSubmit(handlePostLogin)}>
                    <div className='container-input'>
                        <input type="email" className='input' placeholder="Email" {...register('email')} />
                        <p className='message-error'>
                            {errors.email?.message}
                        </p>
                    </div>
                    <div className='container-input'>
                        <input type="password" className='input' placeholder="Senha" {...register('password')} />
                        <p className='message-error'>
                            {errors.password?.message}
                        </p>
                    </div>
                    <p>
                        Não possui uma conta? <Link to={"cadastro"}>Criar</Link>
                    </p>
                    <button className='btn-submit' type="submit">Entrar</button>
                </form>
            </section>
        </>
    )
}