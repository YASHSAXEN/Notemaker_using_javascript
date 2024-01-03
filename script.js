let add = document.querySelector('.add');
let notes = document.querySelector('.notes');
let count = localStorage.getItem('count')?localStorage.getItem('count'):0;
let innerhtml;
let countarray = localStorage.getItem('items')?JSON.parse(localStorage.getItem('items')):[];
let datearray = localStorage.getItem('data')?JSON.parse(localStorage.getItem('data')):[];
let arrayoftext = localStorage.getItem('text')?JSON.parse(localStorage.getItem('text')):[];
let arrayofindexs = localStorage.getItem('indices')?JSON.parse(localStorage.getItem('indices')):[];
let date = new Date();
//  it is use to show all the created boxes
function common(){
    let full_date = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
    // console.log(full_date);
    notes.innerHTML='';
    innerhtml = '';
    countarray.forEach((i) =>{
        let value='';
        for(let j = 0; j<arrayoftext.length; j++){
            if (arrayoftext[j]['id'] == i){
                value = arrayoftext[j]['text'];
                break;
            }
        }
        innerhtml += `
            <div class="note1">
                <div class="buttons">
                    <div id='box-id'>
                        <p > Date:${full_date} </p>
                    </div>
                    <div id='but'>
                         <!-- <button class="edit">Edit</button> -->
                        <!-- <button class="delete" onclick='deleteitem(${i})';>Delete</button>-->
                        <i class="fa-solid fa-trash delete" onclick='deleteitem(${i})';></i>
                    </div>
                </div>
                <div class="text">
                    <textarea  cols="30" rows="10" id='${i}-text' placeholder="Start writing the notes" onmouseleave='savetext(${i})';>${value}</textarea>
                </div>
            </div>`;
    });
    notes.innerHTML += innerhtml;
   
    
}

//  when we click on the add notes button
function displaybox(){
    count+=1;
    countarray.push(count);
    common();
    localStorage.setItem('items',JSON.stringify(countarray));
    localStorage.setItem('count',count);
    localStorage.setItem('dates',JSON.stringify(datearray));
};

add.addEventListener('click',displaybox);

//  when we click on the delete button
function deleteitem(index){
    for(let i = 0; i<countarray.length; i++){
        if (countarray[i] == index){
            countarray.splice(i,1);
            break;
        }
    }
    for(let i = 0; i<arrayofindexs.length; i++){
        if (arrayofindexs[i] == index){
            arrayofindexs.splice(i,1);
            break;
        }
    }
    for(let i = 0; i<arrayoftext.length; i++){
        if (arrayoftext[i]['id'] == index){
            arrayoftext.splice(i,1);
            break;
        }
    }
    notes.innerHTML='';
    common();
    localStorage.setItem('items',JSON.stringify(countarray));
    localStorage.setItem('indices',JSON.stringify(arrayofindexs));
    localStorage.setItem('text',JSON.stringify(arrayoftext));
};

//  when we do mouse out event from a box
function savetext(index){
    let id = index + '-text';
    let textarea = document.getElementById(id);
    let text = textarea.value;
    if (arrayofindexs.indexOf(index)==-1){
        arrayofindexs.push(index)
        arrayoftext.push({id:index,text:text});
    }
    else{
        let indexofel = arrayofindexs.indexOf(index);
        arrayoftext.splice(indexofel,1,{id:index,text:text});
    }
    localStorage.setItem('text',JSON.stringify(arrayoftext));
    localStorage.setItem('indices',JSON.stringify(arrayofindexs))
};

common();

