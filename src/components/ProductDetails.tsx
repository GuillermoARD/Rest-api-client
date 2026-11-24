import { useCallback, useState } from 'react'
import { Form, useFetcher, useNavigate } from 'react-router-dom'
import type { Product } from '../types'
import { formatCurrency } from '../utils'
import ImageModal from './ImageModal'

type ProductDetailsProps = {
    product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {

    const fetcher = useFetcher()
    const navigate = useNavigate()
    const [showImage, setShowImage] = useState(false)
    const closeImage = useCallback(() => setShowImage(false), [])

    const isAvailable = product.availability

  return (
    <tr className="border-b">
        <td className="p-3 text-lg text-gray-800">
            <div className="flex items-center gap-3">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                    {product.image ? (
                        <button
                            type="button"
                            onClick={() => setShowImage(true)}
                            aria-label={`Ver foto de ${product.name}`}
                            className="h-full w-full cursor-zoom-in"
                        >
                            <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform hover:scale-110" />
                        </button>
                    ) : (
                        <span className="text-[10px] text-gray-400">Sin foto</span>
                    )}
                </div>
                {product.name}
            </div>
            {showImage && product.image && (
                <ImageModal
                    src={product.image}
                    alt={product.name}
                    onClose={closeImage}
                />
            )}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
            <fetcher.Form method='POST'>
                <button
                    type='submit'
                    name='id'
                    value={product.id}
                    className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
                >
                    {isAvailable ? 'Disponible' : 'No Disponible'}
                </button>
            </fetcher.Form>
        </td>
        <td className="p-3 text-lg text-gray-800">
            <div className="flex gap-2 items-center">
                <button
                    onClick={() => navigate(`/productos/${product.id}/editar`)}
                    className='bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:cursor-pointer'
                >Editar</button>

                <Form
                    className='w-full'
                    method='POST'
                    action={`productos/${product.id}/eliminar`}
                    onSubmit={(e) => {
                        if(!confirm('¿Eliminar este producto?')) {
                            e.preventDefault()
                        }
                    }}
                >
                    <input
                        type='submit'
                        value='Eliminar'
                        className='bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:cursor-pointer'
                    />
                </Form>
            </div>
        </td>
    </tr>
  )
}
