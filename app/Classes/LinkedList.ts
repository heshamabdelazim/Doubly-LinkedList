type myNode = Nodee | null | undefined;
export type product = { name: string; quantity: number; id: number };
// --------------------------------
class Nodee {
  data: product;
  nextP: myNode;
  preP: myNode;
  id: number;
  constructor(name: string, quantity: number = 1) {
    const UniqueID: number = Date.now() + Math.random();
    this.data = { id: UniqueID, name, quantity: quantity > 0 ? quantity : 1 };
    this.nextP = null;
    this.preP = null;
    this.id = UniqueID;
  }
  setQuantity(quantity: number) {
    if (quantity > 0) this.data.quantity = quantity;
  }
  setPreP(newN: myNode) {
    this.preP = newN;
  }
  setNextP(newN: myNode) {
    this.nextP = newN;
  }
}

// --------------------------------

export class LinkedList {
  head: myNode;
  tail: myNode;
  size: number = 0;
  constructor() {
    this.head = null;
    this.tail = null;
  }
  insert_first(productName: string, quantity: number): void {
    const nod = new Nodee(productName, quantity);
    if (this.head == null) {
      this.head = nod;
      this.tail = this.head;
      this.size++;
      return;
    }
    nod.nextP = this.head;
    this.head.preP = nod;
    this.head = nod;
    this.size++;
  }

  insert_end(productName: string, quantity: number): void {
    const nod = new Nodee(productName, quantity);
    if (this.tail == null) {
      this.tail = nod;
      this.head = this.tail;
      this.size++;
      return;
    }
    if (this.tail.preP == null) {
    }
    nod.preP = this.tail;
    this.tail.nextP = nod;
    this.tail = nod;
    this.size++;
  }

  traverse(): void {
    let current = this.head;
    while (current) {
      console.log("current- ", current.data);
      current = current.nextP;
    }
  }
  editProduct(id: number, quantity?: number): void {
    let target = this.nodeSearching(id);
    if (target && quantity) target.setQuantity(quantity);
    // target.data = {
    //   ...target?.data,
    //   quantity: quantity || target?.data.quantity,
    // };
  }

  toArray(): product[] {
    let arrResult: product[] = [];
    let current = this.head;
    while (current) {
      arrResult.push(current.data);
      current = current.nextP;
    }
    return arrResult;
  }
  private nodeSearching(id: number): myNode | undefined {
    // by traversing from both ends (head & tail)
    let beginning_current: myNode = this.head;
    let last_current: myNode = this.tail;
    while (beginning_current || last_current) {
      if (beginning_current?.id === id) return beginning_current;
      if (last_current?.id === id) return last_current;

      if (
        beginning_current === last_current ||
        (beginning_current?.nextP === last_current &&
          last_current?.preP === beginning_current)
      ) {
        return null;
      }
      beginning_current = beginning_current?.nextP;
      last_current = last_current?.preP;
    }
  }
  deleteNode(id: number): void {
    let target = this.nodeSearching(id);

    if (target === this.head && target === this.tail) {
      this.tail = null;
      this.head = null;
      return;
    }
    if (target === this.head) {
      this.head = this.head?.nextP;
      this.head?.setPreP(null);
      return;
    }
    if (target === this.tail) {
      this.tail = this.tail?.preP;
      this.tail?.setNextP(null);
      return;
    }

    target?.preP?.setNextP(target?.nextP);
    target?.nextP?.setPreP(target?.preP);
  }
}
export const y = new LinkedList();
y.insert_first("one", 1);
y.insert_first("two", 2);
y.insert_first("three", 3);
y.insert_first("four", 4);
// y.insert_end("one", 3);
// y.insert_end("two", 3);
// y.insert_first("three", 5);
// y.insert_end("four", 3);
// y.insert_first("five", 5);
// y.insert_end("six", 3);
// y.insert_first("seven", 5);
// y.insert_end("eight", 3);
// y.insert_first("nine", 5);
// y.insert_end("ten", 3);
// y.insert_first("eleven", 5);
// y.insert_end("twelve", 3);

let anyId = y.toArray()[2].id;
console.log(y.nodeSearching(anyId));
// y.editProduct(anyId, 9);
//eleven => nine => seven => five => three => one => two => four => six => eight => ten => twelve
// four => three => two => one
