$(function () {
  const slListItem = ".list-item";
  let isPlaying = false;

  function init() {
    const coverPhoto = $(slListItem).filter(".active").find("a").data("cover");
    setCoverPhoto(coverPhoto);
    setAudio($(slListItem).filter(".active").find("a").data("music"));
  }
  init();

  /**
   * Set cover photo
   * @param {*} photoUrl
   */
  function setCoverPhoto(photoUrl) {
    if (photoUrl) {
      $(".cover img").attr("src", photoUrl);
    }
  }

  /**
   * Set audio music path
   * @param {*} src
   */
  function setAudio(src) {
    if (src) {
      if (!isPlaying) {
        if ($("audio").attr("src")) {
          $("audio")[0].play();
        } else {
          $("audio").attr("src", src);
        }
      } else {
        $("audio").attr("src", src);
        $("audio")[0].play();
      }

      $(".icon-play").hide();
      $(".icon-pause").show();
    }
  }

  function shuffle() {
    var array = [];
    $(slListItem).each((key, val) => {
      const musicLink = $(val).find("a").data("music");
      if (musicLink) array.push(musicLink);
    });

    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    console.log(array[0]);

    return array[0];
  }

  $(document).on("click", `.icon-reset`, function (e) {
    setAudio($(slListItem).filter(".active").find("a").data("music"));

    return false;
  });

  $(document).on("click", `.icon-prev`, function (e) {
    $(slListItem).filter(".active").prev().find("a").click();

    return false;
  });

  $(document).on("click", `.icon-next`, function (e) {
    $(slListItem).filter(".active").next().find("a").click();

    return false;
  });

  $(document).on("click", `.icon-play`, function (e) {
    setAudio($(slListItem).filter(".active").find("a").data("music"));

    return false;
  });

  $(document).on("click", `.icon-pause`, function (e) {
    $("audio")[0].pause();

    $(".icon-play").show();
    $(".icon-pause").hide();
    return false;
  });

  $(document).on("click", `.icon-shuffle`, function (e) {
    const _shuffle = shuffle();
    setAudio(_shuffle);

    $(slListItem).each((key, val) => {
      const musicLink = $(val).find("a").data("music");
      if (_shuffle == musicLink) {
        $(slListItem).removeClass("active");
        $(val).addClass("active");
        setCoverPhoto($(val).find("a").data("cover"));
        return;
      }
    });

    return false;
  });

  $(document).on("click", `${slListItem} a`, function (e) {
    $(slListItem).stop().removeClass("active");
    $(this).parent().stop().addClass("active");

    setCoverPhoto($(this).data("cover"));

    const musicLink = $(this).data("music");
    if (musicLink) setAudio(musicLink);

    return false;
  });

  $("audio").on("playing", function (e) {
    console.log("play");
    isPlaying = true;
  });

  $("audio").on("pause", function (e) {
    console.log("pause");
    isPlaying = false;
  });

  $("audio").on("timeupdate", function (e) {
    var minutes = parseInt(e.currentTarget.duration / 60, 10);
    var seconds = parseInt(e.currentTarget.duration % 60);

    if (minutes > 0 || seconds > 0) {
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      $(".time-final").text(minutes + ":" + seconds);

      var mins = Math.floor(e.currentTarget.currentTime / 60);
      if (mins < 10) {
        mins = "0" + String(mins);
      }
      var secs = Math.floor(e.currentTarget.currentTime % 60);
      if (secs < 10) {
        secs = "0" + String(secs);
      }

      const calc =
        (e.currentTarget.currentTime / e.currentTarget.duration) * 100;

      $("progress").attr("value", calc);
      $(".time-start").text(mins + ":" + secs);
    }
  });
});
