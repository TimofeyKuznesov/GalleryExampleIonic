
import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import {HostListener, Directive,ElementRef} from '@angular/core';
import { NavController } from 'ionic-angular';
import {Platform} from 'ionic-angular';

const cards = [
    {
        text: 'Card 1',
        name: '1',
        image:'assets/img/1.jpg',
    },
    {
        text: 'Card 2',
        name: '2',
        image: 'assets/img/2.jpg',
    },
    {
        text: 'Card 3',
        name: '4',
        image: 'assets/img/3.jpg',
    },
    {
        text: 'Card 4',
        name: '4',
        image: 'assets/img/4.jpg',
    },
    {
        text: 'Card 5',
        name: '5',
        image: 'assets/img/5.jpg',
    },
];

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

  animations: [
  trigger('flyInOutR', [
    state('center', style({
    position: 'absolute',  top: 100,  right: 100,
      transform: 'rotate(0deg)',
      backgroundColor: 'green',

    })),
    state('left', style({
      position: 'absolute',  top: 100,  right: 100,
      transform: 'rotate(45deg)',
      backgroundColor: 'green',
    })),
    state('right', style({
    position: 'absolute', top: 100,  right: 100,
      transform: 'rotate(-45deg)',
      backgroundColor: 'green',
    })),
    transition('center =>left', animate('500ms ease-in')),
    transition('center => right', animate('500ms ease-in'))
  ]),
  trigger('flyInOutR2', [
    state('center', style({
    position: 'absolute',  top: 200,  right: 100,
      transform: 'rotate(0deg)',
      backgroundColor: 'green',

    })),
    state('left', style({
      position: 'absolute',  top: 200,  right: 100,
      transform: 'rotate(45deg)',
      backgroundColor: 'green',
    })),
    state('right', style({
    position: 'absolute', top: 200,  right: 100,
      transform: 'rotate(-45deg)',
      backgroundColor: 'green',
    })),
    transition('center =>left', animate('500ms ease-in')),
    transition('center => right', animate('500ms ease-in'))
  ]),
    trigger('flyInOut', [
      state('center', style({
      position: 'absolute',  top: 0,  right: 0,   left: 0,
        transform: 'translate3d(0, 0, 0)  rotate(0deg)',

      })),
      state('left', style({
        position: 'absolute',  top: 0,  right: 0,   left: 0,
        transform: 'translate3d(-150%, 0, 0) rotate(-45deg)',
      })),
      state('right', style({
      position: 'absolute',  top: 0,  right: 0,   left: 0,
        transform: 'translate3d(150%, 0, 0)  rotate(45deg)',
      })),
      transition('center =>left', animate('500ms ease-in')),
      transition('center => right', animate('500ms ease-in'))
    ]),
    trigger('flyDown', [
        state('center', style({
        //position: 'absolute',  top: 0,  right: 0,   left: 0,
            opacity: 0
        })),
        state('left', style({
        //position: 'absolute',  top: 0,  right: 0,   left: 0,
            opacity: 1
        })),
        state('right', style({
        //position: 'absolute',  top: 0,  right: 0,   left: 0,
            opacity: 1
        })),
        transition('center =>left', animate('500ms ease-in')),
        transition('center => right', animate('500ms ease-in'))
    ]),

  ]
})

export class HomePage {

  clientHeight=900;
  flyInOutState: String = 'center';
  swipeBlock: Boolean = false;
  index = 0;
  upImage= cards[0];
  downImage=cards[1];


  constructor(public navCtrl: NavController , public plt: Platform, private el:ElementRef) {
    this.plt = plt;
    this.el = el;
    this.clientHeight = this.el.nativeElement.clientHeight-50
    console.log(this.el)
  }

//  @HostListener('touchstart', ['$event'])
//  @HostListener('mousedown', ['$event'])
//    onStart(event) {
//    console.log(event);
//      if (event.touches) {                      // only for touch
//        this.removePreviousTouchListeners();    // avoid mem leaks
//        this.touchmoveListenFunc = this.renderer.listen(event.target, 'touchmove', (e) => { this.onMove(e); });
//        this.touchendListenFunc = this.renderer.listen(event.target, 'touchend', (e) => { this.removePreviousTouchListeners(); this.onEnd(e); });
//        this.touchcancelListenFunc = this.renderer.listen(event.target, 'touchcancel', (e) => { this.removePreviousTouchListeners(); this.onEnd(e); });
//      }
//  }

onResize(ev){
    this.clientHeight = (this.el.nativeElement.clientHeight < this.el.nativeElement.clientWidth)?this.el.nativeElement.clientHeight-50 : this.el.nativeElement.clientWidth-50
}

animationStarted(ev) {
    console.log("animationStarted");
    //this.swipeBlock=true;
}
animationDone(ev) {
    console.log("animationDone");
    if(this.swipeBlock){
        this.upImage=this.downImage;
    }
    this.swipeBlock=false;
    this.flyInOutState = 'center';
    this.clientHeight = (this.el.nativeElement.clientHeight < this.el.nativeElement.clientWidth)?this.el.nativeElement.clientHeight-50 : this.el.nativeElement.clientWidth-50
}

swipeEvent(e) {
    console.log(e.deltaX+", "+e.deltaY);
     // swipe left e.direction = 2;
     if(this.swipeBlock)
        return;
     if(e.direction === 2)
        {
        this.swipeBlock=true;

        this.index=((this.index+1)===cards.length)?0:this.index+1
        this.downImage=cards[this.index]
        this.flyInOutState='left';
        }
     if(e.direction === 4)
           {
           this.swipeBlock=true;
           this.index=(this.index>0)?this.index-1:cards.length-1
           this.downImage=cards[this.index]
           this.flyInOutState='right';
           }
     // swipe right e.direction = 2
     // pan for get fired position
     //console.log($e.deltaX+", "+$e.deltaY);
}

  toggleFlyInOut(ev){
    if(this.swipeBlock)
        return;
    console.log(ev)
    this.swipeBlock=true;

    if((this.plt.width()/2)>ev.layerX)
        {
        this.swipeBlock=true;

        this.index=((this.index+1)===cards.length)?0:this.index+1
        this.downImage=cards[this.index]
        this.flyInOutState='left';
        }
    else{
        this.swipeBlock=true;
        this.index=(this.index>0)?this.index-1:cards.length-1
        this.downImage=cards[this.index]
        this.flyInOutState='right';
    }

  }

}
