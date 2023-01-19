var form=document.getElementById("mycart");
// add eventlistner
var add=0;
form.addEventListener("submit",getdata);

function getdata(e){
    e.preventDefault();
    var price=e.target.detail.value;
    var category=e.target.category.value;
    var date=e.target.date.value;
    var notes=e.target.notes.value;
// obj for jason
var obj={
    price,
    category,
    date,
    notes
}
localStorage.setItem(`${obj.notes}`,`${JSON.stringify(obj)}`);
showonscreen(obj);
}

function showonscreen(e){
    document.getElementById("detail").value="";
    document.getElementById("notes").value="";

    var li=`<li id=${e.notes}>Shopping Price:${e.price}--The Platform:${e.category}
    <input type="button" onClick="editbtn('${e.price}','${e.notes}','${e.category}')" VALUE="edit" style="background-color: yellow;">  <input type="button" onClick="deletebtn('${e.notes}','${e.price}')" value="X" style="background-color: yellow;"></li>`;
    var add=document.getElementById("list");
    add.innerHTML+=li;
    var value=parseInt(e.price);
    totalsum(value);
    
   
}
function deletescreen(e){
    var parent=document.getElementById("list");
    var child=document.getElementById(e);
    if(child){
    parent.removeChild(child);
    }
}
function deletebtn(e,e1){
   
    localStorage.removeItem(e);
    deletescreen(e);
    minus(e1);
   
}
function editbtn(price,notes,category){
    document.getElementById("detail").value=price;
    document.getElementById("notes").value=notes;
    document.getElementById("category").value=category
    deletebtn(notes,price);
    
}
function totalsum(total){
    
     add=add+total;
   const calculator=document.getElementById("sum");
   const budget=document.getElementById("Budget");
   const li2=`<li id="total">The Total Cost:${add}</li>`;
   const li3=`<li id="total1">OUT OF BUDGET</li>`;
   const li4=`<li id="total1" style="color: green;">NOT OUT OF BUDGET</li>`;
   calculator.innerHTML=li2;
   if(add == 0){
    budget.removeChild(document.getElementById("total1"));
     calculator.removeChild(document.getElementById("total"));
      }

   if(add<=10000){
    budget.innerHTML=li4;
   }
   else{
    budget.innerHTML=li3;
   }
}
function minus(total){
    add=add-total;
    totalsum(0);
}

function removealldata(){
    var localstorage=localStorage;
    var key=Object.keys(localstorage);
    key.forEach((e)=>{
    localStorage.removeItem(e);
    })
    alert("ALL CLEARED");
    location.reload(true);
}
window.addEventListener("DOMContentLoaded",()=>{
    console.log("success");
    var dom=localStorage;
    var domkey=Object.keys(dom);
    domkey.forEach((key)=>{
        var detailfordom=JSON.parse(dom.getItem(key));
        showonscreen(detailfordom);
    })

})
