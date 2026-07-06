const tableBody = document.getElementById('tableBody');

const newLine = document.createElement('tr');

const listViewDatetable = JSON.parse(localStorage.getItem("addoutputthedata")) || [];

console.log(listViewDatetable);



document.addEventListener("DOMContentLoaded", () => {

    const tbody = document.querySelector("tbody");
    
    tbody.innerHTML = "";

    const renkler = {
        1: "#d6eaff",
        2: "#cfe8ff",
        3: "#b8f2e6",
        4: "#98fb98",
        5: "#7ed957",
        6: "#ffe066",
        7: "#ffd43b",
        8: "#ffb347",
        9: "#f4a261",
        10: "#e76f51",
        11: "#adb5bd",
        12: "#e0f7fa"
    };


    // 🔥 YENİLER ÜSTE (id)
  listViewDatetable.sort((a, b) => b.id - a.id);



     listViewDatetable.forEach(veri => {

        const tr = document.createElement("tr");
        
        
    let colorAdd = "";

    if(veri.Tur === 'Gelir') {
        colorAdd = "gelir-bg";
    }
    if (veri.Tur === 'Gider'){
        colorAdd = "gider-bg";
    }
    console.log(veri.Tur);
    console.log(colorAdd);

        tr.innerHTML = `

            <td class= "durum-td"> <span class = "durum-kutu ${colorAdd}"></span> </td>
            <td>${veri.Tarih}</td>
            <td>${veri.Kategori}</td>
            <td>${veri["Açıklama"]}</td>
            <td>${veri.Fiyat.toLocaleString('tr-TR')}</td>
        `;

        // 🔥 AY BUL (2026-06-27 formatı)
        let ay = 0;

        if (veri.Tarih && veri.Tarih.includes("-")) {
            ay = Number(veri.Tarih.split("-")[1]);
        }

        // 🔥 RENK VER
        if (renkler[ay]) {
            tr.style.setProperty("background-color", renkler[ay], "important");
        }

        tbody.appendChild(tr);
    });

});

const snowSpan = document.getElementById('snowSpan');
const damageSpan = document.getElementById('damageSpan');
const netTotalSpan = document.getElementById('netTotalSpan');


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

snowSpan.innerHTML = (`Toplam Gelir : ${result.addResult.toLocaleString('tr-TR')} ₺`);
damageSpan.innerHTML = (`Toplam Gider : ${result.ExpenseResult.toLocaleString('tr-TR')} ₺`);
netTotalSpan.innerHTML = (`Toplam Bakiye : ${result.addResultNet.toLocaleString('tr-TR')} ₺`);