import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'react-query';
import { cipherSchema } from './cipherSchema';

const InputForm = () => {
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: zodResolver(cipherSchema)
    })

  return (
    <div>InputForm</div>
  )
}

export default InputForm
