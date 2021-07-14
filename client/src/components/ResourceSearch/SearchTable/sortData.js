export default function sortData(searchData) {
    let ratedData = []
    let unratedData = []

    for (let index in searchData) {
    if (searchData[index].rating) {
        ratedData.push(searchData[index])
    } else {
        unratedData.push(searchData[index])
    }
    }

    ratedData.sort((firstItem, secondItem) => {
        return secondItem.ratingCount - firstItem.ratingCount
    })

    ratedData.sort((firstItem, secondItem) => {
        return secondItem.rating - firstItem.rating
    })

    return ratedData.concat(unratedData)
}