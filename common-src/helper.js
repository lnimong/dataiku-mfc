export const _helper_ = def => (data, overwrite) => {
    const default_val = def
    const debug = 
        (overwrite === true || overwrite === false)
        ? overwrite
        : default_val
    
    if (debug) console.log(data)
} 
