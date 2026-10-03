let duration = 1000;
let blocksContainer = document.querySelector(".blocks-container");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);


blocks.forEach((block, index) => {
  console.log(index);
  block.classList.add("is-flipped");
  block.style.order = orderRange[index];
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});
setTimeout(() => {
  for (i = 0; i < blocks.length; i++) {
    blocks[i].classList.remove("is-flipped");
  }
}, duration * 2);

function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  let allFlipped = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped"),
  );
  if (allFlipped.length === 2) {
    stopClicking();
    checkSelected(allFlipped[0], allFlipped[1]);
  }
}
function stopClicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}
function checkSelected(first, second) {
  let triesElement = document.querySelector(".tries span");
  if (first.dataset.power === second.dataset.power) {
    first.classList.remove("is-flipped");
    second.classList.remove("is-flipped");
    first.classList.add("has-matched");
    second.classList.add("has-matched");
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      first.classList.remove("is-flipped");
      second.classList.remove("is-flipped");
    }, duration);
  }
}
