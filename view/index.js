window.onload = function() {

    const table = document.querySelector('.table');
    const tableHead = document.querySelector('.table-head-row');
    const tableBody = document.querySelector('.table-body');

    // document.URL.split("?")[0]
    // shitty temporary fix for fbclid
    fetch(document.URL.split("?")[0]+"gitstat", { mode: 'cors', })
    .then(response => response.json())
    .then(data => {
        // table headers
        let firstObj = data[0];
        for(let prop in firstObj){
            if(firstObj.hasOwnProperty(prop)){
                
                let th = document.createElement("th");
                th.appendChild(document.createTextNode(prop));

                tableHead.appendChild(th);
            }
        }

        // hide loader icon
        document.getElementById('circularG').style.display="none";

        data.forEach(element => {
            
            let tr = document.createElement("tr");

            for(let prop in element){
                if(element.hasOwnProperty(prop)){
                    
                    let td = document.createElement("td");
                    
                    // if the data is false or true. use a favicon instead
                    if (element[prop] === "False"){
                        td.innerHTML = 
                        `<img src="img/false.svg" alt="false" height="20" width="20">`
                    } else if (element[prop] === "True"){
                        td.innerHTML = 
                        `<img src="img/true.svg" alt="true" height="20" width="20">`
                    }else {
                        td.appendChild(document.createTextNode(element[prop]))
                    }

                    tr.appendChild(td);
                }
            }

            tr.onclick = function() {
                this.classList.toggle('is-selected');
            }
            tableBody.appendChild(tr);

        });
    });
}

