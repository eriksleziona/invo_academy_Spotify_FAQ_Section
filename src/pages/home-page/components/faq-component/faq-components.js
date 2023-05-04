export const FaqComponent = () => {
  // Get a reference to the .faq-component element
  const faqComponent = document.querySelector(".faq-component");

  // Get all .faq-question-partial elements within the .faq-component element
  const faqAllQuestions = faqComponent.querySelectorAll(
    ".faq-question-partial"
  );

  function listenToQuestionResize(faqQuestionToListen) {
    // Get the question element from the ResizeObserverEntry object
    // Since faqQuestionToListen is an array of ResizeObserverEntry objects and in our case
    // there is only one element in the array, we use [0] to get that element.
    // We then use .target to get the observed element itself.
    const faqQuestion = faqQuestionToListen[0].target;

    // Get the answer element for the question
    const faqAnswer = faqQuestion.querySelector(
      ".faq-question-partial__answer"
    );

    // Set the CSS variable --faq-answer-height to the height of the answer element
    faqQuestion.style.setProperty(
      "--faq-answer-height",
      `${faqAnswer.scrollHeight}px`
    );
  }

  function foldAllSiblingQuestions(clickedQuestion) {
    // Iterate through each question element
    faqAllQuestions.forEach((faqQuestionToFold) => {
      // If the question element is not the clicked question,
      // remove the "data-question-expanded" attribute from it
      if (faqQuestionToFold != clickedQuestion) {
        faqQuestionToFold.removeAttribute("data-question-expanded");
      }
    });
  }

  faqAllQuestions.forEach((faqSingleQuestion) => {
    new ResizeObserver(listenToQuestionResize).observe(faqSingleQuestion);
    // Add a click event listener to each question
    faqSingleQuestion.addEventListener("click", () => {
      // Call the function that will fold all sibling questions
      // and pass the clicked question as a parameter
      foldAllSiblingQuestions(faqSingleQuestion);
      // Toggle the 'data-question-expanded' attribute when the question is clicked
      faqSingleQuestion.toggleAttribute("data-question-expanded");
    });

    const faqAnswer = faqSingleQuestion.querySelector(
      ".faq-question-partial__answer"
    );

    // Add the CSS custom property '--faq-answer-height' for the answer element
    // Set its value to the scrollHeight property of the answer element,
    // which shows the full height of the element even when its current height is 0
    faqSingleQuestion.style.setProperty(
      "--faq-answer-height",
      `${faqAnswer.scrollHeight}px`
    );
  });
};
