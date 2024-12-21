const maps = {
  maptiler: {
    url: "https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=4gNWcAfO6xj7SYyWp2KI",
    attribution:
      '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  },
  satellite: {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    url: "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  },
};

export default maps;
