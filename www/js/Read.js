var read = {

    initialize: function() {
        this.loadBook()
        this.searchText()
    },

    loadBook: function(index) {
        $('#content').html('')
        let book = localStorage.getItem("loaded");
        book = JSON.parse(book)
        $('#content').append(`
                    <h2 class="my-4 panneau">${book[0].Title}</h2>
                    <div class="container my-4">
        
        <input class="form-control input-md" id="searchBar" type="text" onkeyup="read.searchText()" autocomplete="off" placeholder="chercher un mot dans le livre...">
    </div>
            `)
        $('title').append(`
            ${book[0].Title}
        `)
        for (let i = 0; i < book[1].Chapitres.length; i++)
            $('#content').append(` 
                    <section class="col-12 section-${i}"> 
                        <h5>Chapitre ${book[1].Chapitres[i].number} : ${book[1].Chapitres[i].chapTitle}</h5>
                        <hr>
                        <p class="texte">${book[1].Chapitres[i].text}</p>
                    </section>
            `)
    },

    searchText: function() {

        var input, query, div, divs, value;
        input = document.getElementById('searchBar').value
        query = new RegExp("(\\b" + input + "\\b)", "gim");
        div = document.getElementById('content');
        divs = div.getElementsByClassName('texte');


        for (var i = 0; i < divs.length; i++) {
            value = divs[i].innerHTML
            var Vnew = value.replace(/(<span>|<\/span>)/igm, "");
            divs[i].innerHTML = Vnew;
            var newV = Vnew.replace(query, "<span>$1</span>");
            divs[i].innerHTML = newV;
        }
    },


};
read.initialize();