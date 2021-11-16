particlesJS('particles-js',

  {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },

      /*--------------------------粒子の色----------*/
      "color": {　　　　　　　　
        "value": "#BBBBBB"　　　　
      },

      /*--------------------------粒子の形 ---------*/
      "shape": {
        "type": "circle",
        　　　　
        "stroke": {
          "width": 0,
          "color": "#CCCCCC"
        },

        /*-----------------------------------*/
        "polygon": {
          "nb_sides": 10
        },

        /*---------------粒子を任意の画像に変更------------*/
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },

      /*----------------------粒子の色の透過 ---------*/
      "opacity": {
        "value": 0.3,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },

      /*-----------------------粒子の大きさ ---------*/
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },

      /*------------------------粒子間の線 ---------*/
      "line_linked": {
        "enable": true,
        "distance": 150,
        /*距離*/
        "color": "#AAAAAA",
        "opacity": 0.4,
        /*透過度*/
        "width": 1 /*太さ*/
      },

      /*------------------------動きについて ---------*/
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },

    /*-----------------------------------*/
    "interactivity": {
      "detect_on": "canvas",
      "events": { /*マウスオーバー時の粒子の動き*/
        "onhover": {
          "enable": true,
          "mode": "repulse"
		  /*repulseカーソルから離れる
			grabカーソルにくっつく
		    bubbleマウスオーバーしで粒子が膨らむ*/
        },

        /*-----------------------------------*/
        "onclick": {
          "enable": true,
          "mode": "push"
        },

        /*-----------------------------------*/
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },

        /*-----------------------------------*/
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },

        /*-----------------------------------*/
        "repulse": {
          "distance": 200
        },

        /*-----------------------------------*/
        "push": {
          "particles_nb": 4
        },

        /*-----------------------------------*/
        "remove": {
          "particles_nb": 2
        }
      }
    },

    /*-----------------------------------*/
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }

);
