const picInput = document.querySelector("#file-input");
const imageContainer = document.querySelector(".images-container");
class PicView {
  constructor() {
    const allImage = JSON.parse(localStorage.getItem("pic2")) || [];
    if (allImage.length < 1) {
      imageContainer.innerHTML = `<p class="image-container-title">Please upload pictures of your dreams here to motivate you.</p>`;
    }
    picInput.addEventListener("change", (e) => {
      if (allImage.length > 3) {
        return;
      }
      console.log(typeof e.target.files[0]);
      const url = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        localStorage.setItem("image", reader.result);
        allImage.push(reader.result);
        // PicApi.savePic(reader.result);
        localStorage.setItem("pic2", JSON.stringify(allImage));
        this.createPicList();
      });
      if (url) {
        reader.readAsDataURL(url);
      }
      console.log(allImage);
      // this.createPicList();
    });

    // this.createPicList();
  }
  createPicList() {
    let result = ``;
    const imageContainer = document.querySelector(".images-container");
    const allImage = JSON.parse(localStorage.getItem("pic2"));
    console.log(allImage);
    if (!allImage) {
      return;
    } else {
      allImage.forEach((p) => {
        result += `<image src=${p}></image>`;
        console.log("hi");
      });
      imageContainer.innerHTML = result;
    }
  }
}
export default new PicView();
