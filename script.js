const gifDiv = document.querySelector(".gif-div");
const buttonsDiv = document.querySelector(".tag-type");
const tag = "comedy";
const giphyKey = "WWHBrMJj1Hgki3ymLVjQR9GIIUOm1BHF";
const tenorKey = "AIzaSyC8Jun50qjfMipaE4D3_72_fx-tdHte1IA";
const tenorClientKey = "Tenor project";

if (!callGiphyAPI(tag)) callTenorAPI(tag);

function callGiphyAPI(tag) {
  // giphy api
  const result = fetch(
    `https://api.giphy.com/v1/gifs/random?api_key=${giphyKey}&tag=${encodeURIComponent(
      tag
    )}&rating=PG-13`
  )
    .then((res) => {
      if (!res) throw new Error("Something went wrong");
      return res.json();
    })
    .then((data) => {
      const { data: dataObj } = data;
      // console.log(data.images.original.url);
      if (!data) throw new Error("Something went wrong");
      gifDiv.innerHTML = `<img src="${dataObj?.images?.fixed_height?.url}" >`;
    })
    .catch((err) => alert(`${err.message}, please try again!`));
  if (!result) return;
}
function callTenorAPI(tag) {
  const result = fetch(
    `https://tenor.googleapis.com/v2/search?q=${tag}&key=${tenorKey}&client_key=${tenorClientKey}&random=true`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const dataRecieved = data.results && data.results[0];
      console.log(dataRecieved);
      console.log(dataRecieved.media_formats.gif.url);
      gifDiv.innerHTML = `<img src="${dataRecieved.media_formats.gif.url}" >`;
    })
    .catch((err) => alert("Something went wrong, please try again!"));
  if (!result) return;
}

buttonsDiv.addEventListener("click", function (e) {
  const tag = e.target.classList.value;
  console.log(e.target);
  console.log(e.target.classList);
  callGiphyAPI(tag);
  callTenorAPI(tag);
});

// "https://tenor.googleapis.com/v2/search?q=" +
//   search_term +
//   "&key=" +
//   apikey +
//   "&client_key=" +
//   clientkey +
//   "&limit=";
// url Async requesting function
