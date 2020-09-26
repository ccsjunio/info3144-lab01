const OUTPUT_ELEMENT_ID = "songsContainer";

class TuneType {

  MIN_YEAR = 1950;
  MAX_YEAR = 2019; 

  constructor({song, artist, genre, yearPub}) {
    // declare class properties
    this._song = song;
    this._artist = artist;
    this._genre = genre;
    this._yearPub = yearPub;
    // defines a stack for gathering error
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
    // this song has an invalid year
    {
      song : "Running on Empty",
      artist : "Jackson Browne",
      genre : "Rock",
      yearPub : "77",
    },
    // this song has an invalid year
    {
      song : "Brown Sugar",
      artist : "Rolling Stones",
      genre : "Rock",
      yearPub : "ABCD",
    },
    // this song has an invalid year
    {
      song : "Ignition",
      artist : "Kelly",
      genre : "Rock",
      yearPub : null,
    },
    // this song has an invalid year
    {
      song : "Over There",
      artist : "George M. Cohan",
      genre : "Jazz",
      yearPub : "1900",
    }
  ]

  // initialize the first song
  // providing the object with parameters
  // to define it with the class structure
  let mySong = new TuneType(songs[0]);

  // initialize a constant to contain the dom element
  // to show the output
  let outputContainer = document.getElementById(OUTPUT_ELEMENT_ID);

  // write the first song to the output
  // this first one has all attributes
  // within validation parameters
  // the attributes will be used to build the markup
  outputContainer.innerHTML = `<div class="col" id="songIndex-0">
                                <div class="card mb-3" style="min-width: 18rem;">
                                  <div class="card-body">
                                    <h5 class="card-title">${mySong.song}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">${mySong.artist}</h6>
                                    <p class="card-text">${mySong.songDetails()}</p>
                                  </div>
                                </div>
                              </div>`;

  // remove the song already used from the array
  songs.shift();

  // iterate through the array of songs
  // at each iteration the attributes
  // of the object are update
  // via setters
  songs.forEach((song,index)=>{

    // reset the error array
    mySong.error = [];
    // update attributes from the object
    // instance of the class through 
    // the setters
    mySong.song = song.song;
    mySong.artist = song.artist;
    mySong.genre = song.genre;
    mySong.yearPub = song.yearPub;

    // if there is some error in the update
    // the attribute error will be a non-empty array
    // so an error markup will be produced
    if(mySong.error.length > 0){
      
      // generate the error markup
      // from the array of errors
      let errorMarkup = mySong.error.reduce((acc, err, index)=>(
        acc + `<p class"card-text">${err.message}</p>`
      ),'')

      // output the error markup to the output element
      outputContainer.innerHTML +=`<div class="col-12" id="songIndex-${index}">
                                    <div class="card text-white bg-danger mb-3" style="min-width: 18rem;">
                                      <div class="card-body">
                                        <h5 class="card-title">${mySong.song} <span class="badge badge-warning">INVALID INPUT</span> </h5>
                                        <h6 class="card-subtitle mb-2 text-muted">${mySong.artist}</h6>
                                        ${errorMarkup}
                                      </div>
                                    </div>
                                  </div>`;
    } else {
      // if the error array is empty, than the
      // input is OK and the regular markup is 
      // sent to the output
      outputContainer.innerHTML += `<div class="col-12" id="songIndex-${index}">
                                    <div class="card mb-3" style="min-width: 18rem;">
                                      <div class="card-body">
                                        <h5 class="card-title">${mySong.song}</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">${mySong.artist}</h6>
                                        <p class="card-text">${mySong.songDetails()}</p>
                                      </div>
                                    </div>
                                  </div>`;
      
    } // end of the output of regular song

  }); // end of songs.forEach

} // end of StartMeUp