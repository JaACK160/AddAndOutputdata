const dataAddUlForm = document.querySelector(".ula");
const addHeader = document.querySelector(".dataAddHeader");
const dataExpenseUlForm = document.querySelector(".ulu");
const expenseHeader = document.querySelector(".expenseDataHeader");
const dataAddDiv = document.getElementById('addDataDiv');
const ekleBtn = document.getElementById('dataAddButtonAdd');
const çıkarBtn = document.getElementById('expenseDataButtonAdd');

let secilenTur = "Gelir";


let sequenceOfOperations = JSON.parse(localStorage.getItem("addoutputthedata")) || [];// verileri hafızaya alsın. (tüm veri)

const onlyİncome = sequenceOfOperations.filter(newProcess => newProcess.Tur === "Gelir");
const onlyExpense = sequenceOfOperations.filter(newProcess => newProcess.Tur === "Gider");
console.table(onlyİncome);
console.table(onlyExpense);

const result = sequenceOfOperations.reduce( (acc, newProcess) =>{
    if(newProcess.Tur === "Gelir") {
        acc.addResult += newProcess.Fiyat;
        acc.addResultNet += newProcess.Fiyat;
    }  else if (newProcess.Tur === "Gider"){
        acc.ExpenseResult -= newProcess.Fiyat;
        acc.addResultNet -= newProcess.Fiyat;
    }
    return acc;
}, { addResult: 0, ExpenseResult: 0, addResultNet: 0});

console.log(`Toplam Gelir : ${result.addResult} ₺`);
console.log(`Toplam Gider : ${result.ExpenseResult} ₺`);
console.log(`Toplam Bakiye : ${result.addResultNet} ₺`);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.onload = function() {
    let today = new Date().toISOString().split('T')[0];
    document.getElementById("dataAddDate").value = today;
    document.getElementById("expenseDataDate").value = today;
}

/////////////////////////////////////////////////////Form add-output  //////////////////////////////////////////////////////
function addDataForm() {
    addHeader.classList.add("active");
    expenseHeader.classList.remove("active");

    dataAddUlForm.style.display = "flex";
    dataExpenseUlForm.style.display = "none";

    dataAddDiv.style.border = "solid 1px green";
    dataAddDiv.style.boxShadow = "0px 0px 20px green";
}
function expenseDataForm() {
    addHeader.classList.remove("active");
    expenseHeader.classList.add("active");

    dataAddUlForm.style.display = "none";
    dataExpenseUlForm.style.display = "flex";

    dataAddDiv.style.border = "solid 1px red";
    dataAddDiv.style.boxShadow = "0px 0px 20px red";

}


/////////////////////////////////////////////////////////////////// add/////////////////////////////////////////////////////

function dataSaveAdd(event){
    event.preventDefault(); //sayfayı yenilemesin

    const dateVal = document.getElementById("dataAddDate").value;
    const categoryVal = document.getElementById("dataAddCategorySelect").value;
    const explanationVal = document.getElementById("dataAddExplanation").value;
    const priceVal = document.getElementById("dataAddPrice").value;

    if(!dateVal || !categoryVal || !priceVal) {
        alert("Lütfen ( * ) ile gösterilen alanları doldurun!");
        return;
    }

    secilenTur = "Gelir";


    const newProcess = {
        id: Date.now(),
        Tur: secilenTur,
        Tarih: dateVal,
        Kategori: categoryVal,
        Açıklama: explanationVal,
        Fiyat: Number(priceVal)
    };

    sequenceOfOperations.push(newProcess);
    


    localStorage.setItem("addoutputthedata",JSON.stringify(sequenceOfOperations));

    alert("Başarıyla Kaydedildi!");

    document.getElementById("dataAddExplanation").value = "";
    document.getElementById("dataAddPrice").value = "";

    console.log(newProcess);

}

//////////////////////////////////////////////////////// Expense //////////////////////////////////////////////////////////

function dataSaveExpense(event){
    event.preventDefault(); //sayfayı yenilemesin

    const dateVale = document.getElementById("expenseDataDate").value;
    const categoryVale = document.getElementById("expenseDataCategorySelect").value;
    const explanationVale = document.getElementById("expenseDataExplanation").value;
    const priceVale = document.getElementById("expenseDataPrice").value;

    if(!dateVale || !categoryVale || !priceVale) {
        alert("Lütfen ( * ) ile gösterilen alanları doldurun!");
        return;
    }

    secilenTur = "Gider";

    const newProcess = {
        id: Date.now(),
        Tur: secilenTur,
        Tarih: dateVale,
        Kategori: categoryVale,
        Açıklama: explanationVale,
        Fiyat: Number(priceVale)
    };

    sequenceOfOperations.push(newProcess);


    localStorage.setItem("addoutputthedata",JSON.stringify(sequenceOfOperations));

    alert("Başarıyla Kaydedildi!");

    document.getElementById("expenseDataExplanation").value = "";
    document.getElementById("expenseDataPrice").value = "";

    console.log(newProcess);

}

///////////////////////////        Microphopne Data         ////////////////////////////////////

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const micBtnData = document.getElementById('micBtnData');
const micData = document.getElementById('micData');


navigator.mediaDevices.getUserMedia({audio: true})
.then(function(stream) {
    console.log('Mikrofon izni verildi.');
})
.catch(function(err){
    console.error("Mikrofon izni reddedildi veya cihaz bulunamadı.", err);
    alert('Lütfen tarayıcı ayarlarından mikrofon izni verin.');
});



recognition.lang = 'tr-TR';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

micBtnData.addEventListener('click', () => {
    recognition.start();
});

recognition.onstart = () => {
    micData.style.background = '#7cfc00';
    micData.style.border = 'solid 2px white';
    micBtnData.style.color = 'white';
}

recognition.onend = () => {
    micData.style.backgroundColor = '';
    micData.style.border = '';
    micBtnData.style.color = ''
}

recognition.onresult = (event) => {
    const sesVerisi = event.results[0][0].transcript;
    dataAddExplanation.value = sesVerisi;
};

///////////////////////////        Microphopne Expense         ///////////////////////////////////
const recognitions = new SpeechRecognition();
const micBtnExpense = document.getElementById('micBtnExpense');
const micExpense = document.getElementById('micExpense');


navigator.mediaDevices.getUserMedia({audio: true})
.then(function(stream) {
    console.log('Mikrofon izni verildi.');
})
.catch(function(err){
    console.error("Mikrofon izni reddedildi veya cihaz bulunamadı.", err);
    alert('Lütfen tarayıcı ayarlarından mikrofon izni verin.');
});



recognitions.lang = 'tr-TR';
recognitions.interimResults = false;
recognitions.maxAlternatives = 1;

micBtnExpense.addEventListener('click', () => {
    recognitions.start();
});

recognitions.onstart = () => {
    micExpense.style.background = '#fc002e';
    micExpense.style.border = 'solid 2px white';
    micBtnExpense.style.color = 'white';
}

recognitions.onend = () => {
    micExpense.style.backgroundColor = '';
    micExpense.style.border = '';
    micBtnExpense.style.color = ''
}

recognitions.onresult = (event) => {
    const sesVeris = event.results[0][0].transcript;
    expenseDataExplanation.value = sesVeris;
};