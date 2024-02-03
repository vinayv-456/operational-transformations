# Operational Transformations (OT)

When people code together on shared code editor, everyone's code needs to be in sync. You have to see the same code as I do even though we're typing on different computers. The challenge is making sure we don't end up with a jumbled mess of text while we type together.

So in order to keep everyone's code in sync, a method called Operational Transformations, or OT can be used.

Think about OT like this: when you type, you can either insert text, delete text, or move your cursor to a new position (this is called skip in OT land). These actions are called operations, and they transform your document!

More concretely, you can look at an Operational Transformation as a function that takes in a document, a position within that document (like where your cursor is), and then either modifies the document at that position or skips to a new position.

## Examples

1. **Insert Operation:**
   - Input document: ""
   - Starting cursor position: 0
   - Operation: {"op": "insert", "chars": "Hello, human!"}
   - Output document: "Hello, human!"
   - Ending cursor position: 13

2. **Delete Operation:**
   - Input document: "What is up?"
   - Starting cursor position: 7
   - Operation: {"op": "delete", "count": 3}
   - Output document: "What is?"
   - Ending cursor position: 7
   (*Note: Delete operations are applied forward while keeping the cursor in place.*)

3. **Skip and Insert Operations:**
   - Input document: "Nice!"
   - Starting cursor position: 0
   - Operation (1): {"op": "skip", "count": 4}
   - Operation (2): {"op": "insert", "chars": " day"}
   - Output document: "Nice day!"
   - Ending cursor position: 8

In the final example, two transformations are applied consecutively, showcasing the versatility of Operational Transformations.
