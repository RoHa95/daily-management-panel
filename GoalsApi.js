export default class GoalsApi {
  // annual goals
  static getAnnualGoals() {
    const allGoals = JSON.parse(localStorage.getItem("annualgoals")) || [];
    const sortedGoals = allGoals.sort((a, b) => {
      return new Date(a.createAt) > new Date(b.createAt) ? -1 : 1;
    });
    return sortedGoals;
  }
  static saveAnnualGoals(goalToSave) {
    const allGoals = GoalsApi.getAnnualGoals();
    goalToSave.id = new Date().getTime();
    goalToSave.createAt = new Date().toISOString();
    console.log(goalToSave);
    allGoals.push(goalToSave);
    localStorage.setItem("annualgoals", JSON.stringify(allGoals));
  }
  static deleteAnnualGoal(id) {
    const allGoals = GoalsApi.getAnnualGoals();
    const filteredGoals = allGoals.filter((goal) => goal.id != id);
    localStorage.setItem("annualgoals", JSON.stringify(filteredGoals));
  }
  //monthly goals
  static getMonthlyGoals() {
    const allGoals = JSON.parse(localStorage.getItem("monthlygoals")) || [];
    const sortedGoals = allGoals.sort((a, b) => {
      return new Date(a.createAt) > new Date(b.createAt) ? -1 : 1;
    });
    return sortedGoals;
  }
  static saveManthlyGoals(goalToSave) {
    const allGoals = GoalsApi.getMonthlyGoals();
    goalToSave.id = new Date().getTime();
    goalToSave.createAt = new Date().toISOString();
    console.log(goalToSave);
    allGoals.push(goalToSave);
    localStorage.setItem("monthlygoals", JSON.stringify(allGoals));
  }
  static deleteMonthlyGoal(id) {
    const allGoals = GoalsApi.getMonthlyGoals();
    const filteredGoals = allGoals.filter((goal) => goal.id != id);
    localStorage.setItem("monthlygoals", JSON.stringify(filteredGoals));
  }
}
