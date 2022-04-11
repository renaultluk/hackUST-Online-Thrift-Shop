import EMISSION_FACTORS from '../public/EmissionFactor.json';

const continentCode = (country)  => {
    switch (country.continent) {
        case 'Africa':
            return 'Africa';
        case 'Asia':
            return 'Asia';
        case ' Northern Europe':
            return 'NE';
        case 'North America (East Coast)':
            return 'NA(E)';
        case 'North America (West Coast)':
            return 'NA(W)';
        case 'South America':
            return 'SA';
        case 'Oceania':
            return 'Oceania';
        case 'Middle East':
            return 'ME';
        default:
            return 'Unknown';
    }
}

const getDistance = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

const oceanEmissionFactor = (start, destination) => {
    const startCode = continentCode(start);
    const destinationCode = continentCode(destination);
    const key1 = `${startCode}-${destinationCode}`;
    const key2 = `${destinationCode}-${startCode}`;

    const finalKey = EMISSION_FACTORS["ocean"]["dry"].hasOwnProperty(key1) ? key1 : key2;
    return EMISSION_FACTORS["ocean"]["dry"][finalKey];
}

const truckEmissionFactor = (type) => {
    return EMISSION_FACTORS["truck"][type];
}

const airEmisionFactor = (distance) => {
    return distance > 3700 ? EMISSION_FACTORS["air"]["long"] : EMISSION_FACTORS["air"]["short"];
}

export const shippingEmissions = (type, start, destination, weight) => {
    const distance = getDistance(start.lat, start.lng, destination.lat, destination.lng);
    const tonKM = weight * distance;

    const ef = () => {
        switch (type) {
            case 'air':
                return airEmisionFactor(distance);
            case 'ocean':
                return oceanEmissionFactor(start, destination);
            case 'truck':
                return truckEmissionFactor(type);
            case 'rail':
                return EMISSION_FACTORS["rail"];
            case 'barge':
                return EMISSION_FACTORS["barge"];
            default:
                return 0;
        }
    }

    return ef() * tonKM;
}

export const donationRewards = (weight) => {
    // const weightInKg = weight / 1000;
    const totalRewards = weight * 7.5;

    const numberOfFullVouchers = Math.floor(totalRewards / 15);
    const partialVoucherValue = totalRewards % 15;

    return { numberOfFullVouchers, partialVoucherValue };
}