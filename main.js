class template{
  static getTemplate(){
    return `
        <div class="calendar_header">
                   <button type="button" class="control control--prev"> &lt;</button>
                   <span class="month-name">jun 2019</span>
                   <button type="button" class="control control--next">&gt;</button>
        </div>
                 <div class="calendar_body">
                 <div class="grid">
                 <div class="grid_header">
                     <span class="grid_cell grid_cell--gh">Lunes</span>
                     <span class="grid_cell grid_cell--gh">Martes</span>
                     <span class="grid_cell grid_cell--gh">Miercoles</span>
                     <span class="grid_cell grid_cell--gh">Jueves</span>
                     <span class="grid_cell grid_cell--gh">Viernes</span>
                     <span class="grid_cell grid_cell--gh">Sabado</span>
                     <span class="grid_cell grid_cell--gh">Domingo</span>
                 </div>
                 <div class="grid_body">
                     
                 </div>
                </div>         
      </div>       
    `
  }
  

  static generateDates(monthToShow = moment()){
    if(!moment.isMoment(monthToShow)){return null;}
    let dateStart = moment(monthToShow).startOf('month')
    let dateEnd = moment(monthToShow).endOf('month')
    let cells = [];
    while(dateStart.day()!==1){dateStart.subtract(1,'days') }
    while(dateEnd.day()!==0){ dateEnd.add(1,'days')}
    do{
     cells.push(
       {
           date: moment(dateStart),
           isInCurrentMonth: dateStart.month()===monthToShow.month()
       }
     );
     dateStart.add(1,'days');
    }while(dateStart.isSameOrBefore(dateEnd))
    return cells
   }
}

class Calendar{
    constructor(id){
      this.cells = [];  
      this.currentMonth = moment();
      this.elCalendar = document.getElementById(id);
      this.showtemplate();
      this.elGridBody = this.elCalendar.querySelector('.grid_body')
      this.elMonthname = this.elCalendar.querySelector('.month-name');
      this.showCells();
    }
    showtemplate(){
     this.elCalendar.innerHTML = template.getTemplate()
     this.addEventListenerToControl();
    }

    showCells(){
        this.cells = template.generateDates(this.currentMonth);
        if(this.cells == null){
            console.error('Error en encontrar las Fechas');
            return;
        }
        this.elGridBody.innerHTML = '';
        let templateCells = '';
        for(let i=0;i<this.cells.length ; i++){
            //<span class="grid_cell grid_cell--gd grid_cell-selected">1</span>
            templateCells += `
            <span class="grid_cell grid_cell--gd">
            ${this.cells[i].date.date()}
            </span>
            `
        }
        this.elMonthname.innerHTML = this.currentMonth.format('MMM YYYY') 
        this.elGridBody.innerHTML = templateCells;
         //<span class="grid_cell grid_cell--gd grid_cell-disabled">34</span>
         // <span class="grid_cell grid_cell--gd grid_cell-disabled">35</span>
    }

    addEventListenerToControl(){
      let elControls = this.elCalendar.querySelectorAll('.control');
      elControls.forEach(control=>{
          control.addEventListener('click',e=>{
            let elTarget = e.target;
            if(elTarget.classList.contains('control--next')){
              this.changeMonth(true);
            }else{
              this.changeMonth(false)
            }
            this.showCells();
          })    
      })   
    }

    changeMonth(next=true){
        if(next){
            this.currentMonth.add(1,'months')
            console.log(this.currentMonth)
        }else{
            this.currentMonth.subtract(1,'months')
            console.log(this.currentMonth)
        }
    }
}


window.onload = init()
function init(){
  let calendar = new Calendar('calendar')
}

