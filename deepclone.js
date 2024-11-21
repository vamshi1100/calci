export function deepClone(value) {
  if (value === null || typeof value !== "object") {
    return value; // Return primitives as is
  }

  // Handle arrays (deep clone all elements)
  if (Array.isArray(value)) {
    const arrayClone = [];
    value.forEach((item) => {
      arrayClone.push(deepClone(item));
    });
    return arrayClone;
  }

  // Handle plain objects (deep clone each property)
  if (typeof value === "object") {
    const objectClone = {};
    Object.keys(value).forEach((key) => {
      objectClone[key] = deepClone(value[key]);
    });
    return objectClone;
  }

  // Handle Map objects (deep clone both keys and values)
  if (value instanceof Map) {
    const mapClone = new Map();
    value.forEach((v, k) => {
      mapClone.set(deepClone(k), deepClone(v)); // Deep clone both keys and values
    });
    return mapClone; // Ensure that mapClone is a Map object
  }

  // Handle Set objects (deep clone all elements)
  if (value instanceof Set) {
    const setClone = new Set();
    value.forEach((v) => {
      setClone.add(deepClone(v));
    });
    return setClone;
  }

  // Handle Date objects
  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  // Handle RegExp objects
  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags);
  }

  return value; // Return non-object types (including functions)
}

console.log("*************nested objects************");

const originalObj = {
  name: "Bob",
  details: { age: 25, city: "New York" },
  function1: () => {
    console.log(234);
  },
};
const clonedObj = deepClone(originalObj);

console.log(clonedObj); // { name: "Bob", details: { age: 25, city: "New York" } }
console.log(originalObj.details === clonedObj.details); // false (nested object is also cloned)

// console.log("*************map************");

// const originalMap = new Map();
// originalMap.set("key1", { a: 1 });
// originalMap.set("key2", [2, 3]);

// const clonedMap = deepClone(originalMap);

// console.log(clonedMap); // Map { 'key1' => { a: 1 }, 'key2' => [ 2, 3 ] }
// console.log(originalMap === clonedMap); // false (they are different Map objects)
// console.log(originalMap.get("key1") === clonedMap.get("key1")); // false (nested object is cloned)

// console.log("*************set************");

// const originalSet = new Set([1, 2, 3, { x: 10 }]);
// const clonedSet = deepClone(originalSet);

// console.log(clonedSet); // Set { 1, 2, 3, { x: 10 } }
// console.log(originalSet === clonedSet); // false (they are different Set objects)
// console.log(originalSet.has({ x: 10 }) === clonedSet.has({ x: 10 })); // false (different objects)

// console.log("*************date************");

// const originalDate = new Date("2023-12-25T00:00:00Z");
// const clonedDate = deepClone(originalDate);

// console.log(clonedDate); // 2023-12-25T00:00:00.000Z
// console.log(originalDate === clonedDate); // false (they are different Date objects)

// console.log("*************regex************");

// const originalRegExp = /abc/i;
// const clonedRegExp = deepClone(originalRegExp);

// console.log(clonedRegExp); // /abc/i
// console.log(originalRegExp === clonedRegExp); // false (they are different RegExp objects)

// console.log("*************primitive data types************");

// const originalNull = null;
// const clonedNull = deepClone(originalNull);

// console.log(clonedNull); // null
// console.log(originalNull === clonedNull); // true (both are null)

// const originalNum = 42;
// const clonedNum = deepClone(originalNum);

// console.log(clonedNum); // 42
// console.log(originalNum === clonedNum); // true (both are primitive and equal)
