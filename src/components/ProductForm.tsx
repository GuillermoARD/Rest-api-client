import { useState, type ChangeEvent } from "react"
import type { Product } from "../types"
import { resizeImage } from "../utils"

type ProductFormProps = {
    product?: Product
}

export default function ProductForm({ product }: ProductFormProps) {

    const [image, setImage] = useState(product?.image ?? '')
    const [imageError, setImageError] = useState('')

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if(!file) return

        if(!file.type.startsWith('image/')) {
            setImageError('El archivo debe ser una imagen')
            return
        }

        try {
            setImage(await resizeImage(file))
            setImageError('')
        } catch (error) {
            setImageError((error as Error).message)
        }
    }

  return (
    <>
        <div className="mb-4">
            <label
                className="text-gray-800"
                htmlFor="name"
            >Nombre Producto:</label>
            <input
                id="name"
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Nombre del Producto"
                name="name"
                defaultValue={product?.name}
            />
        </div>
        <div className="mb-4">
            <label
                className="text-gray-800"
                htmlFor="price"
            >Precio:</label>
            <input
                id="price"
                type="number"
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Precio Producto. ej. 200, 300"
                name="price"
                defaultValue={product?.price}
            />
        </div>
        <div className="mb-4">
            <label
                className="text-gray-800"
                htmlFor="image-file"
            >Foto del Producto (opcional):</label>

            <div className="mt-2 flex items-center gap-4">
                <div className="h-28 w-28 shrink-0 overflow-hidden rounded-lg border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                    {image ? (
                        <img src={image} alt="Vista previa" className="h-full w-full object-cover" />
                    ) : (
                        <span className="text-xs text-gray-400 text-center px-2">Sin foto</span>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    {/* sin name: el archivo no se envía, solo el base64 del input oculto */}
                    <input
                        id="image-file"
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleImageChange}
                        className="text-sm text-gray-600 file:mr-3 file:rounded-md file:border-0 file:bg-indigo-600 file:px-3 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-indigo-500 file:cursor-pointer"
                    />
                    {image && (
                        <button
                            type="button"
                            onClick={() => setImage('')}
                            className="self-start text-sm font-bold text-red-600 hover:underline cursor-pointer"
                        >Quitar foto</button>
                    )}
                    {imageError && <p className="text-sm text-red-600">{imageError}</p>}
                </div>
            </div>

            <input type="hidden" name="image" value={image} />
        </div>
    </>
  )
}
