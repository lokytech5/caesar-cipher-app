"use client"
import { motion } from 'framer-motion';
import { useCipher } from './useChiper';
import { FormData } from './useChiper';

const InputForm = () => {
  const { register, handleSubmit, errors, mutation, reset } = useCipher();

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  const onClear = () => {
    reset();
    mutation.reset();
  }

  return (
    <motion.form 
    onSubmit={handleSubmit(onSubmit)}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
    className="max-w-lg mx-auto my-10 p-8 shadow-lg rounded-lg bg-white"
  >
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Text:</label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" {...register('text')} />
      {errors.text && <p className="text-red-500 text-xs italic">{errors.text?.message}</p>}
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Shift Amount:</label>
      <input type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register('shift_amount', { valueAsNumber: true })} />
      {errors.shift_amount && <p className="text-red-500 text-xs italic">{errors.shift_amount?.message}</p>}
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Direction:</label>
      <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register('direction')}>
        <option value="encode">Encode</option>
        <option value="decode">Decode</option>
      </select>
      {errors.direction && <p className="text-red-500 text-xs italic">{errors.direction?.message}</p>}
    </div>
    <div className="flex justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button" // This is important to prevent form submission
          onClick={onClear}
        >
          Clear
        </motion.button>
      </div>

    {/* Displaying result */}
    {mutation.isLoading && <p>Processing...</p>}
      {mutation.isError && <p>Error: {((mutation.error as any)?.message as string) ?? 'Unknown error'}</p>}
      {mutation.isSuccess && mutation.data && (
        <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-4 bg-blue-100 p-4 rounded border border-blue-500"
      >
        <h3 className="text-lg font-bold text-blue-700">Result:</h3>
        <p className="text-gray-800 text-4xl md:text-5xl lg:text-5xl font-bold">{mutation.data.result}</p>
      </motion.div>
      )}
  </motion.form>
);
}

export default InputForm
