// ES5 version
// function EventObserver() {
//   this.observers = [];
// }

// EventObserver.prototype = {
//   subscribe: function(fn){
//     this.observers.push(fn);
//     console.log(`You are subscribed to ${fn.name}`);
//   },
//   unsubscribe: function(fn){
//     this.observers =this.observers.filter(function(item){
//       if(item !== fn){
//         return item;
//       }
//     });
//     console.log(`You've just unsubscribed from ${fn.name}`);
//   },
//   fire: function() {
//     this.observers.forEach(function(item) {
//       item.call();
//     });
//   }
// };

class EventObserver {
  constructor(){
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);
    console.log(`You are subscribed to ${fn.name}`);
  }

  unsubscribe(fn) {
    this.observers =this.observers.filter(function(item){
      if(item !== fn){
        return item;
      }
    });
    console.log(`You've just unsubscribed from ${fn.name}`);
  }

  fire(){
    this.observers.forEach(function(item) {
      item.call();
    });
  }
}

const click = new EventObserver();

document.querySelector('.unsub-ms').addEventListener('click', function(){
  click.unsubscribe(showMilliseconds);
});

document.querySelector('.sub-ms').addEventListener('click', function(){
  click.subscribe(showMilliseconds);
});

document.querySelector('.unsub-s').addEventListener('click', function(){
  click.unsubscribe(showSeconds);
});

document.querySelector('.sub-s').addEventListener('click', function(){
  click.subscribe(showSeconds);
});

document.querySelector('.fire').addEventListener('click', function(){
  click.fire();
})

const showMilliseconds = function() {
  console.log(`Current Milliseconds: ${new Date().getMilliseconds()}`);
};

const showSeconds = function() {
  console.log(`Current Seconds: ${new Date().getSeconds()}`);
};