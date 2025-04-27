const makeImage = (url, height = 800, width = 800) => {
  const image = document.createElement("img");
  image.src = url;
  image.height = height;
  image.width = width;
  return image;
};

export default makeImage