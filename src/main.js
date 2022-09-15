const fs = require('fs');
const csv = require('csv-parser');

const arguments = process.argv.slice(2);
let city = getCity(arguments[1]);
let stationName = getStationName(city);

if (arguments[0] === 'days-of-precip') {
    precipitation();
} else if (arguments[0] === 'max-temp-delta') {
    let minimumDate = '2010-01-01'; // dates are inclusive
    let maximumDate = '2019-12-31'; // dates are inclusive
    if (arguments[2] !== undefined) {
        if ((arguments[2] >= 2010) && (arguments[2] <= 2019)) {
            let year = arguments[2];
            if (arguments[3] === undefined) {
                minimumDate = year + '-01-01';
                maximumDate = year + '-12-31';
            } else {
                if ((arguments[3] >= 1) && (arguments[3] <= 12)) {
                    let month = arguments[3];
                    minimumDate = year + '-' + month + '-01';
                    maximumDate = year + '-' + month + '-31'; // I believe it's acceptable to use a date that is not possible here, i.e. for february
                } else {
                    throw 'invalid month.  Please choose a month between 1 and 12 as the fourth argument'
                }
            }
        } else {
            throw 'invalid year.  Please choose a year between 2010 and 2019 as the third argument';
        }
    }
    tempChange(minimumDate, maximumDate);
} else {
    console.log('invalid function.  Please use "days-of-precip" or "max-temp-delta" as your first argument');
}

function precipitation () {
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

function tempChange (dateMin, dateMax) {
    let maxDelta = 0;
    let maxDate = '0000-00-00';

    fs.createReadStream('./data/noaa_historical_weather_10yr.csv')
        .pipe(csv())
        .on('data', (row) => {
            if (row.NAME === stationName) {
                if ((row.DATE > dateMin) && (row.DATE < dateMax)) {
                    let delta = row.TMAX - row.TMIN;
                    if (delta > maxDelta) {
                        maxDelta = delta;
                        maxDate = row.DATE;
                    }
                }
            };
        })
        .on('end', () => {
            let returnData = {'city': city, 'date': maxDate, 'temp_change': maxDelta}
            console.log (JSON.stringify(returnData));
        })

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