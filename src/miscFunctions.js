let createArray = (dimension) => {
    const numArray = new Array(Math.pow(dimension, 2));
    const numArrayRandom = new Array(Math.pow(dimension, 2));
    
    for(let i = 0; i < numArray.length; i++) {
      numArray[i] = i+1;
    }
    
    let counter = 0;
    let rnd = 0;

    while (numArray.length > 0) {
      rnd = Math.floor(Math.random() * numArray.length);
      numArrayRandom[counter] = numArray.splice(rnd, 1)[0];
      counter++;
    }
    return numArrayRandom;
}

const clickedNums = {startTime: "", results: []};

let getEffectiveTime = (clickTime) => {
    let startMeasurements = clickedNums.startTime.split(":");
    let clickMeasurements = clickTime.split(":");

    let minutes = clickMeasurements[0] - startMeasurements[0]
    if(startMeasurements[0] < 59 && clickMeasurements[0] === 0){
        let minutes = 1;
    }

    let seconds = clickMeasurements[1] - startMeasurements[1];
    let milliseconds = clickMeasurements[2] - startMeasurements[2];

    if (milliseconds < 0) {
        seconds--;
        milliseconds += 1000;
    }
    if(seconds < 0) {
        minutes--;
        seconds += 60;
    }
    return `${minutes}:${seconds}:${milliseconds}`;
}

let getTime = () => {
  let date = new Date();
  let time = `${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
  return getEffectiveTime(time);
}

let elemClicked = (id, value, cb) => {
  cb(true);
  clickedNums.results.push({id:id, value: value, time: getTime()});
}

export { createArray, elemClicked, clickedNums };