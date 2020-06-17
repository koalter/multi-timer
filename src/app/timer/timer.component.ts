import { Component, OnInit } from '@angular/core';
import { Counter } from '../Counter';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  hours: number[] = Array<number>(24).fill(null);
  minutes: number[] = Array<number>(60).fill(null);
  seconds: number[] = Array<number>(60).fill(null);
  counterList: Counter[] = [];
  counterListIndex = 0;

  hour: string = '00';
  minute: string = '00';
  second: string = '00';

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < this.hours.length; i++) {
      this.hours[i] = i;
    }
    for (let i = 0; i < this.minutes.length; i++) {
      this.minutes[i] = i;
      this.seconds[i] = i;
    }
  }

  hourChangeHandler(e) {
    // console.log(e.target.value);
    this.hour = e.target.value;
  }

  minuteChangeHandler(e) {
    // console.log(e.target.value);
    this.minute = e.target.value;
  }

  secondChangeHandler(e) {
    // console.log(e.target.value);
    this.second = e.target.value;
  }

  newTimer() {
    let newList = this.counterList.slice();
    let timer: Counter;
    
    if (parseInt(this.second) > 0 || parseInt(this.minute) > 0 || parseInt(this.hour) > 0) {
      timer = { 
        seconds: parseInt(this.second)+parseInt(this.minute)*60+parseInt(this.hour)*60*60, 
        interval: setInterval(() => {
          if (timer.seconds > 0) timer.seconds--;
          else clearInterval(timer.interval);
        }, 1000) 
      };
      newList.push(timer);
      
      this.counterList = newList;
    }
  }

  toTimeString(time: Counter) {
    let seconds = time.seconds;
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;

    let convertedString = hours.toLocaleString(undefined, { minimumIntegerDigits: 2, maximumFractionDigits: 0 })+":"+minutes.toLocaleString(undefined, { minimumIntegerDigits: 2, maximumFractionDigits: 0  })+":"+seconds.toLocaleString(undefined, { minimumIntegerDigits: 2, maximumFractionDigits: 0  });
    // console.log(convertedString);
    return convertedString;
  }
}
