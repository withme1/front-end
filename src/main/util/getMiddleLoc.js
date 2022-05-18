export const getMiddleLoc = (l1, l2) => {
    return {latitude: (l1.latitude + l2.latitude) / 2, longitude: (l1.longitude + l2.longitude) / 2};
}