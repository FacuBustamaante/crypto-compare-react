const Error = ({ children }) => {
    return (
        <div className="bg-red-500/15 border border-red-500/30 text-red-300 rounded-xl px-4 py-3 text-xs font-medium mb-4 text-center tracking-wide">
            {children}
        </div>
    )
}

export default Error
