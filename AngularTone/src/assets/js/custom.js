$(document).ready(function(){



    $('#collapse-1').on('shown.bs.collapse', function() {
    
    $(".servicedrop").addClass('fa-chevron-up').removeClass('fa-chevron-down');
    });
    
    $('#collapse-1').on('hidden.bs.collapse', function() {
    $(".servicedrop").addClass('fa-chevron-down').removeClass('fa-chevron-up');
    });
    
    });