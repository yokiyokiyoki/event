//初始化class
class EventEmeitter {
    constructor() {
      this._events = this._events || new Map(); //使用map结构存储
      this._maxListeners = this._maxListeners || 10; //设定监听上限
    }
  }