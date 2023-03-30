const gallery = document.querySelector('.gallery');

// sert a afficher le contenu de l'api dynamiquement
const displayWorks = (works) => {

  gallery.innerText = '';
  //console.log(gallery);

  // boucle forEach works 
  works.forEach((work) => {

    const galleryContent = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    //sans img.crossOrigin en ano aucune image n'apparait
    img.crossOrigin = 'anonymous';
    img.src = work.imageUrl;
    img.alt = work.title;
    figcaption.innerText = work.title;

    galleryContent.append(img, figcaption);

    gallery.appendChild(galleryContent);
  });
};

//ajout de l'api via fetch
fetch('http://localhost:5678/api/works', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
})
  //avec le 1er then il va me renvoyer la reponse en json
  .then(response => response.json())
  .then(data => {
    //mon console.log me confirme que je recupere bien mes 11 projet
    //  console.log(data)
    displayWorks(data);
  })
  //un catch au cas ou il y a une erreur 
  .catch(error => console.error(error));


// LES FILTRES

//  i retrieve categories for the filter with fetch via api
const getCategories = async () => {
  await fetch('http://localhost:5678/api/categories')
    // if the fetch is working a get the data in .json 
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log('error data from api')
      }
    })
    .then((category) => {
      category.forEach((category) => {
        createButton(category);
      });
    });
};

