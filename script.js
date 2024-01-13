let rawData = {};

async function getData(q) {
  const url = `https://api.weatherapi.com/v1/current.json?key=cc573d36cef54f8fa6524319241201&q=${q}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

function metricData(imperial = false) {
  if (rawData.error) {
    return {
      error: rawData.error.message,
    };
  } else if (Object.keys(rawData).length == 0) {
    return {
      error: 'Please select a location.',
    };
  }
  const commonData = {
    name: rawData.location.name,
    region: rawData.location.region,
    country: rawData.location.country,
    localtime: rawData.location.localtime,
    is_day: rawData.current.is_day ? 'Day' : 'Night',
    condition_text: rawData.current.condition.text,
    condition_icon: rawData.current.condition.icon.slice(2),
    wind_dir: rawData.current.wind_dir,
    wind_deg: rawData.current.wind_degree + '°',
    humidity: rawData.current.humidity + '%',
    could_cover: rawData.current.cloud + '%',
    uv: rawData.current.uv,
  };
  const m = {
    ...commonData,
    temp: rawData.current.temp_c + '°C',
    wind_speed: rawData.current.wind_kph + 'kph',
    pressure: rawData.current.pressure_mb + 'mb',
    precip: rawData.current.precip_mm + 'mm',
    feels_like: rawData.current.feelslike_c + '°C',
    visibility: rawData.current.vis_km + 'km',
  };
  const i = {
    ...commonData,
    temp: rawData.current.temp_f + '°F',
    wind_speed: rawData.current.wind_mph + 'mph',
    pressure: rawData.current.pressure_in + 'in',
    precip: rawData.current.precip_in + 'in',
    feels_like: rawData.current.feelslike_f + '°F',
    visibility: rawData.current.vis_miles + 'miles',
  };
  return imperial ? i : m;
}

async function handleSubmit(e) {
  const q = document.querySelector('input').value;
  rawData = await getData(q);
  const processedData = metricData();
  console.log(processedData);
  e.target.reset();
  e.preventDefault();
}

async function handleChange(e) {
  if (e.target.checked) {
    const processedData = metricData();
    console.log(processedData);
  } else {
    const processedData = metricData((imperial = true));
    console.log(processedData);
  }
}

document.querySelector('form').onsubmit = handleSubmit;
document.querySelector('#switch').onchange = handleChange;
