export class Scroll
{

     constructor(private y:string) {
       window.scroll({
         top:parseInt(y),
         behavior: 'smooth'
       });
     }

}



