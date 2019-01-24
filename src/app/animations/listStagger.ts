// CAREFULL animations only work after installment 
// npm install @angular/animations@latest --save in file folder e.g. (d:\projecten\projectnaam)

import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

export const listStagger = 
/// ****** ANIMATION FUNCTION START 
    
    //trigger name for animation
    trigger('listStagger',
    //animate when *<=>* any change to any change
    [transition('* <=> *',
     // **** on ENTER animation
       [ query(':enter', [
          style({ opacity: 0,transform: 'translateY(-15px)'  }),
              stagger('50ms', 
                  animate('550ms ease-out',
                  
                  // from opacity 0 and -15 to 1 and 0
                  style({ opacity: 1, transform: 'translateY(0px)' })
                  ) 
              )] 
       
       ,{ optional: true } //prevent error query
      ) //close query

      // **** on LEAVE animation
      , query(':leave', animate('50ms', style({ opacity: 0 })), {
        optional: true
       })
    ])
  ])
  //******* ANIMATION FUNCTION END */
