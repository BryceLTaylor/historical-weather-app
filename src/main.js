const arguments = process.argv.slice(2);
let city = getCity(arguments[1]);

if (arguments[0] === 'days-of-precip') {
    precipitation();
} else if (arguments[0] === 'max-temp-delta') {
    tempChange();
} else {
    console.log('invalid function.  Please use "days-of-precip" or "max-temp-delta" as your first argument');
}

function precipitation () {
    console.log(`days of precipitation function for city ${city}`);
}

function tempChange () {
    console.log(`greatest temperature change function for city ${city}`);
}

function getCity (cityName) {
    switch (cityName){
        case 'bos':
            return 'bos';
            break;
        case 'jnu':
            return 'jnu';
            break;
        case 'mia':
            return 'mia';
            break;
        default:
            throw 'please include a valid city, bos, jnu, or mia, as the second argument';
            break;

    }
}