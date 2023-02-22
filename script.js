const sheetId = '1G5Se0BIT8V-dcwiHSUFgEUZjVorpcaD2PZxoo3_YbZM';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'BDD Jardin sans mur';
const query = encodeURIComponent('Select *');
const url = `${base}&sheet=${sheetName}&tq=${query}`;
const data = [];
document.addEventListener('DOMContentLoaded', init);
//const output = document.querySelector('#output')



const nomArtistes = [];



function init() {
    fetch(url)
        .then(res => res.text())
        .then(rep => {
            //Remove additional text and extract only JSON:
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            
            






            const colz = [];
            const tr = document.createElement('tr');
            //Extract column labels

            // TODO: fetch l'index de la colonne qui nous intéresse pour la réutiliser pour récupérer les données, ça évitera de SUPPOSER la position de la bonne colonne
            jsonData.table.cols.forEach((heading) => {
                if (heading.label) {
                    //console.log('colonne : ' + heading.label);
                    let column = heading.label;
                    colz.push(column);
                    const th = document.createElement('th');
                    th.innerText = column;
                    tr.appendChild(th);
                }
            })
            //output.appendChild(tr);
            //extract row data:
            jsonData.table.rows.forEach((rowData) => {
                //console.log('row: (suivant)');
                //console.log(rowData);

                const row = {};
                colz.forEach((ele, ind) => {
                    if(rowData.c[ind] != null){
                        //console.log('element: ' + rowData.c[ind].v);
                        //console.log('element 2:' + ele);
                        if(ind == 2){
                            nomArtistes.push(rowData.c[ind].v);
                        }
                    }
                    
                    //row[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
                    
                })
                data.push(row);
            })
            processRows(data);
        })

        console.log('début');

        const artiste1 = document.getElementById("lien_artiste_1");
        const artiste1_a = artiste1.getElementsByTagName("a");
        const artiste1_a_ele = artiste1_a[0];
        artiste1_a_ele.textContent = nomArtistes[0];
        const artiste2 = document.getElementById("lien_artiste_2");
        const artiste2_a = artiste2.getElementsByTagName("a");
        const artiste2_a_ele = artiste2_a[0];
        artiste2_a_ele.textContent = nomArtistes[1];
        const artiste3 = document.getElementById("lien_artiste_3");
        const artiste3_a = artiste3.getElementsByTagName("a");
        const artiste3_a_ele = artiste3_a[0];
        artiste3_a_ele.textContent = nomArtistes[2];
        const artiste4 = document.getElementById("lien_artiste_4");
        const artiste4_a = artiste4.getElementsByTagName("a");
        const artiste4_a_ele = artiste4_a[0];
        artiste4_a_ele.textContent = nomArtistes[3];
        const artiste5 = document.getElementById("lien_artiste_5");
        const artiste5_a = artiste5.getElementsByTagName("a");
        const artiste5_a_ele = artiste5_a[0];
        artiste5_a_ele.textContent = nomArtistes[4];

        console.log('fin');
}

function processRows(json) {
    json.forEach((row) => {
        const tr = document.createElement('tr');
        const keys = Object.keys(row);
    
        keys.forEach((key) => {
            const td = document.createElement('td');
            td.textContent = row[key];
            tr.appendChild(td);
        })
        //output.appendChild(tr);
    })
}

$( document ).ready(function() {
    console.log('jquery document ready');
    const artiste1 = document.getElementById("lien_artiste_1");
        const artiste1_a = artiste1.getElementsByTagName("a");
        const artiste1_a_ele = artiste1_a[0];
        artiste1_a_ele.textContent = nomArtistes[0];
        const artiste2 = document.getElementById("lien_artiste_2");
        const artiste2_a = artiste2.getElementsByTagName("a");
        const artiste2_a_ele = artiste2_a[0];
        artiste2_a_ele.textContent = nomArtistes[1];
        const artiste3 = document.getElementById("lien_artiste_3");
        const artiste3_a = artiste3.getElementsByTagName("a");
        const artiste3_a_ele = artiste3_a[0];
        artiste3_a_ele.textContent = nomArtistes[2];
        const artiste4 = document.getElementById("lien_artiste_4");
        const artiste4_a = artiste4.getElementsByTagName("a");
        const artiste4_a_ele = artiste4_a[0];
        artiste4_a_ele.textContent = nomArtistes[3];
        const artiste5 = document.getElementById("lien_artiste_5");
        const artiste5_a = artiste5.getElementsByTagName("a");
        const artiste5_a_ele = artiste5_a[0];
        artiste5_a_ele.textContent = nomArtistes[4];
        console.log('jquery fin');
});