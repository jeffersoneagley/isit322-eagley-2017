/**
 * Created by fish on 5/2/17.
 */

class ElfDebug {
  constructor(showDataInit = false) {
    this.showData = showDataInit;
  }

  getFirst(wrapper, element) {
    if (this.showData) {
      const paragraphData = wrapper.find(element).first().debug();
      console.log(paragraphData);
    }
  }

  getLast(wrapper, element) {
    if (this.showData) {
      const paragraphData = wrapper.find(element).last().debug();
      console.log(paragraphData);
    }
  }

  getAll(wrapper, element) {
    if (this.showData) {
      const paragraphData = wrapper.find(element).debug();
      console.log(paragraphData);
    }
  }
}

export default ElfDebug;
