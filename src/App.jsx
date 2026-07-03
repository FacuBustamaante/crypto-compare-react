import { useState, useEffect } from 'react'
import Formulario from './Components/Formulario'
import Spinner from './Components/Spinner'
import Resultado from './Components/Resultado'

function App() {
  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizarCripto = async () => {
        setLoading(true)
        setResultado({})
        const { moneda, criptomoneda } = monedas
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${moneda}&ids=${criptomoneda}`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setResultado({ ...resultado[0], moneda: moneda.toUpperCase() })
        setLoading(false)
      }
      cotizarCripto()
    }
  }, [monedas])

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-indigo-950 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[40%] left-[-5%] w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm">
        <div className="mx-auto -mb-8 relative z-20 w-24 h-24 flex items-center justify-center">
          <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
            <defs>
              <radialGradient id="coinGlow" cx="50%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#4338ca" />
              </radialGradient>
              <radialGradient id="coinFace" cx="40%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#c4b5fd" />
                <stop offset="100%" stopColor="#5b21b6" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            {/* outer ring */}
            <circle cx="48" cy="48" r="44" fill="url(#coinGlow)" opacity="0.3" />
            {/* coin body */}
            <circle cx="48" cy="46" r="36" fill="url(#coinGlow)" />
            {/* coin face highlight */}
            <ellipse cx="40" cy="36" rx="18" ry="10" fill="url(#coinFace)" opacity="0.5" />
            {/* ₿ symbol */}
            <text x="48" y="58" textAnchor="middle" fontSize="30" fontWeight="700" fontFamily="Arial,sans-serif" fill="white" filter="url(#glow)" opacity="0.95">₿</text>
          </svg>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl shadow-black/40 px-8 pt-14 pb-8">
          <h1 className="text-2xl font-bold text-white text-center tracking-tight mb-1">
            CryptoCotizador
          </h1>
          <p className="text-indigo-400 text-center text-xs font-medium mb-7 tracking-widest uppercase">
            Precio en tiempo real
          </p>

          <Formulario setMonedas={setMonedas} />

          {loading && <Spinner />}
          {resultado.current_price && <Resultado resultado={resultado} />}
        </div>
      </div>
    </div>
  )
}

export default App
