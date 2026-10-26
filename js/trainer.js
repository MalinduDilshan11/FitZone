
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};


ScrollReveal().reveal(".trainer__card", {
  ...scrollRevealOption,
  interval: 500,
});

