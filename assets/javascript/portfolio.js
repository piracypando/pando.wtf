"use strict";

const ipgeolocation =
  "https://api.ipgeolocation.io/ipgeo?apiKey=1cc361c48bd54a8c8c4e20e38a9f7a0d";

const timeouts = [];

const mobileAndTabletCheck = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

$(document).ready(() => {
  const links = [
    {
      name: "Steam",
      link: "https://steamcommunity.com/id/piracypando/",
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/pando.mov/",
    },
    {
      name: "Discord",
      link: "https://pando.wtf/discord",
    },
  ];

  for (let i in links) {
    let link = links[i];

    $("#marquee").append(
      `<a href=${link.link} target="_BLANK">${link.name}</a>`
    );

    link = $("#marquee").children("a").last();

    if (i != links.length - 1) $("#marquee").append(" × ");
  }

  if (mobileAndTabletCheck()) {
    $('#background').replaceWith('<div id="background" style="background-image: url(https://media.tenor.com/9SBqqiVgUEQAAAAC/fallen-angels-wong-kar-wai.gif);"></div>');
    app.shouldIgnoreVideo = true;
  }

  app.titleChanger([
    "‎",
    "p",
    "pa",
    "pan",
    "pand",
    "pando",
    "pando.",
    "pando.w",
    "pando.wt",
    "pando.wtf",
    "pando.wt",
    "pando.w",
    "pando.",
    "pando",
    "pand",
    "pan",
    "pa",
    "p",
    "‎",
  ]);
});

if ($.cookie("videoTime")) {
  app.videoElement.currentTime = $.cookie("videoTime");
  app.audioElement.currentTime = $.cookie("videoTime");
}

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

document.body.onkeyup = (event) => {
  if (event.keyCode == 32 && app.skippedIntro) {
    if (app.backgroundToggler) {
      app.videoElement.play();
      app.audioElement.play();
    } else {
      app.videoElement.pause();
      app.audioElement.pause();
    }

    return (app.backgroundToggler = !app.backgroundToggler);
  }
};

$("html").on("contextmenu", (event) => {
  const img = document.createElement("img");

  const trollfaceLight = app.skippedIntro ? "" : "trollface-light";

  img.src = "assets/others/dick.png";
  img.width = 18;
  img.height = 18;
  img.alt = "pando.wtf";
  img.style = `position: absolute; left: ${event.pageX}px; top: ${event.pageY}px; z-index: 10`;
  img.className = `troll ${trollfaceLight}`;

  document.body.appendChild(img);
});

setInterval(() => {
  $(".troll").remove();
}, 600);

$(".skip").click(() => {
  skipIntro();
});

$.fn.extend({
  animateCss: function (animationName) {
    const animationEnd =
      "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";

    this.addClass(`animated ${animationName}`).one(animationEnd, () => {
      $(this).removeClass(`animated ${animationName}`);
    });

    return this;
  },
});

const writeLine = (text, speed, timeout, callback) => {
  timeout = typeof timeout === "number" ? timeout : [0, (callback = timeout)];

  const lineNumber = app.id !== 2 ? ++app.id : (app.id += 2);

  setTimeout(() => {
    const typed = new Typed(`#line${lineNumber}`, {
      strings: text,
      typeSpeed: speed,
      onComplete: callback,
    });
  }, timeout);
};

const skipIntro = () => {
  if (app.skippedIntro) return;

  app.skippedIntro = true;

  timeouts.forEach((timeout) => {
    clearTimeout(timeout);
  });

  $(".top-right").remove();

  $("#main").fadeOut(100, () => {
    $("#main").remove();

    $("#marquee").marquee({
      duration: 15000,
      gap: 420,
      delayBeforeStart: 1000,
      direction: "left",
      duplicated: true,
    });

    setTimeout(() => {
      $(".brand-header").animateCss(
        app.effects[Math.floor(Math.random() * app.effects.length)]
      );
    }, 300);

    setTimeout(() => {
      const typed = new Typed("#brand", {
        strings: app.brandDescription,
        typeSpeed: 30,

        onComplete: () => {
          clearCursor();
        },
      });
    }, 1350);

    setTimeout(() => {
      if (!app.shouldIgnoreVideo) {
        app.videoElement.play();
        app.audioElement.play();
      }

      app.videoElement.addEventListener(
        "timeupdate",
        () => {
          $.cookie("videoTime", app.videoElement.currentTime, { expires: 1 });
        },
        false
      );

      $(".marquee-container").css("visibility", "visible").hide().fadeIn(100);

      $(".marquee-container").animateCss("zoomIn");

      $(".container").fadeIn();

      $(".background").fadeIn(200, () => {
        if (!app.shouldIgnoreVideo)
          $("#audio").animate({ volume: app.musicVolume }, app.musicFadeIn);
      });
    }, 200);
  });
};

const clearCursor = () => {
  return $("span").siblings(".typed-cursor").css("opacity", "0");
};
