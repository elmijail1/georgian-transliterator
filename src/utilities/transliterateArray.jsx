export default function transliterateArray(initialArray, dictionary) {
    const finalArray = initialArray.map((item) => {
        return item.toUpperCase()
    })
    return finalArray
}