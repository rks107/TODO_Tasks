var countTask = 0;
var inputTask = document.getElementById('input-task');
var countUpdate = document.getElementById('count');

document.querySelector('.search-box .fa-plus-circle').addEventListener('click', function(){


    if(inputTask.value === "") {
        alert("please enter some task");
        return;
    }

    countTask++;
        var task = $('<div class="task"></div').text(inputTask.value);
        var del = $('<i class="fas fa-trash"></i>').click(function(){
            var ev = $(this).parent();
            ev.fadeOut(function(){
                ev.remove();

                // To count numbers of task remaning
                countTask--;
                countUpdate.innerHTML = countTask;
            });
        });
        var check = $('<i class="fas fa-check"></i>').click(function(){
            var ev = $(this).parent();
            ev.fadeOut(function(){
                $('.com').append(ev);
                ev.fadeIn();
            });
            $(this).remove();
            // To count numbers of task remaning
            countUpdate.innerHTML = countTask;
        });

        task.append(del, check);
        $('.notcom').append(task);
        inputTask.value="";

        // To count numbers of task remaning
        countUpdate.innerHTML = countTask;

});


// clear all tasks

document.getElementById('clear-complete').addEventListener('click', function(){
    var tasks = document.querySelectorAll('.task');
    for(let i of tasks) {
        i.remove();
    }
    countTask = 0;
    countUpdate.innerHTML = countTask;
});


// for taking input by enter key 

inputTask.addEventListener("keyup", function(event){

    if(event.keyCode == 13 && inputTask.value != "") {
        // alert("hey");

        countTask++;
        var task = $('<div class="task"></div').text(inputTask.value);
        var del = $('<i class="fas fa-trash"></i>').click(function(){
            var ev = $(this).parent();
            ev.fadeOut(function(){
                ev.remove();

                // To count numbers of task remaning
                countTask--;
                countUpdate.innerHTML = countTask;
            });
        });
        var check = $('<i class="fas fa-check"></i>').click(function(){
            var ev = $(this).parent();
            ev.fadeOut(function(){
                $('.com').append(ev);
                ev.fadeIn();
            });
            $(this).remove();
            // To count numbers of task remaning
            countUpdate.innerHTML = countTask;
        });

        task.append(del, check);
        $('.notcom').append(task);
        inputTask.value = "";

        // To count numbers of task remaning
        countUpdate.innerHTML = countTask;
    }
});


