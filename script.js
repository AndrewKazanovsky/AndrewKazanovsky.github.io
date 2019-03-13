(function() {
  window.onload = function() {

    // typing text animation

    var paragraph = document.getElementById('typing-animation');
    var wrongPartOfText = 'London is a capital';
    var correctPartOfText = 'the capital of Great Britain.';

    function showText(str, onComplete) {
      for (let i = 0; i < str.length; i++) {
        setTimeout(function() {
          paragraph.innerHTML += str.charAt(i);
        }, i * 120);
      }
      if (typeof onComplete === 'function') {
        setTimeout(onComplete, str.length * 120);
      }
    }

    function hideText(count, onComplete) {
      for (let i = 0; i < count; i++) {
        setTimeout(function() {
          paragraph.innerHTML = paragraph.innerHTML.slice(
            0,
            paragraph.innerHTML.length - 1,
          );
        }, i * 80);
      }
      if (typeof onComplete === 'function') {
        setTimeout(onComplete, count * 80);
      }
    }

    function startTypingText() {
      showText(wrongPartOfText, function() {
        hideText(9, function() {
          showText(correctPartOfText);
        });
      });
    }

    // ball animation

    var ball = document.getElementById('ball');
    var ballAnimation = null;

    function easeInQuart(t, b, c, d) {
      t /= d;
      return c * t * t * t * t + b;
    }

    function easeOutQuart(t, b, c, d) {
      t /= d;
      return -c * t * (t - 2) + b;
    }

    function bounce(duration, start, finish, time, type) {
      time += 1 / 60;
      var easeFunc = type === 'easeIn' ? easeInQuart : easeOutQuart;

      position = easeFunc(time, start, finish, duration);

      if (type === 'easeIn') {
        if (position >= finish) {
          ball.style.top = finish + 'px';
          ballAnimation = requestAnimationFrame(function() {
            bounce(0.7, parseFloat(ball.style.top), -260, 0, 'easeOut');
          });
          return;
        }
      } else if (type === 'easeOut') {
        if (position <= start + finish) {
          ball.style.top = start + finish + 'px';
          cancelAnimationFrame(ballAnimation);
          return;
        }
      }

      ball.style.top = position + 'px';
      ballAnimation = requestAnimationFrame(function() {
        bounce(duration, start, finish, time, type);
      });
    }

    function startBallAnimation() {
      ballAnimation = requestAnimationFrame(function() {
        bounce(1, 0, 500, 0, 'easeIn');
      });
    }

    // starting animations
    startTypingText();
    startBallAnimation();
  };
})();
