document.getElementById('formulario').addEventListener('submit', pesquisarFilme);

function pesquisarFilme(e)
{
    var filmePesquisa = document.getElementById('pesquisar').value;
    //document.getElementById('formulario').reset();
    buscarFilme(filmePesquisa);
    e.preventDefault();
}

function buscarFilme(filmePesquisa)
{
    axios.get('http://www.omdbapi.com/?s=' + filmePesquisa + '&apikey=c42920a8')
  .then(function (response) {
    console.log(response);
    var filmes = response.data.Search;
    var mostrarFilmes ='';

    for(var i=0; i < filmes.length; i++){
        mostrarFilmes += `
            <div class="col-sm-6 col-md-4">
                <div class="thumbnail">
                    <img src="${filmes[i].Poster}" class="img-thumbnail">
                    <h4>${filmes[i].Title}</h4>
                    <p><a href="#" class="btn btn-primary" role="button">Ver detalhes</a></p>
                </div>
            </div>
        `;
    }

    document.getElementById('filmes').innerHTML = mostrarFilmes;

  })
  .catch(function (error) {
    console.log(error);
  });
}
