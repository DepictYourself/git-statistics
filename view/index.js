window.onload = function() {

    const table = document.querySelector('.table');
    const tableHead = document.querySelector('.table-head-row');
    const tableBody = document.querySelector('.table-body');

    fetch("http://localhost:3000/", { mode: 'cors', })
    .then(response => response.json())
    .then(data => {
        // set headers
        let firstObj = data[0];
        for(let i in firstObj){
            if(firstObj.hasownProperty(i)){
                
                let abbr = document.createElement("abbr");
                abbr.setAttribute("title", )
                
            }
        }
    });

}