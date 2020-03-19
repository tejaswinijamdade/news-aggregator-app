const searchForm = document.getElementById('search-form');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search');

searchForm.addEventListener('submit', e => {
  // Get sort
 /* const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  // Get limit
  const searchLimit = document.getElementById('limit').value;*/
  // Get search
  const searchTerm = searchInput.value;
  // Check for input
  if (searchTerm == '') {
    // Show message
    showMessage('Please add a search term', 'alert-danger');
  }
  // Clear field
  searchInput.value = '';

 

 
  e.preventDefault();
});

// Show Message Function
function showMessage(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const searchContainer = document.getElementById('search-container');
  // Get form
  const search = document.getElementById('searchh');

  // Insert alert
  searchContainer.insertBefore(div, search);

  // Timeout after 3 sec
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
}

// Truncate String Function
function truncateText(text, limit) {
  const shortened = text.indexOf(' ', limit);
  if (shortened == -1) return text;
  return text.substring(0, shortened);
}



//LOADER
const loader=document.querySelector('.loader');
const result=document.querySelector('.result');

function init(){
  setTimeout(()=>{
    loader.style.opacity=0;
    loader.style.display='none';

    result.style.display='block';
    setTimeout(()=>
      (result.style.opacity=1),50);
  },1000);
}
init();

//SORT BY
searchForm.addEventListener("input", e => {
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  if (sortBy == '') {
      document.getElementByclassName('form-check-input').innerHTML = ""
      fetchUsers('');
    }
    else {
      fetchUsers(sortBy);
      e.preventDefault();
    }
});
fetchUsers();

//SEARCH TERM
searchInput.addEventListener("keyup",e=>{
const searchTerm = searchInput.value;



if (searchTerm ==="") {
  document.getElementByclassName('not-found').innerHTML = ""
  fetchUsers('India');
}
else{
  fetchUsers(searchTerm);
  e.preventDefault();
}
});

fetchUsers('India');
        




//API CALL
async function fetchUsers(searchTerm,sortBy){
  
  const res= await fetch(`http://newsapi.org/v2/everything?q=${searchTerm}&${sortBy}&apiKey=171ab48f8a894889a3327230563b9593`);
  const data=await res.json();
  console.log(data);

  if(data.totalResults>0){

    let display = document.getElementById('news-articles');
            let newsCard = "";
            data.articles.map(function (article) {
                /*const images =article.urlToImage ? article.urlToImage
                :'https://www.dreamstime.com/no-image-available-icon-photo-camera-flat-vector-illustration-image132483296'; */             
                const content = ` 
               
                    <li class="article">
                      <div class="card  shadow bg-dark text-white col  " id="carrd" style="width:19rem;">
                        <div class="image-class">
                          <img class="article-img" class="card-img-top" src="${article.urlToImage}" alt="img" width="100%" height="180">
                        </div>
                        <div class="card-body">
                          <h2 class="article-title" class="card-title"></h2>
                          <h4 class="card-title">${truncateText(article.title,30)}</h4>
                          <p class="article-description" class="card-text">${truncateText(article.description,100)}</p>
                          <span class="article-author" class="badge badge-secondary">${article.author}</span>
                          <a href="${article.url}"target="_blank" class="btn btn-primary" class="article-link">See More</a>
                        </div>
                      </div>
                    </li>
                 
              
               `;
                newsCard += content;
            });
            display.innerHTML = newsCard;
  }
            
            /*if (data.articles.length === 0) {
                document.getElementByclassName('not-found').text ='No article was found based on the search.';
                e.preventDefault();
            }*/

  else if(data.totalResults===0){
              var invalidInput=document.getElementById("result");
              invalidInput.innerHTML="<h3>No article was found based on the search.</h3>";
              invalidInput.style.color="red";
              invalidInput.classList.add("not-found");
  }   
    
}
fetchUsers();
