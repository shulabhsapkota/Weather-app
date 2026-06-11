const search = document.querySelector("i");
const input = document.querySelector("input");
const dark = document.querySelector(".container");

search.addEventListener("click", (e) => {
  input.style.display = "block";

  dark.style.setProperty(
    "--after-display",
    "block"
  );

  e.stopPropagation();
});

window.addEventListener("click", () => {
  input.style.display = "none";

  dark.style.setProperty(
    "--after-display",
    "none"
  );
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    input.style.display = "none";

    dark.style.setProperty(
      "--after-display",
      "none"
    );
  }
});

function formateTime(time) {
  const currentTime =
    new Date(time * 1000);

  const hours =
    currentTime.getHours();

  const minute =
    currentTime.getMinutes();

  const ampm =
    hours > 12 ? "PM" : "AM";

  const minutes =
    minute > 10
      ? minute
      : "0" + minute;

  return `${hours}:${minutes} ${ampm}`;
}