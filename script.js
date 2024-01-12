async function getData(q) {
  const url = `https://api.weatherapi.com/v1/current.json?key=cc573d36cef54f8fa6524319241201&q=${q}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}



