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
  }
  return true;
};

//监听type事件
EventEmeitter.prototype.on = function(type, fn) {
  // 将type事件和对应的fn放入存储池
  if (!this._events.get(type)) {
    this._events.set(type, fn);
  }
};

const emitter = new EventEmeitter();
emitter.on("hello", name => {
  console.log(`hello ${name}`);
});
emitter.emit("hello", "yoki");
//但是这里有个问题，如果我监听多个呢
emitter.on("hello", name => {
  console.log(`hi ${name}`);
});
//结果只会触发hello yoki，下个版本支持多个监听者
