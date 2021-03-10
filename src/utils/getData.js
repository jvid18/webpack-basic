const getData = async (id) => {
  const apiURl = id ? `${process.env.API}${id}` : API;
  try {
    const response = await fetch(apiURl);
    const data = await response.json();
    return data.results[0];
  } catch (error) {
    console.error('Fetch Error', error);
  };
};

export default getData;
