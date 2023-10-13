

fetch('components/userHeader.html')
    .then(response => response.text())
    .then(html => {
        document.body.insertAdjacentHTML('afterbegin', html);
    });

fetch('components/footer.html')
    .then(response => response.text())
    .then(html => {
        document.body.insertAdjacentHTML('beforeend', html);
    });
