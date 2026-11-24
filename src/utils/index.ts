export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)
}

export function toBoolean(str: string) {
    return str.toLowerCase() === 'true'
}

// Redimensiona la imagen en el navegador y la devuelve como data URL JPEG
export function resizeImage(file: File, maxSize = 600, quality = 0.8): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onerror = () => reject(new Error('No se pudo leer la imagen'))
        reader.onload = () => {
            const img = new Image()
            img.onerror = () => reject(new Error('Archivo de imagen no valido'))
            img.onload = () => {
                const scale = Math.min(1, maxSize / Math.max(img.width, img.height))
                const canvas = document.createElement('canvas')
                canvas.width = Math.round(img.width * scale)
                canvas.height = Math.round(img.height * scale)
                const ctx = canvas.getContext('2d')
                if(!ctx) return reject(new Error('No se pudo procesar la imagen'))
                ctx.fillStyle = '#fff' // fondo blanco para PNG con transparencia
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                resolve(canvas.toDataURL('image/jpeg', quality))
            }
            img.src = reader.result as string
        }
        reader.readAsDataURL(file)
    })
}
