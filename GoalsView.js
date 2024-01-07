import GoalsApi from "./GoalsApi.js";
const selectGoals = document.querySelector(".select-goals");
const addNewGoalBtn = document.querySelector(".plus-container");
class GoalsView {
  constructor() {
    let value;
    let result;
    selectGoals.addEventListener("change", (e) => {
      value = e.target.value;
      if (value === "monthly") {
        console.log("monthly");
        const monthlyGoals = GoalsApi.getMonthlyGoals();
        monthlyGoals.forEach((goal) => {
          return (result += `<span class="goals-item">${goal.title}</span>`);
        });
        const goalContainer = document.querySelector(".goals-text-container");
        goalContainer.innerHTML = result;
        // addNewGoalBtn.addEventListener("click", (e) => {
        //   GoalsApi.saveManthlyGoals({ title: "salam khar" });
        // });
      } else if (value === "annual") {
        console.log("annual");
        const annualGoals = GoalsApi.getAnnualGoals();
        annualGoals.forEach((goal) => {
          return (result += `<span class="goals-item">${goal.title}</span>`);
        });
        const goalsView = document.querySelector(".goals-text-container");
        goalsView.innerHTML = result;
        // addNewGoalBtn.addEventListener("click", (e) => {
        //   GoalsApi.saveAnnualGoals({ title: "salam khar annual" });
        // });
      }
    });
    addNewGoalBtn.addEventListener("click", (e) => {
      if (value === "monthly") {
        const example = { title: "salam khar" };
        console.log("monthly");
        return GoalsApi.saveManthlyGoals(example);
      } else if (value === "annual") {
        const example = { title: "salam khar annual" };
        console.log("annual");
        return GoalsApi.saveAnnualGoals(example);
      }
    });
  }
}
export default new GoalsView();
