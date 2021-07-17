export default function calculateZoom(latDifference) {

    if (latDifference < 0.025) {
        return 15
    } else if (latDifference < 0.035) {
        return 14.5
    }else if (latDifference < 0.045) {
        return 14
    } else if (latDifference < 0.07) {
        return 13.5
    } else if (latDifference < 0.9) {
        return 13
    } else if (latDifference < 0.14) {
        return 12.5
    } else if (latDifference < 0.8) {
        return 12
    } else if (latDifference < 0.35) {
        return 11
    } else if (latDifference < 0.7) {
        return 10
    } else {
        return 9 
    }

}