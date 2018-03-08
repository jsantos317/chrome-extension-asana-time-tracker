export default class Task {
  constructor(taskId = null) {
    // current task ID we're working on
    this.taskId = taskId;

    // placeholder for new task ID. This gets updated whenever we click on a task
    this.newTaskId = null;

    // flag if timer is running on the current task
    this.isTimerRunning = false;
  }
  /**
   * startTimer for user
   */
  startTimer(user) {
    // change the current task ID to the new task ID
    this.taskId = this.newTaskId;

    // set our flag to true
    this.isTimerRunning = true;

    // add 'active' css to button
    const el = document.getElementById('property_js');
    el.classList.add('active');

    // add a timer icon to the grid
    this.addListIcon(this.taskId, 'primary', user.id, user.name, user.photo.image_27x27);

    // send start time request to server
    // this.postStartTime(this.taskId);
  }
  /**
   * updateTaskId
   */
  updateTaskId(taskId) {
    this.taskId = taskId;
  }
  /**
   * This function updates our view/app whenever the right pane changes
   */
  updateView() {
    // we update the selected task id
    const theId = document.getElementsByClassName('grid-row-selected')[0].attr('id');
    this.newTaskId = theId.replace('item_row_view_', '');

    // add a timer button
    this.addTimerButton();

    // get our timer history
    // this.getTimerHistory(this.newTaskId);

  }
  /**
   * Adds a timer button to the right pane menu. The click event is set during the constructor.
   */
  addTimerButton() {
    const activeCSS = this.newTaskId === this.taskId && this.isTimerRunning ? 'active' : '';

    // add a timer button
    const el = document.getElementById('right_pane__contents').getElementsByClassName('heart-button-container')[0];
    el.before(`
      <div class='js-timer'> 
        <div id='property_js' class='circularButtonView ${activeCSS} '> 
            <span class='circularButtonView-label'> 
            <svg class='svgIcon ' viewBox='0 0 32 32' title='start tracking'>
                <rect x='18.2' y='10.053' transform='matrix(-0.7071 -0.7071 0.7071 -0.7071 22.1741 39.1703)' width='2' height='9.879'></rect>
                <rect x='12' width='8' height='2'></rect>
                <circle cx='16' cy='9' r='1'></circle>
                <circle cx='16' cy='27' r='1'></circle>
                <circle cx='9.636' cy='11.636' r='1'></circle>
                <circle cx='22.364' cy='24.364' r='1'></circle>
                <circle cx='7' cy='18' r='1'></circle>
                <circle cx='25' cy='18' r='1'></circle>
                <circle cx='9.636' cy='24.364' r='1'></circle>
                <path d='M29.707,8.121c0.391-0.391,0.391-1.024,0-1.414l-1.414-1.414c-0.391-0.391-1.024-0.391-1.414,0L24.942,7.23 C22.516,5.214,19.4,4,16,4S9.484,5.214,7.058,7.23L5.121,5.293c-0.391-0.391-1.024-0.391-1.414,0L2.293,6.707 c-0.391,0.391-0.391,1.024,0,1.414l2.08,2.08C2.875,12.431,2,15.113,2,18c0,7.732,6.268,14,14,14s14-6.268,14-14 c0-2.887-0.875-5.569-2.373-7.798L29.707,8.121z M16,30C9.383,30,4,24.617,4,18S9.383,6,16,6s12,5.383,12,12S22.617,30,16,30z'></path>
            </svg> 
            </span> 
        </div>
        <span></span> 
      </div>`);
  }
}
