import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'react-query';
import { cipherSchema } from './cipherSchema';
import axios from 'axios';

interface FormData {
    text: string;
    shift_amount: number;
    direction: string;
}

const InputForm = () => {
    const { register, handleSubmit, formState: { errors }} = useForm<FormData>({
        resolver: zodResolver(cipherSchema)
    })

    const mutation = useMutation((newData: FormData) => {
        return axios.post('/api/cipher', newData).then(res => res.data)
    }) 

    const onSubmit: SubmitHandler<FormData> = (data) => {
        mutation.mutate(data);
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div>
      <label>Text:</label>
      <input {...register('text')} />
      {errors.text && <p>{errors.text?.message as string}</p>}
    </div>
    <div>
      <label>Shift Amount:</label>
      <input type="number" {...register('shift_amount', { valueAsNumber: true })} />
      {errors.shift_amount && <p>{errors.shift_amount?.message as string}</p>}
    </div>
    <div>
      <label>Direction:</label>
      <select {...register('direction')}>
        <option value="encode">Encode</option>
        <option value="decode">Decode</option>
      </select>
      {errors.direction && <p>{errors.direction?.message as string}</p>}
    </div>
    <button type="submit">Submit</button>
    {mutation.isLoading ? (
      <p>Encoding/Decoding...</p>
    ) : (
      <>
        {mutation.isError && <p>An error occurred: {((mutation.error as any)?.message as string) ?? 'Unknown error'}</p>}
        {mutation.isSuccess ? <p>Result: {mutation.data.result}</p> : null}
      </>
    )}
  </form>
  )
}

export default InputForm
