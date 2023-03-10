var current_page_url = new URL(window.location.href);
var pageParams = get_pageParams(current_page_url.pathname);

console.log(pageParams);



var asked_edition = current_page_url.searchParams.get('edition');
var asked_performance = current_page_url.searchParams.get('titre');

var sheetId = '1G5Se0BIT8V-dcwiHSUFgEUZjVorpcaD2PZxoo3_YbZM';

// document.addEventListener("DOMContentLoaded", init); ====> awaits only for HTML and scripts to be loaded
// window.onload = async function(){} ====> triggers when the page is fully loaded with all dependent resources including images and styles
/*
Does DOMContentLoaded guarantee that all the scripts (including defer/async) have been loaded?
Yes. async only refers to how the script is downloaded. With or without async will pause the document parser to evaluate as soon as it is downloaded. defer indicates "to a browser that the script is meant to be executed after the document has been parsed, but before firing DOMContentLoaded."
*/

window.onload = async function () {
    let pageParams = get_pageParams();
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
                        artiste_link.attr('href', ( './performance/?titre=' + encodeURIComponent(normalized_artiste_url) ));

                        
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
            case 'performance':
            case 'work':
                if(asked_performance !== null){
                    let performanceStart = 1; // démarre à la ligne 1 parce que la ligne 0 est l'entête de la table

                    while (data.values[performanceStart]) {

                        const current_loop_artiste_url = data.values[performanceStart][1] + '–' + data.values[performanceStart][2];
                        const current_loop_normalized_artiste_url = current_loop_artiste_url.normalize("NFKD").replace(/\p{Diacritic}/gu, "").replace(/\u0153/g, "oe").replace(/'/g,"")

                        console.log("current_loop_normalized_artiste_url: " + current_loop_normalized_artiste_url);
                        console.log("data.values[performanceStart][1]: " + data.values[performanceStart][1]);

                        if(data.values[performanceStart][1] == current_loop_normalized_artiste_url){
                            
                            const performanceArtiste = data.values[performanceStart][1];
                            const performanceTitre = data.values[performanceStart][2];
                            const performanceDescription = data.values[performanceStart][3];
                            const performanceVideo = data.values[performanceStart][4];

                            console.log(performanceArtiste);
                            console.log(performanceTitre);
                            console.log(performanceDescription);
                            console.log(performanceVideo);
                            
                        }
                        /*const $textToAppend = $( "<p>" + data.values[aProposStart] + "</p>" );
                        
                        $textContent.append($textToAppend);
                        */
                        performanceStart++;
                    }
                
                }else{
                    window.location.replace("/");
                }

                break;
            default:
          
        }
      
    } else {
        alert("HTTP-Error: " + response.status);
    }
}


function get_pageParams(request_pathname, nodes = []){
    // Split by levels
    const parts = request_pathname.split('/');
    // Remove last node from path and add to nodes array
    nodes.push({ name: parts.pop(), request_pathname });
    // Update path without last node (already added)
    request_pathname = parts.join('/');
    if (request_pathname.length) {
        // Recall method recursively if nodes left
        return get_pageParams(path, nodes);
    } else {
        // Or add root node to array and return it
        nodes.push({ name: '/', path: '/' });
        return nodes;
    }

    /*
    getTree = (path, nodes = []) => {
        // Split by levels
        const parts = path.split('/')
        // Remove last node from path and add to nodes array
        nodes.push({ name: parts.pop(), path })
        // Update path without last node (already added)
        path = parts.join('/')
        if (path.length) {
          // Recall method recursively if nodes left
          return getTree(path, nodes)
        } else {
          // Or add root node to array and return it
          nodes.push({ name: '/', path: '/' })
          return nodes
        }
      }






    const pageParams = {
        page: "accueil",
        dataTab: "Oeuvres",
        dataRange: 'A:G'
    };

    */
}