function roundingMinutes(minutes) {
    if (minutes >= 0 && minutes < 7.5) {
        return (minutes = 0);
    }
    if (minutes >= 7.5 && minutes < 22.5) {
        return (minutes = 15);
    }
    if (minutes >= 22.5 && minutes < 37.5) {
        return (minutes = 30);
    }
    if (minutes >= 37.5 && minutes < 52.5) {
        return (minutes = 45);
    }
    if (minutes >= 52.5) {
        return (minutes = 60);
    }
}

// стандартный бутстраповский попап
function modalPopup(options) {
    var v = $.extend({
            id: 'dynamic-modal-popup',
            title: '',
            content: '',
            footer: '<div class="text-center">' +
                '<button type="button" class="btn btn-primary" data-dismiss="modal">OК</button>' +
                '</div>',
            show: true
        }, options),
        $modal = $('#' + v.id);
    if ($modal.length)
        $modal.remove();
    $modal = $('<div id="' + v.id + '" class="modal fade" tabindex="-1" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content">' +
        '<div class="modal-header"><h4 class="modal-title"></h4><button type="button" class="close" data-dismiss="modal" aria-label="Закрыть"><span aria-hidden="true">&times;</span></button></div>' +
        '<div class="modal-body"></div>' +
        '<div class="modal-footer"></div></div></div></div>').appendTo('body');
    $modal.find('.modal-title').html(v.title);
    $modal.find('.modal-body').html(v.content);
    $modal.find('.modal-footer').html(v.footer);
    if (v.onClose)
        $modal.on('hidden.bs.modal', v.onClose);
    $modal.modal({ show: v.show });
    return $modal;
};

function modalConfirm(options) {
    if (!options.footer)
        options.footer = '<div class="text-center">' +
        '<button type="button" class="btn btn-primary mr-3 action-ok">Ok</button>' +
        '<button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>' +
        '</div>';
    var $modal = modalPopup(options);
    $modal.find('button.action-ok').click(function() {
        if (typeof options.onConfirm === 'function')
            $modal.on('hidden.bs.modal', options.onConfirm);
        $modal.modal('hide');
    });
    return $modal;
};


function getRandomInt(min = 0, max = 100000) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export { roundingMinutes, modalPopup, modalConfirm, getRandomInt }