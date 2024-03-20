"use client"
import { useCipher } from './useChiper';
import { FormData } from './useChiper';

const InputForm = () => {
  const { register, handleSubmit, errors, mutation } = useCipher();

  const onSubmit = (data: FormData) => {
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
