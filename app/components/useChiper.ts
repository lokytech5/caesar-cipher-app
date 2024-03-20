import axios from 'axios';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cipherSchema } from './cipherSchema';


export interface FormData {
    text: string;
    shift_amount: number;
    direction: string;
  }
  
  export const useCipher = () => {
    const { register, handleSubmit, formState: { errors }} = useForm<FormData>({
      resolver: zodResolver(cipherSchema)
    });
  
    const mutation = useMutation((newData: FormData) => {
      return axios.post('/api/cipher', newData).then(res => res.data);
    });
  
    return { register, handleSubmit, errors, mutation };
  };