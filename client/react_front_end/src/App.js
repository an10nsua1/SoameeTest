import Axios from "axios"
import './App.css';
import React, {useState, useEffect} from 'react'
function App() {
  //States for data managment
  const [bookInfo, setBookInfo] = useState([])

  //States for upload/update new data (Books)
  const [newBookName, setNewBookName] = useState("");
  const [newBookISBN, setNewBookISBN] = useState("");
  const [newBookAuthor, setNewBookAuthor] = useState("");
  //States for upload/update new data (Authors)
  const[newAuthorF, setNewAuthorF] = useState("");
  const[newAuthorL, setNewAuthorL] = useState("");
  
  //Front-end data update. Obtains the book list
  useEffect(() =>{
     Axios.get("http://localhost:3002/books/").then((response) => {
      setBookInfo(response.data);
    })
  });
  
  //Methods for button calls
  const updateBook = () =>{    //Update the selected book with new data
    Axios.put("http://localhost:3002/books/" + newBookISBN, { _name : newBookName, _isbn : newBookISBN, _author : newBookAuthor});
  }
  const updateAuthor = () => { //Update the selected author with new data
    Axios.put("http://localhost:3002/authors/" + newAuthorL , {_first_name: newAuthorF, _last_name:newAuthorL});
  }
  const submittBook = () =>{   //Uploads the new data to Book table
    Axios.post("http://localhost:3002/books", { _name : newBookName, _isbn : newBookISBN, _author : newBookAuthor});
  }
  const submitAuthor = () => { //Uploads the new data to Author table
    Axios.post("http://localhost:3002/authors" , {_first_name: newAuthorF, _last_name:newAuthorL});
  }


  return (
    <div className="App"> <h1>Libreria Soamee</h1>

      
      <label className = "labels">Introduce a name, ISBN and author's last name to submit a new book to the database.</label>
      <input type = "text" name = "BookName" className = "textBox" onChange ={(e) => {setNewBookName(e.target.value);}} ></input>
      <input type = "text" name = "BookISBN" className = "textBox" onChange ={(e) => {setNewBookISBN(e.target.value);}}></input>
      <input type = "text" name = "BookAuthor" className = "textBox" onChange ={(e) => {setNewBookAuthor(e.target.value);}}></input>
      <button className = "regularButton" onClick = {() => {submittBook();}}>Upload</button>
      <button className = "regularButton" onClick = {() => {updateBook();}}>Update</button>

      <label className = "labels">Introduce the first name and the last name to submit a new author to the database.</label>
      <input type = "text" name = "AuthorFirstName"  className = "textBox" onChange ={(e) => {setNewAuthorF(e.target.value);}}></input>
      <input type = "text" name = "AuthorLastName"  className = "textBox" onChange ={(e) => {setNewAuthorL(e.target.value);}}></input>
      <button className = "regularButton" onClick = {() => {submitAuthor();}}>Upload</button>
      <button className = "regularButton" onClick = {() => {updateAuthor();}}>Update</button>

      {bookInfo.map((val) => {
        return <div  key={val._isbn}>
          <Panel  name = {val._name} isbn = {val._isbn}/>
          </div>
          

      })}

    </div>
  );
}


//Function that allow us to display a Panel/Modal and handles the open/close state
function Panel(name, isbn){
  const [showPanel, setShowPanel] = useState(false);
  const [book, setBook] = useState([]);

 if(showPanel){
   Axios.get("http://localhost:3002/books/" + name.isbn).then((response) => { setBook(response.data[0])});
 }

  return(
    <>
    <button className= "bookButtonForm" onClick={() =>setShowPanel(!showPanel)}>{name.name}</button>
    {showPanel && <div className = "bookButtonForm">{panelInfo(book)}</div> }
    </>
  )
}

//Fuction that check if the data is ready to be used and returns the desired format
function panelInfo(book){
  if(book._isbn !== undefined){
    return "ISBN: " + book._isbn + " Author: " + book._first_name + " " + book._last_name;
  }
  return null;
}
export default App;
