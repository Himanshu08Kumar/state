const matchList = document.querySelector("#match-list");
const find = async (e) => {
  e.preventDefault();
  const searchValue = e.target.value;
  const res = await fetch("../data/data.json");
  const states = await res.json();

  let matches = states.filter((state) => {
    const regex = new RegExp(`^${searchValue}`, "gi");
    return state.name.match(regex) || state.abbr.match(regex);
  });
  if (searchValue.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }
  outputHtml(matches);
};

const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
        <div class = "card card-body mb-1">
            <h4>${match.name}  (${match.abbr}) <span class = "text-info">${match.capital}</span></h4>
                <small>Lat: ${match.lat} / Long: ${match.lon}</small>
        </div>`
      )
      .join("");
    matchList.innerHTML = html;
  }
};

const search = document
  .querySelector("#search")
  .addEventListener("input", find);
