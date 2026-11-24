import { object, string, number, boolean, array, nullable, optional, type InferOutput } from "valibot"

export const DraftProductSchema = object({
    name: string(),
    price: number(),
    image: nullable(string())
})

export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean(),
    image: optional(nullable(string()), null)
})

export const ProductsSchema = array(ProductSchema)

export type Product = InferOutput<typeof ProductSchema>
