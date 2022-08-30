var Chapter_index = 1

var add = {

    initialize: function() {
        document.addEventListener('submit', this.addBook.bind(this), false)
        $("#AddChapter").on('click', this.addChapter)
    },


    //recuperer le localStorage deja existant si vide :
    getDataBook: function() {
        const books = localStorage.getItem("books");
        if (books == null)
            return []
        else
            return JSON.parse(books)
    },

    //Ajout d'un texte area avec id et data-index numeroté 
    addChapter: function() {
        Chapter_index++
        $('#form').append(` 
                <div class="form-group">

                        <label class="col-md-4 control-label" for="text">Chapitre ${Chapter_index}</label>
                        <hr>
                        <label class="col-md-4 control-label" for="title">Titre du chapitre</label>
                        <div class="col-md-4">
                            <input id="chapter-${Chapter_index}" name="title" type="text" autocomplete="off" placeholder="Titre" class="form-control input-md" required="">
                        </div>
                        <label class="col-md-4 control-label" for="title">Texte</label>
                        <div class="col-md-4">
                            <textarea class="form-control" id="text-${Chapter_index}" name="text" data-index="${Chapter_index}"></textarea>
                        </div>
                    </div>
            `)
    },

    //Fonction d'ajout d'un livre, Array a 2 dimension pour stocker les chapitres
    addBook: function() {
        event.preventDefault()
        const title = document.getElementById('title');
        var i = 1
        let books = this.getDataBook()

        book = [{
            Title: title.value,
        }]
        Chapitres = []

        $('#form').find('textarea').each(function() {

            const text = document.getElementById(`text-${i}`)
            const index = $(`#text-${i}`).attr("data-index")
            const chapTitle = document.getElementById(`chapter-${i}`)

            Chapitres.push({
                number: index,
                text: text.value,
                chapTitle: chapTitle.value,
            })
            i++
            title.value = ''
            index.value = ''
            text.value = ''
        });

        book.push({ Chapitres })
        books.push(book)
        localStorage.setItem("books", JSON.stringify(books));
    },
}
add.initialize();