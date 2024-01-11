export default class PicApi {
  static getAllPic() {
    const allImage = JSON.parse(localStorage.getItem("pic2")) || [];
    return allImage;
  }
  static savePic(picToSave) {
    console.log(picToSave);
    const allImage = PicApi.getAllPic();
    console.log(allImage);
    const newImages = allImage.push(picToSave);
    //console.log(newImages);
    localStorage.setItem("pic2", JSON.stringify(newImages));
  }
  static deleteImage(id) {
    const allImage = PicApi.getAllPic();
    const filteredPic = allImage.filter((p, index) => {
      return index != id;
    });
    localStorage.setItem("pic2", JSON.stringify(filteredPic));
  }
}
