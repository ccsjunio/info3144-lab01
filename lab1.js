const OUTPUT_ELEMENT_ID = "songsContainer";

class TuneType {

  MIN_YEAR = 1950;
  MAX_YEAR = 2019; 

  constructor() {
    // declare class properties
    this._song;
    this._artist;
    this._genre;
    this._yearPub;
    this.error = [];

    // declare class methods
    /**************************************************************
    * name: songDetails
    * description: this method returns song details information
    * return template:
    *  {
    *    genre: <genre attribute>
    *    yearPub: <year of publication attribute>
    *  }
    **************************************************************/
    this.songDetails = () => {
      return "Genre is " + this._genre + " and song was released in " + this._yearPub;
    } // end of songDetails
    
  } // end of constructor

  // setter and getter for the song
    get song() {
      return this._song;
    }
    set song(song) {
      // check if song is defined
      if(!song){
        this._song = null;
        this.error.push({status: true, message: 'The song was not defined!'});
      }
      this._song = song;
    } 
  // end of setter and getter for the song

  // setter and getter for the artist
    get artist() {
      return this._artist;
    }
    set artist(artist) {
      // check if artist is defined
      if(!artist){
        this._artist = null;
        this.error.push({status:true, message:'Artist was not defined'});
      }
      this._artist = artist;
    }
  // end of setter and getter for the artist

  // setter and getter for the genre
    get genre() {
      return this._genre;
    }
    set genre(genre) {
      // check if genre is defined
      if(!genre){
        this._genre = null;
        this.error.push({status:true, message:'Genre was not defined!'});
      }
      this._genre = genre;
    }
  // end of setter and getter for the genre

  // setter and getter for the yearPub
    get yearPub() {
      return this._yearPub;
    }
    set yearPub(yearPub) {
      // check if yearPub is defined
      if(!yearPub){
        this._yearPub = null;
        this.error.push({status:true, message:'The year of publication was not defined'});
        return;
      }
      // check if yearPub is number
      if(isNaN(yearPub)){
        this._yearPub = null;
        this.error.push({status:true, message:'The year of publication is not a number'});
        return;
      }
      // check if yearPub has 4 digits
      if(yearPub.toString().length!==4){
        this._yearPub = null;
        this.error.push({status:true, message:'The year of publication does not have 4 digits'});
        return;
      }

      // check if yearPub is between 1950 and 2019
      if(yearPub <= this.MIN_YEAR || yearPub >= this.MAX_YEAR){
        this._yearPub = null;
        this.error.push({status:true, message:`The year is not between ${this.MIN_YEAR} and ${this.MAX_YEAR}`});
        return;
      }

      this._yearPub = yearPub;

    }
  // end of setter and getter for the yearPub

} // end of class TuneType definition

/**************************************************************
* name: startMeUp
* description: callback upon click on button "Display Songs"
* return template:
*   render output to the designated space
**************************************************************/
function startMeUp(){

  // initialize an array for songs
  let songs = [];
  
  // load array with songs (this could also be obtained from a database)
  songs = [
    {
      song : "Bad to the Bone",
      artist : "George Thorogood",
      genre : "Country",
      yearPub : "1982",
    },
    {
      song : "Miss You",
      artist : "Mick Jagger & Keith Richards",
      genre : "Rock",
      yearPub : "1978",
    },
    {
      song : "The Rising",
      artist : "Bruce Springsteen",
      genre : "Rock",
      yearPub : "2002",
    },
    {
      song : "Savage",
      artist : "Megan Thee Stallion",
      genre : "Pop",
      yearPub : "2020",
    },
    {
      song : "Running on Empty",
      artist : "Jackson Browne",
      genre : "Rock",
      yearPub : "77",
    },
    {
      song : "Brown Sugar",
      artist : "Rolling Stones",
      genre : "Rock",
      yearPub : "ABCD",
    },
    {
      song : "Ignition",
      artist : "Kelly",
      genre : "Rock",
      yearPub : null,
    },
    {
      song : "Over There",
      artist : "George M. Cohan",
      genre : "Jazz",
      yearPub : "1900",
    }
  ]

  // initialize a new array of instances of the object defined by the class
  let mySongs = songs.map(
    song=>{
      let newSong = new TuneType();
      
      newSong.song = song.song;
      newSong.artist = song.artist;
      newSong.genre = song.genre;
      newSong.yearPub = song.yearPub;

      return newSong;
    }
  );

  //sort songs using the invalid year as criteria
  mySongs.sort((a,b)=>{
    if(a.error.status) return 1;
    if(b.error.status) return -1;
    return 0;
  })
  console.log('mySongs = ', mySongs);

  // render the output with song information
  let markup = "";
  markup = mySongs.reduce((acc,song,index)=>{

    let thisMarkup = '';

    if(song.error.length > 0){

      let errorMarkup = song.error.reduce((acc, err, index)=>(
         acc + `<p class"card-text">${err.message}</p>`
      ),'')

      return acc + `<div class="col" id="songIndex-${index}">
                      <div class="card text-white bg-danger mb-3" style="min-width: 18rem;">
                        <div class="card-body">
                          <h5 class="card-title">${song.song}(INVALID)</h5>
                          <h6 class="card-subtitle mb-2 text-muted">${song.artist}</h6>
                          ${errorMarkup}
                        </div>
                      </div>
                    </div>`
    }

    return acc + `<div class="col" id="songIndex-${index}">
                    <div class="card mb-3" style="min-width: 18rem;">
                      <div class="card-body">
                        <h5 class="card-title">${song.song}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${song.artist}</h6>
                        <p class="card-text">${song.songDetails()}</p>
                      </div>
                    </div>
                  </div>`;

  },'');

  console.log('markup = ', markup);

  let outputContainer = document.getElementById(OUTPUT_ELEMENT_ID);
  outputContainer.innerHTML = markup;
} // end of StartMeUp