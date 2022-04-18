let btnsTip = document.querySelectorAll("#btns-tip");
let bill = document.getElementById("input-bill")
let people = document.getElementById("input-people")
let customValue = document.querySelector(".custom")
let errorMsg = document.getElementById("error")
let results = document.querySelectorAll(".value")
let btnReset = document.getElementById("reset")

let billValue = 0.0
let peopleValue = 1
let tipValue = 0.15

bill.addEventListener("input", setBillValue)
btnsTip.forEach((btn) => {
  btn.addEventListener("click", selectedTip);
});
people.addEventListener("input", setPeopleValue)
customValue.addEventListener("input", setTipCustomValue)
btnReset.addEventListener("click", reset)


function validateInt(s){
    let rgx = /^[0-9]*$/;
    return s.match(rgx);
}

function validateFloat(s){
    let rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}

function setBillValue(){
    if(!validateFloat(bill.value)){
        bill.value = bill.value.substring(0, bill.value.length-1);
    }
    billValue = parseFloat(bill.value)
    
    calculateTip()
}
function setPeopleValue(){
    if(!validateInt(people.value)){
        people.value = people.value.substring(0,people.value.length-1)
    }

    peopleValue = parseFloat(people.value)

    if(peopleValue <= 0){
        errorMsg.classList.add("show-error-msg")
        people.classList.add("warning")
        setTimeout(() => {
            errorMsg.classList.remove("show-error-msg")
            people.classList.remove("warning")
        },3000)
    }

    calculateTip()
}
function selectedTip(e) {
  btnsTip.forEach((btn) => {
    btn.classList.remove("selectedTip");
    if(e.target.innerHTML==btn.innerHTML){
        btn.classList.add("selectedTip")
        tipValue = parseFloat(btn.innerHTML)/100
    }
    
  });
  
  customValue.value = ''
  calculateTip()
}

function setTipCustomValue(){
    if(!validateInt(customValue.value)){
        customValue.value = customValue.value.substring(0,customValue.value.length-1)
    }
    tipValue = parseFloat(customValue.value/100)

    if(customValue.value !== '') calculateTip() 
}

function calculateTip(){
    if (peopleValue > 0 ){
        let tipAmount = billValue * tipValue / peopleValue;
        let total = billValue * (tipValue + 1) / peopleValue;
        results[0].innerHTML = '$' + tipAmount.toFixed(2);
        results[1].innerHTML = '$' + total.toFixed(2);
    }
}

function reset(){
    bill.value = '0.0';
    setBillValue();

    btnsTip[2].click();

    people.value = '1';
    setPeopleValue();
}