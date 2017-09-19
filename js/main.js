window.onload = function(){

    // start mouse move constructor

    function Line(param){
        this.element = document.getElementById(param.element);
        this.slider = document.getElementById(param.slider);
        this.mask = document.getElementById(param.mask);
        this.clip = document.querySelector(param.clip);
    }

    Line.prototype = {

        constructor: Line,

        move : function(){

           var that = this;

            this.element.onmousedown = function(e){

                document.onmousemove = function(e){
                    that.getShiftX(e);
                }

                document.onmouseup = function(e){
                    document.onmousemove = document.onmouseup = null;
                }

                return false
            }

           this.element.ondrugstart = function(){
                return false
           }

           this.slider.onclick = function(e){
                that.getShiftX(e);
           }

        },

        getCoords : function(element){
            var box = element.getBoundingClientRect();
            return{
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            }
        },

        getShiftX : function(e){

                    var thisElementCoord = this.getCoords(this.element),
                        thisSliderCoord = this.getCoords(this.slider),
                        shiftX = e.pageX - thisSliderCoord.left - this.element.offsetWidth / 2;

                    if(shiftX < 0){
                        shiftX = 0;
                    }

                    var rightSliderCoord = this.slider.offsetWidth - this.element.offsetWidth;

                    if(shiftX > rightSliderCoord){
                        shiftX = rightSliderCoord
                    }

                    this.element.style.left = shiftX + 'px';
                    this.mask.style.width = shiftX + 'px';
                    this.clip.style.clip = 'rect(0px ' + shiftX + 'px 440px 0px)'
        }       

    }

    // end mouse move constructor

    // start slider rotate constructor

    function Slider(param){
        this.slider = document.getElementById(param.slider);
        this.sliderCounts = param.sliderCounts;
    }

    Slider.prototype = {

        constructor : Slider,

        init: function(){
            this.rotate();
            this.setBigPicture();
        },

        rotate : function(){

            var slideWrap = document.querySelector('.thumb'),
                slideWidth = slideWrap.querySelector('li').offsetWidth,
                current = 0,
                sliderCounts = this.sliderCounts,
                widthSlider = slideWidth * sliderCounts,
                stop = (slideWrap.querySelectorAll('li').length-sliderCounts) * slideWidth,
                next = document.querySelector('.next a'),
                prev = document.querySelector('.prev a');

            slideWrap.style.width = widthSlider + 'px';
            
            next.onclick = function(e){
                if(current >= stop) return
                current = current + slideWidth;
                slideWrap.querySelector('ul').style.marginLeft = -current + 'px'
                return false
            }

            prev.onclick = function(e){
                if(current <= 0) return
                current = current - slideWidth
                slideWrap.querySelector('ul').style.marginLeft = -current + 'px'
                return false
            }

        },

        setBigPicture : function(){

             var slideWrap = document.querySelector('.thumb'),
                 mainSlides = document.querySelectorAll('.main-slide img'),
                 slideItem = slideWrap.querySelectorAll('li a');

                 if(!slideItem) return;

                 slideItem.forEach(function(elem, i){

                        elem.addEventListener('click', function(e){
                            e.preventDefault();

                            for(var k = 0; k < slideItem.length; k++){
                                slideItem[k].classList.remove('active')
                            }

                            elem.classList.add('active');
                            var img = elem.querySelector('img');

                            mainSlides.forEach(function(el){
                                el.style.opacity = '0';
                                setTimeout(function(){
                                    el.setAttribute("src", img.getAttribute('src'));
                                    el.style.opacity = '1';
                                 },0)
                            });

                         });
                 });
        },

    }

    // end slider rotate constructor

    var line = new Line({
        element: 'line',
        slider: 'slider',
        mask: 'mask',
        clip: '.clip'
    });
    
    var slider = new Slider({
        slider: 'carousel',
        sliderCounts: 4 // set slide items
    });

    line.move();
    slider.init(); 
}

