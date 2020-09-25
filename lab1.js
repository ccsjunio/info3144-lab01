class TuneType {

  constructor(song, artist, genre, yearPub) {
    this.song = song;
    this.artist = artist;
    this.genre = genre;
    this.yearPub = yearPub;

    /**************************************************************
    * name: songDetails
    * description: this method returns song details information
    * return template:
    *  {
    *    genre: <genre attribute>
    *    yearPub: <year of publication attribute>
    *  }
    **************************************************************/
    this.songDetails = () => (
      {
        genre: this.genre,
        yearPub: this.yearPub
      }
    )
      //return "Genre is " + this.genre + " and song was released in " + this.yearPub;

    };
  }
}

function startMeUp(){
  var mySong = new TuneType("Bad to the Bone", "George Thorogood", "Country", "1982");

  var output = mySong.song + "<br>" + mySong.artist + "<br><br>" + mySong.songDetails() + "<br>";
  document.write(output);
}