const current_page_url = new URL(window.location.href);
console.log(current_page_url);

let asked_edition = current_page_url.searchParams.get('edition');
console.log(asked_edition);
let asked_oeuvre = current_page_url.searchParams.get('titre');
console.log(asked_oeuvre);

const sheetId = '1G5Se0BIT8V-dcwiHSUFgEUZjVorpcaD2PZxoo3_YbZM';
/*
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'BDD Jardin sans mur';
const query = encodeURIComponent('Select *');
const url = `${base}&sheet=${sheetName}&tq=${query}`;
const data = [];
document.addEventListener('DOMContentLoaded', init);
//const output = document.querySelector('#output')
*/

window.onload = async function () {
    //let response = await fetch("https://sheets.googleapis.com/v4/spreadsheets/1c2pjjmdqcpb8GeXSl_RhZ-vTVERVQcQzETUdbWOD9Ac/values/'IGNORER - Données publiques'!A:J?key=AIzaSyAl3TfynOtVS2PQRKyJPWxJShQdESCvsy4");
    let response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/'${pageParams.dataTab}'!${pageParams.dataRange}?key=AIzaSyAgOyGb6slHo7YLkkLJpKUNGVKXukafokw`);
  
    if (response.ok) { // if HTTP-status is 200-299
        //ajouter_donnees_DOM(await response.json());

        const data = await response.json();

        console.log('données:');
        console.log(data);
      
        switch (pageParams.page) {
            case 'accueil':
            case 'home':
                let accueilStart = 1; // démarre à la ligne 1 parce que la ligne 0 est l'entête de la table

                while (data.values[accueilStart]) {
                    if(asked_edition == null){
                        asked_edition = data.values[accueilStart][0];
                    }

                    if(data.values[accueilStart][0] == asked_edition){
                        const elementPosition = accueilStart - 1;

                        $('#lignes_artistes').children('img').eq(elementPosition).show();

                        const artiste_title = $('#liens_artistes').children('h2').eq(elementPosition);
                        artiste_title.show();

                        const artiste_link = artiste_title.find('a');
                        artiste_link.text(data.values[accueilStart][1]);

                        const artiste_url = data.values[accueilStart][1] + '–' + data.values[accueilStart][2];
                        const normalized_artiste_url = artiste_url.normalize("NFKD").replace(/\p{Diacritic}/gu, "").replace(/\u0153/g, "oe").replace(/'/g,"")
                        artiste_link.attr('href', ( './oeuvre/?titre=' + encodeURIComponent(normalized_artiste_url) ));

                        
                    }
                    /*const $textToAppend = $( "<p>" + data.values[aProposStart] + "</p>" );
                    
                    $textContent.append($textToAppend);
                    */
                    accueilStart++;
                }

                
                break;
            case 'a-propos':
            case 'about':
                console.log('a-propos');
                console.log("data.values");
                console.log(data.values);
            
                let aProposStart = 1; // démarre à la ligne 1 parce que la ligne 0 est l'entête de la table
                let $textContent = $('#a-propos-text');

                while (data.values[aProposStart]) {
                    console.log(data.values[aProposStart]);
                    
                    const $textToAppend = $( "<p>" + data.values[aProposStart] + "</p>" );
                    
                    $textContent.append($textToAppend);
                    
                    aProposStart++;
                }
                
                break;
            case 'oeuvre':
            case 'work':
                if(asked_oeuvre !== null){
                    let oeuvreStart = 1; // démarre à la ligne 1 parce que la ligne 0 est l'entête de la table

                    while (data.values[oeuvreStart]) {

                        const current_loop_artiste_url = data.values[oeuvreStart][1] + '–' + data.values[oeuvreStart][2];
                        const current_loop_normalized_artiste_url = current_loop_artiste_url.normalize("NFKD").replace(/\p{Diacritic}/gu, "").replace(/\u0153/g, "oe").replace(/'/g,"")

                        if(data.values[oeuvreStart][1] == current_loop_normalized_artiste_url){
                            
                            const oeuvreArtiste = data.values[oeuvreStart][1];
                            const oeuvreTitre = data.values[oeuvreStart][2];
                            const oeuvreDescription = data.values[oeuvreStart][3];
                            const oeuvreVideo = data.values[oeuvreStart][4];

                            console.log(oeuvreArtiste);
                            console.log(oeuvreTitre);
                            console.log(oeuvreDescription);
                            console.log(oeuvreVideo);
                            
                        }
                        /*const $textToAppend = $( "<p>" + data.values[aProposStart] + "</p>" );
                        
                        $textContent.append($textToAppend);
                        */
                        oeuvreStart++;
                    }
                
                }

                break;
            default:
          
        }
      
    } else {
        alert("HTTP-Error: " + response.status);
    }
}








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
            jsonData.table.rows.forEach((rowData, rowind) => {
                //console.log('row: (suivant)');
                //console.log(rowData);

                const row = {};
                colz.forEach((ele, ind) => {
                    if(rowData.c[ind] != null){
                        //console.log('element: ' + rowData.c[ind].v);
                        //console.log('element 2:' + ele);
                        if(ind == 2){
                            nomArtistes.push(rowData.c[ind].v);
                            
                            if(rowind == 0){
                                const artiste1 = document.getElementById("lien_artiste_1");
                                const artiste1_a = artiste1.getElementsByTagName("a");
                                const artiste1_a_ele = artiste1_a[0];
                                artiste1_a_ele.textContent = rowData.c[ind].v;
                            }else if(rowind == 1){
                                const artiste2 = document.getElementById("lien_artiste_2");
                                const artiste2_a = artiste2.getElementsByTagName("a");
                                const artiste2_a_ele = artiste2_a[0];
                                artiste2_a_ele.textContent = rowData.c[ind].v;
                            }else if(rowind == 2){
                                const artiste3 = document.getElementById("lien_artiste_3");
                                const artiste3_a = artiste3.getElementsByTagName("a");
                                const artiste3_a_ele = artiste3_a[0];
                                artiste3_a_ele.textContent = rowData.c[ind].v;
                            }else if(rowind == 3){
                                const artiste4 = document.getElementById("lien_artiste_4");
                                const artiste4_a = artiste4.getElementsByTagName("a");
                                const artiste4_a_ele = artiste4_a[0];
                                artiste4_a_ele.textContent = rowData.c[ind].v;
                            }else if(rowind == 4){
                                const artiste5 = document.getElementById("lien_artiste_5");
                                const artiste5_a = artiste5.getElementsByTagName("a");
                                const artiste5_a_ele = artiste5_a[0];
                                artiste5_a_ele.textContent = rowData.c[ind].v;
                            }
                            
                        }
                    }
                    
                    //row[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
                    
                })
                data.push(row);
            })
            processRows(data);
        })

        
}

$( document ).ready(function() {
    
    $.ajax({
        url:'main-nav.html',
        success: function (data){
            $nav = $(data);

            $('header').prepend($nav);

            //alert('header est loadé');
        }
    });

    //alert('fin jquery ready');

});