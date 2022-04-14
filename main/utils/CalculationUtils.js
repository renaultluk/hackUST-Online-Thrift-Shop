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

const deg2rad = deg => (deg * Math.PI) / 180.0;

export const expectedDeliveryDate = (days) => {
    var result = new Date();
    result.setDate(result.getDate() + days);
    return result;
  }

const getDistance = (lat1, lon1, lat2, lon2) => {
    console.log(lat1, lon1, lat2, lon2)
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

export const truckingEmissions = (type, start, destination, weight) => {
    const MAX_DISTANCE = getDistance(WAREHOUSE_LOCATION.lat, WAREHOUSE_LOCATION.lng, 22.242942360107406, 114.06737188623028)
    const distance = getDistance(start.lat, start.lng, destination.lat, destination.lng);
    const tonKM = weight/1000 * distance; // in tons
    const emissions_in_kg = parseInt(TRUCKING_OPTIONS[type].emission_factor * tonKM);
    const days = parseInt(Math.ceil(Math.max(distance*TRUCKING_OPTIONS[type].days/MAX_DISTANCE, 2)));

    return [emissions_in_kg, days];
}

export const donationRewards = (weight) => {
    // const weightInKg = weight / 1000;
    const totalRewards = weight * 50;

    // const numberOfFullVouchers = Math.floor(totalRewards / 15);
    // const partialVoucherValue = totalRewards % 15;

    return totalRewards;
}

export const WAREHOUSE_LOCATION = {lat: 22.397581103157993, lng:114.19492642210231}

export const DISTRICT_COORDS = {
    'Select District' : {lat: null , lng: null},
    'Central and Western': {lat: 22.28076469715538, lng: 114.15903320124063},
    'Wan Chai' : {lat:22.278270456424615, lng:114.17467571563093},
    'Eastern' : {lat: 22.284884261694057, lng:114.21929993696509},
    'Southern' : {lat:22.247898484136645, lng:114.1613245628749},
    'Yau Tsim Mong' : {lat:22.319344990541552, lng:114.16968317079619},
    'Sham Shui Po': {lat:22.331508176812985, lng:114.15835109112398},
    'Kowloon City' : {lat:22.331380471294462,  lng:114.19367182044451},
    'Wong Tai Sin' : {lat:22.34265871953962,  lng:114.19417321451395},
    'Kwun Tong' : {lat:22.31059835308874,  lng:114.22473474768584},
    'Kwai Tsing' : {lat:22.359763334582585,  lng:114.12980380029856},
    'Tsuen Wan' : {lat:22.37287096930906,  lng:114.11567675832634},
    'Tuen Mun' : {lat:22.396496703042622,  lng:113.97538046267972},
    'Yuen Long' : {lat:22.44416407671028, lng: 114.0240829516915},
    'Northern' : {lat:22.506714946728852, lng: 114.12790644342668},
    'Tai Po' : {lat:22.4489870433572,  lng:114.16498935507279},
    'Sha Tin' : {lat:22.38470256547486,  lng:114.19866787580656},
    'Sai Kung' : {lat:22.382656150312368,  lng:114.26853204584881},
    'Islands': {lat:22.242942360107406, lng: 114.06737188623028},
}

export const TRUCKING_OPTIONS = {
    'Select Delivery' : {emission_factor: null , days: null},
    "Expedited": {emission_factor: 1200.0, days: 3},
    "Standard": {emission_factor: 600.0, days : 5},
    "Delayed": {emission_factor: 300.0, days: 14},
}