function CalculateStars(data) {
    for (let business in data) {
        if (data[business].ratingCount > 0) {
            for (let i = 0; i <= 5; i++) {
                if (data[business].rating >= (i)) {
                    data[business].stars = i
                }
            }
        }
    }
    return data
}

export default CalculateStars

