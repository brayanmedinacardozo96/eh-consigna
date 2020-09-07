import { Injectable } from '@angular/core';

@Injectable()
export class DateValidationervice {

  constructor() { }

  getYearMounthDay(date){
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  validateDateRequest(){
    var date = new Date('2020-17-07');

    
  }

  getYear(){
    return [
      1960,1961,1962,1963,1964,1965,1966,1967,1968,1969
      ,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979
      ,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989
      ,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999
      ,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009
      ,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019
      ,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029
      ,2030,2031,2032,2033,2034,2035,2036,2037,2038,2039
      ,2040,2041,2042,2043,2044,2045,2046,2047,2048,2049
      ,2050,2051,2052,2053,2054,2055,2056,2057,2058,2059
      ,2060,2061,2062,2063,2064,2065,2066,2067,2068,2069
      ,2070,2071,2072,2073,2074,2075,2076,2077,2078,2079
      ,2080,2081,2082,2083,2084,2085,2086,2087,2088,2089
      ,2090,2091,2092,2093,2094,2095,2096,2097,2098,2099
      ,2100,2101,2102,2103,2104,2105,2106,2107,2108,2109
      ,2110,2111,2112,2113,2114,2115,2116,2117,2118,2119
      ,2120,2121,2122,2123,2124,2125,2126,2127,2128,2129
      ,2130,2131,2132,2133,2134,2135,2136,2137,2138,2139
      ,2140,2141,2142,2143,2144,2145,2146,2147,2148,2149
      ,2150
    ]
  }

  getSelectCurrentDate(reverse = false){
    let dataYear = this.getYear();
    let arrgReturn = [];
    let fullYear = new Date();
    let date = fullYear.getFullYear().toString();

    //recorre las fechas, teniendo encuenta que las fechas vienen de mayor a menor
    for (let value of dataYear){

        arrgReturn.push(value);

        if(value.toString() == date){
            break;
        }
    }
    if(reverse){
      arrgReturn.reverse()
    }
    return arrgReturn;
  }


}
