// mergeSort function

// create an animations that has red for left > right, green for left < right, purple for completed bar
export function mergeSort(arr){
    const animations = [] // the hashmap contains bar index of compare and swap
    const array_copy = arr.slice()
    if (arr.length <= 1) {return arr;}
    mergeSortHelper(arr, array_copy, 0, arr.length - 1, animations);
    return animations
}


function mergeSortHelper(arr, array_copy, low, high, animations) {
    if (low < high) {
      const middle = Math.floor((low + high) / 2);
      mergeSortHelper(array_copy, arr, low, middle, animations);
      mergeSortHelper(array_copy, arr, middle + 1, high, animations);
      merge(arr, array_copy, low, middle, high, animations);
    }
  }
  
function merge(arr, array_copy, low, middle, high, animations) {
    // const left = arr.slice(low, middle + 1);
    // const right = arr.slice(middle + 1, high + 1);

    let leftIndex = low;
    let rightIndex = middle + 1;
    let currentIndex = low;
  
    while (leftIndex <= middle && rightIndex <= high) {

      // animations.push(['compare', leftIndex, rightIndex]);
      
      // animations.push([leftIndex, rightIndex]);
      if (array_copy[leftIndex] < array_copy[rightIndex]) {

        animations.push(['compare', leftIndex, rightIndex]);
        animations.push(['swap', currentIndex, array_copy[leftIndex]]);
        animations.push(['revert', leftIndex, rightIndex]);
        arr[currentIndex] = array_copy[leftIndex];
        leftIndex++;
      } else {
        
        animations.push(['compare', leftIndex, rightIndex]);
        animations.push(['swap', currentIndex, array_copy[rightIndex]]);
        animations.push(['revert', leftIndex, rightIndex]);
        arr[currentIndex] = array_copy[rightIndex];
        rightIndex++;
      }
      currentIndex++;
    }
  
    while (leftIndex <= middle) {

      animations.push(['compare', leftIndex, leftIndex]);
      animations.push(['swap', currentIndex, array_copy[leftIndex]]);
      animations.push(['revert', leftIndex, leftIndex]);
      arr[currentIndex] = array_copy[leftIndex];
      leftIndex++;
      currentIndex++;
    }
  
    while (rightIndex <= high) {

      animations.push(['compare', rightIndex, rightIndex]);
      animations.push(['swap', currentIndex, array_copy[rightIndex]]);
      animations.push(['revert', rightIndex, rightIndex]);
      arr[currentIndex] = array_copy[rightIndex];
      rightIndex++;
      currentIndex++;
    }
  }