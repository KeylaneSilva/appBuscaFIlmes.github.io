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
    //console.log(response);
    var filmes = response.data.Search;
    var mostrarFilmes ='';

    for(var i=0; i < filmes.length; i++){
        mostrarFilmes += `
            <div class="col-sm-6 col-md-4">
                <div class="thumbnail">
                    <img src="${filmes[i].Poster}" class="img-thumbnail">
                    <h4>${filmes[i].Title}</h4>
                    <p><a href="#" class="btn btn-primary" role="button" onclick="filmeDetalhes('${filmes[i].imdbID}')">Ver detalhes</a></p>
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

function filmeDetalhes(id){
  sessionStorage.setItem('filmesID', id);
  window.location = 'detalhes.html';
  return false;

}

function mostrarFilmes(){
  var filmeID = sessionStorage.getItem('filmesID'); 
  
  axios.get('http://www.omdbapi.com/?i=' + filmeID + '&apikey=c42920a8')
  .then(function (response) {
    //console.log(response);
    var filme = response.data;
    console.log(filme);
    var mostrarFilme = `
      <div class="col-md-6">
        <img src="${filme.Poster}" class="img-responsive">
        <h3><strong>${filme.Title}</strong></h3>
      </div>
      <div class="col-md-6">
          <div class="well clearfix">
          <ul class="list-group">
            <li class="list-group-item"><strong>Gênero: </strong> ${filme.Genre}</li>
            <li class="list-group-item"><strong>Lançamento: </strong> ${filme.Released}</li>
            <li class="list-group-item"><strong>Duração: </strong> ${filme.Runtime}</li>
            <li class="list-group-item"><strong>Idioma: </strong> ${filme.Language}</li>
            <li class="list-group-item"><strong>Prêmeios: </strong> ${filme.Awards}</li>
            <li class="list-group-item"><strong>Atores: </strong> ${filme.Actors}</li>
            <li class="list-group-item"><strong>Descrição: </strong> ${filme.Plot}</li>
          </ul>

          <hr>
          <a href="http://imdb.com/title/${filme.imdbID}" target="_blank" class="btn btn-success" pull-left">Ver no IMDB</a>
          <a href="index.html" target="_blank" class="btn btn-light" pull-right">Voltar a Pesquisa</a>

          </div>
      </div>

    `;

    document.getElementById('filmes').innerHTML = mostrarFilme;
    
  }).catch(function (error) {
    console.log(error);
    
  });
}