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
      link: "https://discord.com/invite/bp4rxbYz",
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
  ]);
  app.iconChanger(["assets/icons/favicon.ico"]);
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

$.getJSON(ipgeolocation, (data) => {
  writeLine(["Your are browsing..", "pando.wtf"], 30, () => {
    if (app.skippedIntro) return;

    clearCursor();

    const usernames = ["user", "dude"];

    const ip = data.ip
      ? data.ip
      : usernames[Math.floor(Math.random() * usernames.length)];
    const isp = data.isp ? data.isp : "isp";
    const country_name = data.country_name ? data.country_name : "country_name";
    const city = data.city ? data.city : "city";
    const latitude = data.latitude ? data.latitude : "latitude";
    const longitude = data.longitude ? data.longitude : "longitude";
    const zipcode = data.zipcode ? data.zipcode : "zipcode";
    const languages = data.languages ? data.languages : "languages";

    var OSName = "Unknown";
    if (window.navigator.userAgent.indexOf("Windows NT 10.0") != -1)
      OSName = "Windows 10";
    if (window.navigator.userAgent.indexOf("Windows NT 6.3") != -1)
      OSName = "Windows 8.1";
    if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1)
      OSName = "Windows 8";
    if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1)
      OSName = "Windows 7";
    if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1)
      OSName = "Windows Vista";
    if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1)
      OSName = "Windows XP";
    if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1)
      OSName = "Windows 2000";
    if (window.navigator.userAgent.indexOf("Mac") != -1) OSName = "Mac/iOS";
    if (window.navigator.userAgent.indexOf("X11") != -1) OSName = "UNIX";
    if (window.navigator.userAgent.indexOf("Linux") != -1) OSName = "Linux";

    writeLine(
      [
        ";))",
        `<span style='font-size: 14px; color: #fff;'>How is it in <i style='color: #8B00FF'>${country_name}?
    \n<span style='font-size: 14px; color: #fff;'>And why the fuck are you using <i style='color: #8B00FF'>${isp}?
    `,
      ],
      55,
      500,
      () => {
        if (app.skippedIntro) return;

        clearCursor();

        writeLine(
          [`<i style='color: #F62459'>/// pando ;)</i>`],
          120,
          500,
          () => {
            timeouts.push(
              setTimeout(() => {
                if (app.skippedIntro) return;

                clearCursor();

                setTimeout(() => {
                  skipIntro();
                }, 500);
              }, infinity)
            );
          }
        );
      }
    );
  });
});

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
