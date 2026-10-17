const imageFiles = [
  { file: "DSC03001.jpg", width: 2400, height: 1600 },
  { file: "DSC04534-8.jpg", width: 1066, height: 1600 },
  { file: "DSC05186.jpg", width: 1066, height: 1600 },
  { file: "_DSC2467-8.jpg", width: 1600, height: 2400 },
  { file: "DSC05496.jpg", width: 1066, height: 1600 },
  { file: "DSC05010.jpg", width: 1066, height: 1600 },
  { file: "DSC00954-7.jpg", width: 1066, height: 1600 },
  { file: "DSC04190.jpg", width: 1066, height: 1600 },
  { file: "DSC03450.jpg", width: 1066, height: 1600 },
  { file: "_DSC2610-6.jpg", width: 2400, height: 1600 },
  { file: "DSC05224-6.jpg", width: 1200, height: 1800 },
  { file: "DSC04592.jpg", width: 1200, height: 1800 },
  { file: "20260724-DSC00703-3.jpg", width: 1200, height: 1800 },
  { file: "DSC05468-7.jpg", width: 1200, height: 1800 },
  { file: "DSC04850-8.jpg", width: 1200, height: 1800 },
  { file: "20260724-DSC01009-6.jpg", width: 1800, height: 1200 },
  { file: "DSC00811-3.jpg", width: 1200, height: 1800 },
  { file: "DSC04681.jpg", width: 1200, height: 1800 },
  { file: "DSC00975.jpg", width: 1200, height: 1800 },
  { file: "DSC05236.jpg", width: 1200, height: 1800 },
  { file: "_DSC2449-6.jpg", width: 1200, height: 1800 },
  { file: "DSC05528-8.jpg", width: 1200, height: 1800 },
  { file: "DSC05283.jpg", width: 1200, height: 1800 },
  { file: "DSC04604-7.jpg", width: 1200, height: 1800 },
];

const galleries = {
  standesamt: {
    title: "Standesamt",
    images: [0, 1, 2, 3, 4, 6, 8, 9, 10, 11, 12, 13, 16, 18, 20, 22],
  },
  halbtag: {
    title: "Halbtagsreportage",
    images: [2, 3, 5, 0, 4, 10, 12, 14, 15, 17, 19, 21, 23, 1, 8, 9, 13, 20],
  },
  ganztag: {
    title: "Ganztagsreportage",
    images: [16, 10, 1, 3, 12, 0, 4, 5, 14, 17, 2, 8, 15, 19, 7, 21, 22, 23, 9, 20],
  },
};

Object.entries(galleries).forEach(([key, gallery]) => {
  const grid = document.querySelector(`[data-lookbook-grid="${key}"]`);

  grid.replaceChildren(
    ...gallery.images.map((imageIndex, index) => {
      const source = imageFiles[imageIndex];
      const figure = document.createElement("figure");
      const image = document.createElement("img");

      image.src = `Samples/web/${source.file}`;
      image.alt = `${gallery.title}, Moment ${index + 1}`;
      image.width = source.width;
      image.height = source.height;
      image.loading = key === "standesamt" && index < 4 ? "eager" : "lazy";
      image.decoding = "async";
      figure.append(image);
      return figure;
    }),
  );
});

const initialGallery = location.hash ? document.querySelector(location.hash) : null;
if (initialGallery) {
  document.fonts.ready.then(() => {
    document.documentElement.style.scrollBehavior = "auto";
    initialGallery.scrollIntoView();
    requestAnimationFrame(() => document.documentElement.style.removeProperty("scroll-behavior"));
  });
}
