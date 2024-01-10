const mainSection = document.getElementById("parent");
const titlep = document.getElementById("title");
const bodyp = document.getElementById("body");
const submitBtn = document.getElementById("submitBtn");

async function fetchData(){
    try{
    let res = await fetch("https://handsome-ray-fatigues.cyclic.app/notes/",{
        headers:{
            "Content-type":"application/json",
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    let data = await res.json();

    console.log(data);

    appendData(data.notes);
    }
    catch(err){
     console.log(err);
    }
}
fetchData();
// const fetchData = ()=>{
//     fetch("https://handsome-ray-fatigues.cyclic.app/notes/",{
//         headers:{
//            "Content-type":"application/json",
//             authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//     }).then(res=>res.json())
//     .then((data)=>{
//         console.log(data.notes);
//         appendData(data.notes);
//     })
//     .catch(err=>console.log(err))
// }
// fetchData()
function appendData(data){
    mainSection.innerHTML="";
    data.map(item =>{
        mainSection.append(createCard(item));
    })
}
let currEdit;
function createCard(item){
    const card = document.createElement("div");
    card.classList.add('r-card');

    const title = document.createElement('h1');
    title.classList.add('r-title');
    title.textContent = item.title;
  
    const body = document.createElement('p');
    body.classList.add('para');
    body.textContent = item.body;

    const edit = document.createElement('button');
    edit.classList.add('edit-btn');
    edit.innerText = 'EDIT'
    edit.addEventListener("click",(e)=>{
        console.log(item)
        e.preventDefault();
        titlep.value = item.title;

         bodyp.value=item.body;
         currEdit=item;
        // editNotes(item);
    })

    const del = document.createElement('button');
    del.classList.add('delete-btn');
    del.innerText = 'DELETE'
    del.addEventListener('click',(e)=>{
        e.preventDefault()
        deleteNote(item);
    })
    
    card.appendChild(title);
    card.appendChild(body);
    card.appendChild(edit);
    card.appendChild(del);
    return card;
}

async function deleteNote(noteID) {
    try {
      let res = await fetch(`https://handsome-ray-fatigues.cyclic.app/notes/delete/${noteID}`, {
        method: 'DELETE',
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      if (res.ok) {
        fetchData();
      } else {
        console.log('Failed to delete note');
      }
    } catch (err) {
      console.log(err);
    }
  }
  
// Editing

// function editNotes(item){
//   titlep.value = item.title;

//   bodyp.value = item.body;
// //   currEdit = item;
// }

submitBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    updateNote(currEdit);
})
async function updateNote(item){
    try{
     let res = await fetch(`https://handsome-ray-fatigues.cyclic.app/notes/update/${item._id}`,{
        method: 'PATCH',
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body:JSON.stringify({
            title  : titlep.value,
           body:bodyp.value
         })
     })
      fetchData()
    }
    catch(err){
      console.log(err);
    }
}