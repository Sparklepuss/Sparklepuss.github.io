function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

window.onload = function() {
  let categories = [];

  let projects = document.querySelectorAll('.grid-item');
  projects.forEach(function(project) {
    let project_categories = project.dataset.categories.split(', ');
    // project_categories.sort( );
    project_categories.reverse();

    project_categories.forEach(function(project_category) {
      let filter_btn = document.createElement('div');
      filter_btn.classList.add('pill');
      filter_btn.innerText = project_category;

      filter_btn.addEventListener('click', selectFilter);

      project.prepend(filter_btn);

      if (!categories.includes(project_category))
        categories.push(project_category);
    });
  });


  let menubar = document.querySelector('.menubar .menubar-item');
  let filter_btns = [];

  categories.sort();
  categories.reverse();

  categories.forEach(function(category) {
    let filter_btn = document.createElement('div');
    filter_btn.classList.add('pill_menu');
    filter_btn.innerText = category;

    filter_btn.addEventListener('click', toggleFilter);

    menubar.prepend(filter_btn);

    filter_btns.push(filter_btn);
  });

  function showFilteredProjectList(active_filter) {
    console.log('show: ' + active_filter);
    projects.forEach(function(project) {
      if (active_filter == -1) {
        project.style.display = 'block';
      } else {
        let project_categories = project.dataset.categories.split(', ');

        if (project_categories.includes(active_filter)) {
          project.style.display = 'block';
        } else {
          project.style.display = 'none';
        }
      }
    });
  }

  function selectFilter() {
    let filter_value = this.innerText;

    filter_btns.forEach(function(filter_btn) {
      if (filter_btn.innerText == filter_value) {
        filter_btn.classList.add('selected');
      } else {
        filter_btn.classList.remove('selected');
      }
    });

    showFilteredProjectList(filter_value);
  }

  function toggleFilter() {
    let filter_value = this.innerText;

    filter_btns.forEach(function(filter_btn) {
      if (filter_btn.innerText == filter_value) {
        filter_btn.classList.toggle('selected');

        if (filter_btn.classList.contains('selected')) {
          showFilteredProjectList(filter_value);
        } else {
          showFilteredProjectList(-1);
        }
      } else {
        filter_btn.classList.remove('selected');
      }
    });
  }

  let project_buttons = document.querySelectorAll('.grid-item > img, .grid-item > video');

}
