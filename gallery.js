// Reihenfolge wie in Dianas Alben (order-Screenshots)
const galleries = {
  standesamt: {
    title: "Standesamt",
    images: [
      { file: "standesamt-01.jpg", width: 339, height: 508 },
      { file: "standesamt-02.jpg", width: 339, height: 508 },
      { file: "standesamt-03.jpg", width: 339, height: 508 },
      { file: "standesamt-04.jpg", width: 339, height: 508 },
      { file: "standesamt-05.jpg", width: 339, height: 508 },
      { file: "standesamt-06.jpg", width: 339, height: 508 },
      { file: "standesamt-07.jpg", width: 339, height: 508 },
      { file: "standesamt-08.jpg", width: 339, height: 508 },
      { file: "standesamt-09.jpg", width: 339, height: 508 },
      { file: "standesamt-10.jpg", width: 339, height: 508 },
      { file: "standesamt-11.jpg", width: 508, height: 339 },
      { file: "standesamt-12.jpg", width: 339, height: 508 },
      { file: "standesamt-13.jpg", width: 339, height: 508 },
      { file: "standesamt-14.jpg", width: 339, height: 508 },
      { file: "standesamt-15.jpg", width: 339, height: 508 },
      { file: "standesamt-16.jpg", width: 339, height: 508 },
      { file: "standesamt-17.jpg", width: 339, height: 508 },
      { file: "standesamt-18.jpg", width: 339, height: 508 },
      { file: "standesamt-19.jpg", width: 508, height: 339 },
      { file: "standesamt-20.jpg", width: 339, height: 508 },
      { file: "standesamt-21.jpg", width: 339, height: 508 },
      { file: "standesamt-22.jpg", width: 508, height: 339 },
      { file: "standesamt-23.jpg", width: 339, height: 508 },
      { file: "standesamt-24.jpg", width: 339, height: 508 },
      { file: "standesamt-25.jpg", width: 339, height: 508 },
      { file: "standesamt-26.jpg", width: 339, height: 508 },
    ],
  },
  halbtag: {
    title: "Halbtagsreportage",
    images: [
      { file: "halbtag-01.jpg", width: 508, height: 339 },
      { file: "halbtag-02.jpg", width: 508, height: 339 },
      { file: "halbtag-03.jpg", width: 339, height: 508 },
      { file: "halbtag-04.jpg", width: 339, height: 508 },
      { file: "halbtag-05.jpg", width: 339, height: 508 },
      { file: "halbtag-06.jpg", width: 339, height: 508 },
      { file: "halbtag-07.jpg", width: 339, height: 508 },
      { file: "halbtag-08.jpg", width: 339, height: 508 },
      { file: "halbtag-09.jpg", width: 339, height: 508 },
      { file: "halbtag-10.jpg", width: 339, height: 508 },
      { file: "halbtag-11.jpg", width: 339, height: 508 },
      { file: "halbtag-12.jpg", width: 508, height: 339 },
      { file: "halbtag-13.jpg", width: 339, height: 508 },
      { file: "halbtag-14.jpg", width: 339, height: 508 },
      { file: "halbtag-15.jpg", width: 339, height: 508 },
      { file: "halbtag-16.jpg", width: 339, height: 508 },
      { file: "halbtag-17.jpg", width: 508, height: 339 },
      { file: "halbtag-18.jpg", width: 339, height: 508 },
      { file: "halbtag-19.jpg", width: 508, height: 339 },
      { file: "halbtag-20.jpg", width: 339, height: 508 },
      { file: "halbtag-21.jpg", width: 508, height: 339 },
      { file: "halbtag-22.jpg", width: 339, height: 508 },
      { file: "halbtag-23.jpg", width: 508, height: 339 },
      { file: "halbtag-24.jpg", width: 339, height: 508 },
      { file: "halbtag-25.jpg", width: 339, height: 508 },
      { file: "halbtag-26.jpg", width: 508, height: 339 },
      { file: "halbtag-27.jpg", width: 339, height: 508 },
      { file: "halbtag-28.jpg", width: 339, height: 508 },
      { file: "halbtag-29.jpg", width: 339, height: 508 },
      { file: "halbtag-30.jpg", width: 339, height: 508 },
      { file: "halbtag-31.jpg", width: 339, height: 508 },
      { file: "halbtag-32.jpg", width: 339, height: 508 },
      { file: "halbtag-33.jpg", width: 339, height: 508 },
      { file: "halbtag-34.jpg", width: 508, height: 339 },
      { file: "halbtag-35.jpg", width: 339, height: 508 },
      { file: "halbtag-36.jpg", width: 339, height: 508 },
      { file: "halbtag-37.jpg", width: 339, height: 508 },
      { file: "halbtag-38.jpg", width: 508, height: 339 },
      { file: "halbtag-39.jpg", width: 339, height: 508 },
      { file: "halbtag-40.jpg", width: 339, height: 508 },
      { file: "halbtag-41.jpg", width: 339, height: 508 },
    ],
  },
  ganztag: {
    title: "Ganztagsreportage",
    images: [
      { file: "ganztag-01.jpg", width: 508, height: 339 },
      { file: "ganztag-02.jpg", width: 508, height: 339 },
      { file: "ganztag-03.jpg", width: 339, height: 508 },
      { file: "ganztag-04.jpg", width: 339, height: 508 },
      { file: "ganztag-05.jpg", width: 508, height: 339 },
      { file: "ganztag-06.jpg", width: 339, height: 508 },
      { file: "ganztag-07.jpg", width: 508, height: 339 },
      { file: "ganztag-08.jpg", width: 339, height: 508 },
      { file: "ganztag-09.jpg", width: 339, height: 508 },
      { file: "ganztag-10.jpg", width: 508, height: 339 },
      { file: "ganztag-11.jpg", width: 339, height: 508 },
      { file: "ganztag-12.jpg", width: 339, height: 508 },
      { file: "ganztag-13.jpg", width: 508, height: 339 },
      { file: "ganztag-14.jpg", width: 339, height: 508 },
      { file: "ganztag-15.jpg", width: 339, height: 508 },
      { file: "ganztag-16.jpg", width: 508, height: 339 },
      { file: "ganztag-17.jpg", width: 339, height: 508 },
      { file: "ganztag-18.jpg", width: 508, height: 339 },
      { file: "ganztag-19.jpg", width: 508, height: 339 },
      { file: "ganztag-20.jpg", width: 339, height: 508 },
      { file: "ganztag-21.jpg", width: 339, height: 508 },
      { file: "ganztag-22.jpg", width: 508, height: 339 },
      { file: "ganztag-23.jpg", width: 339, height: 508 },
      { file: "ganztag-24.jpg", width: 339, height: 508 },
      { file: "ganztag-25.jpg", width: 339, height: 508 },
      { file: "ganztag-26.jpg", width: 339, height: 508 },
      { file: "ganztag-27.jpg", width: 339, height: 508 },
      { file: "ganztag-28.jpg", width: 339, height: 508 },
      { file: "ganztag-29.jpg", width: 339, height: 508 },
      { file: "ganztag-30.jpg", width: 508, height: 339 },
      { file: "ganztag-31.jpg", width: 508, height: 339 },
      { file: "ganztag-32.jpg", width: 508, height: 339 },
      { file: "ganztag-33.jpg", width: 339, height: 508 },
      { file: "ganztag-34.jpg", width: 339, height: 508 },
      { file: "ganztag-35.jpg", width: 508, height: 339 },
      { file: "ganztag-36.jpg", width: 508, height: 339 },
      { file: "ganztag-37.jpg", width: 339, height: 508 },
      { file: "ganztag-38.jpg", width: 339, height: 508 },
      { file: "ganztag-39.jpg", width: 339, height: 508 },
      { file: "ganztag-40.jpg", width: 508, height: 339 },
      { file: "ganztag-41.jpg", width: 339, height: 508 },
      { file: "ganztag-42.jpg", width: 339, height: 508 },
      { file: "ganztag-43.jpg", width: 339, height: 508 },
      { file: "ganztag-44.jpg", width: 339, height: 508 },
      { file: "ganztag-45.jpg", width: 339, height: 508 },
      { file: "ganztag-46.jpg", width: 339, height: 508 },
      { file: "ganztag-47.jpg", width: 339, height: 508 },
      { file: "ganztag-48.jpg", width: 339, height: 508 },
      { file: "ganztag-49.jpg", width: 339, height: 508 },
      { file: "ganztag-50.jpg", width: 339, height: 508 },
      { file: "ganztag-51.jpg", width: 508, height: 339 },
      { file: "ganztag-52.jpg", width: 339, height: 508 },
      { file: "ganztag-53.jpg", width: 339, height: 508 },
      { file: "ganztag-54.jpg", width: 339, height: 508 },
      { file: "ganztag-55.jpg", width: 339, height: 508 },
      { file: "ganztag-56.jpg", width: 339, height: 508 },
      { file: "ganztag-57.jpg", width: 339, height: 508 },
      { file: "ganztag-58.jpg", width: 339, height: 508 },
      { file: "ganztag-59.jpg", width: 339, height: 508 },
      { file: "ganztag-60.jpg", width: 339, height: 508 },
      { file: "ganztag-61.jpg", width: 339, height: 508 },
      { file: "ganztag-62.jpg", width: 339, height: 508 },
      { file: "ganztag-63.jpg", width: 339, height: 508 },
      { file: "ganztag-64.jpg", width: 339, height: 508 },
      { file: "ganztag-65.jpg", width: 339, height: 508 },
      { file: "ganztag-66.jpg", width: 339, height: 508 },
      { file: "ganztag-67.jpg", width: 339, height: 508 },
      { file: "ganztag-68.jpg", width: 339, height: 508 },
      { file: "ganztag-69.jpg", width: 339, height: 508 },
      { file: "ganztag-70.jpg", width: 339, height: 508 },
    ],
  },
};

