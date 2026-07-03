import { useState } from 'react'

const useSelectMoneda = (label, opciones) => {
    const [state, setState] = useState('')

    const SelectMonedas = () => (
        <div>
            <label className="block text-indigo-300 text-xs font-semibold mb-2 tracking-wider uppercase">
                {label}
            </label>
            <div className="relative">
                <select
                    value={state}
                    onChange={e => setState(e.target.value)}
                    className="w-full appearance-none bg-white/8 backdrop-blur border border-white/15 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all cursor-pointer"
                    style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                >
                    <option value="" style={{ backgroundColor: '#1e1b4b' }}>— Seleccione —</option>
                    {opciones.map(opcion => (
                        <option
                            key={opcion.id}
                            value={opcion.id}
                            style={{ backgroundColor: '#1e1b4b' }}
                        >
                            {opcion.nombre}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    )

    return [state, SelectMonedas]
}

export default useSelectMoneda
