window.onload = function() {

    const table = document.querySelector('.table');
    const tableHead = document.querySelector('.table-head-row');
    const tableBody = document.querySelector('.table-body');

    fetch("http://localhost:3000/", { mode: 'cors', })
    .then(response => response.json())
    .then(data => {
        // table headers
        let firstObj = data[0];
        for(let prop in firstObj){
            if(firstObj.hasOwnProperty(prop)){
                
                let abbr = document.createElement("abbr");
                abbr.setAttribute("title", prop);
                abbr.appendChild(document.createTextNode(prop));
                
                let th = document.createElement("th");
                th.appendChild(abbr);

                tableHead.appendChild(th);
            }
        }

        data.forEach(element => {
            
            let tr = document.createElement("tr");

            for(let prop in element){
                if(element.hasOwnProperty(prop)){
                    let abbr = document.createElement("abbr");
                    abbr.setAttribute("title", prop);
                    abbr.appendChild(document.createTextNode(element[prop]));

                    let td = document.createElement("td");
                    td.appendChild(abbr);
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