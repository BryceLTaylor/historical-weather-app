This is a simple cli tool that will return some weather data from a limited dataset.  To request the data, use the command like this:

`npm run historical_weather <function-name> [options]`

There are two functions available: `days-of-percip` and `max-temp-delta`

days-of-percip will give you the average days of percipitation, rain or snow, for the city averaged over a 10 year period.

max-temp-delta will give the day of largest temperature difference for the chosen city in the chosen date range.

Both take a city as their first option, which can be `bos`, `jnu`, or `mia` which represents Boston, MA, Juno, AK and Miami, FL respectively.

max-temp-delta take further arguments of a 4-digit year and a 2-digit month.  These arguments are optional, but if a month is given, a year is also required.

