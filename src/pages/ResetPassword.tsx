import React, { useCallback, useRef, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import Input from "@components/Input";
import { useAuth } from "@hooks/auth";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { handleValidationErrors } from "@utils/getValidationErrors";
import { useToasts } from 'react-toast-notifications';

import logo from "@image/prov.svg";
import { Oval } from "react-loader-spinner";

const ResetPassword: React.FC = () => {
  const { addToast } = useToasts();
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { confirmReset } = useAuth();
  const { token } = useParams<any>();
  const [isLoading, setIsLoading] = useState(false)


  const handleSubmit = useCallback(async ({ password, password_confirm }) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        password: Yup.string().required("Senha obrigatória"),
        password_confirm: Yup.string().required("Confirmar senha obrigatório"),
      });

      await schema.validate(
        { password, password_confirm },
        {
          abortEarly: false,
        }
      );

      if(password !== password_confirm) return addToast('As senhas não conferem!', { appearance: 'warning', autoDismiss: true });

      setIsLoading(true)

      try {
        await confirmReset(token, password);
        
        addToast("Senha alterada com sucesso", { appearance: 'success', autoDismiss: true });

        history.push({
          pathname: "/",
        });
      } catch (err) {
        addToast("Você já alterou sua senha, se achar que isso é um erro, contacte o suporte!", { appearance: 'error', autoDismiss: true });
      }

      setIsLoading(false)

    } catch (error: unknown) {
      handleValidationErrors(error, formRef);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-cover bg-center bg-no-repeat bg-background">
      <header className="flex flex-col justify-center align-center gap-2">
        <img className="self-center w-16 h-16" src={logo} alt="Logo" />
        <p className="font-poppins text-white	text-center font-semibold text-2xl mb-[20px]">
          DePara
        </p>
      </header>

      <div className="w-[382px] flex bg-white flex-col items-center justify-center py-10 px-[51px] rounded-xl">
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full flex flex-col mx-auto"
        >
          <h1 className="font-roboto font-bold mb-[20px] text-center text-4xl text-[#374151]">
            Digite sua senha
          </h1>

          <Input
            className="w-full px-3 py-2 bg-white font-roboto font-normal	text-sm	placeholder-gray-400 border-2 border-[#E5E7EB] rounded-md focus:outline-none focus:border-blue focus:ring-blue mt-2"
            type="password"
            name="password"
            placeholder="Nova senha"
          />
          <Input
            className="w-full px-3 py-2 bg-white font-roboto font-normal	text-sm	placeholder-gray-400 border-2 border-[#E5E7EB] rounded-md focus:outline-none focus:border-blue focus:ring-blue mt-2"
            type="password"
            name="password_confirm"
            placeholder="Confirmar senha"
          />

          <button
            type="submit"
            disabled= {isLoading}
            className="flex justify-center items-center bg-blue py-3 text-lg font-bold rounded-md text-white mt-5 mb-[49px]"
          >
            { 
              isLoading ? (<Oval color="#ffffff" height={24} strokeWidth={4} width={24} />) :'Salvar' 
            }
          </button>
        </Form>

        <section className="flex flex-col justify-between gap-[19px]">
          <Link className="text-center text-sm font-medium text-title" to="/">
            Fazer login
          </Link>
        </section>
      </div>
    </div>
  );
};

export { ResetPassword };
