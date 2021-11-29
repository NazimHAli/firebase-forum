const getRandomImage = (width: number, height: number, query = "nature") => {
    return `https://loremflickr.com/${width}/${height}/${query}`;
};

export { getRandomImage };
