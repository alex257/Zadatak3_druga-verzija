//about

const track = document.querySelector(".about__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".about__button--right");
const prevButton = document.querySelector(".about__button--left");

const memberList = document.querySelector(".about__member-table");
const memberText = document.querySelector(".about__member-text");

const slideSize = slides[0].getBoundingClientRect();
const slideWidth = slideSize.width;

//tour
const timetable = document.querySelector(".tour__timetable");
const timetableSlide = Array.from(timetable.children);

const tourNextArrow = document.querySelector(".tour__arrow--right");
const tourPrevArrow = document.querySelector(".tour__arrow--left");

const timetableSlideSize = timetableSlide[0].getBoundingClientRect();
const timetableSlideWidth = timetableSlideSize.width;


//arrange the slides next to one another
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};
slides.forEach(setSlidePosition);

//arrange timetable slides next to one another
const setTimetableSlidePosition = (slide, index) => {
  slide.style.left = timetableSlideWidth * index + "px";
};
timetableSlide.forEach(setTimetableSlidePosition);

//move slides
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-' + targetSlide.style.left + ')";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

//move timetable slide
const moveToTimetableSlide = (timetable, currentSlide, targetSlide) => {
  timetable.style.transform = "translateX(-' + targetSlide.style.left + ')";
  currentSlide.classList.remove("tour__date-column--active");
  currentSlide.classList.add("tour__date-column--future");
  targetSlide.classList.add("tour__date-column--active");
};

//move active member name and role in the table
const moveToMember = (currentMember, targetMember) => {
  currentMember.classList.remove("about__name-role--active");
  targetMember.classList.add("about__name-role--active");
};

//move text description about each member
const moveText = (currentText, targetText) => {
  currentText.classList.remove("about__text--active");
  targetText.classList.add("about__text--active");
};

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
};

//when click right move slides to the right

nextButton.addEventListener("click", e => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  //const amountToMove = nextSlide.style.left;
  //console.log(amountToMove);
  const nextIndex = slides.findIndex(slide => slide === nextSlide); //find index number for slide

  const currentMember = memberList.querySelector(".about__name-role--active");
  const nextMember = currentMember.nextElementSibling;

  const currentText = memberText.querySelector(".about__text--active");
  const nextText = currentText.nextElementSibling;

  moveToSlide(track, currentSlide, nextSlide);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
  moveToMember(currentMember, nextMember);
  moveText(currentText, nextText);
});

//when click left move slides to the left
prevButton.addEventListener("click", e => {
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);

  const currentMember = memberList.querySelector(".about__name-role--active");
  const prevMember = currentMember.previousElementSibling;

  const currentText = memberText.querySelector(".about__text--active");
  const prevText = currentText.previousElementSibling;

  moveToSlide(track, currentSlide, prevSlide);

  hideShowArrows(slides, prevButton, nextButton, prevIndex);

  moveToMember(currentMember, prevMember);

  moveText(currentText, prevText);
});

//tour when click right move slides to the right

tourNextArrow.addEventListener("click", e => {
  const currentSlide = timetable.querySelector(".tour__date-column--active");
  const nextSlide = currentSlide.nextElementSibling;
  const nextIndex = timetableSlide.findIndex(slide => slide === nextSlide); //find index number for slide
  moveToTimetableSlide(timetable, currentSlide, nextSlide);
});

//tour when click left move slides to the left
tourPrevArrow.addEventListener("click", e => {
  const currentSlide = timetable.querySelector(".tour__date-column--active");
  const prevSlide = currentSlide.previousElementSibling;
  const prevIndex = timetableSlide.findIndex(slide => slide === prevSlide);

  moveToTimetableSlide(timetable, currentSlide, prevSlide);
});

