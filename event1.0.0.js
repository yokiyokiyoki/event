//增加一个移除监听函数的

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

//移除监听事件
EventEmeitter.prototype.off = function(type, fn) {
  const handler = this._events.get(type);
  //如果是函数，说明只监听了一次
  if (handler && typeof handler == "function") {
    this._events.delete(type, fn);
  } else {
    //如果handler是数组,那么要找到对应的fn才可以删除
    let index = -1;
    handler.forEach((handlerItem, handlerIndex) => {
      if (handlerI == fn) {
        index = handlerIndex;
      }
    });
    //如果找到匹配的函数
    if (index !== -1) {
      handler.splice(index, 1);
      //如果清除后只有一个函数，那么不能以数组形式保存，以单个函数
      if (handler.length === 1) {
        this._events.set(type, handler[0]);
      }
    } else {
      //如果没有找到，返回改实例
      return this;
    }
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
