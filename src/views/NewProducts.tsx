import { Link, Form, useActionData, type ActionFunctionArgs, redirect } from 'react-router-dom'
import ErrorMessages from '../components/ErrorMessages';
import ProductForm from '../components/ProductForm';
import { addProduct } from '../services/ProductService';

export async function action({request} : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    // console.log(data);

    let error = ''
    // la foto es opcional, no cuenta como campo obligatorio
    if(Object.entries(data).some(([key, value]) => key !== 'image' && value === '')) {
        error = 'Todos los campos son obligatorios'
    }

    if(error.length){
        return error
    }

    await addProduct(data)

    return redirect('/')
}

export default function NewProducts() {

    const error = useActionData() as string
    
    
  return (
    <>
        <div className='flex justify-between'>
            <h2 className='text-4xl font-black text-slate-500'>Registrar Producto</h2>
            <Link
                to='/'
                className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
            >
                Volver a Productos
            </Link>
        </div>

        {error && <ErrorMessages>{error}</ErrorMessages>}
        <Form
            className="mt-10"  
            method='POST'
            action=''    
        >
            <ProductForm />
            <input
                type="submit"
                className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                value="Registrar Producto"
            />
        </Form>
    
    </>
  )
}
