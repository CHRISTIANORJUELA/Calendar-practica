class template{
  static generateDates(monthToShow){
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
      this.currentMonth = moment();
      this.cells = []; 
      this.elCalendar = document.getElementById(id);
      this.elGridBody = this.elCalendar.querySelector('.grid_body')
      this.elMonthname = this.elCalendar.querySelector('.month-name');
      this.initAll() 
    }
    initAll(){
     this.cells = template.generateDates(this.currentMonth)
     this.showCells()
     this.addEventListenerToControl();
    }

    showCells(){
        this.cells = template.generateDates(this.currentMonth);
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

    changeMonth(next){
        if(next){
            this.currentMonth.add(1,'months')
        }else{
            this.currentMonth.subtract(1,'months')
        }
    }
}

window.onload = ()=> new Calendar('calendar');


