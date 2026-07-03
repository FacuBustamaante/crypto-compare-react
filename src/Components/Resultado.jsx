const formatPrice = (n) =>
    n?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const Resultado = ({ resultado }) => {
    const { current_price, high_24h, low_24h, price_change_percentage_24h, image, last_updated, moneda, name } = resultado
    const isPositive = price_change_percentage_24h >= 0

    return (
        <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
                <img src={image} alt={name} className="w-9 h-9 rounded-full" />
                <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold truncate">{name}</p>
                    <p className="text-indigo-400 text-xs">{moneda}</p>
                </div>
                <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-lg ${isPositive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}`}>
                    {isPositive ? '▲' : '▼'} {Math.abs(price_change_percentage_24h?.toFixed(2))}%
                </span>
            </div>

            <p className="text-3xl font-bold text-white mb-4 tracking-tight">
                {moneda} {formatPrice(current_price)}
            </p>

            <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-indigo-400 text-xs mb-1">Máximo 24h</p>
                    <p className="text-white font-semibold text-sm">{formatPrice(high_24h)}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-indigo-400 text-xs mb-1">Mínimo 24h</p>
                    <p className="text-white font-semibold text-sm">{formatPrice(low_24h)}</p>
                </div>
            </div>

            <p className="text-indigo-500 text-xs mt-4 text-center">
                Actualizado: {new Date(last_updated).toLocaleString()}
            </p>
        </div>
    )
}

export default Resultado
