class Queue<TElementType> {
  private _list: TElementType[];

  constructor(initial: TElementType[]) {
    this._list = initial;
  }

  // 入队
  enqueue<_TElementType extends TElementType>(
    ele: _TElementType
  ): TElementType[] {
    this._list.push(ele);
  }

  // 出队
  dequeue(): TElementType[] {}

  // 入队一个任意类型元素
  enqueueWithUnknownType<TType>(element: TType): (TElementType | TType)[] {}
}
