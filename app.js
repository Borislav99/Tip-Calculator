(function () {
  //varijable
  let form = document.querySelector(".form");
  let billInput = document.querySelector(".inputBill");
  let peopleInput = document.querySelector(".inputPeople");
  let percentInput = document.querySelector(".inputPercent");
  let resultsContainer = document.querySelector(".results-container");
  let resultsBill = document.querySelector(".totalBill");
  let resultsTip = document.querySelector(".totalTip");
  let resultsPerson = document.querySelector(".totalPerson");
  let feedback = document.querySelector(".feedback");
  //klase
  class UI {
    constructor() {
      this.loader = document.querySelector(".loader");
      this.calculating = document.querySelector(".calculating");
    }
    showFeedback(text) {
      feedback.classList.add("show");
      feedback.innerText = `${text}`;
      billInput.value = "";
      peopleInput.value = "";
      percentInput.value = 50;
      setTimeout(() => {
        feedback.classList.remove("show");
      }, 3000);
    }
    showLoader(bill, people, experience) {
      this.loader.classList.add("show");
      this.loader.classList.remove("hide");
      this.calculating.classList.add("show");
      this.calculating.classList.remove("hide");
      setTimeout(() => {
        this.calculate(bill, people, experience);
       this.loader.classList.remove("show");
       this.loader.classList.add("hide");
       this.calculating.classList.remove("show");
       this.calculating.classList.add("hide");
      }, 3000);
    }
    calculate(bill, people, experience) {
      let percent = 0;
      if (experience <= 30) {
        percent = 0.02;
      } else if (experience <= 60) {
        percent = 0.1;
      } else if (experience > 60) {
        percent = 0.2;
      }
      let totalTip = bill * percent;
      let totalBill = bill + totalTip;
      let split = totalBill / people;
      this.showResults(totalTip, totalBill, split);
    }
    showResults(tip, bill, split) {
     resultsContainer.classList.remove('hide');
     resultsContainer.classList.add('show');
     tip = tip.toFixed(2);
     bill = bill.toFixed(2);
     split = split.toFixed(2);
     resultsTip.innerText = `${tip} $`;
     resultsBill.innerText = `${bill} $`;
     resultsPerson.innerText = `${split} $`;
     setTimeout(()=>{
      resultsContainer.classList.add('hide');
      resultsContainer.classList.remove('show');
     },5000)
    }
    clear() {
      billInput.value = "";
      peopleInput.value = "";
      percentInput.value = "";
    }
  }
  //eventi
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let ui = new UI();
    let bill = billInput.value;
    let people = peopleInput.value;
    let experience = percentInput.value;
    if (
      bill === 0 ||
      bill <= 0 ||
      bill === "" ||
      people === 0 ||
      people <= 0 ||
      people === ""
    ) {
      ui.showFeedback("Values must be valid");
    } else {
      ui.showLoader(parseInt(bill), parseInt(people), parseInt(experience));
      ui.clear();
    }
  });
})();
