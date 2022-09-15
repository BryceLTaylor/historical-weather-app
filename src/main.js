const fs = require('fs');
const csv = require('csv-parser');

const arguments = process.argv.slice(2);
let city = getCity(arguments[1]);
let stationName = getStationName(city);

// console.log(`city: ${city}     stationName: ${stationName}`);

if (arguments[0] === 'days-of-precip') {
    precipitation();
} else if (arguments[0] === 'max-temp-delta') {
    tempChange();
} else {
    console.log('invalid function.  Please use "days-of-precip" or "max-temp-delta" as your first argument');
}

function precipitation () {
    // console.log(`days of precipitation function for city ${city}`);
    let daysCount = 0;
    fs.createReadStream('./data/noaa_historical_weather_10yr.csv')
        .pipe(csv())
        .on('data', (row) => {
            if (row.NAME === stationName) {
                if ((row.PRCP != 0) || (row.SNOW != 0)) {
                    daysCount++;
                } 
            }
        })
        .on('end', () => {
            let returnData = {'city': city, 'days_of_percip': (daysCount / 10)}
            console.log(JSON.stringify(returnData));
        });
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

function getStationName(city) {
    if (city === 'bos') {
        return "BOSTON, MA US";
    } else if (city === 'jnu'){
        return "JUNEAU AIRPORT, AK US";
    } else if (city === 'mia') {
        return "MIAMI INTERNATIONAL AIRPORT, FL US"
    } else {
        throw `an error has occured getting the station name from city ${city}`
    }
}