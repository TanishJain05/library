const but=document.querySelector(".filter");
const ratingCheckBox=document.querySelector("#ratingCheckbox");
const recencyCheckbox=document.querySelector("#recencyCheckbox");
const filterForm = document.getElementById('filterForm');
but.addEventListener('click',()=>{
    const container= document.querySelector(".checkbox-container");
    if(container.classList.contains("hidden-class")){
        container.classList.remove("hidden-class");       
    }else{
        container.classList.add("hidden-class");
    }
    
})

var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener('change', updateFilter);
    });
document.addEventListener('DOMContentLoaded',function(){
    updateCheckboxesFromURL();
})
function updateCheckboxesFromURL(){
    var urlParams=new URLSearchParams(window.location.search);
    urlParams.forEach(function(value,key){
        var checkbox=document.getElementById(key+"Checkbox");
        checkbox.checked=true;
    });
}
function updateFilter() {
    var checkedCheckboxes = Array.from(checkboxes).filter(function (checkbox) {
      return checkbox.checked;
    });
    var filterParams = checkedCheckboxes.map(function (checkbox) {
       return checkbox.name+'=true';
    }).join('&');
    window.location.href = '/?' + filterParams;
}