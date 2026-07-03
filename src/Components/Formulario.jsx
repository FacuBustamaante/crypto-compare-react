import Error from './Error'
import useSelectMoneda from '../Hooks/useSelectMoneda'
import { monedas } from '../data/monedas'
import { useState, useEffect } from 'react'

const Formulario = ({ setMonedas }) => {
    const [error, setError] = useState(false)
    const [criptos, setCriptos] = useState([])
    const [moneda, SelectMonedas] = useSelectMoneda('Moneda', monedas)
    const [criptomoneda, SelectCriptomoneda] = useSelectMoneda('Criptomoneda', criptos)

    useEffect(() => {
        const consultarAPI = async () => {
            const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1"
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            const arrCriptos = resultado.map(cripto => ({
                id: cripto.id,
                nombre: cripto.name
            }))
            setCriptos(arrCriptos)
        }
        consultarAPI()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        if ([moneda, criptomoneda].includes('')) {
            setError(true)
            return
        }
        setError(false)
        setMonedas({ moneda, criptomoneda })
    }

    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <SelectMonedas />
                <SelectCriptomoneda />
                <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:-translate-y-0.5 active:translate-y-0 mt-2"
                >
                    Cotizar
                </button>
            </form>
        </>
    )
}

export default Formulario
