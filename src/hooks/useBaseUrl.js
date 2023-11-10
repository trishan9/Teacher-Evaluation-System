const useBaseUrl = () => {
    // const protocol = window.location.protocol
    const host = window.location.host
    const baseUrl = `${host}`
    return baseUrl
}

export default useBaseUrl