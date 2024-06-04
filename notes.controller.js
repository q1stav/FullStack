const chalk = require("chalk");
const Note = require("./models/Note");

async function addNode(title, owner) {
  await Note.create({ title, owner });
  console.log(chalk.green("Note was added!"));
}
async function getNotes() {
  const notes = await Note.find();
  return notes;
}

async function removeNote(id, owner) {
  
  const result=await await Note.deleteOne({ _id: id, owner });

  if(result.matchedCount===0){
    throw new Error('No note to delete')
  }
}

async function editNote(id, newNote, owner) {
  const result=await Note.updateOne({ _id: id, owner }, { title: newNote });

  if(result.matchedCount===0){
    throw new Error('No note to edit')
  }
}

module.exports = {
  addNode,
  getNotes,
  removeNote,
  editNote,
};
