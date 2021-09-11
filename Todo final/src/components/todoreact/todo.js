import React,{useState,useEffect} from 'react';
import "./style.css";

// getting local storage data

const getLocalData = ()=>{
    const lists = localStorage.getItem("mytodolist");
    if(lists){
        return JSON.parse(lists);
    }else{
        return [];
    }
};


export const Todo = () => {
    const [inputData, setinputData] = useState("");
    const [items,setItems] = useState(getLocalData());
    const [iseditItem,setIsEditItem] = useState("");
    const [toggleButton,setToggleButton]=useState(false);

    //  add items in the list

    const addItem=()=>{
        if(!inputData){
            alert("Please fill the data")
        }else if(inputData && toggleButton){
            setItems(
                items.map((curElem)=>{
                     if(curElem.id===iseditItem){
                         return{...curElem, name:inputData}
                     }
                     return curElem;
                })
            );
            setinputData([]);
           setIsEditItem(null);
            setToggleButton(false)
        }
        
        else{
            const myNewInputData={
                id:new Date().getTime().toString(),
                name:inputData,
            }
            setItems([...items,myNewInputData]);
            setinputData("");
            setToggleButton(true);
        }
    }

    // edit item in the list

    const editItem =(index)=>{
        const item_todo_edited =items.find((curElem)=>{
           return curElem.id===index;
        });
        setinputData(item_todo_edited.name)
        setIsEditItem(index);
        setToggleButton(true)
    }

//    delete items from the items list

    const deleteItem =(index)=>{
           const updatedItem = items.filter((curElem)=>{
                  return curElem.id!==index;
           })
           setItems(updatedItem)
    }

    // remove all the elements from the list

    const removeAll=()=>{
        setItems([]);
    };

    // adding local storage

    useEffect(()=>{
    localStorage.setItem("mytodolist",JSON.stringify(items))
    },[items])

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/list.png" alt="todologo" />
                        <figcaption>Add Your List Here 👈</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder="✍ Add Items" className="form-control"
                        value={inputData} onChange={(event)=>setinputData(event.target.value)}/>
                        {toggleButton  ? <i className="far fa-edit" onClick={addItem}></i>: 
                        <i className="fa fa-plus" onClick={addItem}></i> }
                        {/* <i className="fa fa-plus" onClick={addItem}></i> */}
                    </div>

                    {/* show all the input items in the list */}
                      
                      <div className="showItems">
                          
                          {items.map((curElem)=>{
                               
                               return(

                                <div className="eachItem" key={curElem.id}>
                                <h3>{curElem.name}</h3>
                                <div className="todo-btn">
                                <i className="far fa-edit" onClick={()=>editItem(curElem.id)}></i>
                                <i className="far fa-trash-alt" onClick={()=>deleteItem(curElem.id)}></i>
                                </div>
                            </div>
     

                               )
                          })}

                      </div>

                    {/* remove all button */}
                    <div className="showItems">
                    <button className="btn effect04" data-sm-link-text="Remove All" 
                    onClick={removeAll}>
                        <span>CHECK LIST</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo;