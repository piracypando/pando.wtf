class _app {
  id = 0;
  videoElement = null;
  audioElement = null;
  musicVolume = 0.12;
  musicFadeIn = 4000;
  skippedIntro = false;
  backgroundToggler = false;
  shouldIgnoreVideo = false;
  effects = [
    "bounce",
    "flash",
    "pulse",
    "rubberBand",
    "shake",
    "swing",
    "tada",
    "wobble",
    "jello",
  ];
  brandDescription = [
    "pando#0001",
    "i love my homies",
    "i love photography",
    "Graphic and media designer",
    "anton@fbi.systems"
  ];
  titleChanger = (text, delay) => {
    if (!text) return;

    delay = delay || 400;

    let counter = 0;

    setInterval(() => {
      if (counter < text.length) document.title = text[counter++];
      else document.title = text[(counter = 0)];
    }, delay);
  };
}

const app = new _app();
