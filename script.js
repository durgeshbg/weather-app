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
  }
  const commonData = {
    name: rawData.location.name,
    region: rawData.location.region,
    country: rawData.location.country,
    localtime: rawData.location.localtime,
    is_day: rawData.current.is_day ? 'Day' : 'Night',
    condition_text: rawData.current.condition.text,
    condition_icon: rawData.current.condition.icon,
    wind_dir: rawData.current.wind_dir,
    wind_deg: rawData.current.wind_degree + '°',
    humidity: rawData.current.humidity + '%',
    cloud_cover: rawData.current.cloud + '%',
    uv_index: rawData.current.uv,
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
  writeDOM(processedData);
  e.target.reset();
  e.preventDefault();
}

async function handleChange(e) {
  e.target.classList.toggle('active');
  if (Array.from(e.target.classList).includes('active')) {
    const processedData = metricData();
    writeDOM(processedData);
  } else {
    const processedData = metricData((imperial = true));
    writeDOM(processedData);
  }
}

function writeDOM(processedData) {
  const container = document.querySelector('.container');
  const error = document.querySelector('.error');
  if (processedData.error) {
    container.style.display = 'none';
    error.style.display = '';
    error.textContent = 'Please select a valid location!';
    console.log(processedData);
  } else {
    container.style.display = '';
    error.style.display = 'none';
    // Location
    document.querySelector('.name').textContent = processedData.name;
    document.querySelector('.region').textContent = processedData.region;
    document.querySelector('.country').textContent = processedData.country;
    document.querySelector('.date').textContent = processedData.localtime.split(' ')[0];
    document.querySelector('.time').textContent = processedData.localtime.split(' ')[1];
    // Temperature
    document.querySelector('.temp').textContent = processedData.temp;
    document.querySelector('.text').textContent = processedData.condition_text;
    document.querySelector('.icon').src = 'https:' + processedData.condition_icon;
    // Wind
    document.querySelector('.wind-dir .value').textContent = processedData.wind_dir;
    document.querySelector('.wind-deg .value').textContent = processedData.wind_deg;
    document.querySelector('.wind-speed .value').textContent = processedData.wind_speed;
    document.querySelector('.humidity .value').textContent = processedData.humidity;
    document.querySelector('.cloud-cover .value').textContent = processedData.cloud_cover;
    // Atmosphere
    document.querySelector('.pressure .value').textContent = processedData.pressure;
    document.querySelector('.precip .value').textContent = processedData.precip;
    document.querySelector('.feels-like .value').textContent = processedData.feels_like;
    document.querySelector('.visibility .value').textContent = processedData.visibility;
    document.querySelector('.uv-index .value').textContent = processedData.uv_index;
  }
}

async function init() {
  rawData = await getData('rajahmundry');
  const processedData = metricData();
  writeDOM(processedData);
}

init();
document.querySelector('form').onsubmit = handleSubmit;
document.querySelector('.toggle').onclick = handleChange;
