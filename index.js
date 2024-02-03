const Ot = (inputDoc, cursorPos, operations) => {
  if (operations.length == 0) {
    return inputDoc;
  }
  const { op, chars, count } = operations[0];
  if (op === "insert") {
    return Ot(
      inputDoc.slice(0, cursorPos) + chars + inputDoc.slice(cursorPos),
      cursorPos + chars.length,
      operations.slice(1)
    );
  } else if (op === "delete") {
    try {
      if (cursorPos + count > inputDoc.length) {
        throw new Error("delete past end");
      }
      return Ot(
        inputDoc.slice(0, cursorPos) + inputDoc.slice(cursorPos + count),
        cursorPos,
        operations.slice(1)
      );
    } catch (e) {
      console.log(e.message);
      return e.message;
    }
  } else if (op === "skip") {
    try {
      if (cursorPos + count > inputDoc.length) {
        throw new Error("skip past end");
      }
      return Ot(inputDoc, cursorPos + count, operations.slice(1));
    } catch (e) {
      console.log(e.message);
      return e.message;
    }
  }
};

function isValid(stale, latest, otjson) {
  // this is the part you will write!
  // console.log("1", Ot(inputDoc, cursorPos, operations));
  // console.log("2", latest);
  // console.log(Ot(inputDoc, cursorPos, operations) === latest);
  const res = Ot(stale, 0, JSON.parse(otjson)) === latest;
  console.log(res);
  return res;
}

isValid(
  "Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.",
  "Repl.it uses operational transformations.",
  '[{"op": "skip", "count": 40}, {"op": "delete", "count": 47}]'
); // true

isValid(
  "Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.",
  "Repl.it uses operational transformations.",
  '[{"op": "skip", "count": 45}, {"op": "delete", "count": 47}]'
); // false, delete past end

isValid(
  "Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.",
  "Repl.it uses operational transformations.",
  '[{"op": "skip", "count": 40}, {"op": "delete", "count": 47}, {"op": "skip", "count": 2}]'
); // false, skip past end

isValid(
  "Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.",
  "We use operational transformations to keep everyone in a multiplayer repl in sync.",
  '[{"op": "delete", "count": 7}, {"op": "insert", "chars": "We"}, {"op": "skip", "count": 4}, {"op": "delete", "count": 1}]'
); // true

isValid(
  "Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.",
  "We can use operational transformations to keep everyone in a multiplayer repl in sync.",
  '[{"op": "delete", "count": 7}, {"op": "insert", "chars": "We"}, {"op": "skip", "count": 4}, {"op": "delete", "count": 1}]'
); // false

isValid(
  "Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.",
  "Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.",
  "[]"
); // true
