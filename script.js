async function getData(q) {
  const url = `https://api.weatherapi.com/v1/current.json?key=cc573d36cef54f8fa6524319241201&q=${q}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

function metricData(data, imperial = false) {
  const commonData = {
    name: data.location.name,
    region: data.location.region,
    country: data.location.country,
    localtime: data.location.localtime,
    is_day: data.current.is_day ? 'Day' : 'Night',
    condition_text: data.current.condition.text,
    condition_icon: data.current.condition.icon.slice(2),
    wind_dir: data.current.wind_dir,
    wind_deg: data.current.wind_degree + '°',
    humidity: data.current.humidity + '%',
    could_cover: data.current.cloud + '%',
    uv: data.current.uv,
  };
  const m = {
    ...commonData,
    temp: data.current.temp_c + '°C',
    wind_speed: data.current.wind_kph + 'kph',
    pressure: data.current.pressure_mb + 'mb',
    precip: data.current.precip_mm + 'mm',
    feels_like: data.current.feelslike_c + '°C',
    visibility: data.current.vis_km + 'km',
  };
  const i = {
    ...commonData,
    temp: data.current.temp_f + '°F',
    wind_speed: data.current.wind_mph + 'mph',
    pressure: data.current.pressure_in + 'in',
    precip: data.current.precip_in + 'in',
    feels_like: data.current.feelslike_f + '°F',
    visibility: data.current.vis_miles + 'miles',
  };
  return imperial ? i : m;
}

async function handleSubmit(e) {
  const q = document.querySelector('input').value;
  const rawData = await getData(q);
  if (rawData.error) {
    console.log(rawData.error.message);
  } else {
    const processedData = metricData(rawData, true);
    console.log(processedData);
  }
  e.target.reset();
  e.preventDefault();
}
document.querySelector('form').onsubmit = handleSubmit;
