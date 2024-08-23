let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

//get total


let mood;
mood = "create";
let tmp;

function getTotal(){
    if(price.value != ""){
            let result = +price.value - ((+price.value /100) * +taxes.value )- ((+price.value/100)* +ads.value) -  ((+price.value/100)* +discount.value)
            total.innerHTML = result
            total.style.background = "green"
        }else{
           price.value = "" ;
           total.style.background = "#a00d02"
        }
}


//create product
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = []; 
}



submit.onclick = function(){
    let newPro = {
      title: title.value.toLocaleLowerCase(),
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value.toLocaleLowerCase(),
    }

    //count
    if(title.value != "" 
        && price.value != "" 
        && category.value != ""
        && newPro.count < 100){
    if(mood === "create"){
        if(newPro.count > 1){
            for(let i = 0; i < newPro.count ;i++){
                dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro);
        }
    }else{
        dataPro[tmp] = newPro;
        mood === "create";
        submit.innerHTML = "Create"
        count.style.display = "block"

    }
    clearData()
}


   

    //save localstorage
    localStorage.setItem("product", JSON.stringify(dataPro))
    
    ShowData()
}

//clear inputs
function clearData(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

//read
function ShowData(){
    getTotal();
    let table = "";
    for(let i = 0; i < dataPro.length; i++){
        table += `
         <tr>
             <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>                 
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick = "updatedata(${i})" id="update">update</button></td>
            <td><button onclick = "deletedata(${i})" id="delete">delete</button></td>    
        </tr>
        `;
    }
    

    document.getElementById("tbody").innerHTML = table;
    let btndelete = document.getElementById("deleteAll")
    if(dataPro.length > 0){
     btndelete.innerHTML = `
     <button onclick="deleteAll()">deleteAll(${dataPro.length})</button>
     `
    }else{
        btndelete.innerHTML="";
    }
}

ShowData()

//delete
function deletedata(i){
      dataPro.splice(i,1);
      localStorage.product = JSON.stringify(dataPro);
      ShowData()
}

function deleteAll(){
       localStorage.clear();
       dataPro.splice(0);
       ShowData()
}


//update
function updatedata(i){
       title.value = dataPro[i].title;
       price.value = dataPro[i].price;
       taxes.value = dataPro[i].taxes;
       ads.value = dataPro[i].ads;
       discount.value = dataPro[i].discount;
       category.value = dataPro[i].category;
       count.style.display = "none";
       submit.innerHTML= "Update";
       mood = "update";
       tmp = i;
       scroll({
        top: 0,
        behavior : "smooth",
       })
}

//search

//search Mood//
let searchMood = "title";

function getsearchMood(id){
    let search = document.getElementById("search");

    if(id == "searchtitle"){
        searchMood = "title";
        
    }else{
        searchMood = "category";
        
    }
    search.placeholder = "search by "+ searchMood;
    search.focus();
    search.value = "";
    ShowData();
    }

//search Data//
function searchData(value){
   let table ="";
   for(let i = 0 ;i < dataPro.length ;i++){
   if(searchMood == "title"){
    
        if(dataPro[i].title.includes(value.toLocaleLowerCase())){
            table += `
         <tr>
             <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>                 
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick = "updatedata(${i})" id="update">update</button></td>
            <td><button onclick = "deletedata(${i})" id="delete">delete</button></td>    
        </tr>
        `;
        }
     
   }else{
    
        if(dataPro[i].category.includes(value.toLocaleLowerCase())){
            table += `
         <tr>
             <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>                 
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick = "updatedata(${i})" id="update">update</button></td>
            <td><button onclick = "deletedata(${i})" id="delete">delete</button></td>    
        </tr>
        `;
        }
    
   }
}
   document.getElementById("tbody").innerHTML = table;
}

//clean data
