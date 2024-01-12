async function getData(q) {
  const url = `https://api.weatherapi.com/v1/current.json?key=cc573d36cef54f8fa6524319241201&q=${q}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

function metricData(data) {
  return {
    name: data.location.name,
    region: data.location.region,
    country: data.location.country,
    localtime: data.location.localtime,

    temp: data.current.temp_c + '°C',
    is_day: data.current.is_day ? 'Day' : 'Night',
    condition_text: data.current.condition.text,
    condition_icon: data.current.condition.icon.slice(2),

    wind_speed: data.current.wind_kph + 'kph',
    wind_dir: data.current.wind_dir,
    wind_deg: data.current.wind_degree + '°',

    pressure: data.current.pressure_mb + 'mb',
    precip: data.current.precip_mm + 'mm',

    humidity: data.current.humidity + '%',
    could_cover: data.current.cloud + '%',
    feels_like: data.current.feelslike_c + '°C',
    visibility: data.current.vis_km + 'km',
    uv: data.current.uv,
  };
}
function imperialData(data) {
  return {
    name: data.location.name,
    region: data.location.region,
    country: data.location.country,
    localtime: data.location.localtime,

    temp: data.current.temp_f + '°F',
    is_day: data.current.is_day ? 'Day' : 'Night',
    condition_text: data.current.condition.text,
    condition_icon: data.current.condition.icon.slice(2),

    wind_speed: data.current.wind_mph + 'mph',
    wind_dir: data.current.wind_dir,
    wind_deg: data.current.wind_degree + '°',

    pressure: data.current.pressure_in + 'in',
    precip: data.current.precip_in + 'in',

    humidity: data.current.humidity + '%',
    could_cover: data.current.cloud + '%',
    feels_like: data.current.feelslike_f + '°F',
    visibility: data.current.vis_miles + 'miles',
    uv: data.current.uv,
  };
}


