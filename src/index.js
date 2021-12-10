import "@fortawesome/fontawesome-free/js/all.js";

const results = document.querySelector(".radiolist-content");
const radioFooter = document.querySelector(".radio-footer");

fetch("https://teclead.de/recruiting/radios")
  .then((response) => response.json())
  .then((data) => {
    data.radios.map((radio) => {
      const radioInfo = `
      <div class="border-btm">
        <div class="radio">
          <button><h3>${radio.name}</h3></button>
          <p><strong>${radio.frequency}</strong></p>
        </div>
        <div class="show-info hide-box">
          <i class="fas fa-minus"></i>
          <img src="${radio.image}">
          <i class="fas fa-plus"></i>
        </div>
      </div>`;

      const footerInfo = `
      <div class="footer-text hide-box">
        <small>CURRENTLY PLAYING</small>
        <p><strong>${radio.name}</strong></p>
      </div>`;

      results.insertAdjacentHTML("beforeend", radioInfo);
      radioFooter.insertAdjacentHTML("beforeend", footerInfo);
    });
    const buttons = document.querySelectorAll("button");
    showComponent(buttons);
  });

const showComponent = (nodeArray) => {
  const array = Array.from(nodeArray);
  let lastClicked = "h";
  let counter = 0;
  array.map((button) => {
    button.addEventListener("click", (event) => {
      hideDivs();
      const imgDiv = button.parentNode.parentNode.lastElementChild;
      if (event.currentTarget.innerHTML === lastClicked && counter % 2 === 0) {
        imgDiv.classList.add("hide-box");
      } else {
        imgDiv.classList.remove("hide-box");
      }

      const footerDiv = Array.from(
        document.querySelector(".radio-footer").children
      );
      footerDiv.map((div) => {
        if (div.lastElementChild.innerHTML === event.currentTarget.innerHTML) {
          div.classList.remove("hide-box");
        }
      });
      if (event.currentTarget.innerHTML === lastClicked && counter % 2 == 0) {
        footerDiv.forEach((footer) => {
          footer.classList.add("hide-box");
        });
        console.log(footerDiv);
      }
      lastClicked = event.currentTarget.innerHTML;
      counter += 1;
    });
  });
};

const hideDivs = () => {
  const footerDiv = Array.from(
    document.querySelector(".radio-footer").children
  );
  const imgDivs = Array.from(
    document.querySelector(".radiolist-content").children
  );
  imgDivs.map((imgDiv) => {
    imgDiv.children[1].classList.add("hide-box");
  });
  footerDiv.map((element) => {
    element.classList.add("hide-box");
  });
};
