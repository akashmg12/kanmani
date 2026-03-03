let papers = document.querySelectorAll(".paper");
let currentIndex = papers.length - 1; // Start from top paper
let highestZ = 1;

papers.forEach((paper, index) => {

  // Stack neatly
  paper.style.zIndex = index;
  paper.style.transform = `translate(0px, 0px) rotate(${index * 2 - 5}deg)`;

});

function enableDrag(paper) {

  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;
  let x = 0;
  let y = 0;

  const start = (clientX, clientY) => {
    dragging = true;
    paper.classList.add("dragging");
    paper.style.zIndex = highestZ++;

    offsetX = clientX - x;
    offsetY = clientY - y;
  };

  const move = (clientX, clientY) => {
    if (!dragging) return;

    x = clientX - offsetX;
    y = clientY - offsetY;

    paper.style.transform =
      `translate(${x}px, ${y}px) rotate(0deg)`;
  };

  const end = () => {
    if (!dragging) return;
    dragging = false;
    paper.classList.remove("dragging");

    // After dragging far enough → enable next paper
    if (Math.abs(x) > 150 || Math.abs(y) > 150) {
      currentIndex--;
      if (currentIndex >= 0) {
        enableDrag(papers[currentIndex]);
      }
    }
  };

  // Mouse
  paper.addEventListener("mousedown", e => {
    start(e.clientX, e.clientY);
  });

  window.addEventListener("mousemove", e => {
    move(e.clientX, e.clientY);
  });

  window.addEventListener("mouseup", end);

  // Touch
  paper.addEventListener("touchstart", e => {
    const touch = e.touches[0];
    start(touch.clientX, touch.clientY);
  }, { passive: false });

  window.addEventListener("touchmove", e => {
    if (dragging) e.preventDefault();
    const touch = e.touches[0];
    move(touch.clientX, touch.clientY);
  }, { passive: false });

  window.addEventListener("touchend", end);
}

// Start with top paper only
enableDrag(papers[currentIndex]);