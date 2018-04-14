//初始化class
class EventEmeitter {
  constructor() {
    this._events = this._events || new Map(); //使用map结构存储
    this._maxListeners = this._maxListeners || 10; //设定监听上限
  }
}

//监听与触发
//将后续监听函数放到一个数组

//触发type事件
EventEmeitter.prototype.emit = function(type, ...args) {
  let handler;
  //从储存池拿
  handler = this._events.get(type);
  if (Array.isArray(handler)) {
    //如果是一个数组，说明有多个监听函数，我们依次触发
    handler.forEach(item => {
      if (args.length > 0) {
        item.apply(this, args);
      } else {
        item.call(this);
      }
    });
  } else {
    //单个函数，直接触发
    if (args.length > 0) {
      handler.apply(this, args);
    } else {
      handler.call(this);
    }
  }
  return true;
};

//监听type事件
EventEmeitter.prototype.on = function(type, fn) {
  const handler = this._events.get(type); //获取对应函数
  if (!handler) {
    this._events.set(type, fn);
  } else if (handler && typeof handler == "function") {
    //如果本来已经有一个了,重新设置一下type的value
    this._events.set(type, [handler, fn]);
  } else {
    //如果本来就是数组
    handler.push(fn);
  }
};

const emitter = new EventEmeitter();
emitter.on("hello", name => {
  console.log(`hello ${name}`);
});

emitter.on("hello", name => {
  console.log(`hi ${name}`);
});
emitter.emit("hello", "yoki");
