function confirmModal(url, action) {
    let btn = document.getElementById('confirmBtn');
    let confirmTitle = document.getElementById('confirmTitle');;

    if (btn) {
        btn.href = url;
        btn.classList.remove('btn-danger');
        btn.classList.remove('btn-success');
    } else {
        return;
    }

    if (action === 'delete') {
        confirmTitle.textContent = 'Biztosan törli az elemet?';
        btn.classList.add('btn-danger');
    } else if (action === 'vehicleAction') {
        confirmTitle.textContent = 'Biztosan végrehajtja a műveletet?';
        btn.classList.add('btn-success');
    }

    $('#confirmModal').modal('show');
}