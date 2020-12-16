class Food{
    constructor(){
        this.image = loadImage("images/Milk.png");
        this.foodStock=50;
        this.lastFed;
    }

    getFoodStock(){
        return this.foodStock;
    };

    updateFoodStock(foodStock){
        this.foodStock=foodStock
    }
    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1
        }
    }

   bedroom(){
        background(bedroom,550,500)
   }

   garden(){
    background(garden,550,500)
   }

   washroom(){
    background(washroom,550,500)
   }

    display(){
       var x=80, y=100;
       background(46,139,87);
        imageMode(CENTER);
      // image(this.image,720,220,70,70)

      fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last fed: "+lastFed%12+" PM",400,30)
  }
  else if(lastFed===0){
    text("Last fed: 12 AM",400,30)
  }
  else{
    text("Last fed: "+lastFed+" AM",400,30)
  }
        if(this.foodStock!==0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10===0){
                x=80;
                y=y+50
                }
                image(this.image,x,y,40,50);
            x=x+30;
            }
            
        }

    }
}