import GoalsApi from "./GoalsApi.js";
const selectGoals = document.querySelector(".select-goals");
const addNewGoalBtn = document.querySelector(".plus-container");
const changeBoard = document.querySelector(".change-board-container");

class GoalsView {
  constructor() {
    let value = "monthly";
    let result;
    this.createGoalsList(value);
    selectGoals.addEventListener("change", (e) => {
      value = e.target.value;
      //   if (value === "monthly") {
      //     console.log("monthly");
      //     const monthlyGoals = GoalsApi.getMonthlyGoals();
      //     monthlyGoals.forEach((goal) => {
      //       return (result += `<span class="goals-item">${goal.title}</span>`);
      //     });
      // const goalContainer = document.querySelector(".goals-text-container");
      // goalContainer.innerHTML = result;
      // addNewGoalBtn.addEventListener("click", (e) => {
      //   GoalsApi.saveManthlyGoals({ title: "salam khar" });
      // });
      //   } else if (value === "annual") {
      //     console.log("annual");
      //     const annualGoals = GoalsApi.getAnnualGoals();
      //     annualGoals.forEach((goal) => {
      //       return (result += `<span class="goals-item">${goal.title}</span>`);
      //     });
      //     const goalsView = document.querySelector(".goals-text-container");
      //     goalsView.innerHTML = result;
      // addNewGoalBtn.addEventListener("click", (e) => {
      //   GoalsApi.saveAnnualGoals({ title: "salam khar annual" });
      // });
      //   }
      this.createGoalsList(value);
    });
    addNewGoalBtn.addEventListener("click", (e) => {
      if (value === "annual") {
        const allGoals = GoalsApi.getAnnualGoals();
        if (allGoals.length > 2) {
          Toastify({
            text: "only set 3 goals!!!",
            style: {
              background: "linear-gradient(to right, #fa9191, #ee1313)",
            },
            duration: 1000,
          }).showToast();
          changeBoard.innerHTML = " ";
          changeBoard.classList.remove("toast-view");
          return;
        }
      } else if (value === "monthly") {
        const allGoals = GoalsApi.getMonthlyGoals();
        if (allGoals.length > 2) {
          Toastify({
            text: "only set 3 goals!!!",
            style: {
              background: "linear-gradient(to right, #fa9191, #ee1313)",
            },
            duration: 1000,
          }).showToast();
          changeBoard.innerHTML = " ";
          changeBoard.classList.remove("toast-view");
          return;
        }
      }
      // if (value === "monthly") {
      //   const example = { title: "salam khar" };
      //   console.log("monthly");
      //   return GoalsApi.saveManthlyGoals(example);
      //   this.createGoalsList("monthly");
      // } else if (value === "annual") {
      //   const example = { title: "salam khar annual" };
      //   console.log("annual");
      //   return GoalsApi.saveAnnualGoals(example);
      //   this.createGoalsList("annual");
      // }
      changeBoard.classList.add("toast-view");
      changeBoard.innerHTML = `<div class="goals-input-container">
      <input placeholder="please write something..." class="goals-input" type="text" />
      <select class="goals-priority-select">
        <option value="A">priority A</option>
        <option value="B">priority B</option>
        <option value="C">priority C</option>
      </select>
    </div>`;
      const goalInputContainer = document.querySelector(
        ".goals-input-container"
      );
      const goalinput = document.querySelector(".goals-input");
      const goalSelectPriority = document.querySelector(
        ".goals-priority-select"
      );
      goalinput.addEventListener("blur", (e) => {
        console.log(goalinput.value);
        if (!goalinput.value) {
          return;
        }
        if (goalinput.value.length > 50) {
          console.log("error");
          Toastify({
            text: "dont use more 30 character!!!",
            style: {
              background: "linear-gradient(to right, #fa9191, #ee1313)",
            },
            duration: 1000,
          }).showToast();
        } else {
          if (value === "annual") {
            GoalsApi.saveAnnualGoals({
              title: goalinput.value,
              priority: goalSelectPriority.value,
            });
            this.createGoalsList("annual");
            goalinput.value = " ";
            changeBoard.innerHTML = " ";
            changeBoard.classList.remove("toast-view");
          } else if (value === "monthly") {
            GoalsApi.saveManthlyGoals({
              title: goalinput.value,
              priority: goalSelectPriority.value,
            });
            this.createGoalsList("monthly");
            goalinput.value = " ";
            changeBoard.innerHTML = " ";
            changeBoard.classList.remove("toast-view");
          }
        }
      });
    });
  }
  createGoalsList(typeOfGoals = "monthly") {
    let result = ``;
    let value = "monthly";
    if (typeOfGoals === "monthly") {
      value = "monthly";
      const allGoals = GoalsApi.getMonthlyGoals();
      if (allGoals.length == 0) {
        result = `<span class="note-placeholder-container"><p class="note-placeholder">start add new goal!</p></span>`;
      } else {
        allGoals.forEach((goal) => {
          result += ` <div class="goals-item goals-item-container">
          <span>${goal.title}</span>
          <span  class="plus-container"
            ><i id="goal-delete-btns" data-delete-id=${goal.id}  class="far fa-trash-alt"></i
          ></span>
        </div>`;
        });
      }
    } else if (typeOfGoals === "annual") {
      value = "annual";
      const allGoals = GoalsApi.getAnnualGoals();
      if (allGoals.length == 0) {
        result = `<span class="note-placeholder-container"><p class="note-placeholder">start add new goal!</p></span>`;
      } else {
        allGoals.forEach((goal) => {
          result += ` <div class="goals-item goals-item-container">
          <span>${goal.title}</span>
          <span   class="plus-container"
            ><i id="goal-delete-btns" data-delete-id=${goal.id} class="far fa-trash-alt"></i
          ></span>
        </div>`;
        });
      }
    }
    const goalContainer = document.querySelector(".goals-text-container");
    goalContainer.innerHTML = result;
    const deleteBtns = document.querySelectorAll("#goal-delete-btns");
    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.dataset.deleteId;
        console.log("delete");
        if (value === "annual") {
          GoalsApi.deleteAnnualGoal(id);
          console.log(id);
          console.log("ok ann");
          this.createGoalsList("annual");
        } else if (value === "monthly") {
          GoalsApi.deleteMonthlyGoal(id);
          console.log("ok month");
          console.log(id);
          this.createGoalsList("monthly");
        }
      });
    });
  }
}
export default new GoalsView();
