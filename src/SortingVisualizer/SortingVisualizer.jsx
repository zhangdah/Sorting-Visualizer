import React from 'react';
import './SortingVisualizer.css';
import {mergeSort} from './SortingAlgorithms.js'



export default class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);

    this.isPaused = false;
    

    this.state = {
        
        array: [] //main array
    };
}

    componentDidMount() {
        //reset the array everytime when the componet is reload or firstly load
        this.resetArray();
    }

    resetArray =() =>{
        // create an array with 100 random number from 5 to 1000 (5 is due to its ease of being visualized)
        const randomNumbers = [];
        for (let i = 0; i < 20; i++) {
            let randomNumber = getRandomNumber(5, 500);
            randomNumbers.push(randomNumber);
        }

        // this.setState({unsorted_array: randomNumbers.slice()});
        // reset the state of the new array
        this.setState({array: randomNumbers});
    }

    // revertArray =() =>{
      
    //   this.setState((this.state.unsorted_array) => return {array: this.state.unsorted_array});
    //   console.log(this.state.unsorted_array)
    //   console.log(this.state.array)
    // }

    testSortingAlgorithms() {
      for (let i = 0; i < 1; i++) {
        const array = [];
        const length = getRandomNumber(1, 10);
        for (let i = 0; i < length; i++) {
          array.push(getRandomNumber(-1000, 1000));
        }
        // const array = [11, 13, 2, 1]
        const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
        const mergeSortedArray = mergeSort(array.slice());
        console.log(array);
        console.log(mergeSortedArray);
        console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
      }
    }

    // display the animations
    MergeSortButton =(arr) =>{
      // this.setState({array: mergeSort(arr)});
      const animations = mergeSort(arr)
      for (let i = 0; i < animations.length; i++){
        const arrayBars = document.getElementsByClassName('bar');
        const indicator = animations[i][0]

        if (indicator === 'compare'){
          setTimeout(() => {
            const index1 = animations[i][1]
            const index2 = animations[i][2]
            arrayBars[index1].style.backgroundColor = 'red'
            arrayBars[index2].style.backgroundColor = 'red'
          }, i * 50);
        
        }else if (indicator === 'revert'){
          setTimeout(() => {
          const index1 = animations[i][1]
          const index2 = animations[i][2]
          arrayBars[index1].style.backgroundColor = 'steelblue'
          arrayBars[index2].style.backgroundColor = 'steelblue'
        }, i * 50);

        }else if (indicator === 'swap'){
          setTimeout(() => {
            const index1 = animations[i][1]
            const newHeight = animations[i][2]
            arrayBars[index1].style.height = `${newHeight}px`;
          }, i * 50);
        }
      
      }
      }


    render() {
        const {array} = this.state;

        return (
            <div>
            <div className="chart">
              {array.map((value, index) => (
                <div
                  className="bar"
                  key={index}
                  style={{height: value}}
                ></div>
              ))}
            </div>
            <button class="button" onClick={ () => this.resetArray()}>Reset Array</button>
            {/* <button class="button" onClick={ () => this.revertArray()}>Revert Array</button> */}
            <button class="button" onClick={ () => this.QuickSort(this.state.array)}>quick sort</button>
            <button class="button" onClick={ () => this.MergeSortButton(this.state.array)}>merge sort</button>
            <button class="button" onClick={ () => this.testSortingAlgorithms()}>Test</button>
            </div>
          );
        }}

// Function to generate a random number between a specified range
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Copy and paste
function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}