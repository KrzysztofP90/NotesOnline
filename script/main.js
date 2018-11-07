
function Note(title,content,id) {
    this.buttonClass = "remove";
    this.title = title;
    this.content = content;
    this.type = "textarea";
    this.titleId = "title";
    this.contentId = "note-content";
    this.id = id; 
}



function addListeners(){

    document.getElementById("add-note").addEventListener("click",addNote);

    buttonList = document.getElementsByClassName("remove");
    for (i = 0; i < buttonList.length; i++) {
        buttonList[i].addEventListener("click",function(){currentIdToRemove = this.id-1;removeNote();console.log("to"+this.id)});
    }
}



function initializeNotes() {
    readDataFromLocalStorage();
    displayNotes();
}



function readDataFromLocalStorage(){
    
    if (localStorage.getItem('notes') == null) {
        localStorage.setItem('notes', startJSONvalues);
    }
    stringJSON = localStorage.getItem('notes');
    
    arrayOfNotes = JSON.parse(stringJSON).notes;
}



function displayNotes() {
    
    for (let i = 0; i < arrayOfNotes.length; i++) {
        countOfNotes++;
        createNoteAsListItem(arrayOfNotes[i].title,arrayOfNotes[i].content);
    }
    
}



function addNote() {
    let id = arrayOfNotes.length;
    console.log(id + "my new id");
    arrayOfNotes.push(new Note("EditMe!","EditMe!",id));
    countOfNotes++;
    
    createNoteAsListItem("EditMe!","EditMe!");
}



function createNoteAsListItem(title,content) {

    var newItem = document.createElement('li');

    var divNote = document.createElement('div');
    divNote.setAttribute("class","note");

    var buttonX = document.createElement('button');
    buttonX.setAttribute("class","remove");
    buttonX.setAttribute("id",countOfNotes);
    buttonX.innerText = "X";
    buttonX.addEventListener("click",function(){currentIdToRemove = this.id;removeNote();console.log("to"+this.id)});

    var titleArea = document.createElement('textarea');
    titleArea.setAttribute("class","title");
    titleArea.setAttribute("onkeyup","editNoteContentObjectsPropertyAfterKeyUp()");
    titleArea.value = title;

    var noteArea = document.createElement('textarea');
    noteArea.setAttribute("class","note-content");
    noteArea.setAttribute("onkeyup","editNoteContentObjectsPropertyAfterKeyUp()");
    noteArea.value = content;

    divNote.appendChild(buttonX);
    divNote.appendChild(titleArea);
    divNote.appendChild(noteArea);

    newItem.appendChild(divNote);

    var listOfNotes = document.getElementById("list-of-notes");
    listOfNotes.appendChild(newItem);
}



function removeNote() {
    arrayOfNotes.splice(currentIdToRemove,1);
    hideNote();
    refreshIdInNotes(); 
}



function hideNote() {
    document.getElementById(currentIdToRemove).parentElement.setAttribute("style","display: none");
    document.getElementById(currentIdToRemove).setAttribute("id","none");
}




function refreshIdInNotes() {
    noteList = document.getElementsByClassName("note");
    newId = 0;
    for (let i = 0; i < noteList.length; i++ ) {
        if (noteList[i].style.display == "none") {
            noteList[i].firstChild.removeAttribute("id");
        }
        else if (noteList[i].style.display != "none") {
            newId++;
            noteList[i].firstChild.setAttribute("id", newId);
            
        }
        
    }
}



function createJsonAndSaveToLocalStorage() {
    let jsonTosave = '{"notes":[';
    for (let i = 0; i < arrayOfNotes.length; i++) {
        jsonTosave += JSON.stringify(arrayOfNotes[i]);
        if (i < arrayOfNotes.length -1) {
            jsonTosave += ",";
        }
        
    }
    jsonTosave += "]}";
    localStorage.removeItem("notes");
    localStorage.setItem("notes", jsonTosave);
}



function editNoteContentObjectsPropertyAfterKeyUp() {
    var buttons = document.getElementsByClassName("remove");
    
    var countOfActiveNote = 0;
    for (let i = 0; i < buttons.length; i++) {
        
            let newTitle = buttons[i].nextSibling.value;
            let nextBrother = buttons[i].nextSibling;
            
            
            let newContent = nextBrother.nextSibling.value;
            
            
            arrayOfNotes[countOfActiveNote].title = newTitle;
            
            arrayOfNotes[countOfActiveNote].content = newContent;
            
            countOfActiveNote++;   
    }
}




var currentIdToRemove;
var countOfNotes = 0;
var arrayOfNotes;
const startJSONvalues = '{"notes":[{"id": 0,"title": "EditMe!","content": "EditMe!"},{"id": 1,"title": "EditMe!","content": "EditMe!"},{"id": 2,"title": "EditMe!","content": "EditMe!"}]}';		
setTimeout(createJsonAndSaveToLocalStorage, 5000);

initializeNotes();






