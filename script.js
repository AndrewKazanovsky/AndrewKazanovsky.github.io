(function() {
  window.onload = function() {
    var bb8Robot = document.querySelector('#bb8');
    // bb8 body
    var bb8BodyContainer = document.querySelector('#bb8-body-container');
    var bb8Body = document.querySelector('#bb8-body');
    var bb8BodyShadow = document.querySelector('#bb8-shadow');
    // bb8 head
    var bb8Head = document.querySelector('#bb8-head');
    var bb8Face = document.querySelector('#bb8-face');
    var bb8Eyes = document.querySelector('#bb8-eyes');
    var bb8RedEye = document.querySelector('#bb8-eye-red');
    var bb8Antennas = document.querySelector('#bb8-antennas');
    // stones
    var stones = document.querySelector('#stones');
    var stonesClone = stones.cloneNode(true);
    // mountains
    var mountains = document.querySelector('#mountains');
    var closerMountains = document.querySelector('#closer-mountains');

    // creating stones and mountains clones
    stonesClone.setAttribute('id', 'stones-clone');
    stones.parentNode.insertBefore(stonesClone, stones);
    var mountainsClone = mountains.cloneNode(true);
    mountainsClone.setAttribute('id', 'mountains-clone');
    mountains.parentNode.insertBefore(mountainsClone, mountains);
    var closerMountainsClone = closerMountains.cloneNode(true);
    closerMountainsClone.setAttribute('id', 'closer-mountains-clone');
    closerMountains.parentNode.insertBefore(
      closerMountainsClone,
      closerMountains,
    );

    var bb8BodyTL = new TimelineMax({ repeat: -1 }),
      bb8BodyContainerTL = new TimelineMax({ repeat: -1 }),
      bb8BodyShadowTL = new TimelineMax({ repeat: -1 }),
      bb8HeadTL = new TimelineMax({ repeat: -1 }),
      bb8FaceTL = new TimelineMax(),
      bb8AntennasTL = new TimelineMax(),
      bb8StonesTL = new TimelineMax({ repeat: -1 }),
      bb8StonesCloneTL = new TimelineMax({ repeat: -1 }),
      bb8MountainsTL = new TimelineMax({ repeat: -1 }),
      bb8MountainsCloneTL = new TimelineMax({ repeat: -1 }),
      bb8CloserMountainsTL = new TimelineMax({ repeat: -1 }),
      bb8CloserMountainsCloneTL = new TimelineMax({ repeat: -1 });

    // start animation
    start();

    function start() {
      seeAround(0.2);
      startMovement(0.1);

      setInterval(function() {
        seeAround(0.5);
      }, 7000);

      setInterval(function() {
        zoom();
      }, 10000);
    }

    function startMovement(duration) {
      startMovingRobot(duration);
      startMovingStones(duration * 10);
      startMovingMountains(duration);
    }

    // stones animations
    function startMovingStones(duration) {
      bb8StonesTL.to(stones, duration, {
        x: '+=100%',
        ease: Linear.easeNone,
      });

      bb8StonesCloneTL
        .set(stonesClone, {
          x: '-=100%',
        })
        .to(stonesClone, duration, {
          x: '+=100%',
          ease: Linear.easeNone,
        });
    }

    // mountains animations
    function startMovingMountains(duration) {
      var farMountainsDuration = duration * 700;
      var closerMountainsDuration = duration * 300;

      var tl = new TimelineMax();
      tl.to(
        [mountains, mountainsClone, closerMountainsClone, closerMountains],
        0,
        {
          y: '+=40',
        },
      );

      bb8MountainsTL.to(mountains, closerMountainsDuration, {
        x: '+=100%',
        ease: Linear.easeNone,
      });

      bb8MountainsCloneTL
        .set(mountainsClone, {
          x: '-=100%',
        })
        .to(mountainsClone, farMountainsDuration, {
          x: '+=100%',
          ease: Linear.easeNone,
        });

      // closer mountains

      bb8CloserMountainsTL.to(closerMountains, closerMountainsDuration, {
        x: '+=100%',
        ease: Linear.easeNone,
      });

      bb8CloserMountainsCloneTL
        .set(closerMountainsClone, {
          x: '-=80%',
        })
        .to(closerMountainsClone, closerMountainsDuration, {
          x: '+=80%',
          ease: Linear.easeNone,
        });
    }

    // robot animations

    function startMovingRobot(duration) {
      bb8BodyTL.to(bb8Body, duration * 6, {
        rotation: '-=360',
        ease: Linear.easeNone,
        transformOrigin: '50% 50%',
      });
      bb8BodyContainerTL
        .to(bb8BodyContainer, duration, { y: '-=40', ease: Linear.easeNone })
        .yoyo(true);
      bb8BodyShadowTL.to(bb8BodyShadow, duration, { scale: 1.1 }).yoyo(true);
      moveHeadAroundBody(duration * 2);
    }

    // head animations

    function seeAround(duration) {
      bb8FaceTL
        .staggerTo([bb8Face, bb8Eyes], duration, {
          x: '-=210',
          ease: Linear.easeNone,
        })
        .to([bb8Face, bb8Eyes], duration * 2, {
          delay: 1,
          x: '+=330',
          ease: Linear.easeNone,
        })
        .to([bb8Face, bb8Eyes], duration, {
          x: '-=120',
          ease: Linear.easeNone,
        });

      bb8AntennasTL
        .to(bb8Antennas, duration, {
          x: '+=70',
          ease: Linear.easeNone,
        })
        .to(bb8Antennas, duration * 2, {
          delay: 1,
          x: '-=110',
          ease: Linear.easeNone,
        })
        .to(bb8Antennas, duration, {
          x: '+=40',
          ease: Linear.easeNone,
        });
    }

    function moveHeadAroundBody(duration) {
      function moveHeadTo(direction) {
        var isRightDirection = direction === 'right';
        var rotation = isRightDirection ? '+=3deg' : '-=3deg';
        var transformOrigin = isRightDirection ? 'left bottom' : 'right bottom';
        var x = isRightDirection ? '+=20' : '-=20';
        var ease = Linear.easeNone;

        var commonParams = {
          rotation: rotation,
          x: x,
          transformOrigin: transformOrigin,
          ease: ease,
        };

        bb8HeadTL
          .to(
            bb8Head,
            duration,
            Object.assign({}, commonParams, {
              y: '-=60',
            }),
          )
          .to(
            bb8Head,
            duration,
            Object.assign({}, commonParams, {
              y: '-=20',
            }),
          )
          .to(
            bb8Head,
            duration,
            Object.assign({}, commonParams, {
              y: '-=60',
            }),
          )
          .to(
            bb8Head,
            duration,
            Object.assign({}, commonParams, {
              y: '-=20',
            }),
          )
          .to(bb8Head, duration * 4, {
            rotation: isRightDirection ? '-=12deg' : '+=12deg',
            x: isRightDirection ? '-=80' : '+=80',
            y: '+=160',
            transformOrigin: transformOrigin,
            ease: ease,
            onComplete: blink,
          });
      }

      moveHeadTo('right');
      moveHeadTo('left');
    }

    // red eye blinking
    function blink() {
      bb8FaceTL
        .to(bb8RedEye, 0.5, {
          opacity: 0,
        })
        .to(bb8RedEye, 0.5, {
          opacity: 1,
        });
    }

    // move far and return
    function zoom() {
      var tl = new TimelineMax();
      tl.to(bb8Robot, 3, {
        scale: 0.8,
      })
        .to(bb8Robot, 2, {
          scale: 1.2,
          ease: Linear.Expo,
        })
        .yoyo();
    }
  };
})();
