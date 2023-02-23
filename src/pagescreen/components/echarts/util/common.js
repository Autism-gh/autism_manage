export const formatFontSize = (res, designWidth = 1920) => {
    const clientWidth = window.innerWidth || document.documentElement?.clientWidth || document.body.clientWidth
    if (!clientWidth) return
    let fontSize = 100 * (clientWidth / designWidth);
    return (res / 100) * fontSize;
}


export const colorOptions = {
    nromal: [
        '#AAE699',
        '#55C7C8',
        '#EADA02',
        '#65B2EE',
        '#718DF5',
        '#BE71F5',
        '#71DCF5',
        '#F5C371',
        '#F59771',
        '#F5718D',
        '#9DC855',
        '#E06895',
        '#EEA99D',
        '#79E898'
    ],

    map: [
        '#3ed4ff', '#ffa022', '#a6c84c'
    ]
}