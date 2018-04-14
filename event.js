//初始化class
class EventEmeitter {
  constructor() {
    this._events = this._events || new Map(); //使用map结构存储
    this._maxListeners = this._maxListeners || 10; //设定监听上限
  }
}

//监听与触发
//触发监听函数我们可以用apply与call两种方法,在少数参数时call的性能更好,多个参数时apply性能更好,当年Node的Event模块就在三个参数以下用call否则用apply

//触发type事件
EventEmeitter.prototype.emit = function(type, ...arg) {
  let handler;
  //从储存池拿
  handler = this._events.get(type);
  if (args.length > 0) {
    handler.apply(this, args);
  } else {
    handler.call(this);
  }
  return true;
};
