import { useEffect } from "react"
import { createPortal } from "react-dom"

type ImageModalProps = {
    src: string
    alt: string
    onClose: () => void
}

export default function ImageModal({ src, alt, onClose }: ImageModalProps) {

    // Cerrar con Escape y bloquear el scroll de la página mientras está abierto
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleKeyDown)
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = ''
        }
    }, [onClose])

    // Portal al body: el modal no puede vivir dentro de un <tr>
    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 cursor-zoom-out"
        >
            <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar"
                className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 text-2xl font-bold text-white hover:bg-white/20 cursor-pointer"
            >×</button>

            <figure
                onClick={(e) => e.stopPropagation()}
                className="flex max-h-full max-w-3xl flex-col items-center gap-3 cursor-default"
            >
                <img
                    src={src}
                    alt={alt}
                    className="max-h-[80vh] w-auto rounded-lg object-contain shadow-2xl"
                />
                <figcaption className="text-lg font-bold text-white">{alt}</figcaption>
            </figure>
        </div>,
        document.body
    )
}
