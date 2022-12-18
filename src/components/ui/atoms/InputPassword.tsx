import { InputHTMLAttributes, useState } from 'react'
import { RiEyeLine, RiEyeCloseLine } from 'react-icons/ri'

export const InputPassword = ({ ...rest }: InputHTMLAttributes<HTMLInputElement>) => {
  const [passwordIsVisible, setPasswordVisibility] = useState<boolean>(false)

  return (
    <div className={`relative w-full`}>
      <input
        id="password"
        type={passwordIsVisible ? 'text' : 'password'}
        name="password"
        className="w-full px-4 py-2 border-2 border-transparent rounded-full outline-none bg-gray-100 text-lg"
        placeholder="Senha"
        {...rest}
      />
      <span
        onClick={() => setPasswordVisibility(!passwordIsVisible)}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 text-lg cursor-pointer"
      >
        {passwordIsVisible ? <RiEyeLine /> : <RiEyeCloseLine />}
      </span>
    </div>
  )
}
