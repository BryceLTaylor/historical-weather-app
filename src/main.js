const arguments = process.argv.slice(2);

if (arguments[0] === 'days-of-precip'){
    precipitation();
} else if (arguments[0] === 'max-temp-delta') {
    tempChange();
} else {
    console.log('invalid function.  Please use "days-of-precip" or "max-temp-delta" as your first argument');
}

function precipitation (){
    console.log('days of precipitation function');
}

function tempChange (){
    console.log('greatest temperature change function');
}
