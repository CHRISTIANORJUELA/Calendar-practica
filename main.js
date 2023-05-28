class Calendar{
    constructor(id){
      this.elCalendar = document.getElementById(id);
      this.showtemplate();
    }
    showtemplate(){
     this.elCalendar.innerHTML = `
    
   `
    }
}
