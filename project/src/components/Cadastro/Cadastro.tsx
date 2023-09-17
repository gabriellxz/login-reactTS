import './style.css'
import useCadastro from '../../hooks/useCadastro'
import { Link } from 'react-router-dom'

export default function FormCadastro() {

    const {status, handlePostCad, handleSubmit, register, formState:{errors}} = useCadastro()

    return (
        <>
            <section className="section-form">
                <p className='message-error'>
                    {status.type === "error" ? <span>{status.message}</span> : ""}
                </p>
                <h1>Cadastro</h1>
                <form className="form" onSubmit={handleSubmit(handlePostCad)}>
                    <div className='container-input'>
                        <input type="name" className='input' placeholder="Nome" {...register('name')} />
                        <p className='message-error'>
                            {errors.name?.message}
                        </p>
                    </div>
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
                    <div className='container-input'>
                        <input type="text" className='input' placeholder="CPF" {...register('cpf')} />
                        <p className='message-error'>
                            {errors.cpf?.message}
                        </p>
                    </div>
                    <button className='btn-submit' type="submit">Cadastrar</button>
                    <p>
                        Já tenho uma conta? <Link to={"/"}>Entrar</Link>
                    </p>
                </form>
            </section>
        </>
    )
}