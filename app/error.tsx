'use client'
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-blue-950 text-white" >
            <h1 className="text-4xl font-bold mb-4" > Oops! Algo salió mal.</h1>
            <p className="text-lg mb-4" > Por favor, inténtalo de nuevo.</p>
            <button className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded" onClick={reset} >
                Intentar de Nuevo
            </button>
        </div>
    )
}