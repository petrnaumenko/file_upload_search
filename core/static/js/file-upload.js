function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

function populateDataTable(data) {
    var table = $('#data-table').DataTable({
        destroy: true, // Destroy existing table instance if exists
        data: data,
        columns: Object.keys(data[0] || {}).map(key => ({ title: key, data: key })),
        pageLength: 10,
        oLanguage: {
            "sProcessing": "Обработка...",
            "sLengthMenu": "Показать _MENU_ записей",
            "sZeroRecords": "Записи не найдены",
            "sInfo": "Показаны записи с _START_ по _END_ из _TOTAL_ записей",
            "sInfoEmpty": "Показаны записи с 0 по 0 из 0 записей",
            "sInfoFiltered": "(отфильтровано из _MAX_ записей)",
            "sInfoPostFix": "",
            "sSearch": "Поиск:",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "Первая",
                "sPrevious": "Предыдущая",
                "sNext": "Следующая",
                "sLast": "Последняя"
            }
        }
    });
}

$(function() {
    $("#upload-form").on("submit", function(event) {
        event.preventDefault();

        var fileInput = $("#file-input")[0];
        var file = fileInput.files[0];

        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        var formData = new FormData();
        formData.append('file', file);

        $.ajax({
            xhr: function() {
                var xhr = new XMLHttpRequest();
                xhr.upload.addEventListener('progress', function(event) {
                    if (event.lengthComputable) {
                        var percentComplete = (event.loaded / event.total) * 100;
                        $("#progress-bar").css('width', percentComplete + '%');
                        $("#progress-bar").attr('aria-valuenow', percentComplete);
                        $("#progress-bar").text(Math.round(percentComplete) + '%');
                    }
                });
                return xhr;
            },
            type: 'POST',
            url: '', // URL для загрузки файла
            data: formData,
            processData: false,
            contentType: false,
            headers: {'X-CSRFToken': csrftoken},
            success: function(response) {
                populateDataTable(response.data);
            },
            error: function() {
                alert('Error uploading file.');
            }
        });
    });
});
