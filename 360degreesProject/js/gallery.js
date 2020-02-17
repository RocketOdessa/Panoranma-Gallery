let galleryContainer, photo, panoramaContainer,
mainContainer,closeButton, animationEndEvents, viewer, 
panorama, progress, urls,url,progressBar, urlmin,
miniPhoto;

/*Photo arrays below*/
urls = [
    '../assets/downtownMiami.jpg',
    '../assets/flat.jpg',
    '../assets/google.jpg',
    '../assets/lake.jpg',
    '../assets/miamiPanorama.jpg'
]

miniPhoto = [
  '../assets/mini/downtown-mini.jpeg',
  '../assets/mini/flat-mini.jpeg',
  '../assets/mini/google-mini.jpeg',
  '../assets/mini/lake-mini.jpeg',
  '../assets/mini/panoramaMiami-mini.jpeg'
]

galleryContainer = document.getElementById('gallery-container');
panoramaContainer = document.getElementById('panorama-container');
mainContainer = document.getElementById('main-container');
progressBar = document.getElementById('progress-bar');
closeButton = document.querySelector('.close'); 

/*Function for build main window for gallery (with photo)*/
function buildWithMiniGallery()
{ 
    for (photoIndex = 0; photoIndex < miniPhoto.length; photoIndex++){      
      urlmin = miniPhoto[photoIndex];      
      let urlOriginal =urls[photoIndex];
      photo = document.createElement('div');
      photo.style.backgroundImage = 'url(' + urlmin + ')';
      photo.classList.add('photo');


      photo.url = urlOriginal;
      photo.type = 'image';
    
      photo.addEventListener( 'click', function () {

        // Keep one panorama
        if ( panorama ) { return; }

        // Dynamically generate panorama
        if ( this.type === 'image' ) {

          panorama = new PANOLENS.ImagePanorama( this.url );

        } else if ( this.type === 'video' ) {

          panorama = new PANOLENS.VideoPanorama( this.url, { autoplay: true } );

        } else {

          return;

        }        
        panorama.addEventListener( 'progress', function ( event ) {

          progress = event.progress.loaded / event.progress.total * 100;

          progressBar.style.width = progress + '%';

          if ( progress === 100 ) {

            progressBar.style.opacity = 0;

          }

        });
        viewer.add( panorama );

        panoramaContainer.classList.add( 'open' );

      }, false );


      galleryContainer.appendChild(photo);
    }   
}
/*Setup container for image panorama*/
  function setupPanolens()
  {
      viewer = new PANOLENS.Viewer({container: mainContainer});
  }
/*Function for dispose image from viewer*/
  function disposePanorama()
  {
    panorama.dispose();
    viewer.remove(panorama);
    panorama = null;
  }

  /*Initialization function */
  function init(){
    buildWithMiniGallery();
    setupPanolens();

    closeButton.addEventListener('click',function()
  {
        disposePanorama();
        progressBar.style.width = 0;
        progressBar.style.opacity = 1;
        panoramaContainer.classList.remove('open');
  },false);
}

  init();  