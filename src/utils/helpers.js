export const formatPrice = (price) => {
    return new Intl.NumberFormat(
        'en-US',
        {
            style:'currency',
            currency:'USD'
        }
    ).format(price/100)
}

export const getUniqueValues = (data, type) => {
    let unique  = data.map((item)=>{
        return item[type]
    })
    if(type === 'colors'){
        unique = unique.flat() // .flat() is used to convert an array of array into an array of values (Its converts an array to values)
    }
    return ['all', ...new Set(unique)]
}