Object.entries(galleries).forEach(([key, gallery]) => {
  const grid = document.querySelector(`[data-lookbook-grid="${key}"]`);

  const figures = gallery.images.map((source, index) => {
      const figure = document.createElement("figure");
      const image = document.createElement("img");

      image.src = `Samples/lookbook/${source.file}`;
      image.alt = `${gallery.title}, Moment ${index + 1}`;
      image.width = source.width;
      image.height = source.height;
      image.loading = key === "standesamt" && index < 4 ? "eager" : "lazy";
      image.decoding = "async";
      figure.append(image);
      return figure;
    });

  // Jedes Bild kommt in die gerade kürzeste Spalte, so bleibt die Reihenfolge zeilenweise lesbar.
  let arrangedColumns = 0;
  const arrange = () => {
    const columnCount = parseInt(getComputedStyle(grid).getPropertyValue("--lookbook-columns"), 10) || 4;
    if (columnCount === arrangedColumns) return;
    arrangedColumns = columnCount;

    const columns = Array.from({ length: columnCount }, () => {
      const column = document.createElement("div");
      column.className = "lookbook-grid__column";
      return column;
    });
    const heights = new Array(columnCount).fill(0);

    figures.forEach((figure, index) => {
      const source = gallery.images[index];
      const shortest = heights.indexOf(Math.min(...heights));
      columns[shortest].append(figure);
      heights[shortest] += source.height / source.width;
    });

    grid.replaceChildren(...columns);
    grid.classList.add("is-arranged");
  };

  arrange();
  window.addEventListener("resize", arrange);
});

const initialGallery = location.hash ? document.querySelector(location.hash) : null;
if (initialGallery) {
  document.fonts.ready.then(() => {
    document.documentElement.style.scrollBehavior = "auto";
    initialGallery.scrollIntoView();
    requestAnimationFrame(() => document.documentElement.style.removeProperty("scroll-behavior"));
  });
}
