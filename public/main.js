const validColors = ["red", "green", "blue", "white", "black"];

window.addEventListener("message", (e) => {
  if (!e.isTrusted || e.data.action !== "MICROCMS_GET_DEFAULT_DATA") {
    return;
  }

  document.getElementById("contentId").value = e.data.id;

  if (!e.data.message || !e.data.message.data) {
    return;
  }
  if (!validColors.includes(e.data.message.data.favoriteColor)) {
    return;
  }

  document.getElementById(e.data.message.data.favoriteColor).checked = true;
});

document.getElementById("color-picker").addEventListener("change", (event) => {
  if (event.target.type === "radio") {
    chooseFavoriteColor(event.target.value);
  }
});

function chooseFavoriteColor(color) {
  const id = document.getElementById("contentId").value;
  const parentURL = new URLSearchParams(window.location.search).get(
    "parentURL",
  );

  window.parent.postMessage(
    {
      id: id,
      action: "MICROCMS_POST_DATA",
      message: {
        title: color,
        description: "Favorite color",
        updatedAt: new Date().toISOString(),
        data: {
          favoriteColor: color,
        },
      },
    },
    parentURL,
  );
}
