const capitalize = (string) => {
    const slicedString = string.slice(1)
    const capitalizedString = string[0].toUpperCase() + slicedString
    return capitalizedString
}

export default capitalize