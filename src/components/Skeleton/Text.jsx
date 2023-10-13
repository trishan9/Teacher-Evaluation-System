const Text = ({ width, height }) => {
    return (
        <div className={`w-${width} h-${height} bg-gray-300 border rounded-full animate-pulse`} />
    )
}

export default Text
