
import { React, useEffect, useState } from "react";
import "./Home.css";
import { AiOutlineDelete } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";

// .........................get data from localStorage................................

const getlocaldata = () => {
  let NotesList = localStorage.getItem("notes");
  //   console.log(NotesList);
  if (NotesList) {
    return JSON.parse(NotesList);
  } else {
    return [];
  }
};

const Home = () => {
  const [addNotes, setAddNotes] = useState("");
  const [submitNotes, setSubmitsNotes] = useState(getlocaldata());
  const [edit, setEdit] = useState(null);
  const [togglebtn, setTogglebtn] = useState(true);
 

  const addedNotes = () => {
    if (!addNotes) {
    
    } else if (addNotes && !togglebtn) {
      setSubmitsNotes(
        submitNotes.map((elem) => {
          if (elem.id === edit) {
            return { ...elem, notes: addNotes };
            
          }
          return elem;
        })
       
      );
      setTogglebtn(true);
      setAddNotes("");
      setEdit(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        notes: addNotes,
      };
      setSubmitsNotes([...submitNotes, allInputData]);
       setAddNotes("");
    }
    
  };

  //   .............................delete notes......................................

  const DeleteNotes = (index) => {
   
    //console.log(index)
    let showAfterDelete = submitNotes.filter((ele) => {
      return index !== ele.id;
    });

    setSubmitsNotes(showAfterDelete);
  };

  // ........................Edit and UpdateData.....................................

  const EditNotes = (id) => {
    alert("please update notes");


    let AllUpdateNotes = submitNotes.find((ele) => {
      return ele.id === id;
    });

    // console.log(AllUpdateNotes);
    setTogglebtn(false);
    setAddNotes(AllUpdateNotes.notes);
    setEdit(id);
   
  };

  //  .....................set data in localStorage................................

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(submitNotes));
  }, [submitNotes]);

  return (
    <>
    <div className="hp">H P NOTES</div>
      <div className="home" >
        <input
          className="addinput"
          
          type="text"
          placeholder="add notes ......"
          value={addNotes}
          onChange={(e) => setAddNotes(e.target.value)}
        />
        {togglebtn ? (
          <button className="btn" onClick={addedNotes}>
            Add Notes
          </button>
        ) : (
          <button className="btn" onClick={addedNotes}>  
            Edits Notes
          </button>
        )}
      </div>

      <div>
        {/* ...................display  notes............................ */}
        <div className="notes">
          {submitNotes.map((ele, index) => (
            <div key={ele.id}>
              <div className="displaynotes">
                <div className="ele">{ele.notes}</div>

                <div className="btnn">
                  <AiOutlineDelete
                    onClick={() => DeleteNotes(ele.id)}
                    className="deletbtn"
                  />

                  <FaUserEdit
                    onClick={() => EditNotes(ele.id)}
                    className="editbtn"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
