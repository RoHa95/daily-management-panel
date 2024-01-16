const picInput = document.querySelector("#file-input");
const imageContainer = document.querySelector(".images-container");

class PicView {
  allImage;
  constructor(allImage) {
    this.allImage = allImage;
    this.createPicList(this.allImage);
    console.log(allImage);
    if (this.allImage.length < 1) {
      imageContainer.innerHTML = `<p class="image-container-title">Please upload pictures of your dreams here to motivate you.</p>`;
    }
    picInput.addEventListener("change", (e) => {
      if (this.allImage.length > 3) {
        return;
      }
      console.log(typeof e.target.files[0]);
      const url = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        localStorage.setItem("image", reader.result);
        this.allImage.push(reader.result);
        localStorage.setItem("pic2", JSON.stringify(this.allImage));
        this.createPicList(this.allImage);
        this.allImage = JSON.parse(localStorage.getItem("pic2")) || [];
      });
      if (url) {
        reader.readAsDataURL(url);
      }
      console.log(this.allImage);
    });
  }
  createPicList(allImage) {
    let result = ``;
    const imageContainer = document.querySelector(".images-container");
    // const allImage = JSON.parse(localStorage.getItem("pic2")) || [];
    console.log(allImage);
    if (!allImage) {
      imageContainer.innerHTML = `<p class="image-container-title">Please upload pictures of your dreams here to motivate you.</p>`;
      return;
    } else {
      allImage.forEach((p, index) => {
        result += `<div class="image-delete-container">
        <image src=${p} id="image-qoal"></image>
        <span class="delete-btn"><i id="delete-pic-btn" data-del-id=${index} class="far fa-trash-alt"></i> </span>
      </div>`;
        console.log("hi");
      });
      imageContainer.innerHTML = result;
      const deleteBtns = document.querySelectorAll("#delete-pic-btn");
      deleteBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          console.log("salam");
          console.log(e.target.dataset.delId);
          const id = e.target.dataset.delId;
          // const allImage = JSON.parse(localStorage.getItem("pic2"));
          const dellImage = allImage.filter((p, index) => {
            return index != id;
          });
          localStorage.setItem("pic2", JSON.stringify(dellImage));
          this.allImage = JSON.parse(localStorage.getItem("pic2")) || [];
          this.createPicList(this.allImage);
          if (this.allImage.length < 1) {
            imageContainer.innerHTML = `<p class="image-container-title">Please upload pictures of your dreams here to motivate you.</p>`;
          }
        });
      });
    }
  }
}
export default PicView;
